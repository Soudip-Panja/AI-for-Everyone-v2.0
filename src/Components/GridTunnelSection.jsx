import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Step 1 Graphic Components ---
const GlobeFlareIcon = () => (
  <span className="globe-flare-wrapper">
    <svg className="inline-icon globe-flare-svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="44" stroke="#0077ff" strokeWidth="6" fill="url(#globeGlow)" />
      <ellipse cx="50" cy="50" rx="20" ry="44" stroke="#00bfff" strokeWidth="4" />
      <ellipse cx="50" cy="50" rx="44" ry="20" stroke="#00bfff" strokeWidth="4" />
      <line x1="6" y1="50" x2="94" y2="50" stroke="#00bfff" strokeWidth="4" />
      <circle cx="50" cy="50" r="14" fill="#ffffff" />
      <circle cx="50" cy="50" r="26" fill="#00a2ff" opacity="0.6" />
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#0088ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0033aa" stopOpacity="0.2" />
        </radialGradient>
      </defs>
    </svg>
    <span className="flare-spark-center" />
  </span>
);

const TechBrainGraphic = () => (
  <div className="tech-brain-box">
    <div className="hud-bracket bracket-tl" />
    <div className="hud-bracket bracket-tr" />
    <div className="hud-bracket bracket-bl" />
    <div className="hud-bracket bracket-br" />
    <svg className="tech-brain-svg" viewBox="0 0 160 120" fill="none">
      <defs>
        <linearGradient id="brainGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0052ff" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="brainGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <path d="M 76 22 C 62 14, 44 16, 30 26 C 16 36, 10 52, 14 68 C 16 78, 24 88, 36 94 C 48 100, 62 98, 72 90 C 76 86, 76 76, 76 64 C 76 50, 76 34, 76 22 Z" fill="url(#brainGradLeft)" stroke="#00d2ff" strokeWidth="2.5" />
      <path d="M 84 22 C 98 14, 116 16, 130 26 C 144 36, 150 52, 146 68 C 144 78, 136 88, 124 94 C 112 100, 98 98, 88 90 C 84 86, 84 76, 84 64 C 84 50, 84 34, 84 22 Z" fill="url(#brainGradRight)" stroke="#00d2ff" strokeWidth="2.5" />
      <line x1="80" y1="18" x2="80" y2="96" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.9" />
      <path d="M 36 34 Q 52 38, 68 30" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M 24 50 Q 44 48, 64 54" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M 28 66 Q 48 70, 70 66" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M 40 82 Q 58 78, 72 84" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M 124 34 Q 108 38, 92 30" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M 136 50 Q 116 48, 96 54" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M 132 66 Q 112 70, 90 66" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M 120 82 Q 102 78, 88 84" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.85" />
      <circle cx="48" cy="36" r="3.5" fill="#ffffff" />
      <circle cx="112" cy="36" r="3.5" fill="#ffffff" />
      <circle cx="34" cy="58" r="3.5" fill="#ffffff" />
      <circle cx="126" cy="58" r="3.5" fill="#ffffff" />
      <circle cx="56" cy="74" r="3.5" fill="#ffffff" />
      <circle cx="104" cy="74" r="3.5" fill="#ffffff" />
      <line x1="48" y1="36" x2="34" y2="58" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
      <line x1="34" y1="58" x2="56" y2="74" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
      <line x1="112" y1="36" x2="126" y2="58" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
      <line x1="126" y1="58" x2="104" y2="74" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
    </svg>
  </div>
);

const IsometricCubesGraphic = () => (
  <div className="iso-cubes-box">
    <div className="hud-bracket bracket-tl" />
    <div className="hud-bracket bracket-tr" />
    <div className="hud-bracket bracket-bl" />
    <div className="hud-bracket bracket-br" />
    <svg className="iso-cubes-svg" viewBox="0 0 100 100" fill="none">
      <polygon points="50,12 76,27 50,42 24,27" fill="#93c5fd" stroke="#0077ff" strokeWidth="2.5" opacity="0.95" />
      <polygon points="24,27 50,42 50,68 24,53" fill="#3b82f6" stroke="#0077ff" strokeWidth="2.5" opacity="0.85" />
      <polygon points="50,42 76,27 76,53 50,68" fill="#1d4ed8" stroke="#0077ff" strokeWidth="2.5" opacity="0.95" />
      <polygon points="26,42 52,57 26,72 0,57" fill="#60a5fa" stroke="#0077ff" strokeWidth="2" opacity="0.85" />
      <polygon points="0,57 26,72 26,94 0,79" fill="#2563eb" stroke="#0077ff" strokeWidth="2" opacity="0.8" />
      <polygon points="26,72 52,57 52,79 26,94" fill="#1e40af" stroke="#0077ff" strokeWidth="2" opacity="0.85" />
      <polygon points="74,42 100,57 74,72 48,57" fill="#93c5fd" stroke="#0077ff" strokeWidth="2" opacity="0.95" />
      <polygon points="48,57 74,72 74,94 48,79" fill="#3b82f6" stroke="#0077ff" strokeWidth="2" opacity="0.85" />
      <polygon points="74,72 100,57 100,79 74,94" fill="#1d4ed8" stroke="#0077ff" strokeWidth="2" opacity="0.95" />
    </svg>
  </div>
);

const CheckTargetIcon = () => (
  <span className="check-target-wrapper">
    <svg className="inline-icon check-target-svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="44" stroke="#00a2ff" strokeWidth="7" fill="#0052ff" />
      <circle cx="50" cy="50" r="32" stroke="#ffffff" strokeWidth="3" strokeDasharray="6 4" />
      <path d="M30 52 L44 66 L70 36" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

// --- All 6 Services Cards Data ---
const cardsData = [
  {
    id: 1,
    num: "01",
    badge: "SERVICE 01",
    title: "AI Readiness Audit",
    forWho: "Organizations exploring AI but unsure where to begin.",
    youGet: [
      "Business workflow assessment",
      "AI opportunity mapping",
      "Technology readiness review",
      "Prioritized implementation roadmap",
      "ROI estimation"
    ],
    outcome: "A clear AI strategy with practical next steps and high-impact use cases.",
    cta: "Request an Audit →",
    accentColor: "#3b82f6",
    gradient: "linear-gradient(145deg, rgba(30, 58, 138, 0.95), rgba(15, 23, 42, 0.98))",
    bgPattern: "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4), transparent 70%)"
  },
  {
    id: 2,
    num: "02",
    badge: "SERVICE 02",
    title: "AI Strategy Workshop",
    forWho: "Leadership teams planning AI adoption.",
    youGet: [
      "Executive AI workshop",
      "Use case discovery sessions",
      "ROI & feasibility analysis",
      "AI adoption roadmap",
      "Technology recommendations"
    ],
    outcome: "A business-focused AI strategy aligned with your goals and budget.",
    cta: "Book a Workshop →",
    accentColor: "#f43f5e",
    gradient: "linear-gradient(145deg, rgba(136, 19, 55, 0.95), rgba(15, 23, 42, 0.98))",
    bgPattern: "radial-gradient(circle at 70% 20%, rgba(244, 63, 94, 0.4), transparent 70%)"
  },
  {
    id: 3,
    num: "03",
    badge: "SERVICE 03",
    title: "AI Automation Build",
    forWho: "Businesses ready to automate repetitive work.",
    youGet: [
      "AI workflow automation",
      "Custom AI agents",
      "CRM & ERP integrations",
      "Internal chatbot deployment",
      "Testing & production launch"
    ],
    outcome: "Production-ready automation that saves time and improves efficiency.",
    cta: "Start Your Build →",
    accentColor: "#d97706",
    gradient: "linear-gradient(145deg, rgba(120, 53, 15, 0.95), rgba(15, 23, 42, 0.98))",
    bgPattern: "radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.4), transparent 70%)"
  },
  {
    id: 4,
    num: "04",
    badge: "SERVICE 04",
    title: "Custom AI Solutions",
    forWho: "Organizations with unique operational requirements.",
    youGet: [
      "Custom AI applications",
      "Internal productivity tools",
      "AI-powered dashboards",
      "API & database integration",
      "Secure deployment"
    ],
    outcome: "Tailor-made AI solutions designed around your business processes.",
    cta: "Discuss Your Project →",
    accentColor: "#2563eb",
    gradient: "linear-gradient(145deg, rgba(29, 78, 216, 0.95), rgba(15, 23, 42, 0.98))",
    bgPattern: "radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.4), transparent 70%)"
  },
  {
    id: 5,
    num: "05",
    badge: "SERVICE 05",
    title: "AI Team Training",
    forWho: "Employees, managers, and technical teams.",
    youGet: [
      "Hands-on AI workshops",
      "Prompt engineering",
      "AI productivity tools",
      "Department-specific use cases",
      "Practical exercises"
    ],
    outcome: "A confident team capable of using AI effectively in everyday work.",
    cta: "Train Your Team →",
    accentColor: "#8b5cf6",
    gradient: "linear-gradient(145deg, rgba(91, 33, 182, 0.95), rgba(15, 23, 42, 0.98))",
    bgPattern: "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.4), transparent 70%)"
  },
  {
    id: 6,
    num: "06",
    badge: "SERVICE 06",
    title: "AI Transformation Partner",
    forWho: "Companies committed to long-term AI adoption.",
    youGet: [
      "Continuous AI consulting",
      "Quarterly optimization reviews",
      "Governance & best practices",
      "Team mentoring",
      "Ongoing feature improvements"
    ],
    outcome: "An AI-first organization with continuous innovation and measurable business growth.",
    cta: "Become a Partner →",
    accentColor: "#10b981",
    gradient: "linear-gradient(145deg, rgba(6, 78, 59, 0.95), rgba(15, 23, 42, 0.98))",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.4), transparent 70%)"
  }
];

export default function GridTunnelSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textStageRef = useRef(null);

  const textGroup1Ref = useRef(null);
  const textGroup2Ref = useRef(null);
  const cardsStageRef = useRef(null);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  const cardsRef = useRef([]);

  const scrollProgressRef = useRef(0);

  // 1. Canvas 3D Tunnel Grid Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let animFrameId = null;
    let time = 0;
    let cw = 0;
    let ch = 0;

    const setupCanvas = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cw = w;
      ch = h;
    };

    const drawFrame = () => {
      const w = cw;
      const h = ch;
      if (w === 0 || h === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clean pure white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      // Vanishing point at exact center
      const cx = w / 2;
      const cy = h / 2;

      const scrollBoost = scrollProgressRef.current;

      // --- PERSPECTIVE GRID RAYS ---
      const numCols = 24;
      const numRows = 16;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(140, 170, 240, 0.35)';

      // Ceiling rays
      for (let i = 0; i <= numCols; i++) {
        const x = (i / numCols) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      }
      // Floor rays
      for (let i = 0; i <= numCols; i++) {
        const x = (i / numCols) * w;
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      }
      // Left wall rays
      for (let j = 0; j <= numRows; j++) {
        const y = (j / numRows) * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      }
      // Right wall rays
      for (let j = 0; j <= numRows; j++) {
        const y = (j / numRows) * h;
        ctx.beginPath();
        ctx.moveTo(w, y);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      }

      // --- INFINITE WIREFRAME TUNNEL RINGS ---
      const numRings = 22;
      const baseSpeed = 0.0004;

      for (let r = 0; r < numRings; r++) {
        let rawT = (r / numRings) + (time * baseSpeed) + (scrollBoost * 0.35);
        let t = rawT % 1;

        const depthFactor = Math.pow(t, 2.1);

        const rx1 = depthFactor * cx;
        const rx2 = w - depthFactor * (w - cx);
        const ry1 = depthFactor * cy;
        const ry2 = h - depthFactor * (h - cy);

        const alpha = Math.max(0, (1 - depthFactor) * 0.52);
        ctx.strokeStyle = `rgba(100, 145, 240, ${alpha})`;
        ctx.lineWidth = 1 + (1 - depthFactor) * 0.8;

        ctx.beginPath();
        ctx.rect(rx1, ry1, rx2 - rx1, ry2 - ry1);
        ctx.stroke();
      }

      // --- SOFT WHITE RADIAL GLOW AT VANISHING POINT ---
      const glowRadius = Math.min(w, h) * 0.48;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
      grd.addColorStop(0,    'rgba(255, 255, 255, 1)');
      grd.addColorStop(0.3,  'rgba(255, 255, 255, 0.96)');
      grd.addColorStop(0.65, 'rgba(255, 255, 255, 0.55)');
      grd.addColorStop(1,    'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
      time += 1;
    };

    const loop = () => {
      drawFrame();
      animFrameId = requestAnimationFrame(loop);
    };

    setupCanvas();
    loop();

    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
    });
    resizeObserver.observe(section);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  // 2. GSAP Animations: 4-Phase Sequence for Seamless Exit
  useEffect(() => {
    const linesGroup1 = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current];
    if (!linesGroup1[0] || !linesGroup1[1] || !linesGroup1[2] || !linesGroup1[3] || 
        !textGroup1Ref.current || !textGroup2Ref.current || !cardsStageRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // --- Initial State for Group 1 ---
      gsap.set(line1Ref.current, {
        x: -750, y: -500, z: 2000, scale: 6.5, opacity: 0, filter: 'blur(25px)', rotationX: 42, rotationY: -35, rotationZ: 12
      });
      gsap.set(line2Ref.current, {
        x: 850, y: -100, z: 2200, scale: 7, opacity: 0, filter: 'blur(25px)', rotationX: -38, rotationY: 45, rotationZ: -16
      });
      gsap.set(line3Ref.current, {
        x: -800, y: 200, z: 2400, scale: 7.5, opacity: 0, filter: 'blur(25px)', rotationX: 30, rotationY: -30, rotationZ: 10
      });
      gsap.set(line4Ref.current, {
        x: 650, y: 650, z: 2600, scale: 8, opacity: 0, filter: 'blur(25px)', rotationX: 36, rotationY: -28, rotationZ: 18
      });

      // --- Initial State for Group 2 (Hidden in depth) ---
      gsap.set(textGroup2Ref.current, {
        scale: 3.5,
        z: 2200,
        opacity: 0,
        filter: 'blur(20px)'
      });

      // --- Initial State for 6 3D Cards (At Vanishing Point translateZ(-3200px)) ---
      cardsRef.current.forEach((cardEl) => {
        if (cardEl) {
          gsap.set(cardEl, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            z: -3200,
            scale: 0.15,
            opacity: 0,
            filter: 'blur(12px)',
            transformOrigin: '50% 50%'
          });
        }
      });

      // Single ScrollTrigger Pinned Timeline for 4-Phase Sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=900%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          }
        }
      });

      // --- STEP 1: GROUP 1 FLY-IN & DEPTH TRAVEL (0.00 -> 0.22) ---
      scrollTl.to(linesGroup1, {
        x: 0, y: 0, z: 0, scale: 1, opacity: 1, filter: 'blur(0px)', rotationX: 0, rotationY: 0, rotationZ: 0,
        stagger: 0.03, duration: 0.09, ease: 'power2.out'
      }, 0.00);

      // Step 1 Fly Back into Depth (0.13 -> 0.22)
      scrollTl.to(textGroup1Ref.current, {
        scale: 0.08, z: -3500, opacity: 0, filter: 'blur(8px)', duration: 0.09, ease: 'power1.in'
      }, 0.13);

      // --- STEP 2: GROUP 2 FLY-IN & DEPTH TRAVEL (0.22 -> 0.42) ---
      scrollTl.to(textGroup2Ref.current, {
        scale: 1, z: 0, opacity: 1, filter: 'blur(0px)', duration: 0.10, ease: 'power2.out'
      }, 0.22);

      // Step 2 Fly Back into Depth (0.33 -> 0.42)
      scrollTl.to(textGroup2Ref.current, {
        scale: 0.08, z: -3500, opacity: 0, filter: 'blur(8px)', duration: 0.09, ease: 'power1.in'
      }, 0.33);

      // --- STEP 3: 6 CARDS EMERGENCE & HORIZONTAL SCROLL (0.42 -> 0.84) ---
      // Pitch = 348px (width 320px, gap 28px)
      // Initial X positions: [-522, -174, 174, 522, 870, 1218]
      const cardPitch = 348;
      const initialXPositions = [-522, -174, 174, 522, 870, 1218];

      // Phase 3A: Emergence from 3D depth to initial 4-card centered row (0.42 -> 0.63)
      cardsRef.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const startX = initialXPositions[idx];
        const startTime = 0.42 + idx * 0.03;
        const startOpacity = idx >= 4 ? 0 : 1;

        scrollTl.to(cardEl, {
          xPercent: -50,
          yPercent: -50,
          x: startX,
          y: 0,
          z: 0,
          scale: 1,
          opacity: startOpacity,
          filter: 'blur(0px)',
          duration: 0.16,
          ease: 'power2.out'
        }, startTime);
      });

      // Phase 3B: Right-to-Left Horizontal Scroll for 6 Cards (0.63 -> 0.84)
      cardsRef.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const startX = initialXPositions[idx];
        const endX = startX - (cardPitch * 2);

        const targetOpacity = idx <= 1 ? 0 : 1;

        scrollTl.to(cardEl, {
          x: endX,
          opacity: targetOpacity,
          duration: 0.21,
          ease: 'none'
        }, 0.63);
      });

      // --- STEP 4: SEAMLESS EXIT PHASE (0.84 -> 1.00) ---
      // Cards 3, 4, 5, 6 smoothly fly into depth and vanish to 0 opacity before section unpins
      cardsRef.current.forEach((cardEl) => {
        if (!cardEl) return;
        scrollTl.to(cardEl, {
          scale: 0.08,
          z: -3500,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.16,
          ease: 'power1.in'
        }, 0.84);
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="grid-tunnel-section">
      <canvas ref={canvasRef} className="grid-tunnel-canvas" />

      {/* Outer HUD Corner Brackets */}
      <div className="hud-corner-bracket corner-top-left" />
      <div className="hud-corner-bracket corner-top-right" />
      <div className="hud-corner-bracket corner-bottom-left" />
      <div className="hud-corner-bracket corner-bottom-right" />

      {/* Floating HUD Tech Accents */}
      <div className="left-dot-matrix">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="dot-matrix-node" />
        ))}
      </div>

      <div className="top-plus-sign">+</div>

      <div className="bottom-data-bar">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div ref={textStageRef} className="grid-tunnel-stage">
        
        {/* ================= TEXT BLOCK 1 ================= */}
        <div ref={textGroup1Ref} className="grid-tunnel-text-group group-1">
          {/* Line 1: SOME COMPANIES */}
          <div ref={line1Ref} className="grid-tunnel-line line-1">
            <span>S</span>
            <GlobeFlareIcon />
            <span>ME</span>
            <span className="word-space">&nbsp;</span>
            <span className="blue-text-glow">COMPANIES</span>
          </div>

          {/* Line 2: NEED TO LEARN AI. */}
          <div ref={line2Ref} className="grid-tunnel-line line-2">
            <span>NEED TO</span>
            <span className="word-space">&nbsp;</span>
            <span className="blue-text-glow">LEARN AI.</span>
            <TechBrainGraphic />
          </div>

          {/* Line 3: SOME NEED IT BUILT. */}
          <div ref={line3Ref} className="grid-tunnel-line line-3">
            <IsometricCubesGraphic />
            <span>SOME NEED IT</span>
            <span className="word-space">&nbsp;</span>
            <span className="blue-text-glow">BUILT.</span>
          </div>

          {/* Line 4: WE DO BOTH. (Sci-Fi Glass Banner) */}
          <div ref={line4Ref} className="grid-tunnel-line line-4">
            <div className="sci-fi-banner">
              <div className="banner-trail-left" />
              <div className="banner-content">
                <span>WE DO</span>
                <span className="word-space">&nbsp;</span>
                <span className="blue-text-glow">B</span>
                <CheckTargetIcon />
                <span className="blue-text-glow">TH.</span>
              </div>
              <div className="banner-trail-right" />
            </div>
          </div>
        </div>

        {/* ================= TEXT BLOCK 2 ================= */}
        <div ref={textGroup2Ref} className="grid-tunnel-text-group group-2">

          {/* Left Side Chevrons & HUD Trace */}
          <div className="side-hud-left">
            <span className="hud-line-trace" />
            <span className="hud-chevrons">›››</span>
          </div>

          {/* Right Side Chevrons & HUD Trace */}
          <div className="side-hud-right">
            <span className="hud-chevrons">›››</span>
            <span className="hud-line-trace" />
          </div>

          <div className="deploy-today-container">
            {/* Line 1: For organizations */}
            <h3 className="deploy-line-1">For organizations</h3>

            {/* Line 2: ready to */}
            <h2 className="deploy-line-2">ready to</h2>

            {/* Line 3: deploy AI today */}
            <h1 className="deploy-line-3">deploy AI today</h1>

            {/* Bottom Tech Divider Line with Notch & 3 Dots */}
            <div className="deploy-tech-divider">
              <span className="divider-line-left" />
              <div className="divider-notch">
                <span className="notch-dot" />
                <span className="notch-dot" />
                <span className="notch-dot" />
              </div>
              <span className="divider-line-right" />
            </div>
          </div>

        </div>

        {/* ================= STEP 3: 6 SERVICES CARDS ================= */}
        <div ref={cardsStageRef} className="tunnel-cards-stage">
          {cardsData.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`tunnel-card card-${card.id}`}
              style={{
                '--card-accent': card.accentColor
              }}
            >
              {/* Background Gradient & Glow Mesh */}
              <div className="card-bg-gradient" style={{ background: card.gradient }} />
              <div className="card-glow-mesh" style={{ background: card.bgPattern }} />

              {/* Decorative Tech Grid Lines */}
              <div className="card-grid-overlay" />

              {/* Card Content Overlay */}
              <div className="card-content">
                
                {/* Header: Badge Only */}
                <div className="card-header-row">
                  <span className="card-badge">{card.badge}</span>
                </div>

                {/* For Audience Sub-badge */}
                <div className="card-for-badge">
                  <span className="for-label">FOR:</span> {card.forWho}
                </div>

                {/* Title */}
                <h3 className="card-title">{card.title}</h3>

                {/* You Get Deliverables List */}
                <div className="card-deliverables-box">
                  <span className="deliverables-label">YOU GET</span>
                  <ul className="deliverables-list">
                    {card.youGet.map((item, i) => (
                      <li key={i}>
                        <span className="deliverable-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome Statement */}
                <div className="card-outcome-box">
                  <span className="outcome-label">OUTCOME</span>
                  <p className="outcome-text">{card.outcome}</p>
                </div>

                {/* Footer Action Button */}
                <div className="card-footer-row">
                  <button className="card-cta-btn">
                    <span>{card.cta}</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
