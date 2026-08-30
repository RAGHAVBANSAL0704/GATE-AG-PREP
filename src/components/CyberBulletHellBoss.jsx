import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Zap, Shield, Trophy, Flame, Volume2, Sparkles, Crosshair, ArrowLeft, Heart, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCyberSound } from '../utils/cyberBreakSound';

// EPIC CYBER ARCADE BOSSES - PURE JOY & ACTION
const BOSSES = [
  {
    id: 'kraken',
    name: 'Cybernetic Neon Kraken',
    title: 'Abyssal Pulse Destroyer',
    maxHp: 2000,
    color: '#06b6d4',
    secondaryColor: '#3b82f6',
    icon: '🐙',
    quote: 'Dodge my radial neon plasma spirals!',
  },
  {
    id: 'colossus',
    name: 'Mecha Cyber Titan',
    title: 'Armored Siege Colossus',
    maxHp: 2500,
    color: '#f59e0b',
    secondaryColor: '#d97706',
    icon: '🤖',
    quote: 'My armor core can withstand any frontal barrage!',
  },
  {
    id: 'atomizer',
    name: 'Plasma Overlord Mech',
    title: 'Quantum Velocity Ruler',
    maxHp: 3000,
    color: '#a855f7',
    secondaryColor: '#ec4899',
    icon: '🛸',
    quote: 'Prepare for high-density particle swarms!',
  },
  {
    id: 'monster',
    name: 'Inferno Cosmic Dragon',
    title: 'Solar Flare Sovereign',
    maxHp: 3500,
    color: '#ef4444',
    secondaryColor: '#f97316',
    icon: '🐲',
    quote: 'Can you survive the hyper nova bullet hell?',
  }
];

export default function CyberBulletHellBoss({ breakXP, onAddXP, activeVehicle = 'Cyber Tractor Mk-IV', mutators = [] }) {
  const [currentBossIndex, setCurrentBossIndex] = useState(0);
  const [gameState, setGameState] = useState('menu'); // menu, playing, overdrive, victory, defeat
  const [playerHp, setPlayerHp] = useState(100);
  const [maxPlayerHp, setMaxPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(BOSSES[0].maxHp);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [superLaserActive, setSuperLaserActive] = useState(false);
  const [overdriveEnergy, setOverdriveEnergy] = useState(0); // 0 to 100%

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Game Engine State stored in Ref for 60fps performance without re-render lag
  const engineRef = useRef({
    player: { x: 300, y: 500, vx: 0, vy: 0, radius: 18, speed: 6 },
    boss: { x: 300, y: 120, vx: 3, hp: BOSSES[0].maxHp, maxHp: BOSSES[0].maxHp, radius: 50, phaseTime: 0 },
    playerBullets: [],
    bossBullets: [],
    particles: [],
    floatingTexts: [],
    shakeTime: 0,
    lastShootTime: 0,
    keys: {}
  });

  const activeBoss = BOSSES[currentBossIndex];

  // Apply mutators / vehicle stats
  useEffect(() => {
    let hpMultiplier = 1;
    if (mutators.includes('shield')) hpMultiplier = 1.5;
    if (activeVehicle.includes('Titan')) hpMultiplier = 2;
    const computedMax = Math.round(100 * hpMultiplier);
    setMaxPlayerHp(computedMax);
    setPlayerHp(computedMax);
  }, [activeVehicle, mutators]);

  // Start Battle
  const startBattle = (bossIdx = currentBossIndex) => {
    setCurrentBossIndex(bossIdx);
    const b = BOSSES[bossIdx];

    engineRef.current = {
      player: { x: 300, y: 520, vx: 0, vy: 0, radius: 18, speed: mutators.includes('speed') ? 8 : 6 },
      boss: { x: 300, y: 120, vx: 2.5, hp: b.maxHp, maxHp: b.maxHp, radius: 55, phaseTime: 0 },
      playerBullets: [],
      bossBullets: [],
      particles: [],
      floatingTexts: [],
      shakeTime: 0,
      lastShootTime: 0,
      keys: {}
    };

    setBossHp(b.maxHp);
    setPlayerHp(maxPlayerHp);
    setOverdriveEnergy(0);
    setGameState('playing');
    playCyberSound('powerup');
  };

  // Trigger Overdrive Super Laser Blast
  const triggerOverdrive = useCallback(() => {
    if (superLaserActive) return;
    setSuperLaserActive(true);
    setOverdriveEnergy(0);
    setStreak(prev => prev + 1);
    playCyberSound('powerup');
    onAddXP(50);

    // Deal massive burst damage to boss
    engineRef.current.boss.hp -= 450;
    engineRef.current.shakeTime = 25;

    // Clear nearby boss bullets for safety
    engineRef.current.bossBullets = [];

    // Spawn huge explosion debris
    for (let i = 0; i < 40; i++) {
      engineRef.current.particles.push({
        x: engineRef.current.boss.x,
        y: engineRef.current.boss.y,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16,
        life: 45,
        maxLife: 45,
        color: '#38bdf8',
        radius: Math.random() * 8 + 3
      });
    }

    setTimeout(() => {
      setSuperLaserActive(false);
    }, 2800);
  }, [superLaserActive, onAddXP]);

  // Keyboard Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      engineRef.current.keys[e.key.toLowerCase()] = true;

      // Spacebar triggers Overdrive
      if (e.code === 'Space') {
        e.preventDefault();
        triggerOverdrive();
      }
    };

    const handleKeyUp = (e) => {
      engineRef.current.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, triggerOverdrive]);

  // Main 60 FPS Canvas Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const updateAndRender = () => {
      const state = engineRef.current;
      const { player, boss } = state;

      // Handle Screen Shake
      if (state.shakeTime > 0) {
        state.shakeTime--;
      }

      // Clear Canvas with cyber gradient dark backdrop
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Animated Grid Background lines
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.25)';
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let x = 0; x < canvas.width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.save();
      if (state.shakeTime > 0) {
        ctx.translate((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
      }

      // --- 1. PLAYER MOVEMENT ---
      let dx = 0;
      let dy = 0;
      if (state.keys['a'] || state.keys['arrowleft']) dx -= 1;
      if (state.keys['d'] || state.keys['arrowright']) dx += 1;
      if (state.keys['w'] || state.keys['arrowup']) dy -= 1;
      if (state.keys['s'] || state.keys['arrowdown']) dy += 1;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x + dx * player.speed));
      player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y + dy * player.speed));

      // Auto Fire Player Lasers
      const now = Date.now();
      const fireInterval = superLaserActive ? 70 : 160;
      if (now - state.lastShootTime > fireInterval) {
        state.lastShootTime = now;
        playCyberSound('laser');

        if (superLaserActive) {
          // Hyper Spread Super Barrage
          [-0.35, -0.18, 0, 0.18, 0.35].forEach(angle => {
            state.playerBullets.push({
              x: player.x,
              y: player.y - player.radius,
              vx: Math.sin(angle) * 15,
              vy: -Math.cos(angle) * 15,
              damage: 40,
              color: '#38bdf8'
            });
          });
        } else {
          // Standard Dual / Triple Lasers
          const isMulti = mutators.includes('quad');
          if (isMulti) {
            [-0.15, 0, 0.15].forEach(angle => {
              state.playerBullets.push({
                x: player.x,
                y: player.y - player.radius,
                vx: Math.sin(angle) * 12,
                vy: -Math.cos(angle) * 12,
                damage: 25,
                color: '#22c55e'
              });
            });
          } else {
            state.playerBullets.push({
              x: player.x - 8,
              y: player.y - player.radius,
              vx: 0,
              vy: -12,
              damage: 22,
              color: '#38bdf8'
            });
            state.playerBullets.push({
              x: player.x + 8,
              y: player.y - player.radius,
              vx: 0,
              vy: -12,
              damage: 22,
              color: '#38bdf8'
            });
          }
        }
      }

      // --- 2. BOSS MOVEMENT & BULLET PATTERNS ---
      boss.phaseTime += 0.035;
      boss.x += boss.vx;
      if (boss.x < boss.radius + 20 || boss.x > canvas.width - boss.radius - 20) {
        boss.vx *= -1;
      }

      // Boss Bullet Spawning
      if (Math.random() < 0.08) {
        const pType = Math.floor(Math.random() * 3);
        if (pType === 0) {
          // Radial Spiral
          const count = 8;
          for (let i = 0; i < count; i++) {
            const angle = (i * Math.PI * 2) / count + boss.phaseTime;
            state.bossBullets.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(angle) * 4.2,
              vy: Math.sin(angle) * 4.2,
              color: activeBoss.color,
              radius: 5
            });
          }
        } else if (pType === 1) {
          // Direct Aimed Shot
          const angle = Math.atan2(player.y - boss.y, player.x - boss.x);
          state.bossBullets.push({
            x: boss.x,
            y: boss.y,
            vx: Math.cos(angle) * 6,
            vy: Math.sin(angle) * 6,
            color: activeBoss.secondaryColor,
            radius: 7
          });
        }
      }

      // Charge Overdrive gradually over time
      setOverdriveEnergy(prev => Math.min(100, prev + 0.15));

      // --- 3. UPDATE PLAYER BULLETS & HIT DETECTION ---
      for (let i = state.playerBullets.length - 1; i >= 0; i--) {
        const pb = state.playerBullets[i];
        pb.x += pb.vx;
        pb.y += pb.vy;

        // Check Hit Boss
        const dist = Math.hypot(pb.x - boss.x, pb.y - boss.y);
        if (dist < boss.radius) {
          boss.hp -= pb.damage;
          setBossHp(Math.max(0, boss.hp));
          playCyberSound('bossHit');

          // Floating damage
          state.floatingTexts.push({
            x: pb.x,
            y: pb.y,
            text: `-${pb.damage}`,
            life: 25,
            color: '#fbbf24'
          });

          // Particles
          for (let p = 0; p < 4; p++) {
            state.particles.push({
              x: pb.x,
              y: pb.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              life: 15,
              maxLife: 15,
              color: pb.color,
              radius: Math.random() * 3 + 1
            });
          }

          state.playerBullets.splice(i, 1);
          continue;
        }

        // Out of screen
        if (pb.y < -20 || pb.x < -20 || pb.x > canvas.width + 20) {
          state.playerBullets.splice(i, 1);
        }
      }

      // --- 4. UPDATE BOSS BULLETS & HIT PLAYER ---
      for (let i = state.bossBullets.length - 1; i >= 0; i--) {
        const bb = state.bossBullets[i];
        bb.x += bb.vx;
        bb.y += bb.vy;

        // Check Hit Player
        const dist = Math.hypot(bb.x - player.x, bb.y - player.y);
        if (dist < player.radius + bb.radius) {
          playCyberSound('explosion');
          setPlayerHp(prev => {
            const nextHp = prev - 8;
            if (nextHp <= 0) {
              setGameState('defeat');
            }
            return Math.max(0, nextHp);
          });

          state.shakeTime = 10;
          state.bossBullets.splice(i, 1);
          continue;
        }

        // Out of bounds
        if (bb.y > canvas.height + 20 || bb.x < -20 || bb.x > canvas.width + 20) {
          state.bossBullets.splice(i, 1);
        }
      }

      // Check Boss Victory
      if (boss.hp <= 0) {
        playCyberSound('bossDefeat');
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        onAddXP(300);
        setScore(prev => prev + 500);
        setGameState('victory');
        return;
      }

      // --- 5. RENDER GAME OBJECTS ---

      // Render Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (p.life <= 0) state.particles.splice(i, 1);
      }

      // Render Boss
      ctx.shadowBlur = 20;
      ctx.shadowColor = activeBoss.color;
      ctx.fillStyle = activeBoss.color;
      ctx.beginPath();
      ctx.arc(boss.x, boss.y, boss.radius, 0, Math.PI * 2);
      ctx.fill();

      // Boss Icon Label
      ctx.shadowBlur = 0;
      ctx.font = '28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(activeBoss.icon, boss.x, boss.y);

      // Render Player Vehicle
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#38bdf8';
      ctx.fillStyle = superLaserActive ? '#fbbf24' : '#0284c7';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.font = '18px sans-serif';
      ctx.fillText('🚜', player.x, player.y);

      // Render Player Bullets
      ctx.fillStyle = superLaserActive ? '#fbbf24' : '#38bdf8';
      state.playerBullets.forEach(pb => {
        ctx.beginPath();
        ctx.arc(pb.x, pb.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Boss Bullets
      state.bossBullets.forEach(bb => {
        ctx.fillStyle = bb.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = bb.color;
        ctx.beginPath();
        ctx.arc(bb.x, bb.y, bb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render Floating Damage Texts
      for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
        const ft = state.floatingTexts[i];
        ft.y -= 1;
        ft.life--;
        ctx.fillStyle = ft.color;
        ctx.font = 'bold 14px monospace';
        ctx.fillText(ft.text, ft.x, ft.y);
        if (ft.life <= 0) state.floatingTexts.splice(i, 1);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(updateAndRender);
    };

    animationFrameId = requestAnimationFrame(updateAndRender);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, activeBoss, mutators, superLaserActive, onAddXP]);

  return (
    <div className="relative w-full bg-slate-950 border border-cyan-500/30 rounded-2xl p-4 shadow-2xl overflow-hidden text-white font-sans">

      {/* HEADER HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 bg-slate-900/80 p-3 rounded-xl border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{activeBoss.icon}</span>
          <div>
            <h2 className="font-extrabold text-lg text-cyan-400 flex items-center gap-2">
              {activeBoss.name}
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {activeBoss.title}
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono italic">{activeBoss.quote}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase font-mono block">Vehicle Armor</span>
            <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/40">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-400 transition-all duration-200"
                style={{ width: `${(playerHp / maxPlayerHp) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{playerHp} / {maxPlayerHp} HP</span>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase font-mono block">Boss Core</span>
            <div className="w-40 h-3 bg-slate-800 rounded-full overflow-hidden border border-rose-500/40">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-rose-600 transition-all duration-200"
                style={{ width: `${(bossHp / activeBoss.maxHp) * 100}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-rose-400">{bossHp} / {activeBoss.maxHp} HP</span>
          </div>
        </div>
      </div>

      {/* BOSS SELECTION STAGE BANNER */}
      {gameState === 'menu' && (
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-xl p-6 text-center max-w-2xl mx-auto my-6">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 rounded-full border border-cyan-400/40 mb-3 text-cyan-300">
            <Crosshair className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
            CYBER BULLET-HELL ARENA 🕹️
          </h3>
          <p className="text-sm text-slate-300 mt-2 mb-6">
            Dodge neon plasma spirals, unleash hyper super-lasers, and conquer high-octane cyber bosses!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {BOSSES.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setCurrentBossIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  currentBossIndex === idx
                    ? 'border-cyan-400 bg-cyan-950/60 shadow-lg shadow-cyan-500/20'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <h4 className="font-bold text-sm text-white">{b.name}</h4>
                  <span className="text-xs text-cyan-400 font-mono">{b.title}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => startBattle()}
            className="w-full py-3.5 rounded-xl font-extrabold text-base bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" /> ENGAGE BOSS FIGHT (+300 XP)
          </button>
        </div>
      )}

      {/* GAMEPLAY CANVAS */}
      {gameState === 'playing' && (
        <div className="relative flex flex-col items-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={580}
            className="border border-cyan-500/40 rounded-xl shadow-inner bg-slate-950 touch-none max-w-full"
          />

          {/* OVERDRIVE BUTTON & CONTROLS HUD */}
          <div className="w-full max-w-[600px] flex items-center justify-between gap-3 mt-3 px-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>WASD / Arrow Keys to Move</span>
              <span>•</span>
              <span>Spacebar to Fire Overdrive</span>
            </div>

            <button
              onClick={triggerOverdrive}
              className={`px-4 py-2 rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow-lg ${
                overdriveEnergy >= 100 || superLaserActive
                  ? 'bg-amber-400 text-slate-950 animate-pulse hover:bg-amber-300'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{superLaserActive ? '🔥 SUPER LASER ACTIVE!' : '⚡ HYPER OVERDRIVE'}</span>
            </button>
          </div>

          {/* TOUCH CONTROL OVERLAY FOR MOBILE */}
          <div className="w-full max-w-[600px] mt-4 flex justify-between items-center opacity-80 sm:hidden">
            <div className="grid grid-cols-3 gap-2 w-36">
              <div />
              <button
                onTouchStart={() => (engineRef.current.keys['w'] = true)}
                onTouchEnd={() => (engineRef.current.keys['w'] = false)}
                className="bg-cyan-900/80 p-3 rounded-lg border border-cyan-400 text-center font-bold"
              >
                ▲
              </button>
              <div />
              <button
                onTouchStart={() => (engineRef.current.keys['a'] = true)}
                onTouchEnd={() => (engineRef.current.keys['a'] = false)}
                className="bg-cyan-900/80 p-3 rounded-lg border border-cyan-400 text-center font-bold"
              >
                ◀
              </button>
              <button
                onTouchStart={() => (engineRef.current.keys['s'] = true)}
                onTouchEnd={() => (engineRef.current.keys['s'] = false)}
                className="bg-cyan-900/80 p-3 rounded-lg border border-cyan-400 text-center font-bold"
              >
                ▼
              </button>
              <button
                onTouchStart={() => (engineRef.current.keys['d'] = true)}
                onTouchEnd={() => (engineRef.current.keys['d'] = false)}
                className="bg-cyan-900/80 p-3 rounded-lg border border-cyan-400 text-center font-bold"
              >
                ▶
              </button>
            </div>
            <button
              onClick={triggerOverdrive}
              className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black px-4 py-3 rounded-xl shadow-lg border border-amber-300"
            >
              ⚡ OVERDRIVE
            </button>
          </div>
        </div>
      )}

      {/* VICTORY OVERLAY */}
      {gameState === 'victory' && (
        <div className="bg-slate-900/90 border border-emerald-500/60 rounded-xl p-6 text-center max-w-md mx-auto my-8">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-2xl font-black text-emerald-400">BOSS DEFEATED! 🏆</h3>
          <p className="text-sm text-slate-300 my-2">You shattered {activeBoss.name} with flawless arcade dodging!</p>
          <div className="text-lg font-mono font-bold text-yellow-300 mb-6">+300 BREAK XP EARNED!</div>
          <div className="flex gap-3">
            <button
              onClick={() => startBattle((currentBossIndex + 1) % BOSSES.length)}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white shadow-lg"
            >
              NEXT BOSS
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 font-bold rounded-xl text-slate-300"
            >
              ARENA MENU
            </button>
          </div>
        </div>
      )}

      {/* DEFEAT OVERLAY */}
      {gameState === 'defeat' && (
        <div className="bg-slate-900/90 border border-rose-500/60 rounded-xl p-6 text-center max-w-md mx-auto my-8">
          <div className="text-4xl mb-2">💥</div>
          <h3 className="text-2xl font-black text-rose-400">VEHICLE DESTROYED!</h3>
          <p className="text-sm text-slate-300 my-2">{activeBoss.name} overwhelmed your defense shield.</p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => startBattle()}
              className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 font-bold rounded-xl text-white shadow-lg"
            >
              RETRY BOSS FIGHT
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 font-bold rounded-xl text-slate-300"
            >
              ARENA MENU
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
