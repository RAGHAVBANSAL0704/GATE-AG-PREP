import React, { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';

export default function ScientificCalculator({ isOpen, onClose }) {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isRad, setIsRad] = useState(false);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState('');

  if (!isOpen) return null;

  const handleNum = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op) => {
    try {
      const current = parseFloat(display);
      let val = current;
      const angleMultiplier = isRad ? 1 : (Math.PI / 180);

      switch (op) {
        case 'C':
          setDisplay('0');
          setHistory('');
          setNewNumber(true);
          break;
        case 'CE':
          setDisplay('0');
          setNewNumber(true);
          break;
        case 'BACK':
          if (display.length > 1) setDisplay(display.slice(0, -1));
          else { setDisplay('0'); setNewNumber(true); }
          break;
        case 'sin':
          val = Math.sin(current * angleMultiplier);
          setHistory(`sin(${current})`);
          break;
        case 'cos':
          val = Math.cos(current * angleMultiplier);
          setHistory(`cos(${current})`);
          break;
        case 'tan':
          val = Math.tan(current * angleMultiplier);
          setHistory(`tan(${current})`);
          break;
        case 'asin':
          val = isRad ? Math.asin(current) : Math.asin(current) * (180 / Math.PI);
          setHistory(`asin(${current})`);
          break;
        case 'acos':
          val = isRad ? Math.acos(current) : Math.acos(current) * (180 / Math.PI);
          setHistory(`acos(${current})`);
          break;
        case 'atan':
          val = isRad ? Math.atan(current) : Math.atan(current) * (180 / Math.PI);
          setHistory(`atan(${current})`);
          break;
        case 'log':
          val = Math.log10(current);
          setHistory(`log(${current})`);
          break;
        case 'ln':
          val = Math.log(current);
          setHistory(`ln(${current})`);
          break;
        case 'sqrt':
          val = Math.sqrt(current);
          setHistory(`√(${current})`);
          break;
        case 'sqr':
          val = Math.pow(current, 2);
          setHistory(`(${current})²`);
          break;
        case 'cube':
          val = Math.pow(current, 3);
          setHistory(`(${current})³`);
          break;
        case 'inv':
          val = 1 / current;
          setHistory(`1/(${current})`);
          break;
        case 'exp':
          val = Math.exp(current);
          setHistory(`e^(${current})`);
          break;
        case '10x':
          val = Math.pow(10, current);
          setHistory(`10^(${current})`);
          break;
        case 'fact':
          val = factorial(current);
          setHistory(`${current}!`);
          break;
        case 'pi':
          val = Math.PI;
          setHistory('π');
          break;
        case 'e':
          val = Math.E;
          setHistory('e');
          break;
        case '+/-':
          val = -current;
          break;
        case 'MC': setMemory(0); break;
        case 'MR': setDisplay(String(memory)); setNewNumber(true); break;
        case 'MS': setMemory(current); break;
        case 'M+': setMemory(memory + current); break;
        case 'M-': setMemory(memory - current); break;
        default:
          break;
      }

      if (typeof val === 'number') {
        const resStr = Number.isInteger(val) ? String(val) : parseFloat(val.toFixed(8)).toString();
        setDisplay(resStr);
        setNewNumber(true);
      }
    } catch (err) {
      setDisplay('Error');
      setNewNumber(true);
    }
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= Math.min(n, 100); i++) res *= i;
    return res;
  };

  const handleMathEval = () => {
    try {
      // Evaluate standard expressions
      let sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
      
      const res = Function(`"use strict"; return (${sanitized})`)();
      if (!isNaN(res)) {
        setHistory(display + ' =');
        setDisplay(parseFloat(res.toFixed(8)).toString());
        setNewNumber(true);
      }
    } catch (e) {
      setDisplay('Error');
      setNewNumber(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-2 sm:p-4 no-print">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-sm max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Titlebar */}
        <div className="bg-slate-800/90 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="font-semibold text-xs text-slate-200 uppercase tracking-wider">GATE Virtual Calculator</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display */}
        <div className="bg-slate-950 p-4 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
            <span>{isRad ? 'RAD' : 'DEG'}</span>
            <span className="truncate max-w-[200px]">{history}</span>
          </div>
          <div className="text-right text-2xl font-mono font-semibold text-emerald-400 tracking-wider overflow-x-auto whitespace-nowrap">
            {display}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-slate-900 px-3 py-2 flex items-center justify-between text-xs border-b border-slate-800">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input 
                type="radio" 
                name="angle" 
                checked={!isRad} 
                onChange={() => setIsRad(false)}
                className="accent-blue-500" 
              />
              <span>Deg</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input 
                type="radio" 
                name="angle" 
                checked={isRad} 
                onChange={() => setIsRad(true)}
                className="accent-blue-500" 
              />
              <span>Rad</span>
            </label>
          </div>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Memory: {memory}</span>
        </div>

        {/* Keypad Grid */}
        <div className="p-2.5 sm:p-3 grid grid-cols-5 gap-1 sm:gap-1.5 bg-slate-900 text-xs overflow-y-auto max-h-[65vh]">
          {/* Row 1 */}
          <button onClick={() => handleOp('MC')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300">MC</button>
          <button onClick={() => handleOp('MR')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300">MR</button>
          <button onClick={() => handleOp('MS')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300">MS</button>
          <button onClick={() => handleOp('M+')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300">M+</button>
          <button onClick={() => handleOp('M-')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300">M-</button>

          {/* Row 2 */}
          <button onClick={() => handleOp('sin')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">sin</button>
          <button onClick={() => handleOp('cos')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">cos</button>
          <button onClick={() => handleOp('tan')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">tan</button>
          <button onClick={() => handleOp('ln')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">ln</button>
          <button onClick={() => handleOp('log')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">log</button>

          {/* Row 3 */}
          <button onClick={() => handleOp('asin')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">asin</button>
          <button onClick={() => handleOp('acos')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">acos</button>
          <button onClick={() => handleOp('atan')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">atan</button>
          <button onClick={() => handleOp('sqrt')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">√x</button>
          <button onClick={() => handleOp('sqr')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">x²</button>

          {/* Row 4 */}
          <button onClick={() => handleOp('exp')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">eˣ</button>
          <button onClick={() => handleOp('10x')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">10ˣ</button>
          <button onClick={() => handleOp('inv')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-300">1/x</button>
          <button onClick={() => handleOp('pi')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-amber-300">π</button>
          <button onClick={() => handleOp('fact')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-amber-300">n!</button>

          {/* Row 5 - Standard Controls */}
          <button onClick={() => handleOp('CE')} className="calc-btn bg-amber-600/30 hover:bg-amber-600/40 text-amber-300">CE</button>
          <button onClick={() => handleOp('C')} className="calc-btn bg-red-600/30 hover:bg-red-600/40 text-red-300 font-bold">C</button>
          <button onClick={() => handleOp('BACK')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300">⌫</button>
          <button onClick={() => handleNum('/')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold">÷</button>
          <button onClick={() => handleNum('*')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold">×</button>

          {/* Row 6 */}
          <button onClick={() => handleNum('7')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">7</button>
          <button onClick={() => handleNum('8')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">8</button>
          <button onClick={() => handleNum('9')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">9</button>
          <button onClick={() => handleNum('-')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold">-</button>
          <button onClick={() => handleOp('+/-')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-300">±</button>

          {/* Row 7 */}
          <button onClick={() => handleNum('4')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">4</button>
          <button onClick={() => handleNum('5')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">5</button>
          <button onClick={() => handleNum('6')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">6</button>
          <button onClick={() => handleNum('+')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold">+</button>
          <button onClick={() => handleNum('(')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-400">(</button>

          {/* Row 8 */}
          <button onClick={() => handleNum('1')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">1</button>
          <button onClick={() => handleNum('2')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">2</button>
          <button onClick={() => handleNum('3')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">3</button>
          <button onClick={handleMathEval} className="calc-btn row-span-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base flex items-center justify-center">=</button>
          <button onClick={() => handleNum(')')} className="calc-btn bg-slate-800 hover:bg-slate-700 text-slate-400">)</button>

          {/* Row 9 */}
          <button onClick={() => handleNum('0')} className="calc-btn col-span-2 bg-slate-950 hover:bg-slate-800 font-medium">0</button>
          <button onClick={() => handleNum('.')} className="calc-btn bg-slate-950 hover:bg-slate-800 font-medium">.</button>
        </div>
      </div>
    </div>
  );
}
