import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  RotateCcw, 
  Trophy, 
  Zap, 
  Play, 
  Shield, 
  Target, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Flame,
  Award,
  HelpCircle,
  Volume2,
  VolumeX,
  Undo2,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';

// =========================================================================
// 1. FIELD DE-MINER (MINESWEEPER)
// =========================================================================
export function FieldDeMinerGame({ onRewardXP }) {
  const [difficulty, setDifficulty] = useState('easy'); // easy: 8x8 (10), med: 10x10 (15), hard: 12x12 (22)
  const [grid, setGrid] = useState([]);
  const [gameState, setGameState] = useState('ready'); // ready, playing, won, lost
  const [flagMode, setFlagMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [flagsLeft, setFlagsLeft] = useState(10);
  const timerRef = useRef(null);

  const config = {
    easy: { rows: 8, cols: 8, mines: 10 },
    med: { rows: 10, cols: 10, mines: 15 },
    hard: { rows: 12, cols: 12, mines: 22 }
  }[difficulty];

  const initBoard = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(0);
    setGameState('ready');
    setFlagsLeft(config.mines);

    const newGrid = [];
    for (let r = 0; r < config.rows; r++) {
      const row = [];
      for (let c = 0; c < config.cols; c++) {
        row.push({
          r,
          c,
          isMine: false,
          revealed: false,
          flagged: false,
          neighborMines: 0
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, [config.rows, config.cols, config.mines]);

  useEffect(() => {
    initBoard();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initBoard]);

  const populateMines = (firstR, firstC) => {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    let placed = 0;
    while (placed < config.mines) {
      const r = Math.floor(Math.random() * config.rows);
      const c = Math.floor(Math.random() * config.cols);
      // Safe first click radius
      if (!newGrid[r][c].isMine && (Math.abs(r - firstR) > 1 || Math.abs(c - firstC) > 1)) {
        newGrid[r][c].isMine = true;
        placed++;
      }
    }
    // Calculate numbers
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }
    return newGrid;
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
  };

  const revealCell = (r, c) => {
    if (gameState === 'won' || gameState === 'lost') return;
    let currentGrid = grid;
    if (gameState === 'ready') {
      currentGrid = populateMines(r, c);
      setGameState('playing');
      startTimer();
    }

    const cell = currentGrid[r][c];
    if (cell.revealed || cell.flagged) return;

    soundFX.playClick();

    if (cell.isMine) {
      // Game Over
      clearInterval(timerRef.current);
      setGameState('lost');
      soundFX.playCrash();
      // Reveal all mines
      const revealedGrid = currentGrid.map(row =>
        row.map(cl => ({
          ...cl,
          revealed: cl.revealed || cl.isMine
        }))
      );
      setGrid(revealedGrid);
      return;
    }

    // Flood fill
    const newGrid = currentGrid.map(row => row.map(cl => ({ ...cl })));
    const queue = [[r, c]];
    newGrid[r][c].revealed = true;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift();
      const currCell = newGrid[currR][currC];
      if (currCell.neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr;
            const nc = currC + dc;
            if (nr >= 0 && nr < config.rows && nc >= 0 && nc < config.cols) {
              const neighbor = newGrid[nr][nc];
              if (!neighbor.revealed && !neighbor.flagged && !neighbor.isMine) {
                neighbor.revealed = true;
                if (neighbor.neighborMines === 0) {
                  queue.push([nr, nc]);
                }
              }
            }
          }
        }
      }
    }

    // Check Win
    let unrevealedSafe = 0;
    for (let row of newGrid) {
      for (let cl of row) {
        if (!cl.isMine && !cl.revealed) unrevealedSafe++;
      }
    }

    if (unrevealedSafe === 0) {
      clearInterval(timerRef.current);
      setGameState('won');
      soundFX.playWin();
      confetti({ particleCount: 100, spread: 70 });
      onRewardXP?.(30);
    }

    setGrid(newGrid);
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (gameState === 'won' || gameState === 'lost') return;
    const cell = grid[r][c];
    if (cell.revealed) return;

    soundFX.playClick();
    const newGrid = grid.map(row => row.map(cl => ({ ...cl })));
    const target = newGrid[r][c];
    if (!target.flagged && flagsLeft > 0) {
      target.flagged = true;
      setFlagsLeft(f => f - 1);
    } else if (target.flagged) {
      target.flagged = false;
      setFlagsLeft(f => f + 1);
    }
    setGrid(newGrid);
  };

  const getNumberColor = (num) => {
    switch (num) {
      case 1: return 'text-blue-500 font-extrabold';
      case 2: return 'text-emerald-500 font-extrabold';
      case 3: return 'text-rose-500 font-extrabold';
      case 4: return 'text-purple-600 font-extrabold';
      case 5: return 'text-amber-600 font-extrabold';
      default: return 'text-red-700 font-black';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-lg mx-auto shadow-xl text-center">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="text-left">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>💣 Field De-Miner</span>
          </h3>
          <p className="text-[11px] text-slate-500">Unearth crops & flag hidden underground stones</p>
        </div>

        <div className="flex items-center gap-2">
          {['easy', 'med', 'hard'].map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition ${
                difficulty === d 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between bg-slate-950 text-white px-4 py-2.5 rounded-xl font-mono text-sm shadow-inner">
        <div className="flex items-center gap-1.5 text-rose-400 font-black">
          <span>🚩</span>
          <span>{String(flagsLeft).padStart(2, '0')}</span>
        </div>

        <button
          onClick={initBoard}
          className="text-2xl hover:scale-125 transition transform active:scale-95"
          title="Restart Field"
        >
          {gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🚜'}
        </button>

        <div className="flex items-center gap-1.5 text-amber-400 font-black">
          <span>⏳</span>
          <span>{String(timer).padStart(3, '0')}s</span>
        </div>
      </div>

      {/* Flag Mode Toggle Button for Mobile */}
      <div className="flex justify-center">
        <button
          onClick={() => { soundFX.playClick(); setFlagMode(!flagMode); }}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition border ${
            flagMode 
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-300'
          }`}
        >
          <span>{flagMode ? '🚩 Flag Planting Mode ACTIVE' : '⛏️ Tap to Dig (Switch to Flag)'}</span>
        </button>
      </div>

      {/* Board Grid */}
      <div className="inline-block p-2 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner max-w-full overflow-x-auto">
        <div 
          className="grid gap-1 select-none"
          style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={(e) => {
                  if (flagMode) {
                    toggleFlag(e, r, c);
                  } else {
                    revealCell(r, c);
                  }
                }}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center font-mono text-xs sm:text-sm font-bold transition-all ${
                  cell.revealed
                    ? cell.isMine
                      ? 'bg-rose-600 text-white animate-bounce'
                      : 'bg-slate-200/90 dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-inner'
                    : 'bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 hover:from-blue-400 hover:to-blue-500 dark:hover:from-blue-600 dark:hover:to-blue-700 shadow-sm active:scale-95'
                }`}
              >
                {cell.revealed ? (
                  cell.isMine ? (
                    '💣'
                  ) : cell.neighborMines > 0 ? (
                    <span className={getNumberColor(cell.neighborMines)}>{cell.neighborMines}</span>
                  ) : (
                    ''
                  )
                ) : cell.flagged ? (
                  '🚩'
                ) : (
                  ''
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Result Message */}
      {gameState === 'won' && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold animate-in fade-in">
          🎉 Farm Cleared! You unlocked +30 Break XP in {timer} seconds!
        </div>
      )}
      {gameState === 'lost' && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-bold animate-in fade-in">
          💥 Boom! You struck an underground rock. Tap the tractor to try again!
        </div>
      )}
    </div>
  );
}


// =========================================================================
// 2. AQUAFLOW: PIPELINE CONNECT
// =========================================================================
export function AquaFlowGame({ onRewardXP }) {
  const [gridSize, setGridSize] = useState(4); // 4x4 or 5x5
  const [grid, setGrid] = useState([]);
  const [level, setLevel] = useState(1);
  const [waterFlowing, setWaterFlowing] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  // Pipe shapes: straight (0: horizontal, 1: vertical), corner (0: bottom-right, 1: bottom-left, 2: top-left, 3: top-right), cross
  // Directions: 0: top, 1: right, 2: bottom, 3: left
  const PIPE_TYPES = {
    straight: { id: 'straight', rotations: [[1, 3], [0, 2]] }, // 0: ━, 1: ┃
    corner: { id: 'corner', rotations: [[1, 2], [2, 3], [3, 0], [0, 1]] }, // 0: ┏, 1: ┓, 2: ┛, 3: ┗
    cross: { id: 'cross', rotations: [[0, 1, 2, 3]] }, // ╋
    tee: { id: 'tee', rotations: [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]] } // ┳, ┫, ┻, ┣
  };

  const generatePuzzle = useCallback(() => {
    const size = gridSize;
    const newGrid = [];
    const types = ['straight', 'corner', 'corner', 'straight', 'tee'];

    for (let r = 0; r < size; r++) {
      const row = [];
      for (let c = 0; c < size; c++) {
        const typeKey = (r === 0 && c === 0) || (r === size - 1 && c === size - 1)
          ? 'corner'
          : types[Math.floor(Math.random() * types.length)];
        const typeObj = PIPE_TYPES[typeKey];
        const rot = Math.floor(Math.random() * typeObj.rotations.length);
        row.push({
          r,
          c,
          type: typeKey,
          rotation: rot,
          connected: false
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setIsWon(false);
    setWaterFlowing(false);
    setMoves(0);
  }, [gridSize]);

  useEffect(() => {
    generatePuzzle();
  }, [generatePuzzle, level]);

  const checkConnection = (currentGrid) => {
    const size = currentGrid.length;
    const connectedMap = Array.from({ length: size }, () => Array(size).fill(false));
    
    // Check if start (0,0) has left or top connection
    const startCell = currentGrid[0][0];
    const startConns = PIPE_TYPES[startCell.type].rotations[startCell.rotation];
    
    // Water enters from left into (0,0), so (0,0) must accept left (3)
    if (!startConns.includes(3)) {
      return { solved: false, connectedMap };
    }

    const queue = [[0, 0]];
    connectedMap[0][0] = true;

    const dr = [-1, 0, 1, 0]; // 0: top, 1: right, 2: bottom, 3: left
    const dc = [0, 1, 0, -1];
    const oppositeDir = [2, 3, 0, 1];

    while (queue.length > 0) {
      const [r, c] = queue.shift();
      const cell = currentGrid[r][c];
      const cellConns = PIPE_TYPES[cell.type].rotations[cell.rotation];

      for (let dir of cellConns) {
        const nr = r + dr[dir];
        const nc = c + dc[dir];

        if (nr >= 0 && nr < size && nc >= 0 && nc < size && !connectedMap[nr][nc]) {
          const nextCell = currentGrid[nr][nc];
          const nextConns = PIPE_TYPES[nextCell.type].rotations[nextCell.rotation];
          if (nextConns.includes(oppositeDir[dir])) {
            connectedMap[nr][nc] = true;
            queue.push([nr, nc]);
          }
        }
      }
    }

    // Target is (size - 1, size - 1) exiting to right (1)
    const targetCell = currentGrid[size - 1][size - 1];
    const targetConns = PIPE_TYPES[targetCell.type].rotations[targetCell.rotation];
    const targetConnected = connectedMap[size - 1][size - 1] && targetConns.includes(1);

    return { solved: targetConnected, connectedMap };
  };

  const rotatePipe = (r, c) => {
    if (isWon || waterFlowing) return;
    soundFX.playClick();
    setMoves(m => m + 1);

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    const cell = newGrid[r][c];
    const totalRots = PIPE_TYPES[cell.type].rotations.length;
    cell.rotation = (cell.rotation + 1) % totalRots;

    const { solved, connectedMap } = checkConnection(newGrid);
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid.length; j++) {
        newGrid[i][j].connected = connectedMap[i][j];
      }
    }

    setGrid(newGrid);

    if (solved) {
      setWaterFlowing(true);
      soundFX.playSpillwaySurge();
      setTimeout(() => {
        setIsWon(true);
        soundFX.playWin();
        confetti({ particleCount: 80 });
        onRewardXP?.(25);
      }, 1000);
    }
  };

  const getPipeSymbol = (type, rotation) => {
    switch (type) {
      case 'straight':
        return rotation === 0 ? '━' : '┃';
      case 'corner':
        return ['┏', '┓', '┛', '┗'][rotation];
      case 'tee':
        return ['┳', '┫', '┻', '┣'][rotation];
      case 'cross':
        return '╋';
      default:
        return '•';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-xl text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>🚰 AquaFlow Pipeline</span>
          </h3>
          <p className="text-xs text-slate-500">Rotate pipes to connect Water Pump ➔ Sprinkler</p>
        </div>
        <div className="flex gap-2 text-xs font-mono font-bold">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            Lvl {level}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Moves: {moves}
          </span>
        </div>
      </div>

      {/* Pipeline Grid Canvas Area */}
      <div className="relative p-6 bg-slate-950 rounded-2xl border border-cyan-500/30 overflow-hidden shadow-inner">
        {/* Source and Target Indicators */}
        <div className="absolute left-1 top-8 flex items-center gap-1 text-[11px] font-black text-cyan-400 animate-pulse">
          <span>💧 IN</span>
        </div>
        <div className="absolute right-1 bottom-8 flex items-center gap-1 text-[11px] font-black text-emerald-400 animate-pulse">
          <span>OUT 🌾</span>
        </div>

        <div 
          className="grid gap-2 justify-center mx-auto"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => rotatePipe(r, c)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl font-mono text-3xl font-black transition-all transform active:scale-90 flex items-center justify-center border ${
                  cell.connected
                    ? waterFlowing
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/50 scale-105'
                      : 'bg-blue-950/80 border-blue-500 text-cyan-400'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                {getPipeSymbol(cell.type, cell.rotation)}
              </button>
            ))
          )}
        </div>

        {isWon && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-white space-y-3 animate-in fade-in">
            <span className="text-4xl">💧🎉</span>
            <h4 className="font-extrabold text-base text-cyan-300">WATER FLOW COMPLETE!</h4>
            <p className="text-xs text-slate-300">High-pressure irrigation routed successfully (+25 XP)</p>
            <button
              onClick={() => {
                setLevel(l => l + 1);
                if (level % 2 === 0 && gridSize < 5) setGridSize(5);
                generatePuzzle();
              }}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold rounded-xl text-xs shadow-lg transition"
            >
              NEXT STAGE ➔
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          onClick={generatePuzzle}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Shuffle Layout</span>
        </button>

        <button
          onClick={() => setGridSize(s => s === 4 ? 5 : 4)}
          className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-bold transition"
        >
          Grid: {gridSize}x{gridSize}
        </button>
      </div>
    </div>
  );
}


// =========================================================================
// 3. LOCUST SWARM INVADERS (SPACE INVADERS)
// =========================================================================
export function LocustInvadersGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // ready, playing, gameover, win
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('locust_high') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  const stateRef = useRef({
    player: { x: 200, y: 360, width: 36, height: 20, speed: 5 },
    bullets: [],
    enemyBullets: [],
    enemies: [],
    bunkers: [],
    ufo: null,
    score: 0,
    lives: 3,
    direction: 1,
    dropTimer: 0,
    lastUfoSpawn: performance.now(),
    keys: { left: false, right: false, fire: false }
  });

  const initGame = () => {
    const enemies = [];
    const rows = 4;
    const cols = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        enemies.push({
          x: 40 + c * 42,
          y: 40 + r * 30,
          width: 24,
          height: 18,
          alive: true,
          type: r === 0 ? 'locust_boss' : r < 2 ? 'beetle' : 'caterpillar',
          points: (4 - r) * 10
        });
      }
    }

    const bunkers = [
      { x: 70, y: 300, width: 44, height: 28, hp: 12 },
      { x: 190, y: 300, width: 44, height: 28, hp: 12 },
      { x: 310, y: 300, width: 44, height: 28, hp: 12 }
    ];

    stateRef.current = {
      player: { x: 195, y: 360, width: 36, height: 20, speed: 5 },
      bullets: [],
      enemyBullets: [],
      enemies,
      bunkers,
      ufo: null,
      score: 0,
      lives: 3,
      direction: 1,
      dropTimer: 0,
      lastUfoSpawn: performance.now(),
      keys: { left: false, right: false, fire: false }
    };
    setScore(0);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') stateRef.current.keys.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') stateRef.current.keys.right = true;
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        shootBullet();
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') stateRef.current.keys.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') stateRef.current.keys.right = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const shootBullet = () => {
    const state = stateRef.current;
    if (gameState !== 'playing') return;
    if (state.bullets.length < 3) {
      state.bullets.push({
        x: state.player.x + state.player.width / 2 - 2,
        y: state.player.y - 6,
        width: 4,
        height: 10,
        speed: 7
      });
      soundFX.playLaserPing();
    }
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const loop = () => {
      const state = stateRef.current;

      // Update Player
      if (state.keys.left && state.player.x > 10) state.player.x -= state.player.speed;
      if (state.keys.right && state.player.x < canvas.width - state.player.width - 10) state.player.x += state.player.speed;

      // Update Player Bullets
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.y -= b.speed;
        if (b.y < -10) {
          state.bullets.splice(i, 1);
          continue;
        }

        // Check Hit Bunker
        for (let bunker of state.bunkers) {
          if (bunker.hp > 0 && b.x > bunker.x && b.x < bunker.x + bunker.width && b.y > bunker.y && b.y < bunker.y + bunker.height) {
            bunker.hp -= 1;
            state.bullets.splice(i, 1);
            break;
          }
        }

        // Check Hit UFO
        if (state.ufo && b.x > state.ufo.x && b.x < state.ufo.x + state.ufo.width && b.y > state.ufo.y && b.y < state.ufo.y + state.ufo.height) {
          state.score += 100;
          setScore(state.score);
          soundFX.playScore();
          state.ufo = null;
          state.bullets.splice(i, 1);
          continue;
        }

        // Check Hit Enemy
        for (let enemy of state.enemies) {
          if (enemy.alive && b.x > enemy.x && b.x < enemy.x + enemy.width && b.y > enemy.y && b.y < enemy.y + enemy.height) {
            enemy.alive = false;
            state.bullets.splice(i, 1);
            state.score += enemy.points;
            setScore(state.score);
            soundFX.playClick();
            break;
          }
        }
      }

      // Update Enemies
      const aliveEnemies = state.enemies.filter(e => e.alive);
      if (aliveEnemies.length === 0) {
        setGameState('win');
        soundFX.playWin();
        confetti({ particleCount: 100 });
        onRewardXP?.(50);
        return;
      }

      let hitWall = false;
      const speedMultiplier = 1 + (1 - aliveEnemies.length / state.enemies.length) * 1.5;

      for (let enemy of aliveEnemies) {
        enemy.x += state.direction * 1.2 * speedMultiplier;
        if (enemy.x <= 10 || enemy.x >= canvas.width - enemy.width - 10) {
          hitWall = true;
        }
        if (enemy.y + enemy.height >= state.player.y) {
          setGameState('gameover');
          soundFX.playCrash();
          return;
        }
      }

      if (hitWall) {
        state.direction *= -1;
        for (let enemy of aliveEnemies) {
          enemy.y += 12;
        }
      }

      // Enemy Shooting
      if (Math.random() < 0.03 && state.enemyBullets.length < 4) {
        const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        if (shooter) {
          state.enemyBullets.push({
            x: shooter.x + shooter.width / 2,
            y: shooter.y + shooter.height,
            width: 3,
            height: 8,
            speed: 3.5
          });
        }
      }

      // Update Enemy Bullets
      for (let i = state.enemyBullets.length - 1; i >= 0; i--) {
        const eb = state.enemyBullets[i];
        eb.y += eb.speed;
        if (eb.y > canvas.height + 10) {
          state.enemyBullets.splice(i, 1);
          continue;
        }

        // Hit Player
        if (eb.x > state.player.x && eb.x < state.player.x + state.player.width && eb.y > state.player.y && eb.y < state.player.y + state.player.height) {
          state.enemyBullets.splice(i, 1);
          state.lives -= 1;
          soundFX.playCrash();
          if (state.lives <= 0) {
            setGameState('gameover');
            if (state.score > highScore) {
              setHighScore(state.score);
              try { localStorage.setItem('locust_high', state.score.toString()); } catch (e) {}
            }
            return;
          }
        }

        // Hit Bunker
        for (let bunker of state.bunkers) {
          if (bunker.hp > 0 && eb.x > bunker.x && eb.x < bunker.x + bunker.width && eb.y > bunker.y && eb.y < bunker.y + bunker.height) {
            bunker.hp -= 1;
            state.enemyBullets.splice(i, 1);
            break;
          }
        }
      }

      // UFO Spawn
      if (!state.ufo && performance.now() - state.lastUfoSpawn > 12000) {
        state.lastUfoSpawn = performance.now();
        state.ufo = { x: -40, y: 15, width: 36, height: 16, speed: 2.2 };
      }
      if (state.ufo) {
        state.ufo.x += state.ufo.speed;
        if (state.ufo.x > canvas.width + 50) state.ufo = null;
      }

      // DRAWING
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield background
      ctx.fillStyle = '#334155';
      for (let i = 0; i < 20; i++) {
        const sx = (i * 37 + (performance.now() * 0.05)) % canvas.width;
        const sy = (i * 47) % canvas.height;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Draw Player Tank
      ctx.fillStyle = '#22d3ee';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.fillRect(state.player.x, state.player.y + 6, state.player.width, 14);
      ctx.fillRect(state.player.x + 14, state.player.y, 8, 8);
      ctx.shadowBlur = 0;

      // Draw Player Bullets
      ctx.fillStyle = '#38bdf8';
      for (let b of state.bullets) {
        ctx.fillRect(b.x, b.y, b.width, b.height);
      }

      // Draw Enemies
      for (let enemy of aliveEnemies) {
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const emoji = enemy.type === 'locust_boss' ? '👾' : enemy.type === 'beetle' ? '🦗' : '🐛';
        ctx.fillText(emoji, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
      }

      // Draw Enemy Bullets
      ctx.fillStyle = '#f43f5e';
      for (let eb of state.enemyBullets) {
        ctx.fillRect(eb.x, eb.y, eb.width, eb.height);
      }

      // Draw Bunkers
      for (let bunker of state.bunkers) {
        if (bunker.hp > 0) {
          ctx.fillStyle = bunker.hp > 6 ? '#10b981' : '#f59e0b';
          ctx.fillRect(bunker.x, bunker.y, bunker.width, bunker.height);
        }
      }

      // Draw UFO
      if (state.ufo) {
        ctx.font = '16px serif';
        ctx.fillText('🛸', state.ufo.x + state.ufo.width / 2, state.ufo.y + state.ufo.height / 2);
      }

      // Draw HUD
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`LIVES: ${'❤️'.repeat(state.lives)}`, 10, canvas.height - 10);
      ctx.textAlign = 'right';
      ctx.fillText(`SCORE: ${state.score}`, canvas.width - 10, canvas.height - 10);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-lg mx-auto shadow-xl text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>👾 Locust Swarm Invaders</span>
          </h3>
          <p className="text-xs text-slate-500">Defend fields from descending cyber-locusts</p>
        </div>
        <div className="text-xs font-mono font-bold text-amber-500">
          Score: {score}
        </div>
      </div>

      <div className="relative inline-block rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <canvas ref={canvasRef} width={420} height={400} className="w-full max-w-[420px] aspect-[420/400]" />

        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white space-y-3">
            <span className="text-4xl">{gameState === 'win' ? '🏆' : gameState === 'gameover' ? '💥' : '👾'}</span>
            <h4 className="font-extrabold text-lg text-cyan-400">
              {gameState === 'win' ? 'SWARM DEFEATED!' : gameState === 'gameover' ? 'HARVESTER DESTROYED' : 'CYBER LOCUST DEFENSE'}
            </h4>
            <p className="text-xs text-slate-300 max-w-xs">
              {gameState === 'win' ? 'All crop invaders eliminated! (+50 XP)' : 'Use Arrow Keys / A & D to move and Space to fire.'}
            </p>
            <button
              onClick={initGame}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold rounded-xl text-xs transition shadow-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{gameState === 'ready' ? 'START MISSION' : 'PLAY AGAIN'}</span>
            </button>
          </div>
        )}
      </div>

      {/* On-screen Controls */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <button
          onMouseDown={() => (stateRef.current.keys.left = true)}
          onMouseUp={() => (stateRef.current.keys.left = false)}
          onTouchStart={() => (stateRef.current.keys.left = true)}
          onTouchEnd={() => (stateRef.current.keys.left = false)}
          className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-white font-black active:bg-cyan-500 active:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={shootBullet}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black rounded-xl text-xs shadow-md transition"
        >
          🔥 FIRE PLASMA
        </button>

        <button
          onMouseDown={() => (stateRef.current.keys.right = true)}
          onMouseUp={() => (stateRef.current.keys.right = false)}
          onTouchStart={() => (stateRef.current.keys.right = true)}
          onTouchEnd={() => (stateRef.current.keys.right = false)}
          className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-white font-black active:bg-cyan-500 active:text-white transition"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}


// =========================================================================
// 4. CANAL CROSSING FROGGER
// =========================================================================
export function CanalFroggerGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // ready, playing, won, lost
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const stateRef = useRef({
    frog: { gridX: 6, gridY: 12, size: 28 },
    homes: [false, false, false, false, false],
    lanes: [],
    lastTime: performance.now(),
    score: 0,
    lives: 3
  });

  const initGame = () => {
    // 13 rows total: 0: Homes, 1-5: River, 6: Safe Mid, 7-11: Road, 12: Start Safe
    const lanes = [
      // River lanes (rows 1-5)
      { row: 1, type: 'log', speed: 1.6, width: 75, count: 3, spacing: 140, items: [] },
      { row: 2, type: 'turtle', speed: -2.0, width: 60, count: 4, spacing: 110, items: [] },
      { row: 3, type: 'log', speed: 2.5, width: 90, count: 2, spacing: 200, items: [] },
      { row: 4, type: 'log', speed: 1.4, width: 65, count: 3, spacing: 130, items: [] },
      { row: 5, type: 'turtle', speed: -1.8, width: 60, count: 3, spacing: 140, items: [] },
      // Road lanes (rows 7-11)
      { row: 7, type: 'tractor', speed: -1.5, width: 35, count: 3, spacing: 130, items: [] },
      { row: 8, type: 'car', speed: 2.4, width: 32, count: 3, spacing: 140, items: [] },
      { row: 9, type: 'truck', speed: -1.8, width: 48, count: 2, spacing: 190, items: [] },
      { row: 10, type: 'car', speed: 3.0, width: 30, count: 3, spacing: 150, items: [] },
      { row: 11, type: 'tractor', speed: -2.0, width: 35, count: 3, spacing: 120, items: [] }
    ];

    for (let l of lanes) {
      for (let i = 0; i < l.count; i++) {
        l.items.push({ x: i * l.spacing, width: l.width });
      }
    }

    stateRef.current = {
      frog: { gridX: 6, gridY: 12, size: 28 },
      homes: [false, false, false, false, false],
      lanes,
      lastTime: performance.now(),
      score: 0,
      lives: 3
    };
    setScore(0);
    setLives(3);
    setGameState('playing');
  };

  const moveFrog = useCallback((dx, dy) => {
    if (gameState !== 'playing') return;
    const frog = stateRef.current.frog;
    const newX = Math.max(0, Math.min(12, frog.gridX + dx));
    const newY = Math.max(0, Math.min(12, frog.gridY + dy));
    frog.gridX = newX;
    frog.gridY = newY;
    soundFX.playJump();

    if (dy < 0) {
      stateRef.current.score += 10;
      setScore(stateRef.current.score);
    }
  }, [gameState]);

  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); moveFrog(0, -1); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); moveFrog(0, 1); }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); moveFrog(-1, 0); }
      if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); moveFrog(1, 0); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [moveFrog]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const rowH = canvas.height / 13;
    const colW = canvas.width / 13;

    const loop = (now) => {
      const state = stateRef.current;
      const dt = Math.min(2.0, (now - state.lastTime) / 16.666);
      state.lastTime = now;

      // Update lane items
      for (let l of state.lanes) {
        for (let item of l.items) {
          item.x += l.speed * dt;
          if (l.speed > 0 && item.x > canvas.width) item.x = -item.width;
          if (l.speed < 0 && item.x < -item.width) item.x = canvas.width;
        }
      }

      const frogPixelX = state.frog.gridX * colW + colW / 2;
      const frogPixelY = state.frog.gridY * rowH + rowH / 2;

      // Check Road Collision (rows 7-11)
      if (state.frog.gridY >= 7 && state.frog.gridY <= 11) {
        const currentLane = state.lanes.find(l => l.row === state.frog.gridY);
        if (currentLane) {
          for (let item of currentLane.items) {
            if (frogPixelX > item.x && frogPixelX < item.x + item.width) {
              // Squash
              handleDeath();
              return;
            }
          }
        }
      }

      // Check River Floating & Drowning (rows 1-5)
      if (state.frog.gridY >= 1 && state.frog.gridY <= 5) {
        const currentLane = state.lanes.find(l => l.row === state.frog.gridY);
        let onLog = false;
        if (currentLane) {
          for (let item of currentLane.items) {
            if (frogPixelX > item.x && frogPixelX < item.x + item.width) {
              onLog = true;
              // Drift with log
              state.frog.gridX += (currentLane.speed * dt) / colW;
              if (state.frog.gridX < 0 || state.frog.gridX > 12) {
                handleDeath();
                return;
              }
              break;
            }
          }
        }
        if (!onLog) {
          // Drown
          handleDeath();
          return;
        }
      }

      // Check Home Slot (row 0)
      if (state.frog.gridY === 0) {
        const homeSlotIndex = [1, 3, 6, 9, 11].indexOf(Math.round(state.frog.gridX));
        if (homeSlotIndex !== -1 && !state.homes[homeSlotIndex]) {
          state.homes[homeSlotIndex] = true;
          state.score += 100;
          setScore(state.score);
          soundFX.playScore();
          // Reset Frog
          state.frog.gridX = 6;
          state.frog.gridY = 12;

          if (state.homes.every(Boolean)) {
            setGameState('won');
            soundFX.playWin();
            confetti({ particleCount: 100 });
            onRewardXP?.(40);
            return;
          }
        } else {
          // Missed home slot
          handleDeath();
          return;
        }
      }

      // RENDER
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Home slots row (0)
      ctx.fillStyle = '#065f46';
      ctx.fillRect(0, 0, canvas.width, rowH);
      [1, 3, 6, 9, 11].forEach((col, idx) => {
        ctx.fillStyle = state.homes[idx] ? '#10b981' : '#022c22';
        ctx.fillRect(col * colW, 2, colW, rowH - 4);
        if (state.homes[idx]) {
          ctx.font = '16px serif';
          ctx.fillText('🐸', col * colW + 4, rowH - 8);
        }
      });

      // River rows (1-5)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, rowH, canvas.width, rowH * 5);

      // Middle safe row (6)
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, rowH * 6, canvas.width, rowH);

      // Road rows (7-11)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, rowH * 7, canvas.width, rowH * 5);

      // Start safe row (12)
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, rowH * 12, canvas.width, rowH);

      // Render River Logs / Turtles
      for (let l of state.lanes.filter(l => l.row >= 1 && l.row <= 5)) {
        for (let item of l.items) {
          ctx.fillStyle = l.type === 'log' ? '#78350f' : '#047857';
          ctx.beginPath();
          ctx.roundRect(item.x, l.row * rowH + 4, item.width, rowH - 8, 6);
          ctx.fill();
        }
      }

      // Render Vehicles
      for (let l of state.lanes.filter(l => l.row >= 7 && l.row <= 11)) {
        for (let item of l.items) {
          ctx.fillStyle = l.type === 'tractor' ? '#f59e0b' : l.type === 'truck' ? '#ef4444' : '#38bdf8';
          ctx.beginPath();
          ctx.roundRect(item.x, l.row * rowH + 4, item.width, rowH - 8, 4);
          ctx.fill();
        }
      }

      // Render Frog
      ctx.font = '20px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🐸', state.frog.gridX * colW + colW / 2, state.frog.gridY * rowH + rowH / 2);

      animId = requestAnimationFrame(loop);
    };

    const handleDeath = () => {
      soundFX.playCrash();
      stateRef.current.lives -= 1;
      setLives(stateRef.current.lives);
      stateRef.current.frog.gridX = 6;
      stateRef.current.frog.gridY = 12;

      if (stateRef.current.lives <= 0) {
        setGameState('lost');
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-lg mx-auto shadow-xl text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>🦘 Canal Crossing Frogger</span>
          </h3>
          <p className="text-xs text-slate-500">Cross highway & floating logs into all 5 safe barns</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono font-bold">
          <span className="text-rose-500">{'❤️'.repeat(lives)}</span>
          <span className="text-emerald-500">Score: {score}</span>
        </div>
      </div>

      <div className="relative inline-block rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <canvas ref={canvasRef} width={390} height={390} className="w-full max-w-[390px] aspect-square" />

        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white space-y-3">
            <span className="text-4xl">{gameState === 'won' ? '🎉' : '🐸'}</span>
            <h4 className="font-extrabold text-lg text-emerald-400">
              {gameState === 'won' ? 'ALL BARNS FILLED!' : gameState === 'lost' ? 'OUT OF LIVES' : 'CANAL CROSSING'}
            </h4>
            <p className="text-xs text-slate-300 max-w-xs">
              Hop across busy roads and ride floating logs. Reach all 5 top green barn bays!
            </p>
            <button
              onClick={initGame}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs transition shadow-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{gameState === 'ready' ? 'START HOPPING' : 'PLAY AGAIN'}</span>
            </button>
          </div>
        )}
      </div>

      {/* D-Pad Controls */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <button
          onClick={() => moveFrog(0, -1)}
          className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-slate-800 dark:text-white active:bg-emerald-500 active:text-white transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => moveFrog(-1, 0)}
            className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-slate-800 dark:text-white active:bg-emerald-500 active:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => moveFrog(0, 1)}
            className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-slate-800 dark:text-white active:bg-emerald-500 active:text-white transition"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => moveFrog(1, 0)}
            className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-slate-800 dark:text-white active:bg-emerald-500 active:text-white transition"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}


// =========================================================================
// 5. CROP SLICER TURBO (FRUIT SLICER)
// =========================================================================
export function CropSlicerGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // ready, playing, gameover
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  const stateRef = useRef({
    fruits: [],
    particles: [],
    trail: [],
    isMouseDown: false,
    score: 0,
    lives: 3,
    lastSpawn: performance.now()
  });

  const FRUIT_TYPES = [
    { name: 'watermelon', emoji: '🍉', radius: 24, pts: 10 },
    { name: 'apple', emoji: '🍎', radius: 20, pts: 10 },
    { name: 'pineapple', emoji: '🍍', radius: 26, pts: 15 },
    { name: 'carrot', emoji: '🥕', radius: 18, pts: 12 },
    { name: 'bomb', emoji: '💣', radius: 22, isBomb: true }
  ];

  const startGame = () => {
    stateRef.current = {
      fruits: [],
      particles: [],
      trail: [],
      isMouseDown: false,
      score: 0,
      lives: 3,
      lastSpawn: performance.now()
    };
    setScore(0);
    setCombo(0);
    setGameState('playing');
  };

  const spawnFruit = (width, height) => {
    const isBomb = Math.random() < 0.2;
    const type = isBomb ? FRUIT_TYPES[4] : FRUIT_TYPES[Math.floor(Math.random() * 4)];
    const x = Math.random() * (width - 120) + 60;
    const vx = (Math.random() - 0.5) * 4;
    const vy = -(Math.random() * 3 + 9);

    stateRef.current.fruits.push({
      ...type,
      x,
      y: height + 30,
      vx,
      vy,
      gravity: 0.22,
      sliced: false,
      rotation: 0,
      vRot: (Math.random() - 0.5) * 0.1
    });
  };

  const handleSlice = (x, y) => {
    const state = stateRef.current;
    let hitCount = 0;

    for (let f of state.fruits) {
      if (!f.sliced) {
        const dist = Math.hypot(f.x - x, f.y - y);
        if (dist < f.radius + 15) {
          f.sliced = true;
          if (f.isBomb) {
            soundFX.playCrash();
            state.lives -= 1;
            if (state.lives <= 0) {
              setGameState('gameover');
              return;
            }
          } else {
            hitCount++;
            state.score += f.pts;
            setScore(state.score);
            soundFX.playLaserPing();

            // Spawn juicy particles
            for (let i = 0; i < 8; i++) {
              state.particles.push({
                x: f.x,
                y: f.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: f.name === 'watermelon' ? '#ef4444' : f.name === 'pineapple' ? '#eab308' : '#22c55e',
                life: 25
              });
            }
          }
        }
      }
    }

    if (hitCount >= 2) {
      setCombo(hitCount);
      soundFX.playScore();
      onRewardXP?.(hitCount * 5);
    }
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const loop = (now) => {
      const state = stateRef.current;

      // Spawn periodic crops
      if (now - state.lastSpawn > 950) {
        state.lastSpawn = now;
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) spawnFruit(canvas.width, canvas.height);
      }

      // Update fruits
      for (let i = state.fruits.length - 1; i >= 0; i--) {
        const f = state.fruits[i];
        f.vy += f.gravity;
        f.x += f.vx;
        f.y += f.vy;
        f.rotation += f.vRot;

        if (f.y > canvas.height + 60 && f.vy > 0) {
          state.fruits.splice(i, 1);
        }
      }

      // Update particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) state.particles.splice(i, 1);
      }

      // Update slice trail
      if (state.trail.length > 0) {
        state.trail = state.trail.slice(-8);
      }

      // RENDER
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Particles
      for (let p of state.particles) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Fruits
      for (let f of state.fruits) {
        if (!f.sliced) {
          ctx.save();
          ctx.translate(f.x, f.y);
          ctx.rotate(f.rotation);
          ctx.font = '28px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(f.emoji, 0, 0);
          ctx.restore();
        }
      }

      // Draw Blade Trail
      if (state.trail.length > 1) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(state.trail[0].x, state.trail[0].y);
        for (let pt of state.trail) {
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // HUD
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`LIVES: ${'❤️'.repeat(state.lives)}`, 12, 24);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, onRewardXP]);

  const handlePointerDown = (e) => {
    stateRef.current.isMouseDown = true;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    stateRef.current.trail = [{ x, y }];
    handleSlice(x, y);
  };

  const handlePointerMove = (e) => {
    if (!stateRef.current.isMouseDown) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (!clientX || !clientY) return;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    stateRef.current.trail.push({ x, y });
    handleSlice(x, y);
  };

  const handlePointerUp = () => {
    stateRef.current.isMouseDown = false;
    stateRef.current.trail = [];
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-lg mx-auto shadow-xl text-center select-none">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>🍉 Crop Slicer Turbo</span>
          </h3>
          <p className="text-xs text-slate-500">Swipe/drag to slice flying fruits & avoid bombs</p>
        </div>
        <div className="text-xs font-mono font-bold text-rose-500">
          Score: {score}
        </div>
      </div>

      <div className="relative inline-block rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <canvas
          ref={canvasRef}
          width={400}
          height={360}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="w-full max-w-[400px] aspect-[400/360] cursor-crosshair touch-none"
        />

        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white space-y-3">
            <span className="text-4xl">{gameState === 'gameover' ? '💥' : '🍉'}</span>
            <h4 className="font-extrabold text-lg text-rose-400">
              {gameState === 'gameover' ? 'GAME OVER!' : 'CROP SLICER TURBO'}
            </h4>
            <p className="text-xs text-slate-300 max-w-xs">
              Swipe across watermelons, pineapples & carrots! Beware of explosive skull bombs!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-xs transition shadow-lg flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{gameState === 'ready' ? 'START SLICING' : 'PLAY AGAIN'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// =========================================================================
// 6. WHACK-A-WEED FRENZY
// =========================================================================
export function WhackAWeedGame({ onRewardXP }) {
  const [holes, setHoles] = useState(Array(9).fill(null));
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(35);
  const [isPlaying, setIsPlaying] = useState(false);

  const TARGETS = [
    { type: 'weed', emoji: '🌿', pts: 10, name: 'Wild Weed' },
    { type: 'gopher', emoji: '🦔', pts: 20, name: 'Gopher' },
    { type: 'golden', emoji: '👑', pts: 50, name: 'Gold Bug' },
    { type: 'sunflower', emoji: '🌻', pts: -20, isFriendly: true, name: 'Friendly Flower' }
  ];

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setTimeLeft(35);
    setIsPlaying(true);
    setHoles(Array(9).fill(null));
    soundFX.playClick();
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          soundFX.playWin();
          onRewardXP?.(Math.floor(score / 5));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, score, onRewardXP]);

  useEffect(() => {
    if (!isPlaying) return;

    const spawner = setInterval(() => {
      setHoles(prev => {
        const next = [...prev];
        const emptyIndices = next.map((v, i) => v === null ? i : null).filter(v => v !== null);
        if (emptyIndices.length > 0) {
          const randHole = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const randType = Math.random() < 0.15 ? TARGETS[3] : Math.random() < 0.2 ? TARGETS[2] : Math.random() < 0.5 ? TARGETS[1] : TARGETS[0];
          next[randHole] = { ...randType, id: Date.now() };

          setTimeout(() => {
            setHoles(current => {
              const updated = [...current];
              if (updated[randHole]?.id === next[randHole]?.id) {
                updated[randHole] = null;
              }
              return updated;
            });
          }, 950);
        }
        return next;
      });
    }, 600);

    return () => clearInterval(spawner);
  }, [isPlaying]);

  const whackHole = (index) => {
    const target = holes[index];
    if (!target) return;

    if (target.isFriendly) {
      soundFX.playCrash();
      setScore(s => Math.max(0, s + target.pts));
      setCombo(0);
    } else {
      soundFX.playScore();
      setScore(s => s + target.pts * (combo >= 5 ? 2 : 1));
      setCombo(c => c + 1);
    }

    setHoles(prev => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-xl text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>🦔 Whack-A-Weed Frenzy</span>
          </h3>
          <p className="text-xs text-slate-500">Hit weeds & gophers, spare friendly sunflowers!</p>
        </div>
        <div className="flex gap-3 text-xs font-mono font-bold">
          <span className="text-rose-500">⏳ {timeLeft}s</span>
          <span className="text-emerald-500">Score: {score}</span>
        </div>
      </div>

      {!isPlaying ? (
        <div className="py-10 space-y-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-5xl">🌿⚡</span>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">35-Second Reflex Whack</h4>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs transition shadow-lg"
          >
            START WHACKING ⚡
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 p-4 bg-amber-950/20 dark:bg-slate-950 rounded-2xl border border-amber-800/30">
          {holes.map((hole, i) => (
            <button
              key={i}
              onClick={() => whackHole(i)}
              className="h-20 sm:h-24 bg-gradient-to-b from-amber-900 to-amber-950 border-2 border-amber-800/60 rounded-2xl flex items-center justify-center text-4xl transform active:scale-90 transition-all shadow-inner relative overflow-hidden"
            >
              <div className="absolute inset-x-2 bottom-1 h-3 bg-amber-950 rounded-full blur-xs opacity-50" />
              {hole && (
                <span className="animate-in zoom-in-50 duration-150 transform hover:scale-125">
                  {hole.emoji}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


// =========================================================================
// 7. CYBER SEQUENCE (SIMON MEMORY)
// =========================================================================
export function CyberSequenceGame({ onRewardXP }) {
  const [sequence, setSequence] = useState([]);
  const [playerIdx, setPlayerIdx] = useState(0);
  const [activePad, setActivePad] = useState(null);
  const [gameState, setGameState] = useState('ready'); // ready, playback, input, gameover
  const [streak, setStreak] = useState(0);

  const PADS = [
    { id: 0, color: 'bg-emerald-500 shadow-emerald-500/50', active: 'bg-emerald-300 ring-4 ring-white', freq: 330 },
    { id: 1, color: 'bg-rose-500 shadow-rose-500/50', active: 'bg-rose-300 ring-4 ring-white', freq: 440 },
    { id: 2, color: 'bg-amber-500 shadow-amber-500/50', active: 'bg-amber-300 ring-4 ring-white', freq: 550 },
    { id: 3, color: 'bg-cyan-500 shadow-cyan-500/50', active: 'bg-cyan-300 ring-4 ring-white', freq: 660 }
  ];

  const playTone = (freq) => {
    if (soundFX.isMuted()) return;
    try {
      soundFX.init();
      if (!soundFX.ctx) return;
      const osc = soundFX.ctx.createOscillator();
      const gain = soundFX.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, soundFX.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, soundFX.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, soundFX.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(soundFX.ctx.destination);
      osc.start();
      osc.stop(soundFX.ctx.currentTime + 0.3);
    } catch (e) {}
  };

  const startNextRound = (currentSeq) => {
    const nextSeq = [...currentSeq, Math.floor(Math.random() * 4)];
    setSequence(nextSeq);
    setPlayerIdx(0);
    setGameState('playback');

    let i = 0;
    const interval = setInterval(() => {
      if (i < nextSeq.length) {
        const padId = nextSeq[i];
        setActivePad(padId);
        playTone(PADS[padId].freq);
        setTimeout(() => setActivePad(null), 350);
        i++;
      } else {
        clearInterval(interval);
        setGameState('input');
      }
    }, 600);
  };

  const handleStart = () => {
    setStreak(0);
    startNextRound([]);
  };

  const handlePadClick = (padId) => {
    if (gameState !== 'input') return;

    setActivePad(padId);
    playTone(PADS[padId].freq);
    setTimeout(() => setActivePad(null), 250);

    if (padId === sequence[playerIdx]) {
      const nextIdx = playerIdx + 1;
      if (nextIdx === sequence.length) {
        setStreak(s => s + 1);
        soundFX.playScore();
        onRewardXP?.(10);
        setTimeout(() => startNextRound(sequence), 800);
      } else {
        setPlayerIdx(nextIdx);
      }
    } else {
      soundFX.playCrash();
      setGameState('gameover');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-xl text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>🎵 Cyber Sequence Memory</span>
          </h3>
          <p className="text-xs text-slate-500">Memorize & repeat the glowing audio pattern</p>
        </div>
        <div className="text-xs font-mono font-bold text-cyan-500">
          Streak: {streak}
        </div>
      </div>

      <div className="relative p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-56 h-56 sm:w-64 sm:h-64">
          {PADS.map(pad => (
            <button
              key={pad.id}
              onClick={() => handlePadClick(pad.id)}
              disabled={gameState !== 'input'}
              className={`rounded-2xl transition-all transform duration-150 ${
                activePad === pad.id ? pad.active : pad.color
              } ${gameState === 'input' ? 'hover:scale-105 active:scale-95 cursor-pointer shadow-lg' : 'opacity-80'}`}
            />
          ))}
        </div>

        {gameState !== 'input' && gameState !== 'playback' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white space-y-3 rounded-2xl">
            <span className="text-4xl">{gameState === 'gameover' ? '❌' : '🧠'}</span>
            <h4 className="font-extrabold text-base text-cyan-400">
              {gameState === 'gameover' ? `STREAK ENDED: ${streak} STEPS` : 'SIMON AUDIO MEMORY'}
            </h4>
            <button
              onClick={handleStart}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold rounded-xl text-xs transition shadow-lg"
            >
              START PATTERN ➔
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// =========================================================================
// 8. NEON CYBER PONG (VS AI)
// =========================================================================
export function CyberPongGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // ready, playing, won, lost
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  const stateRef = useRef({
    playerY: 150,
    aiY: 150,
    ballX: 200,
    ballY: 150,
    ballVx: 4.5,
    ballVy: 2.5,
    paddleH: 70,
    paddleW: 10,
    playerScore: 0,
    aiScore: 0
  });

  const startGame = () => {
    stateRef.current = {
      playerY: 140,
      aiY: 140,
      ballX: 200,
      ballY: 175,
      ballVx: 4.5,
      ballVy: 2.0,
      paddleH: 70,
      paddleW: 10,
      playerScore: 0,
      aiScore: 0
    };
    setPlayerScore(0);
    setAiScore(0);
    setGameState('playing');
  };

  const handleMouseMove = (e) => {
    if (gameState !== 'playing' || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (!clientY) return;
    const y = clientY - rect.top;
    stateRef.current.playerY = Math.max(0, Math.min(350 - stateRef.current.paddleH, y - stateRef.current.paddleH / 2));
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resetBall = (direction) => {
      const state = stateRef.current;
      state.ballX = canvas.width / 2;
      state.ballY = canvas.height / 2;
      state.ballVx = direction * 4.5;
      state.ballVy = (Math.random() - 0.5) * 4;
    };

    const loop = () => {
      const state = stateRef.current;

      // AI Paddle tracking
      const targetAiY = state.ballY - state.paddleH / 2;
      state.aiY += (targetAiY - state.aiY) * 0.085;
      state.aiY = Math.max(0, Math.min(canvas.height - state.paddleH, state.aiY));

      // Update Ball
      state.ballX += state.ballVx;
      state.ballY += state.ballVy;

      // Top / Bottom Bounce
      if (state.ballY <= 6 || state.ballY >= canvas.height - 6) {
        state.ballVy *= -1;
        soundFX.playClick();
      }

      // Check Player Paddle Collision (Left)
      if (
        state.ballX <= 25 &&
        state.ballX >= 10 &&
        state.ballY >= state.playerY &&
        state.ballY <= state.playerY + state.paddleH
      ) {
        const hitOffset = (state.ballY - (state.playerY + state.paddleH / 2)) / (state.paddleH / 2);
        state.ballVx = Math.abs(state.ballVx) * 1.05;
        state.ballVy = hitOffset * 4.5;
        soundFX.playLaserPing();
      }

      // Check AI Paddle Collision (Right)
      if (
        state.ballX >= canvas.width - 25 &&
        state.ballX <= canvas.width - 10 &&
        state.ballY >= state.aiY &&
        state.ballY <= state.aiY + state.paddleH
      ) {
        const hitOffset = (state.ballY - (state.aiY + state.paddleH / 2)) / (state.paddleH / 2);
        state.ballVx = -Math.abs(state.ballVx) * 1.05;
        state.ballVy = hitOffset * 4.5;
        soundFX.playClick();
      }

      // Check Score
      if (state.ballX < 0) {
        state.aiScore += 1;
        setAiScore(state.aiScore);
        soundFX.playCrash();
        if (state.aiScore >= 5) {
          setGameState('lost');
          return;
        }
        resetBall(1);
      } else if (state.ballX > canvas.width) {
        state.playerScore += 1;
        setPlayerScore(state.playerScore);
        soundFX.playScore();
        if (state.playerScore >= 5) {
          setGameState('won');
          soundFX.playWin();
          confetti({ particleCount: 80 });
          onRewardXP?.(35);
          return;
        }
        resetBall(-1);
      }

      // RENDER
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Center dashed line
      ctx.strokeStyle = '#1e293b';
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Paddles
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(15, state.playerY, state.paddleW, state.paddleH);

      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(canvas.width - 25, state.aiY, state.paddleW, state.paddleH);

      // Draw Ball
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, 6, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-lg mx-auto shadow-xl text-center select-none">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>🏓 Neon Cyber Pong</span>
          </h3>
          <p className="text-xs text-slate-500">First to 5 points wins against AI</p>
        </div>
        <div className="flex gap-4 text-sm font-mono font-bold">
          <span className="text-cyan-400">YOU: {playerScore}</span>
          <span className="text-rose-400">AI: {aiScore}</span>
        </div>
      </div>

      <div className="relative inline-block rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <canvas
          ref={canvasRef}
          width={420}
          height={320}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          className="w-full max-w-[420px] aspect-[420/320] cursor-ns-resize touch-none"
        />

        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white space-y-3">
            <span className="text-4xl">{gameState === 'won' ? '🏆' : '🏓'}</span>
            <h4 className="font-extrabold text-lg text-cyan-400">
              {gameState === 'won' ? 'MATCH VICTORY!' : gameState === 'lost' ? 'AI WINS MATCH' : 'CYBER PONG ARENA'}
            </h4>
            <p className="text-xs text-slate-300 max-w-xs">
              Move cursor/finger up & down to guide your left paddle. Defeat the AI!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold rounded-xl text-xs transition shadow-lg"
            >
              {gameState === 'ready' ? 'START MATCH' : 'PLAY AGAIN'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// =========================================================================
// 9. CONNECT 4 GRID CLASH (VS SMART AI)
// =========================================================================
export function Connect4Game({ onRewardXP }) {
  const ROWS = 6;
  const COLS = 7;
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [turn, setTurn] = useState('player');
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setTurn('player');
    setWinner(null);
    soundFX.playClick();
  };

  const checkWin = (b, player) => {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        if (b[r][c] === player && b[r][c+1] === player && b[r][c+2] === player && b[r][c+3] === player) return true;
      }
    }
    for (let r = 0; r < ROWS - 3; r++) {
      for (let c = 0; c < COLS; c++) {
        if (b[r][c] === player && b[r+1][c] === player && b[r+2][c] === player && b[r+3][c] === player) return true;
      }
    }
    for (let r = 0; r < ROWS - 3; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        if (b[r][c] === player && b[r+1][c+1] === player && b[r+2][c+2] === player && b[r+3][c+3] === player) return true;
      }
    }
    for (let r = 3; r < ROWS; r++) {
      for (let c = 0; c < COLS - 3; c++) {
        if (b[r][c] === player && b[r-1][c+1] === player && b[r-2][c+2] === player && b[r-3][c+3] === player) return true;
      }
    }
    return false;
  };

  const dropChip = (colIdx) => {
    if (winner || turn !== 'player') return;

    let rowIdx = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][colIdx] === null) {
        rowIdx = r;
        break;
      }
    }
    if (rowIdx === -1) return;

    soundFX.playScore();
    const newBoard = board.map(row => [...row]);
    newBoard[rowIdx][colIdx] = 1;
    setBoard(newBoard);

    if (checkWin(newBoard, 1)) {
      setWinner('player');
      soundFX.playWin();
      confetti({ particleCount: 90 });
      onRewardXP?.(30);
      return;
    }

    if (newBoard.every(row => row.every(cell => cell !== null))) {
      setWinner('draw');
      return;
    }

    setTurn('ai');

    setTimeout(() => {
      makeAiMove(newBoard);
    }, 500);
  };

  const makeAiMove = (currentBoard) => {
    const validCols = [];
    for (let c = 0; c < COLS; c++) {
      if (currentBoard[0][c] === null) validCols.push(c);
    }
    if (validCols.length === 0) return;

    for (let c of validCols) {
      const tempBoard = currentBoard.map(row => [...row]);
      let rIdx = -1;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (tempBoard[r][c] === null) { rIdx = r; break; }
      }
      tempBoard[rIdx][c] = 2;
      if (checkWin(tempBoard, 2)) {
        applyAiChoice(c, currentBoard);
        return;
      }
    }

    for (let c of validCols) {
      const tempBoard = currentBoard.map(row => [...row]);
      let rIdx = -1;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (tempBoard[r][c] === null) { rIdx = r; break; }
      }
      tempBoard[rIdx][c] = 1;
      if (checkWin(tempBoard, 1)) {
        applyAiChoice(c, currentBoard);
        return;
      }
    }

    if (validCols.includes(3) && Math.random() < 0.6) {
      applyAiChoice(3, currentBoard);
      return;
    }

    const chosenCol = validCols[Math.floor(Math.random() * validCols.length)];
    applyAiChoice(chosenCol, currentBoard);
  };

  const applyAiChoice = (colIdx, currentBoard) => {
    let rowIdx = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (currentBoard[r][colIdx] === null) {
        rowIdx = r;
        break;
      }
    }
    if (rowIdx === -1) return;

    soundFX.playClick();
    const newBoard = currentBoard.map(row => [...row]);
    newBoard[rowIdx][colIdx] = 2;
    setBoard(newBoard);

    if (checkWin(newBoard, 2)) {
      setWinner('ai');
      soundFX.playCrash();
      return;
    }

    setTurn('player');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-xl text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>🔴 Connect 4 Grid Clash</span>
          </h3>
          <p className="text-xs text-slate-500">Connect 4 red discs in a row vs Smart AI</p>
        </div>
        <button
          onClick={resetGame}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 bg-blue-900/90 rounded-2xl border-4 border-blue-700 shadow-2xl inline-block">
        <div className="grid grid-cols-7 gap-2">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => dropChip(c)}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
                  cell === 1
                    ? 'bg-rose-500 shadow-inner'
                    : cell === 2
                    ? 'bg-amber-400 shadow-inner'
                    : 'bg-blue-950 hover:bg-blue-900'
                }`}
              />
            ))
          )}
        </div>
      </div>

      {winner && (
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white animate-in fade-in">
          {winner === 'player' ? '🎉 YOU WON! (+30 XP)' : winner === 'ai' ? '🤖 AI Won the round!' : '🤝 It\'s a draw!'}
        </div>
      )}
    </div>
  );
}


// =========================================================================
// 10. SILO CRATE SOKOBAN
// =========================================================================
export function SokobanGame({ onRewardXP }) {
  const [level, setLevel] = useState(0);
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState([]);
  const [isWon, setIsWon] = useState(false);

  // 0: Floor, 1: Wall, 2: Target, 3: Box, 4: Box on Target, 5: Player, 6: Player on Target
  const LEVELS = [
    [
      [1, 1, 1, 1, 1, 1],
      [1, 5, 0, 0, 1, 1],
      [1, 0, 3, 2, 1, 1],
      [1, 0, 3, 2, 0, 1],
      [1, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 5, 0, 2, 1],
      [1, 0, 3, 0, 3, 0, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 5, 0, 1, 2, 0, 1],
      [1, 0, 3, 0, 3, 2, 1],
      [1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ]
  ];

  const [grid, setGrid] = useState(LEVELS[0]);

  const loadLevel = useCallback((lvlIndex) => {
    const freshGrid = LEVELS[lvlIndex].map(row => [...row]);
    setGrid(freshGrid);
    setMoves(0);
    setHistory([]);
    setIsWon(false);
  }, []);

  useEffect(() => {
    loadLevel(level);
  }, [level, loadLevel]);

  const movePlayer = useCallback((dr, dc) => {
    if (isWon) return;

    let pR = -1, pC = -1;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === 5 || grid[r][c] === 6) {
          pR = r;
          pC = c;
          break;
        }
      }
    }
    if (pR === -1) return;

    const nextR = pR + dr;
    const nextC = pC + dc;
    if (nextR < 0 || nextR >= grid.length || nextC < 0 || nextC >= grid[0].length) return;

    const targetCell = grid[nextR][nextC];
    if (targetCell === 1) return;

    const newGrid = grid.map(row => [...row]);

    if (targetCell === 0 || targetCell === 2) {
      newGrid[pR][pC] = newGrid[pR][pC] === 6 ? 2 : 0;
      newGrid[nextR][nextC] = targetCell === 2 ? 6 : 5;
      setHistory(h => [...h, grid]);
      setGrid(newGrid);
      setMoves(m => m + 1);
      soundFX.playClick();
    } else if (targetCell === 3 || targetCell === 4) {
      const beyondR = nextR + dr;
      const beyondC = nextC + dc;
      if (beyondR < 0 || beyondR >= grid.length || beyondC < 0 || beyondC >= grid[0].length) return;

      const beyondCell = grid[beyondR][beyondC];
      if (beyondCell === 0 || beyondCell === 2) {
        newGrid[beyondR][beyondC] = beyondCell === 2 ? 4 : 3;
        newGrid[nextR][nextC] = targetCell === 4 ? 6 : 5;
        newGrid[pR][pC] = newGrid[pR][pC] === 6 ? 2 : 0;
        setHistory(h => [...h, grid]);
        setGrid(newGrid);
        setMoves(m => m + 1);
        soundFX.playScore();

        let hasUnsorted = false;
        for (let r of newGrid) {
          for (let val of r) {
            if (val === 3) hasUnsorted = true;
          }
        }
        if (!hasUnsorted) {
          setIsWon(true);
          soundFX.playWin();
          confetti({ particleCount: 70 });
          onRewardXP?.(35);
        }
      }
    }
  }, [grid, isWon, onRewardXP]);

  const undoMove = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setGrid(last);
    setHistory(h => h.slice(0, -1));
    setMoves(m => Math.max(0, m - 1));
    soundFX.playClick();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); movePlayer(-1, 0); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); movePlayer(1, 0); }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); movePlayer(0, -1); }
      if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); movePlayer(0, 1); }
      if (e.code === 'KeyZ') undoMove();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [movePlayer]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-xl text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>📦 Silo Crate Sokoban</span>
          </h3>
          <p className="text-xs text-slate-500">Push crates onto yellow target markers</p>
        </div>
        <div className="flex gap-2 text-xs font-mono font-bold">
          <span className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded-lg">Lvl {level + 1}</span>
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg">Moves: {moves}</span>
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 inline-block shadow-inner">
        <div className="grid gap-1">
          {grid.map((row, r) => (
            <div key={r} className="flex gap-1 justify-center">
              {row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl font-bold ${
                    cell === 1
                      ? 'bg-slate-800 border border-slate-700'
                      : cell === 2
                      ? 'bg-amber-950/60 border border-amber-500/40 text-amber-400'
                      : cell === 3
                      ? 'bg-amber-700 border-2 border-amber-500 shadow-md'
                      : cell === 4
                      ? 'bg-emerald-600 border-2 border-emerald-400 shadow-lg'
                      : 'bg-slate-900'
                  }`}
                >
                  {cell === 5 || cell === 6 ? '👨‍🌾' : cell === 3 ? '📦' : cell === 4 ? '✅' : cell === 2 ? '🎯' : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          onClick={undoMove}
          disabled={history.length === 0}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 disabled:opacity-40"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span>Undo</span>
        </button>

        {isWon ? (
          <button
            onClick={() => setLevel(l => (l + 1) % LEVELS.length)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl shadow-md transition"
          >
            NEXT LEVEL ➔
          </button>
        ) : (
          <button
            onClick={() => loadLevel(level)}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200 text-slate-700 dark:text-slate-300"
          >
            Restart Level
          </button>
        )}
      </div>
    </div>
  );
}


// =========================================================================
// 11. SOLAR GRID: LIGHTS OUT
// =========================================================================
export function LightsOutGame({ onRewardXP }) {
  const SIZE = 5;
  const [grid, setGrid] = useState(Array(SIZE).fill(null).map(() => Array(SIZE).fill(false)));
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const generateSolvable = useCallback(() => {
    let newGrid = Array(SIZE).fill(null).map(() => Array(SIZE).fill(true));
    const randomClicks = Math.floor(Math.random() * 5) + 6;
    for (let i = 0; i < randomClicks; i++) {
      const r = Math.floor(Math.random() * SIZE);
      const c = Math.floor(Math.random() * SIZE);
      toggleNeighbors(newGrid, r, c);
    }
    setGrid(newGrid);
    setMoves(0);
    setIsWon(false);
  }, []);

  const toggleNeighbors = (b, r, c) => {
    const dr = [0, -1, 1, 0, 0];
    const dc = [0, 0, 0, -1, 1];
    for (let i = 0; i < 5; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
        b[nr][nc] = !b[nr][nc];
      }
    }
  };

  useEffect(() => {
    generateSolvable();
  }, [generateSolvable]);

  const handleCellClick = (r, c) => {
    if (isWon) return;
    soundFX.playClick();
    setMoves(m => m + 1);

    const newGrid = grid.map(row => [...row]);
    toggleNeighbors(newGrid, r, c);
    setGrid(newGrid);

    if (newGrid.every(row => row.every(cell => cell === true))) {
      setIsWon(true);
      soundFX.playWin();
      confetti({ particleCount: 80 });
      onRewardXP?.(25);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-xl text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>💡 Solar Grid: Lights Out</span>
          </h3>
          <p className="text-xs text-slate-500">Turn all solar inverters ON (Neon Green)</p>
        </div>
        <div className="text-xs font-mono font-bold text-emerald-500">
          Moves: {moves}
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 inline-block shadow-inner">
        <div className="grid grid-cols-5 gap-2">
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl transition-all transform active:scale-90 flex items-center justify-center font-bold ${
                  cell
                    ? 'bg-emerald-500 border border-emerald-300 shadow-lg shadow-emerald-500/40 text-emerald-950'
                    : 'bg-rose-950/80 border border-rose-800/40 text-rose-500 hover:border-rose-600'
                }`}
              >
                {cell ? '⚡' : '✖'}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          onClick={generateSolvable}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Puzzle</span>
        </button>

        {isWon && (
          <span className="text-xs font-extrabold text-emerald-500 animate-bounce">
            🎉 GRID 100% ONLINE! (+25 XP)
          </span>
        )}
      </div>
    </div>
  );
}
