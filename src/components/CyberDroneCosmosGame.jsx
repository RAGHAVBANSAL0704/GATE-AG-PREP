import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  RotateCcw, 
  Pause, 
  Volume2, 
  VolumeX, 
  Shield, 
  Zap, 
  Trophy, 
  Flame, 
  Crosshair, 
  Sparkles,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Bomb,
  Rocket,
  Radio,
  Target,
  Award,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ====================================================================
// AAA RETRO-MODERN SYNTHESIZER AUDIO ENGINE (ZERO EXTERNAL MP3s)
// ====================================================================
class SuperWarshipAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    try {
      this.muted = localStorage.getItem('super_warship_audio_muted') === 'true';
    } catch (e) {
      this.muted = false;
    }
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('super_warship_audio_muted', this.muted.toString());
    } catch (e) {}
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // 1. Plasma Pulse Cannon (Crisp punchy laser with harmonics)
  playLaser(powerLevel = 1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    const baseFreq = 880 + powerLevel * 80;
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(140, now + 0.08);

    osc2.frequency.setValueAtTime(baseFreq * 0.5, now);
    osc2.frequency.exponentialRampToValueAtTime(70, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.08);
    osc2.stop(now + 0.08);
  }

  // 2. Micro-Missile Launch Whoosh
  playMissileLaunch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(680, now + 0.14);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  // 3. Enemy Plasma Burst
  playEnemyFire() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.11);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  // 4. Punchy Deep Explosions with Sub-Bass Rumble
  playExplosion(intensity = 1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const dur = Math.min(1.5, 0.4 * intensity);

    // Sub-bass hit
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + dur);
    subGain.gain.setValueAtTime(0.35 * Math.min(1.5, intensity), now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + dur);

    // Noise rumble
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.exponentialRampToValueAtTime(40, now + dur);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.28 * Math.min(1.5, intensity), now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
    noise.stop(now + dur);
  }

  // 5. Warp Speed Afterburner Boost
  playWarpBoost() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.3);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // 6. Power-Up Fanfare Chime
  playPowerup() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.18, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.2);
    });
  }

  // 7. Screen-Clearing EMP Nova Bomb
  playNovaBomb() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.linearRampToValueAtTime(1800, now + 0.45);
    osc.frequency.exponentialRampToValueAtTime(30, now + 1.0);

    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.0);
  }

  // 8. Warning Klaxon
  playBossAlert() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(587.33, now + i * 0.22);
      osc.frequency.setValueAtTime(440.0, now + i * 0.22 + 0.11);

      gain.gain.setValueAtTime(0.22, now + i * 0.22);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.22 + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.22);
      osc.stop(now + i * 0.22 + 0.2);
    }
  }
}

const audio = new SuperWarshipAudioEngine();

// ====================================================================
// MASTER-TIER VERTICAL SCROLLING SPACE WARSHIP SHMUP
// ====================================================================
export default function CyberDroneCosmosGame({ onRewardXP, onBack }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // HUD and Live Telemetry
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'paused', 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const s = localStorage.getItem('master_warship_highscore');
      return s ? parseInt(s, 10) : 0;
    } catch (e) {
      return 0;
    }
  });
  const [wave, setWave] = useState(1);
  const [hullHp, setHullHp] = useState(100);
  const [shieldEnergy, setShieldEnergy] = useState(100);
  const [boostEnergy, setBoostEnergy] = useState(100);
  const [weaponLevel, setWeaponLevel] = useState(1);
  const [hasWingmen, setHasWingmen] = useState(false);
  const [bombs, setBombs] = useState(2);
  const [combo, setCombo] = useState(0);
  const [isMuted, setIsMuted] = useState(() => audio.isMuted());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bossActive, setBossActive] = useState(false);
  const [bossHpPercent, setBossHpPercent] = useState(100);
  const [announcement, setAnnouncement] = useState('');

  // Core 60fps Game Engine State Ref
  const engineRef = useRef({
    player: {
      x: 320,
      y: 560,
      vx: 0,
      vy: 0,
      tilt: 0,
      speed: 7.2,
      hp: 100,
      maxHp: 100,
      shield: 100,
      maxShield: 100,
      boost: 100,
      maxBoost: 100,
      weaponLevel: 1, // 1: Dual, 2: Triple, 3: Quad Spread, 4: Overdrive Plasma
      hasWingmen: false,
      missileCooldown: 0,
      bombs: 2,
      isBoosting: false,
      invulnerableTimer: 60,
      ghostTrails: []
    },
    keys: {},
    mouse: { x: 320, y: 560, isDown: false },
    touchDrag: { active: false, x: 320, y: 560 },
    starfield: [],
    nebulae: [],
    bullets: [],
    missiles: [],
    enemyBullets: [],
    enemies: [],
    asteroids: [],
    powerups: [],
    particles: [],
    novaRings: [],
    floatingTexts: [],
    boss: null,
    scrollSpeed: 5.0,
    lastShotTime: 0,
    spawnTimer: 0,
    asteroidTimer: 0,
    combo: 0,
    comboTimer: 0,
    nextBossScore: 1500,
    screenShake: 0,
    flashWhite: 0,
    score: 0,
    wave: 1
  });

  const toggleMute = () => {
    const m = audio.toggleMute();
    setIsMuted(m);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Helper trigger announcement banner
  const triggerAnnouncement = (text) => {
    setAnnouncement(text);
    setTimeout(() => setAnnouncement(''), 2400);
  };

  // Initialize Game World
  const initGame = (canvas) => {
    const w = canvas.width;
    const h = canvas.height;

    // 1. Multi-Layer Starfield
    const starfield = [];
    for (let i = 0; i < 180; i++) {
      starfield.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2.2 + 0.6,
        speed: Math.random() * 3.5 + 1.2,
        color: ['#ffffff', '#38bdf8', '#c084fc', '#facc15', '#a7f3d0'][Math.floor(Math.random() * 5)],
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    // 2. Nebula Cosmic Cloud Coordinates
    const nebulae = [
      { x: w * 0.25, y: h * 0.3, radius: 180, color: 'rgba(56, 189, 248, 0.08)' },
      { x: w * 0.75, y: h * 0.7, radius: 220, color: 'rgba(168, 85, 247, 0.09)' },
      { x: w * 0.5, y: h * 0.9, radius: 160, color: 'rgba(244, 63, 94, 0.07)' }
    ];

    engineRef.current = {
      player: {
        x: w / 2,
        y: h - 100,
        vx: 0,
        vy: 0,
        tilt: 0,
        speed: 7.2,
        hp: 100,
        maxHp: 100,
        shield: 100,
        maxShield: 100,
        boost: 100,
        maxBoost: 100,
        weaponLevel: 1,
        hasWingmen: false,
        missileCooldown: 0,
        bombs: 2,
        isBoosting: false,
        invulnerableTimer: 60,
        ghostTrails: []
      },
      keys: {},
      mouse: { x: w / 2, y: h - 100, isDown: false },
      touchDrag: { active: false, x: w / 2, y: h - 100 },
      starfield,
      nebulae,
      bullets: [],
      missiles: [],
      enemyBullets: [],
      enemies: [],
      asteroids: [],
      powerups: [],
      particles: [],
      novaRings: [],
      floatingTexts: [],
      boss: null,
      scrollSpeed: 5.0,
      lastShotTime: 0,
      spawnTimer: 0,
      asteroidTimer: 0,
      combo: 0,
      comboTimer: 0,
      nextBossScore: 1500,
      screenShake: 0,
      flashWhite: 0,
      score: 0,
      wave: 1
    };

    setScore(0);
    setWave(1);
    setHullHp(100);
    setShieldEnergy(100);
    setBoostEnergy(100);
    setWeaponLevel(1);
    setHasWingmen(false);
    setBombs(2);
    setCombo(0);
    setBossActive(false);
  };

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    initGame(canvas);
    setGameState('playing');
    triggerAnnouncement('STAGE 1 • DEEP SPACE SORTIE');
    audio.playWarpBoost();
  };

  const resumeGame = () => setGameState('playing');
  const pauseGame = () => setGameState(prev => prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev);

  // Deploy Screen-Clearing EMP Nova Bomb
  const triggerNovaBomb = useCallback(() => {
    const state = engineRef.current;
    if (state.player.bombs <= 0) return;
    state.player.bombs--;
    setBombs(state.player.bombs);

    audio.playNovaBomb();
    state.screenShake = 25;
    state.flashWhite = 10;

    // Expanding Dual Chromatic Rings
    state.novaRings.push({ x: state.player.x, y: state.player.y, radius: 10, maxRadius: 750, speed: 28, opacity: 1, color: '#38bdf8' });
    state.novaRings.push({ x: state.player.x, y: state.player.y, radius: 5, maxRadius: 650, speed: 22, opacity: 1, color: '#f43f5e' });

    // Destroy all enemy bullets instantly
    state.enemyBullets = [];

    // Wipe normal enemies and heavily damage bosses/asteroids
    state.enemies.forEach(e => {
      e.hp -= 300;
    });
    state.asteroids.forEach(a => {
      a.hp -= 200;
    });
    if (state.boss) {
      state.boss.hp -= 500;
    }
  }, []);

  // Fire Upward Weapons (Dual / Triple / Quad / Wingmen / Homing Missiles)
  const fireWeapons = useCallback(() => {
    const state = engineRef.current;
    const now = Date.now();
    const fireInterval = state.player.isBoosting ? 80 : 120;
    if (now - state.lastShotTime < fireInterval) return;
    state.lastShotTime = now;

    const p = state.player;
    const lvl = p.weaponLevel;
    audio.playLaser(lvl);

    const bSpeed = 18;

    if (lvl === 1) {
      // Twin Heavy Plasma Bolts
      state.bullets.push({ x: p.x - 14, y: p.y - 24, vx: 0, vy: -bSpeed, color: '#38bdf8', damage: 30, w: 5, h: 20 });
      state.bullets.push({ x: p.x + 14, y: p.y - 24, vx: 0, vy: -bSpeed, color: '#38bdf8', damage: 30, w: 5, h: 20 });
    } else if (lvl === 2) {
      // Triple Plasma Cannons
      state.bullets.push({ x: p.x, y: p.y - 28, vx: 0, vy: -bSpeed - 2, color: '#06b6d4', damage: 38, w: 6, h: 24 });
      state.bullets.push({ x: p.x - 18, y: p.y - 20, vx: -1.4, vy: -bSpeed, color: '#38bdf8', damage: 30, w: 5, h: 20 });
      state.bullets.push({ x: p.x + 18, y: p.y - 20, vx: 1.4, vy: -bSpeed, color: '#38bdf8', damage: 30, w: 5, h: 20 });
    } else if (lvl === 3) {
      // Quad Spread Kinetic Railgun
      [-3, -1, 1, 3].forEach(offset => {
        state.bullets.push({
          x: p.x + offset * 8,
          y: p.y - 22,
          vx: offset * 1.2,
          vy: -bSpeed,
          color: '#facc15',
          damage: 35,
          w: 6,
          h: 22
        });
      });
    } else {
      // Level 4: Overdrive Hyper-Plasma 5-Beam Barrage
      [-4, -2, 0, 2, 4].forEach(offset => {
        state.bullets.push({
          x: p.x + offset * 9,
          y: p.y - 26,
          vx: offset * 1.6,
          vy: -bSpeed - 2,
          color: '#c084fc',
          damage: 45,
          w: 7,
          h: 26
        });
      });
    }

    // Wingmen Support Drones Fire
    if (p.hasWingmen) {
      state.bullets.push({ x: p.x - 38, y: p.y - 10, vx: -0.5, vy: -bSpeed, color: '#a7f3d0', damage: 20, w: 4, h: 16 });
      state.bullets.push({ x: p.x + 38, y: p.y - 10, vx: 0.5, vy: -bSpeed, color: '#a7f3d0', damage: 20, w: 4, h: 16 });
    }

    // Auto Homing Micro-Missile Pods (Fires every 450ms)
    p.missileCooldown++;
    if (p.missileCooldown >= 4 && state.enemies.length > 0) {
      p.missileCooldown = 0;
      audio.playMissileLaunch();
      state.missiles.push({
        x: p.x - 22,
        y: p.y,
        vx: -3,
        vy: -6,
        target: state.enemies[0],
        damage: 60,
        life: 70
      });
      state.missiles.push({
        x: p.x + 22,
        y: p.y,
        vx: 3,
        vy: -6,
        target: state.enemies[state.enemies.length - 1],
        damage: 60,
        life: 70
      });
    }
  }, []);

  // Keyboard and Input Handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      engineRef.current.keys[e.code] = true;
      if (e.code === 'KeyP' || e.code === 'Escape') pauseGame();
      if (gameState === 'playing') {
        if (e.code === 'KeyB' || e.code === 'KeyE') triggerNovaBomb();
      }
    };

    const handleKeyUp = (e) => {
      engineRef.current.keys[e.code] = false;
    };

    const handleMouseMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      engineRef.current.mouse.x = (e.clientX - rect.left) * scaleX;
      engineRef.current.mouse.y = (e.clientY - rect.top) * scaleY;
    };

    const handleMouseDown = (e) => {
      if (gameState !== 'playing') return;
      if (e.button === 0) engineRef.current.mouse.isDown = true;
      if (e.button === 2) {
        e.preventDefault();
        triggerNovaBomb();
      }
    };

    const handleMouseUp = (e) => {
      if (e.button === 0) engineRef.current.mouse.isDown = false;
    };

    const handleContextMenu = (e) => e.preventDefault();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [gameState, triggerNovaBomb]);

  // Main 60 FPS Canvas Game Engine Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const updateAndRender = () => {
      const state = engineRef.current;
      const { player, keys, mouse, touchDrag } = state;
      const width = canvas.width;
      const height = canvas.height;

      // ----------------------------------------------------
      // 1. PLAYER WARSHIP MOVEMENT & WARP SPEED AFTERBURNER
      // ----------------------------------------------------
      const isBoosting = (keys['ShiftLeft'] || keys['ShiftRight'] || keys['Space']) && player.boost > 5;
      player.isBoosting = isBoosting;

      if (isBoosting) {
        player.boost = Math.max(0, player.boost - 0.75);
        state.scrollSpeed = 9.5; // Starfield turbo warp!
        audio.playWarpBoost();

        // Ghost Speed Motion Blur Trail
        player.ghostTrails.push({ x: player.x, y: player.y, tilt: player.tilt, alpha: 0.6 });

        // Turbo Exhaust Flames
        for (let p = 0; p < 5; p++) {
          state.particles.push({
            x: player.x + (Math.random() - 0.5) * 18,
            y: player.y + 26,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 10 + 8,
            radius: Math.random() * 6 + 2,
            color: Math.random() > 0.4 ? '#38bdf8' : '#f59e0b',
            life: 25,
            maxLife: 25
          });
        }
      } else {
        player.boost = Math.min(player.maxBoost, player.boost + 0.35);
        state.scrollSpeed = 5.0;

        // Normal Twin Thruster Flames
        [-8, 8].forEach(off => {
          state.particles.push({
            x: player.x + off + (Math.random() - 0.5) * 4,
            y: player.y + 24,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 5 + 4,
            radius: Math.random() * 3 + 1,
            color: '#06b6d4',
            life: 18,
            maxLife: 18
          });
        });
      }

      // Update ghost trails
      for (let g = player.ghostTrails.length - 1; g >= 0; g--) {
        player.ghostTrails[g].alpha -= 0.08;
        if (player.ghostTrails[g].alpha <= 0) player.ghostTrails.splice(g, 1);
      }

      // Movement & Banking Tilt
      let moveSpeed = isBoosting ? player.speed * 1.55 : player.speed;
      let targetTilt = 0;

      if (touchDrag.active) {
        player.x += (touchDrag.x - player.x) * 0.28;
        player.y += (touchDrag.y - player.y) * 0.28;
      } else {
        let dx = 0;
        let dy = 0;
        if (keys['KeyA'] || keys['ArrowLeft']) { dx -= 1; targetTilt = -0.35; }
        if (keys['KeyD'] || keys['ArrowRight']) { dx += 1; targetTilt = 0.35; }
        if (keys['KeyW'] || keys['ArrowUp']) dy -= 1;
        if (keys['KeyS'] || keys['ArrowDown']) dy += 1;

        if (dx !== 0 && dy !== 0) {
          dx *= 0.7071;
          dy *= 0.7071;
        }

        player.x += dx * moveSpeed;
        player.y += dy * moveSpeed;
      }

      player.tilt += (targetTilt - player.tilt) * 0.2;

      // Clamping boundaries
      player.x = Math.max(28, Math.min(width - 28, player.x));
      player.y = Math.max(35, Math.min(height - 35, player.y));

      // Regenerate Shield & Invulnerability
      player.shield = Math.min(player.maxShield, player.shield + 0.07);
      if (player.invulnerableTimer > 0) player.invulnerableTimer--;

      // Combo Timer decay
      if (state.comboTimer > 0) {
        state.comboTimer--;
        if (state.comboTimer === 0) {
          state.combo = 0;
          setCombo(0);
        }
      }

      // Continuous Autofire (Upward Direction)
      fireWeapons();

      // ----------------------------------------------------
      // 2. ENEMY SQUADRONS & ATTACK WAVES
      // ----------------------------------------------------
      state.spawnTimer++;
      if (state.spawnTimer > 40 && !state.boss) {
        state.spawnTimer = 0;
        const eType = Math.random() < 0.25 ? 'cruiser' : Math.random() < 0.5 ? 'raider' : 'viper';

        if (eType === 'viper') {
          // Viper Squadron (Swooping Sine-Wave)
          const startX = Math.random() * (width - 140) + 70;
          state.enemies.push({
            x: startX,
            y: -35,
            baseX: startX,
            phase: Math.random() * Math.PI * 2,
            vy: Math.random() * 2.2 + 2.8,
            hp: 35,
            maxHp: 35,
            w: 36,
            h: 36,
            type: 'viper',
            color: '#f43f5e',
            hitFlash: 0
          });
        } else if (eType === 'raider') {
          // Fast dive-bombing raider
          state.enemies.push({
            x: Math.random() * (width - 100) + 50,
            y: -40,
            baseX: 0,
            phase: 0,
            vy: 5.2,
            hp: 75,
            maxHp: 75,
            w: 42,
            h: 44,
            type: 'raider',
            color: '#fbbf24',
            hitFlash: 0
          });
        } else {
          // Heavy Assault Cruiser
          state.enemies.push({
            x: Math.random() * (width - 180) + 90,
            y: -60,
            baseX: 0,
            phase: 0,
            vx: Math.random() > 0.5 ? 1.4 : -1.4,
            vy: 1.6,
            hp: 200,
            maxHp: 200,
            w: 64,
            h: 58,
            type: 'cruiser',
            color: '#c084fc',
            hitFlash: 0
          });
        }
      }

      // ----------------------------------------------------
      // 3. FALLING CELESTIAL ASTEROIDS
      // ----------------------------------------------------
      state.asteroidTimer++;
      if (state.asteroidTimer > 85) {
        state.asteroidTimer = 0;
        const r = Math.random() * 22 + 18;
        state.asteroids.push({
          x: Math.random() * (width - 90) + 45,
          y: -45,
          vx: (Math.random() - 0.5) * 1.2,
          vy: Math.random() * 2.8 + state.scrollSpeed * 0.55,
          radius: r,
          hp: Math.round(r * 2.5),
          rotation: 0,
          vRot: (Math.random() - 0.5) * 0.06
        });
      }

      // ----------------------------------------------------
      // 4. MEGA WARSHIP BOSS ENCOUNTER
      // ----------------------------------------------------
      if (!state.boss && state.score >= state.nextBossScore) {
        audio.playBossAlert();
        triggerAnnouncement('⚠️ WARNING: MOTHERSHIP DREADNOUGHT DETECTED!');
        state.boss = {
          x: width / 2,
          y: -120,
          targetY: 120,
          vx: 2.4,
          hp: 1000 + state.wave * 500,
          maxHp: 1000 + state.wave * 500,
          w: 160,
          h: 96,
          lastShot: 0,
          beamCharge: 0,
          color: '#e11d48'
        };
        setBossActive(true);
      }

      if (state.boss) {
        const b = state.boss;
        if (b.y < b.targetY) b.y += 2.5;
        b.x += b.vx;
        if (b.x < b.w / 2 + 35 || b.x > width - b.w / 2 - 35) b.vx *= -1;

        // Boss Turret Pattern Fire
        const now = Date.now();
        if (now - b.lastShot > 480) {
          b.lastShot = now;
          audio.playEnemyFire();
          [-55, -25, 0, 25, 55].forEach((off, idx) => {
            const angle = (off / 180) * Math.PI;
            state.enemyBullets.push({
              x: b.x + off,
              y: b.y + 45,
              vx: Math.sin(angle) * 3.5,
              vy: 7.8,
              color: '#f43f5e',
              radius: 5
            });
          });
        }

        setBossHpPercent(Math.max(0, Math.round((b.hp / b.maxHp) * 100)));

        // Boss Defeat
        if (b.hp <= 0) {
          audio.playExplosion(3.5);
          confetti({ particleCount: 160, spread: 90 });
          state.score += 800;
          onRewardXP?.(120);
          state.nextBossScore = state.score + 2200;
          state.wave += 1;
          setWave(state.wave);
          triggerAnnouncement(`STAGE ${state.wave} COMPLETE! +800 BONUS`);

          // Drop Powerups & Wingman Drones
          state.powerups.push({ x: b.x - 40, y: b.y, type: 'weapon', vy: 2.2 });
          state.powerups.push({ x: b.x + 40, y: b.y, type: 'wingman', vy: 2.2 });
          state.powerups.push({ x: b.x, y: b.y, type: 'bomb', vy: 2.2 });

          for (let p = 0; p < 70; p++) {
            state.particles.push({
              x: b.x + (Math.random() - 0.5) * 100,
              y: b.y + (Math.random() - 0.5) * 80,
              vx: (Math.random() - 0.5) * 18,
              vy: (Math.random() - 0.5) * 18,
              radius: Math.random() * 7 + 2,
              color: ['#f59e0b', '#f43f5e', '#38bdf8'][Math.floor(Math.random() * 3)],
              life: 55,
              maxLife: 55
            });
          }

          state.boss = null;
          setBossActive(false);
        }
      }

      // ----------------------------------------------------
      // 5. UPDATE WEAPONS, BULLETS, MISSILES & HITBOXES
      // ----------------------------------------------------
      // Player Plasma Bullets
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        // Hit Enemies
        for (let eIdx = state.enemies.length - 1; eIdx >= 0; eIdx--) {
          const enemy = state.enemies[eIdx];
          if (
            b.x > enemy.x - enemy.w / 2 &&
            b.x < enemy.x + enemy.w / 2 &&
            b.y > enemy.y - enemy.h / 2 &&
            b.y < enemy.y + enemy.h / 2
          ) {
            enemy.hp -= b.damage;
            enemy.hitFlash = 6;
            b.life = 0;

            // Spark Debris
            for (let sp = 0; sp < 3; sp++) {
              state.particles.push({
                x: b.x,
                y: b.y,
                vx: (Math.random() - 0.5) * 7,
                vy: (Math.random() - 0.5) * 7,
                radius: Math.random() * 3 + 1,
                color: b.color,
                life: 14,
                maxLife: 14
              });
            }

            if (enemy.hp <= 0) {
              audio.playExplosion(1.1);
              state.combo++;
              state.comboTimer = 180; // 3 sec window
              setCombo(state.combo);

              const pts = (enemy.type === 'cruiser' ? 180 : enemy.type === 'raider' ? 100 : 60) * Math.min(4, Math.floor(state.combo / 3) + 1);
              state.score += pts;
              onRewardXP?.(10);

              // Floating Score Popup
              state.floatingTexts.push({
                x: enemy.x,
                y: enemy.y,
                text: `+${pts}`,
                color: state.combo > 5 ? '#facc15' : '#38bdf8',
                life: 30
              });

              // Chance to drop powerup
              if (Math.random() < 0.38) {
                const types = ['weapon', 'shield', 'bomb', 'wingman'];
                state.powerups.push({ x: enemy.x, y: enemy.y, type: types[Math.floor(Math.random() * types.length)], vy: 2.2 });
              }

              // Explosion Particles
              for (let p = 0; p < 22; p++) {
                state.particles.push({
                  x: enemy.x,
                  y: enemy.y,
                  vx: (Math.random() - 0.5) * 11,
                  vy: (Math.random() - 0.5) * 11,
                  radius: Math.random() * 5 + 2,
                  color: enemy.color,
                  life: 32,
                  maxLife: 32
                });
              }

              state.enemies.splice(eIdx, 1);
            }
            break;
          }
        }

        // Hit Asteroids
        for (let aIdx = state.asteroids.length - 1; aIdx >= 0; aIdx--) {
          const ast = state.asteroids[aIdx];
          if (Math.hypot(b.x - ast.x, b.y - ast.y) < ast.radius) {
            ast.hp -= b.damage;
            b.life = 0;
            if (ast.hp <= 0) {
              audio.playExplosion(0.9);
              state.score += 50;
              onRewardXP?.(5);
              state.asteroids.splice(aIdx, 1);
            }
            break;
          }
        }

        // Hit Boss
        if (state.boss && b.life !== 0) {
          const boss = state.boss;
          if (
            b.x > boss.x - boss.w / 2 &&
            b.x < boss.x + boss.w / 2 &&
            b.y > boss.y - boss.h / 2 &&
            b.y < boss.y + boss.h / 2
          ) {
            boss.hp -= b.damage;
            b.life = 0;
            audio.playExplosion(0.2);
          }
        }

        if (b.y < -30 || b.life === 0) {
          state.bullets.splice(i, 1);
        }
      }

      // Update Homing Micro-Missiles
      for (let m = state.missiles.length - 1; m >= 0; m--) {
        const ms = state.missiles[m];
        ms.life--;

        // Seek target
        if (ms.target && ms.target.hp > 0) {
          const angle = Math.atan2(ms.target.y - ms.y, ms.target.x - ms.x);
          ms.vx += Math.cos(angle) * 1.1;
          ms.vy += Math.sin(angle) * 1.1;
        } else if (state.enemies.length > 0) {
          ms.target = state.enemies[0];
        }

        ms.x += ms.vx;
        ms.y += ms.vy;

        // Smoke trail
        state.particles.push({
          x: ms.x,
          y: ms.y,
          vx: (Math.random() - 0.5) * 1,
          vy: 2,
          radius: Math.random() * 3 + 1,
          color: '#cbd5e1',
          life: 14,
          maxLife: 14
        });

        // Hit enemy
        for (let eIdx = state.enemies.length - 1; eIdx >= 0; eIdx--) {
          const enemy = state.enemies[eIdx];
          if (Math.hypot(ms.x - enemy.x, ms.y - enemy.y) < enemy.w / 2 + 10) {
            enemy.hp -= ms.damage;
            audio.playExplosion(0.8);
            ms.life = 0;
            break;
          }
        }

        if (ms.life <= 0 || ms.y < -30) state.missiles.splice(m, 1);
      }

      // Update Enemies
      for (let i = state.enemies.length - 1; i >= 0; i--) {
        const e = state.enemies[i];
        if (e.type === 'viper') {
          e.phase += 0.08;
          e.x = e.baseX + Math.sin(e.phase) * 55;
          e.y += e.vy;
        } else {
          e.x += (e.vx || 0);
          e.y += e.vy;
        }

        if (e.hitFlash > 0) e.hitFlash--;
        if (e.x < e.w / 2 || e.x > width - e.w / 2) e.vx = -(e.vx || 1);

        // Enemy Laser Fire
        if (Math.random() < 0.022) {
          audio.playEnemyFire();
          state.enemyBullets.push({
            x: e.x,
            y: e.y + e.h / 2,
            vx: (player.x - e.x) * 0.022,
            vy: 6.8,
            color: '#f43f5e',
            radius: 4.5
          });
        }

        // Collision with Player
        if (
          Math.abs(e.x - player.x) < (e.w + 36) / 2 &&
          Math.abs(e.y - player.y) < (e.h + 40) / 2
        ) {
          if (player.invulnerableTimer <= 0) {
            player.hp -= 25;
            audio.playExplosion(1.4);
            state.screenShake = 18;
            player.invulnerableTimer = 45;
          }
          e.hp = 0;
        }

        if (e.y > height + 60) state.enemies.splice(i, 1);
      }

      // Update Falling Asteroids
      for (let i = state.asteroids.length - 1; i >= 0; i--) {
        const a = state.asteroids[i];
        a.x += a.vx;
        a.y += a.vy;
        a.rotation += a.vRot;

        if (Math.hypot(a.x - player.x, a.y - player.y) < a.radius + 20) {
          if (player.invulnerableTimer <= 0) {
            player.hp -= 20;
            audio.playExplosion(1.1);
            state.screenShake = 14;
            player.invulnerableTimer = 40;
          }
          a.hp = 0;
        }

        if (a.y > height + 70) state.asteroids.splice(i, 1);
      }

      // Update Enemy Bullets
      for (let i = state.enemyBullets.length - 1; i >= 0; i--) {
        const eb = state.enemyBullets[i];
        eb.x += eb.vx;
        eb.y += eb.vy;

        // Near-Miss Dodging Bonus
        const dist = Math.hypot(eb.x - player.x, eb.y - player.y);
        if (dist > 22 && dist < 45 && !eb.nearMissAwarded) {
          eb.nearMissAwarded = true;
          state.score += 25;
          state.floatingTexts.push({ x: player.x, y: player.y - 30, text: 'NEAR MISS +25', color: '#a7f3d0', life: 25 });
        }

        // Direct Hit
        if (dist < 20 + eb.radius) {
          if (player.invulnerableTimer <= 0) {
            if (player.shield >= 15) {
              player.shield -= 15;
            } else {
              player.hp -= 15;
            }
            audio.playExplosion(0.6);
            state.screenShake = 10;
            player.invulnerableTimer = 35;
          }
          state.enemyBullets.splice(i, 1);
          continue;
        }

        if (eb.y > height + 20) state.enemyBullets.splice(i, 1);
      }

      // Update Powerups
      for (let i = state.powerups.length - 1; i >= 0; i--) {
        const pup = state.powerups[i];
        pup.y += pup.vy;

        if (Math.hypot(pup.x - player.x, pup.y - player.y) < 32) {
          audio.playPowerup();
          if (pup.type === 'weapon') {
            player.weaponLevel = Math.min(4, player.weaponLevel + 1);
            setWeaponLevel(player.weaponLevel);
            triggerAnnouncement(`WEAPON UPGRADED • LVL ${player.weaponLevel}`);
          } else if (pup.type === 'wingman') {
            player.hasWingmen = true;
            setHasWingmen(true);
            triggerAnnouncement('WINGMAN ESCORT DRONES DEPLOYED!');
          } else if (pup.type === 'shield') {
            player.shield = player.maxShield;
            player.hp = Math.min(player.maxHp, player.hp + 30);
            triggerAnnouncement('SHIELD & REPAIR RESTORED');
          } else if (pup.type === 'bomb') {
            player.bombs = Math.min(5, player.bombs + 1);
            setBombs(player.bombs);
            triggerAnnouncement('EMP NOVA BOMB ACQUIRED');
          }

          state.powerups.splice(i, 1);
          continue;
        }

        if (pup.y > height + 35) state.powerups.splice(i, 1);
      }

      // Update Nova Shockwaves
      for (let i = state.novaRings.length - 1; i >= 0; i--) {
        const ring = state.novaRings[i];
        ring.radius += ring.speed;
        ring.opacity = 1 - (ring.radius / ring.maxRadius);
        if (ring.radius >= ring.maxRadius) state.novaRings.splice(i, 1);
      }

      // Check Player Death
      if (player.hp <= 0) {
        audio.playExplosion(2.5);
        setGameState('gameover');
        if (state.score > highScore) {
          setHighScore(state.score);
          try { localStorage.setItem('master_warship_highscore', state.score.toString()); } catch (e) {}
        }
        return;
      }

      // Update React HUD states
      setScore(state.score);
      setHullHp(Math.max(0, Math.round(player.hp)));
      setShieldEnergy(Math.max(0, Math.round(player.shield)));
      setBoostEnergy(Math.max(0, Math.round(player.boost)));

      // ----------------------------------------------------
      // 6. RENDER GORGEOUS SCI-FI UNIVERSE & SHIPS
      // ----------------------------------------------------
      if (state.screenShake > 0) {
        ctx.save();
        ctx.translate((Math.random() - 0.5) * state.screenShake, (Math.random() - 0.5) * state.screenShake);
        state.screenShake *= 0.9;
        if (state.screenShake < 0.5) state.screenShake = 0;
      }

      // Deep Space Vertical Nebula Gradient
      ctx.fillStyle = '#050714';
      ctx.fillRect(0, 0, width, height);

      // Render Cosmic Nebula Clouds
      state.nebulae.forEach(neb => {
        const grad = ctx.createRadialGradient(neb.x, neb.y, 20, neb.x, neb.y, neb.radius);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x, neb.y, neb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Downward Scrolling Parallax Starfield with warp stretch
      state.starfield.forEach(s => {
        s.y += s.speed * (state.scrollSpeed / 5.0);
        if (s.y > height) s.y = 0;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(s.x, s.y, s.size, s.size * (isBoosting ? 4.5 : 1.5));
        ctx.globalAlpha = 1;
      });

      // Flash-white screen effect on bomb
      if (state.flashWhite > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${state.flashWhite / 10})`;
        ctx.fillRect(0, 0, width, height);
        state.flashWhite--;
      }

      // Render Nova Rings
      state.novaRings.forEach(ring => {
        ctx.strokeStyle = ring.color;
        ctx.globalAlpha = ring.opacity;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Render Powerup Capsules with pulsing halos
      state.powerups.forEach(pup => {
        ctx.save();
        ctx.translate(pup.x, pup.y);
        ctx.shadowBlur = 16;
        ctx.shadowColor = pup.type === 'weapon' ? '#facc15' : pup.type === 'wingman' ? '#a7f3d0' : pup.type === 'bomb' ? '#f43f5e' : '#38bdf8';

        ctx.fillStyle = pup.type === 'weapon' ? '#facc15' : pup.type === 'wingman' ? '#10b981' : pup.type === 'bomb' ? '#f43f5e' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pup.type === 'weapon' ? 'P' : pup.type === 'wingman' ? 'W' : pup.type === 'bomb' ? 'B' : 'S', 0, 1);
        ctx.restore();
      });

      // Render Falling Asteroids
      state.asteroids.forEach(a => {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rotation);
        ctx.fillStyle = '#475569';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, a.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Render Enemy Warships (Facing DOWNWARD)
      state.enemies.forEach(e => {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.shadowBlur = 15;
        ctx.shadowColor = e.color;

        if (e.hitFlash > 0) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = e.color;
        }

        if (e.type === 'viper') {
          ctx.beginPath();
          ctx.moveTo(0, e.h / 2);
          ctx.lineTo(-e.w / 2, -e.h / 2);
          ctx.lineTo(0, -e.h / 4);
          ctx.lineTo(e.w / 2, -e.h / 2);
          ctx.closePath();
          ctx.fill();
        } else if (e.type === 'raider') {
          ctx.beginPath();
          ctx.moveTo(0, e.h / 2);
          ctx.lineTo(-e.w / 2, 0);
          ctx.lineTo(-e.w / 3, -e.h / 2);
          ctx.lineTo(e.w / 3, -e.h / 2);
          ctx.lineTo(e.w / 2, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          // Heavy Cruiser
          ctx.beginPath();
          ctx.moveTo(0, e.h / 2);
          ctx.lineTo(-e.w / 2, -e.h / 3);
          ctx.lineTo(-e.w / 4, -e.h / 2);
          ctx.lineTo(e.w / 4, -e.h / 2);
          ctx.lineTo(e.w / 2, -e.h / 3);
          ctx.closePath();
          ctx.fill();

          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      // Render Boss Dreadnought
      if (state.boss) {
        const b = state.boss;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#f43f5e';

        ctx.fillStyle = '#9f1239';
        ctx.beginPath();
        ctx.moveTo(0, b.h / 2);
        ctx.lineTo(-b.w / 2, -b.h / 2);
        ctx.lineTo(-b.w / 4, 0);
        ctx.lineTo(0, -b.h / 3);
        ctx.lineTo(b.w / 4, 0);
        ctx.lineTo(b.w / 2, -b.h / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(0, 15, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render Upward Plasma Bullets
      state.bullets.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = b.color;
        ctx.fillRect(b.x - b.w / 2, b.y, b.w, b.h);
      });

      // Render Homing Missiles
      state.missiles.forEach(m => {
        ctx.fillStyle = '#fbbf24';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f59e0b';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Enemy Bullets
      state.enemyBullets.forEach(eb => {
        ctx.fillStyle = eb.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = eb.color;
        ctx.beginPath();
        ctx.arc(eb.x, eb.y, eb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

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

      // Render Floating Damage/Score Popups
      for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
        const ft = state.floatingTexts[i];
        ft.y -= 1.2;
        ft.life--;
        ctx.fillStyle = ft.color;
        ctx.font = 'black 14px monospace';
        ctx.fillText(ft.text, ft.x, ft.y);
        if (ft.life <= 0) state.floatingTexts.splice(i, 1);
      }

      // Render Ghost Speed Trails
      player.ghostTrails.forEach(gt => {
        ctx.save();
        ctx.translate(gt.x, gt.y);
        ctx.rotate(gt.tilt);
        ctx.globalAlpha = gt.alpha * 0.4;
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(-24, 22);
        ctx.lineTo(0, 16);
        ctx.lineTo(24, 22);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // Render Wingmen Drones
      if (player.hasWingmen) {
        [-38, 38].forEach(off => {
          ctx.save();
          ctx.translate(player.x + off, player.y + 6);
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#10b981';
          ctx.fillStyle = '#059669';
          ctx.beginPath();
          ctx.moveTo(0, -12);
          ctx.lineTo(-8, 8);
          ctx.lineTo(8, 8);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
      }

      // Render Upward Space Warship
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.tilt);

      // Shield Bubble
      if (player.invulnerableTimer > 0 || player.shield > 25) {
        ctx.strokeStyle = player.invulnerableTimer > 0 ? '#facc15' : 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = player.invulnerableTimer > 0 ? '#facc15' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Warship Chassis (Pointing Directly UPWARD)
      ctx.fillStyle = '#0284c7';
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#38bdf8';

      ctx.beginPath();
      ctx.moveTo(0, -28);   // Nose Tip (Pointing Up)
      ctx.lineTo(-24, 22);  // Left Wing
      ctx.lineTo(-8, 14);   // Left Nacelle
      ctx.lineTo(0, 20);    // Center Engine
      ctx.lineTo(8, 14);    // Right Nacelle
      ctx.lineTo(24, 22);   // Right Wing
      ctx.closePath();
      ctx.fill();

      // Wing Stripes
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-18, 6, 6, 12);
      ctx.fillRect(12, 6, 6, 12);

      // Glowing Cockpit Core
      ctx.fillStyle = '#67e8f9';
      ctx.beginPath();
      ctx.arc(0, -8, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (state.screenShake > 0) ctx.restore();

      animId = requestAnimationFrame(updateAndRender);
    };

    animId = requestAnimationFrame(updateAndRender);
    return () => cancelAnimationFrame(animId);
  }, [gameState, fireWeapons, highScore, onRewardXP]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-slate-950 rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl text-white select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'max-w-4xl mx-auto'
      }`}
    >
      {/* ---------------------------------------------------- */}
      {/* 1. TOP HUD TELEMETRY BAR */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/95 border-b border-cyan-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 flex items-center gap-2">
              <span>COSMOS WARSHIP INTERCEPTOR</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-500/30">
                STAGE {wave}
              </span>
            </h2>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-0.5">
              <span>SCORE: <strong className="text-cyan-300 font-extrabold">{score}</strong></span>
              <span>BEST: <strong className="text-yellow-400 font-extrabold">{highScore}</strong></span>
              {combo > 1 && <span className="text-amber-400 font-extrabold animate-pulse">🔥 COMBO x{combo}</span>}
            </div>
          </div>
        </div>

        {/* Meters: Hull, Shield, Boost, Bombs */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col gap-1 w-28">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-emerald-400 font-bold">HULL HP</span>
              <span>{hullHp}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-150" style={{ width: `${hullHp}%` }} />
            </div>

            <div className="flex justify-between text-[10px] font-mono mt-0.5">
              <span className="text-cyan-400 font-bold">BOOST</span>
              <span>{boostEnergy}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 transition-all duration-150" style={{ width: `${boostEnergy}%` }} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-rose-950/80 border border-rose-500/40 rounded-xl text-xs font-mono font-bold text-rose-300 flex items-center gap-1">
              <Bomb className="w-3.5 h-3.5" /> {bombs}
            </div>

            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border text-xs font-bold transition ${
                isMuted ? 'bg-rose-950/60 border-rose-500/40 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {gameState === 'playing' && (
              <button
                onClick={pauseGame}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
            )}

            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition"
                title="Back to Arcade"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* BOSS HP BAR HUD */}
      {bossActive && (
        <div className="bg-rose-950/90 border-b border-rose-500/40 p-2 flex items-center justify-between px-6 animate-pulse">
          <div className="text-xs font-black font-mono text-rose-300 flex items-center gap-2">
            <span>🚨 ENEMY FLAGSHIP DREADNOUGHT APPROACHING!</span>
          </div>
          <div className="w-48 sm:w-72 h-3 bg-slate-900 rounded-full overflow-hidden border border-rose-500/50">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-600 transition-all duration-150"
              style={{ width: `${bossHpPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. VERTICAL HTML5 CANVAS VIEWPORT */}
      {/* ---------------------------------------------------- */}
      <div className="relative flex justify-center bg-slate-950 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={640}
          height={680}
          className="w-full h-auto max-h-[75vh] cursor-crosshair touch-none"
        />

        {/* MIDWAY STAGE BANNER NOTIFICATION */}
        {announcement && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-purple-900/90 border border-cyan-400 rounded-full text-xs font-black text-cyan-200 tracking-wider shadow-2xl animate-bounce-short pointer-events-none">
            {announcement}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* 3. TOUCH CONTROLS OVERLAY FOR MOBILE */}
        {/* ---------------------------------------------------- */}
        {gameState === 'playing' && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-auto sm:hidden opacity-85">
            {/* D-Pad Steering */}
            <div className="grid grid-cols-3 gap-1 w-32">
              <div />
              <button
                onTouchStart={() => (engineRef.current.keys['KeyW'] = true)}
                onTouchEnd={() => (engineRef.current.keys['KeyW'] = false)}
                className="p-3 bg-cyan-900/80 border border-cyan-400 rounded-xl text-center font-bold"
              >
                ▲
              </button>
              <div />
              <button
                onTouchStart={() => (engineRef.current.keys['KeyA'] = true)}
                onTouchEnd={() => (engineRef.current.keys['KeyA'] = false)}
                className="p-3 bg-cyan-900/80 border border-cyan-400 rounded-xl text-center font-bold"
              >
                ◀
              </button>
              <button
                onTouchStart={() => (engineRef.current.keys['KeyS'] = true)}
                onTouchEnd={() => (engineRef.current.keys['KeyS'] = false)}
                className="p-3 bg-cyan-900/80 border border-cyan-400 rounded-xl text-center font-bold"
              >
                ▼
              </button>
              <button
                onTouchStart={() => (engineRef.current.keys['KeyD'] = true)}
                onTouchEnd={() => (engineRef.current.keys['KeyD'] = false)}
                className="p-3 bg-cyan-900/80 border border-cyan-400 rounded-xl text-center font-bold"
              >
                ▶
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onTouchStart={triggerNovaBomb}
                className="px-4 py-2.5 bg-rose-600 border border-rose-300 rounded-xl font-black text-xs shadow-lg"
              >
                💣 EMP BOMB
              </button>
              <button
                onTouchStart={() => (engineRef.current.keys['ShiftLeft'] = true)}
                onTouchEnd={() => (engineRef.current.keys['ShiftLeft'] = false)}
                className="px-4 py-2.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg"
              >
                ⚡ WARP BOOST
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* 4. MODAL OVERLAYS (MENU, PAUSE, GAMEOVER) */}
        {/* ---------------------------------------------------- */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-40">
            <div className="p-4 rounded-3xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 mb-3 animate-bounce">
              <Rocket className="w-12 h-12" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              COSMOS WARSHIP INTERCEPTOR
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-2 mb-6 leading-relaxed">
              Ascend into enemy armada airspace! Rapid plasma cannons, warp speed thruster boosts, homing micro-missiles, escort wingmen & screen-clearing EMP bombs!
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md w-full mb-6 text-left text-xs font-mono bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-cyan-400 font-bold block">STEERING:</span>
                <span className="text-slate-400">WASD / Arrow Keys</span>
              </div>
              <div>
                <span className="text-cyan-400 font-bold block">AUTOFIRING:</span>
                <span className="text-slate-400">Continuous Upward</span>
              </div>
              <div>
                <span className="text-amber-400 font-bold block">WARP BOOST:</span>
                <span className="text-slate-400">Shift / Spacebar</span>
              </div>
              <div>
                <span className="text-rose-400 font-bold block">EMP NOVA BOMB:</span>
                <span className="text-slate-400">B / E / Right Click</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-cyan-500/30 transition flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" /> LAUNCH WARSHIP SORTIE 🚀
            </button>
          </div>
        )}

        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-40">
            <h3 className="text-2xl font-black text-cyan-400 mb-2">MISSION PAUSED ⏸️</h3>
            <div className="flex flex-col gap-3 w-56 mt-4">
              <button
                onClick={resumeGame}
                className="py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs rounded-xl shadow-lg transition"
              >
                RESUME MISSION
              </button>
              <button
                onClick={startGame}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
              >
                RESTART MISSION
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-40">
            <div className="text-5xl mb-2">💥</div>
            <h3 className="text-2xl sm:text-3xl font-black text-rose-500">WARSHIP HULL COMPROMISED!</h3>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl max-w-xs w-full my-4 font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">FINAL SCORE:</span>
                <span className="text-cyan-400 font-extrabold">{score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">HIGH SCORE:</span>
                <span className="text-yellow-400 font-extrabold">{highScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">STAGE REACHED:</span>
                <span className="text-emerald-400 font-extrabold">Stage {wave}</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> LAUNCH NEW SORTIE
            </button>
          </div>
        )}
      </div>

      {/* FOOTER KEYBOARD HINTS */}
      <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 px-4">
        <span>Controls: [WASD/Arrows] Steer Warship • [Shift/Space] Warp Speed Boost • [B/E] Screen EMP Bomb</span>
        <span>Enhanced Sci-Fi Warship Arcade Engine (SHMUP)</span>
      </div>
    </div>
  );
}
