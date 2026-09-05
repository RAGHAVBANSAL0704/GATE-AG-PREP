import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  RotateCcw, 
  Zap, 
  Minus, 
  Maximize2, 
  Move, 
  Layers, 
  History, 
  Calculator, 
  BookOpen,
  Check,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import CalculatorDrillsModal from './CalculatorDrillsModal';
import CalculatorConstantsTab from './CalculatorConstantsTab';
import CalculatorHistoryTape from './CalculatorHistoryTape';

export default function ScientificCalculator({ isOpen, onClose }) {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isRad, setIsRad] = useState(false);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState('');
  const [isDrillOpen, setIsDrillOpen] = useState(false);
  
  // Tab Management: 'keypad' | 'constants' | 'history'
  const [activeTab, setActiveTab] = useState('keypad');

  // Examination Mode: Official TCS iON Mode (immediate unary) vs Standard Expression Mode
  const [isTCSMode, setIsTCSMode] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_calc_tcs_mode');
      return saved !== null ? saved === 'true' : true; // Default to authentic TCS mode
    } catch (e) {
      return true;
    }
  });

  // TCS Mode pending binary operation state
  const [pendingOp, setPendingOp] = useState(null);
  const [pendingVal, setPendingVal] = useState(null);

  // Window Positioning & Minimize State
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, origX: 0, origY: 0 });

  // Calculation History Tape (Persisted)
  const [historyItems, setHistoryItems] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_calc_history_tape');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gate_ag_calc_tcs_mode', String(isTCSMode));
    } catch (e) {}
  }, [isTCSMode]);

  useEffect(() => {
    try {
      localStorage.setItem('gate_ag_calc_history_tape', JSON.stringify(historyItems.slice(0, 30)));
    } catch (e) {}
  }, [historyItems]);

  const recordHistory = (expr, res) => {
    const record = {
      id: Date.now() + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      expression: expr,
      result: String(res)
    };
    setHistoryItems(prev => [record, ...prev.slice(0, 29)]);
  };

  // Keyboard support for Standard Mode
  useEffect(() => {
    if (!isOpen || isMinimized || activeTab !== 'keypad' || isTCSMode) return;

    const handleKeyDown = (e) => {
      // Don't capture when focused in inputs
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleNum(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleNum('.');
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        e.preventDefault();
        const opMap = { '+': '+', '-': '-', '*': '*', '/': '/' };
        handleNum(opMap[e.key]);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleMathEval();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleOp('BACK');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized, activeTab, isTCSMode, display, newNumber]);

  // Window drag handlers
  const handleDragStart = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      origX: position.x,
      origY: position.y
    };
  };

  useEffect(() => {
    const handleDragMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragRef.current.startX;
      const dy = clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.origX + dx,
        y: dragRef.current.origY + dy
      });
    };

    const handleDragEnd = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  // Floating Minimized Bubble
  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-blue-500 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group animate-in slide-in-from-bottom-3"
        title="Click to expand GATE Virtual Calculator"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
          <Calculator className="w-4 h-4" />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
              Virtual Calc ({isTCSMode ? 'TCS iON' : 'Standard'})
            </span>
          </div>
          <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[140px]">
            {display}
          </span>
        </div>
        <Maximize2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 ml-1 transition" />
      </div>
    );
  }

  const handleNum = (num) => {
    if (newNumber) {
      setDisplay(num === '.' ? '0.' : num);
      setNewNumber(false);
    } else {
      if (num === '.' && display.includes('.')) return;
      setDisplay(display === '0' && num !== '.' ? num : display + num);
    }
  };

  const factorial = (n) => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= Math.min(n, 100); i++) res *= i;
    return res;
  };

  // Immediate Unary & Memory Operations (Authentic TCS iON & Standard)
  const handleOp = (op) => {
    try {
      const current = parseFloat(display);
      let val = current;
      const angleMultiplier = isRad ? 1 : (Math.PI / 180);
      let exprLabel = '';

      switch (op) {
        case 'C':
          setDisplay('0');
          setHistory('');
          setPendingOp(null);
          setPendingVal(null);
          setNewNumber(true);
          return;
        case 'CE':
          setDisplay('0');
          setNewNumber(true);
          return;
        case 'BACK':
          if (display.length > 1) {
            setDisplay(display.slice(0, -1));
          } else {
            setDisplay('0');
            setNewNumber(true);
          }
          return;
        case 'sin':
          val = Math.sin(current * angleMultiplier);
          exprLabel = `sin(${current}${isRad ? ' rad' : '°'})`;
          break;
        case 'cos':
          val = Math.cos(current * angleMultiplier);
          exprLabel = `cos(${current}${isRad ? ' rad' : '°'})`;
          break;
        case 'tan':
          val = Math.tan(current * angleMultiplier);
          exprLabel = `tan(${current}${isRad ? ' rad' : '°'})`;
          break;
        case 'asin':
          val = isRad ? Math.asin(current) : Math.asin(current) * (180 / Math.PI);
          exprLabel = `asin(${current})`;
          break;
        case 'acos':
          val = isRad ? Math.acos(current) : Math.acos(current) * (180 / Math.PI);
          exprLabel = `acos(${current})`;
          break;
        case 'atan':
          val = isRad ? Math.atan(current) : Math.atan(current) * (180 / Math.PI);
          exprLabel = `atan(${current})`;
          break;
        case 'log':
          val = Math.log10(current);
          exprLabel = `log₁₀(${current})`;
          break;
        case 'ln':
          val = Math.log(current);
          exprLabel = `ln(${current})`;
          break;
        case 'sqrt':
          val = Math.sqrt(current);
          exprLabel = `√(${current})`;
          break;
        case 'sqr':
          val = Math.pow(current, 2);
          exprLabel = `(${current})²`;
          break;
        case 'cube':
          val = Math.pow(current, 3);
          exprLabel = `(${current})³`;
          break;
        case 'inv':
          val = 1 / current;
          exprLabel = `1/(${current})`;
          break;
        case 'exp':
          val = Math.exp(current);
          exprLabel = `e^(${current})`;
          break;
        case '10x':
          val = Math.pow(10, current);
          exprLabel = `10^(${current})`;
          break;
        case 'fact':
          val = factorial(current);
          exprLabel = `${current}!`;
          break;
        case 'pi':
          val = Math.PI;
          exprLabel = 'π';
          break;
        case 'e':
          val = Math.E;
          exprLabel = 'e';
          break;
        case '+/-':
          val = -current;
          exprLabel = `±(${current})`;
          break;
        case 'MC': 
          setMemory(0); 
          return;
        case 'MR': 
          setDisplay(String(memory)); 
          setNewNumber(true); 
          return;
        case 'MS': 
          setMemory(current); 
          setNewNumber(true);
          return;
        case 'M+': 
          setMemory(memory + current); 
          setNewNumber(true);
          return;
        case 'M-': 
          setMemory(memory - current); 
          setNewNumber(true);
          return;
        default:
          break;
      }

      if (typeof val === 'number' && !isNaN(val)) {
        const resStr = Number.isInteger(val) ? String(val) : parseFloat(val.toFixed(8)).toString();
        setDisplay(resStr);
        setHistory(exprLabel ? `${exprLabel} =` : '');
        setNewNumber(true);
        if (exprLabel) {
          recordHistory(exprLabel, resStr);
        }
      } else {
        setDisplay('Error');
        setNewNumber(true);
      }
    } catch (err) {
      setDisplay('Error');
      setNewNumber(true);
    }
  };

  // Binary Operator Execution (TCS Mode Immediate Step Chaining)
  const handleBinaryOp = (operator) => {
    if (isTCSMode) {
      const current = parseFloat(display);
      if (pendingOp && pendingVal !== null && !newNumber) {
        let evaluated = pendingVal;
        if (pendingOp === '+') evaluated = pendingVal + current;
        else if (pendingOp === '-') evaluated = pendingVal - current;
        else if (pendingOp === '*') evaluated = pendingVal * current;
        else if (pendingOp === '/') evaluated = current !== 0 ? pendingVal / current : NaN;

        const resStr = Number.isInteger(evaluated) ? String(evaluated) : parseFloat(evaluated.toFixed(8)).toString();
        setDisplay(resStr);
        setPendingVal(evaluated);
        recordHistory(`${pendingVal} ${pendingOp} ${current}`, resStr);
      } else {
        setPendingVal(current);
      }
      setPendingOp(operator);
      setHistory(`${display} ${operator}`);
      setNewNumber(true);
    } else {
      // Standard Expression Mode: append operator
      handleNum(operator);
    }
  };

  // Evaluation Handler (=)
  const handleMathEval = () => {
    try {
      if (isTCSMode) {
        if (pendingOp && pendingVal !== null) {
          const current = parseFloat(display);
          let res = pendingVal;
          if (pendingOp === '+') res = pendingVal + current;
          else if (pendingOp === '-') res = pendingVal - current;
          else if (pendingOp === '*') res = pendingVal * current;
          else if (pendingOp === '/') res = current !== 0 ? pendingVal / current : NaN;

          if (!isNaN(res)) {
            const resStr = Number.isInteger(res) ? String(res) : parseFloat(res.toFixed(8)).toString();
            const expr = `${pendingVal} ${pendingOp} ${current}`;
            setHistory(`${expr} =`);
            setDisplay(resStr);
            recordHistory(expr, resStr);
          } else {
            setDisplay('Error');
          }
          setPendingOp(null);
          setPendingVal(null);
          setNewNumber(true);
        }
      } else {
        // Standard Mode: evaluate expression
        let sanitized = display
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E');
        
        const res = Function(`"use strict"; return (${sanitized})`)();
        if (!isNaN(res)) {
          const resStr = Number.isInteger(res) ? String(res) : parseFloat(res.toFixed(8)).toString();
          setHistory(`${display} =`);
          setDisplay(resStr);
          recordHistory(display, resStr);
          setNewNumber(true);
        } else {
          setDisplay('Error');
          setNewNumber(true);
        }
      }
    } catch (e) {
      setDisplay('Error');
      setNewNumber(true);
    }
  };

  const handleInsertValue = (val) => {
    const valStr = String(val);
    setDisplay(valStr);
    setNewNumber(true);
    setActiveTab('keypad');
  };

  return (
    <div 
      className="fixed inset-0 z-50 pointer-events-none flex items-end sm:items-center justify-center p-2 sm:p-4 no-print"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
    >
      {/* Modal Card Window */}
      <div className="pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-sm max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Drag Handle Top Bar */}
        <div 
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="bg-slate-100/90 dark:bg-slate-900/95 px-3.5 py-2.5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <span>GATE Virtual Calc</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold border ${
                isTCSMode 
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' 
                  : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
              }`}>
                {isTCSMode ? 'TCS iON' : 'Standard'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsDrillOpen(true)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-extrabold text-[10px] border border-amber-500/30 transition cursor-pointer"
              title="Launch TCS Virtual Calculator Speed & Finger-Memory Drills"
            >
              <Zap className="w-3 h-3 fill-amber-500 dark:fill-amber-400" />
              <span className="hidden sm:inline">Drills</span>
            </button>

            {/* Reset Position */}
            {(position.x !== 0 || position.y !== 0) && (
              <button
                onClick={() => setPosition({ x: 0, y: 0 })}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Reset window position"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Minimize */}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Minimize to floating bubble"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {/* Close */}
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Close calculator"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Tabs & Mode Switch Strip */}
        <div className="bg-slate-50 dark:bg-slate-900/80 px-3 py-1.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('keypad')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'keypad'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-3 h-3" />
              <span>Keypad</span>
            </button>

            <button
              onClick={() => setActiveTab('constants')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'constants'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>AG Constants</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              <History className="w-3 h-3" />
              <span>Tape</span>
              {historyItems.length > 0 && (
                <span className="text-[9px] px-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono">
                  {historyItems.length}
                </span>
              )}
            </button>
          </div>

          {/* Mode Switch Toggle */}
          <button
            onClick={() => setIsTCSMode(!isTCSMode)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
            title={isTCSMode ? 'Switch to Standard Expression Mode' : 'Switch to Official TCS iON Exam Mode'}
          >
            {isTCSMode ? (
              <>
                <span className="text-blue-600 dark:text-blue-400">TCS Mode</span>
                <ToggleRight className="w-4 h-4 text-blue-600" />
              </>
            ) : (
              <>
                <span>Std Mode</span>
                <ToggleLeft className="w-4 h-4 text-slate-400" />
              </>
            )}
          </button>
        </div>

        {/* Digital Display Box */}
        <div className="bg-slate-50 dark:bg-slate-950 p-3.5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
            <span className="font-bold text-[10px]">{isRad ? 'RAD' : 'DEG'}</span>
            <span className="truncate max-w-[220px]" title={history}>{history}</span>
          </div>
          <div className="text-right text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider overflow-x-auto whitespace-nowrap">
            {display}
          </div>
        </div>

        {/* TAB 1: KEYPAD VIEW */}
        {activeTab === 'keypad' && (
          <>
            {/* Controls Bar */}
            <div className="bg-slate-100/70 dark:bg-slate-900 px-3.5 py-1.5 flex items-center justify-between text-xs border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                  <input 
                    type="radio" 
                    name="angle" 
                    checked={!isRad} 
                    onChange={() => setIsRad(false)}
                    className="accent-blue-600 dark:accent-blue-500" 
                  />
                  <span>Deg</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                  <input 
                    type="radio" 
                    name="angle" 
                    checked={isRad} 
                    onChange={() => setIsRad(true)}
                    className="accent-blue-600 dark:accent-blue-500" 
                  />
                  <span>Rad</span>
                </label>
              </div>
              <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-mono border border-slate-300 dark:border-slate-700">Memory: {memory}</span>
            </div>

            {/* Keypad Grid */}
            <div className="p-2.5 sm:p-3 grid grid-cols-5 gap-1.5 bg-slate-100/50 dark:bg-slate-900 text-xs overflow-y-auto max-h-[60vh]">
              {/* Row 1: Memory */}
              <button onClick={() => handleOp('MC')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 shadow-2xs">MC</button>
              <button onClick={() => handleOp('MR')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 shadow-2xs">MR</button>
              <button onClick={() => handleOp('MS')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 shadow-2xs">MS</button>
              <button onClick={() => handleOp('M+')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 shadow-2xs">M+</button>
              <button onClick={() => handleOp('M-')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 shadow-2xs">M-</button>

              {/* Row 2: Trig & Log */}
              <button onClick={() => handleOp('sin')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">sin</button>
              <button onClick={() => handleOp('cos')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">cos</button>
              <button onClick={() => handleOp('tan')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">tan</button>
              <button onClick={() => handleOp('ln')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">ln</button>
              <button onClick={() => handleOp('log')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">log</button>

              {/* Row 3: Inverse & Powers */}
              <button onClick={() => handleOp('asin')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">asin</button>
              <button onClick={() => handleOp('acos')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">acos</button>
              <button onClick={() => handleOp('atan')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">atan</button>
              <button onClick={() => handleOp('sqrt')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">√x</button>
              <button onClick={() => handleOp('sqr')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">x²</button>

              {/* Row 4: Exp, Inv, Constants */}
              <button onClick={() => handleOp('exp')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">eˣ</button>
              <button onClick={() => handleOp('10x')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">10ˣ</button>
              <button onClick={() => handleOp('inv')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-slate-700 shadow-2xs">1/x</button>
              <button onClick={() => handleOp('pi')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-amber-50 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-slate-700 shadow-2xs">π</button>
              <button onClick={() => handleOp('fact')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-amber-50 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-slate-700 shadow-2xs">n!</button>

              {/* Row 5 - Standard Controls */}
              <button onClick={() => handleOp('CE')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-amber-100 hover:bg-amber-200 dark:bg-amber-600/25 dark:hover:bg-amber-600/35 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-600/30 shadow-2xs">CE</button>
              <button onClick={() => handleOp('C')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-extrabold text-xs transition cursor-pointer select-none active:scale-95 bg-rose-100 hover:bg-rose-200 dark:bg-red-600/25 dark:hover:bg-red-600/35 text-rose-800 dark:text-red-300 border border-rose-300/80 dark:border-red-600/30 shadow-2xs">C</button>
              <button onClick={() => handleOp('BACK')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 shadow-2xs">⌫</button>
              <button onClick={() => handleBinaryOp('/')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-black text-sm transition cursor-pointer select-none active:scale-95 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-blue-400 border border-indigo-200/80 dark:border-slate-700 shadow-2xs">÷</button>
              <button onClick={() => handleBinaryOp('*')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-black text-sm transition cursor-pointer select-none active:scale-95 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-blue-400 border border-indigo-200/80 dark:border-slate-700 shadow-2xs">×</button>

              {/* Row 6 */}
              <button onClick={() => handleNum('7')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">7</button>
              <button onClick={() => handleNum('8')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">8</button>
              <button onClick={() => handleNum('9')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">9</button>
              <button onClick={() => handleBinaryOp('-')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-black text-sm transition cursor-pointer select-none active:scale-95 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-blue-400 border border-indigo-200/80 dark:border-slate-700 shadow-2xs">-</button>
              <button onClick={() => handleOp('+/-')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-xs transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 shadow-2xs">±</button>

              {/* Row 7 */}
              <button onClick={() => handleNum('4')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">4</button>
              <button onClick={() => handleNum('5')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">5</button>
              <button onClick={() => handleNum('6')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">6</button>
              <button onClick={() => handleBinaryOp('+')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-black text-sm transition cursor-pointer select-none active:scale-95 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-blue-400 border border-indigo-200/80 dark:border-slate-700 shadow-2xs">+</button>
              <button onClick={() => handleNum('(')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-400 border border-slate-300/80 dark:border-slate-700 shadow-2xs">(</button>

              {/* Row 8 */}
              <button onClick={() => handleNum('1')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">1</button>
              <button onClick={() => handleNum('2')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">2</button>
              <button onClick={() => handleNum('3')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">3</button>
              <button onClick={handleMathEval} className="row-span-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-black text-lg flex items-center justify-center cursor-pointer select-none active:scale-95 shadow-md shadow-blue-500/20 border border-blue-600 transition">=</button>
              <button onClick={() => handleNum(')')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-400 border border-slate-300/80 dark:border-slate-700 shadow-2xs">)</button>

              {/* Row 9 */}
              <button onClick={() => handleNum('0')} className="col-span-2 h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-sm transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">0</button>
              <button onClick={() => handleNum('.')} className="h-9 sm:h-9.5 rounded-lg flex items-center justify-center font-bold text-base transition cursor-pointer select-none active:scale-95 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xs">.</button>
            </div>
          </>
        )}

        {/* TAB 2: AG ENGINEERING CONSTANTS & UNIT CONVERTERS */}
        {activeTab === 'constants' && (
          <CalculatorConstantsTab onInsertValue={handleInsertValue} />
        )}

        {/* TAB 3: CALCULATION HISTORY TAPE */}
        {activeTab === 'history' && (
          <CalculatorHistoryTape 
            historyItems={historyItems}
            onSelectResult={handleInsertValue}
            onClearHistory={() => setHistoryItems([])}
          />
        )}

      </div>

      <CalculatorDrillsModal
        isOpen={isDrillOpen}
        onClose={() => setIsDrillOpen(false)}
      />
    </div>
  );
}
