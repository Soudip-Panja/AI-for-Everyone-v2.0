import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('About');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const viewportRef = useRef(null);
  const CARD_COUNT = 4;

  const activeCardIndexRef = useRef(0);
  useEffect(() => {
    activeCardIndexRef.current = activeCardIndex;
  }, [activeCardIndex]);

  const videoRef = useRef(null);
  const reversingRef = useRef(false);
  // How many seconds to step back per frame during reverse (~24fps feel)
  const STEP = 1 / 24;

  // ── Scrum frame-sequence scrub refs ──
  const canvasRef       = useRef(null);
  const scrubSectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const studentInFramesRef = useRef([]);   // preloaded Image objects for 1 Student
  const studentMovementFramesRef = useRef([]); // preloaded Image objects for 2 Student Movement
  const FRAME_BASE      = '/Scrum Video/1 Student/frame_';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Called after every successful seek — drives the reverse loop
    const onSeeked = () => {
      if (!reversingRef.current) return;

      if (video.currentTime <= 0) {
        // Hit the start — play forward again
        reversingRef.current = false;
        video.currentTime = 0;
        video.play();
        return;
      }

      // Trigger the next reverse step; `seeked` will fire again when done
      video.currentTime = Math.max(0, video.currentTime - STEP);
    };

    const handleEnded = () => {
      reversingRef.current = true;
      video.pause();
      // Kick off the first reverse seek immediately (no rAF queuing)
      video.currentTime = Math.max(0, video.currentTime - STEP);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('seeked', onSeeked);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  // ── Preload all frames + scroll-scrub + automatic movement looping ──
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = scrubSectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    const pad = (n) => String(n).padStart(4, '0');

    // Preload "1 Student" frames (40 frames)
    const studentInImages = Array.from({ length: 40 }, (_, i) => {
      const img = new Image();
      img.src = `/Scrum Video/1 Student/frame_${pad(i + 1)}.png`;
      return img;
    });
    studentInFramesRef.current = studentInImages;

    // Preload "2 Student Movement" frames (181 frames for new 6s 30fps video)
    const studentMovementImages = Array.from({ length: 181 }, (_, i) => {
      const img = new Image();
      img.src = `/Scrum Video/2 Student Movement/frame_${pad(i + 1)}.png`;
      return img;
    });
    studentMovementFramesRef.current = studentMovementImages;

    // Draw helper
    const drawFrame = (images, index) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };

    const initCanvasSize = () => {
      if (studentInImages[0].naturalWidth > 0) {
        canvas.width = studentInImages[0].naturalWidth;
        canvas.height = studentInImages[0].naturalHeight;
        drawFrame(studentInImages, 0);
      }
    };

    // Draw frame 0 when ready
    if (studentInImages[0].complete) {
      initCanvasSize();
    } else {
      studentInImages[0].onload = initCanvasSize;
    }

    // Movement loop variables
    let loopInterval = null;
    let loopFrameIndex = 0;

    const startMovementLoop = () => {
      if (loopInterval) return;
      loopInterval = setInterval(() => {
        const frames = studentMovementFramesRef.current;
        if (frames.length === 0) return;
        loopFrameIndex = (loopFrameIndex + 1) % frames.length;
        drawFrame(frames, loopFrameIndex);
      }, 1000 / 30); // Play at 30fps as configured for the new video
    };

    const stopMovementLoop = () => {
      if (loopInterval) {
        clearInterval(loopInterval);
        loopInterval = null;
      }
    };

    // Scroll handler: map scroll position → walk-in scrub or movement loop
    const onScroll = () => {
      const rect       = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled   = -rect.top;
      const progress   = Math.min(1, Math.max(0, scrolled / scrollable));

      // 1. Determine active card index dynamically based on scroll progress
      let newIndex = 0;
      if (progress >= 0.75) {
        newIndex = 3;
      } else if (progress >= 0.5) {
        newIndex = 2;
      } else if (progress >= 0.25) {
        newIndex = 1;
      }

      if (newIndex !== activeCardIndexRef.current) {
        setActiveCardIndex(newIndex);
      }

      // 2. Play walk-in scrub or idle movement loop based on scroll state
      if (progress < 0.25) {
        // Card 1 is active
        if (progress < 0.10) {
          // User is scrubbing the walk-in sequence ("1 Student" folder)
          stopMovementLoop();
          const inFrames = studentInFramesRef.current;
          if (inFrames.length > 0) {
            const localProgress = progress / 0.10;
            const frameIndex = Math.min(
              inFrames.length - 1,
              Math.max(0, Math.round(localProgress * (inFrames.length - 1)))
            );
            drawFrame(inFrames, frameIndex);
          }
        } else {
          // Walk-in is fully loaded; play the loop of "2 Student Movement"
          startMovementLoop();
        }
      } else {
        // Scrolled past Card 1 (progress >= 0.25) -> stop movement loop
        stopMovementLoop();
        // Keep the canvas on the last frame of the walk-in sequence
        const inFrames = studentInFramesRef.current;
        if (inFrames.length > 0) {
          drawFrame(inFrames, inFrames.length - 1);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (loopInterval) {
        clearInterval(loopInterval);
      }
    };
  }, []);

  // ── Card navigation: simply increment activeCardIndex ──
  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % CARD_COUNT);
  };

  // ── Card translation effect ──
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = cardsContainerRef.current;
    if (!viewport || !track) return;

    const cardWidth = (viewport.offsetWidth - 44) / 2;
    const offset = activeCardIndex * (cardWidth + 44);
    const maxOffset = track.scrollWidth - viewport.offsetWidth;
    track.style.transform = `translate3d(-${Math.min(offset, maxOffset)}px, 0, 0)`;

    // Update dots
    const dots = document.querySelectorAll('.service-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeCardIndex);
    });
  }, [activeCardIndex]);

  // ── Dynamic card sizing: each card = half viewport width ──
  useEffect(() => {
    const updateCardWidths = () => {
      const viewport = viewportRef.current;
      const track = cardsContainerRef.current;
      if (!viewport || !track) return;
      const cardW = (viewport.offsetWidth - 44) / 2;
      const cards = track.querySelectorAll('.service-card');
      cards.forEach(card => {
        card.style.width = `${cardW}px`;
      });
    };
    updateCardWidths();
    const ro = new ResizeObserver(updateCardWidths);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const menuItems = ['Features', 'How It Works', 'About', 'Product', 'Blogs'];

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const StatIconPractitioners = () => (
    <div className="stat-icon-wrap stat-icon-blue">
      <svg className="stat-svg stat-svg-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    </div>
  );

  const StatIconTeams = () => (
    <div className="stat-icon-wrap stat-icon-cyan">
      <svg className="stat-svg stat-svg-zap" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    </div>
  );

  const StatIconCerts = () => (
    <div className="stat-icon-wrap stat-icon-purple">
      <svg className="stat-svg stat-svg-draw" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    </div>
  );

  const StatIconStartups = () => (
    <div className="stat-icon-wrap stat-icon-green">
      <svg className="stat-svg stat-svg-float" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    </div>
  );

  const ecosystemStats = [
    { value: '1,000+', label: 'Certified Practitioners', Icon: StatIconPractitioners, color: 'stat-blue' },
    { value: '70',     label: 'Arena Cohort Teams',       Icon: StatIconTeams,         color: 'stat-cyan' },
    { value: '11',     label: 'Active Certifications',    Icon: StatIconCerts,         color: 'stat-purple' },
    { value: '15',     label: 'Startups Backed',          Icon: StatIconStartups,      color: 'stat-green' },
  ];

  const platforms = [
    {
      name: 'Learn', desc: 'Courses & Certifications', color: 'chip-blue',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      name: 'Build', desc: 'Live Project Arena', color: 'chip-cyan',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m14.7 6.3-1 1-1.4 1.4L3 18l3 3 9.3-9.3 1.4-1.4 1-1" />
          <path d="m16 2 6 6-2 2-6-6 2-2z" />
          <path d="M7.5 10.5 3 15" />
        </svg>
      ),
    },
    {
      name: 'Recruit', desc: 'AI Career Placements', color: 'chip-purple',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      name: 'Fund', desc: 'Startup Backing', color: 'chip-green',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
  ];

  return (
    <>
    <div className="home-wrapper">
      {/* Background Video — ping-pong loop (forward → reverse → forward) */}
      <div className="bg-video-container">
        <video
          ref={videoRef}
          className="bg-video"
          src="/Videos/Hero Section Robo Movement.webm"
          autoPlay
          muted
          playsInline
        />
        <div className="bg-video-overlay"></div>
      </div>

      {/* ==================== Navigation Bar ==================== */}
      <header className="navbar">
        <a href="/" className="logo-container">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="12" height="12" rx="3.5" fill="url(#nav-logo-grad-1)" transform="rotate(45 12 16)" />
              <rect x="14" y="10" width="12" height="12" rx="3.5" fill="url(#nav-logo-grad-2)" transform="rotate(45 20 16)" />
              <defs>
                <linearGradient id="nav-logo-grad-1" x1="6" y1="10" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
                <linearGradient id="nav-logo-grad-2" x1="14" y1="10" x2="26" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0072ff" />
                  <stop offset="100%" stopColor="#0052d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text-group">
            <span className="logo-text">AI for Everyone</span>
            <span className="logo-subtitle">LEARN. BUILD. HIRE. INVEST</span>
          </div>
        </a>

        <nav className="nav-menu-container">
          {menuItems.map((item) => {
            if (item === 'Features') {
              return (
                 <div key={item} className="nav-dropdown-wrapper" style={{ position: 'relative' }}>
                  <button 
                    onClick={toggleDropdown}
                    className={`nav-menu-item ${activeMenu === item ? 'active' : ''}`}
                    style={{ background: dropdownOpen ? 'var(--border-glass-hover)' : '' }}
                  >
                    {item}
                    <svg className="nav-dropdown-icon" viewBox="0 0 24 24" width="10" height="10" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}>
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="nav-dropdown-menu">
                      <a href="#analytics" className="nav-dropdown-link" onClick={() => { setActiveMenu('Features'); setDropdownOpen(false); }}>Analytics</a>
                      <a href="#automation" className="nav-dropdown-link" onClick={() => { setActiveMenu('Features'); setDropdownOpen(false); }}>Automation</a>
                      <a href="#integration" className="nav-dropdown-link" onClick={() => { setActiveMenu('Features'); setDropdownOpen(false); }}>Integrations</a>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`nav-menu-item ${activeMenu === item ? 'active' : ''}`}
                onClick={() => { setActiveMenu(item); setDropdownOpen(false); }}
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <a href="#login" className="nav-btn-login">Log In</a>
          <a href="#signup" className="nav-btn-signup">Sign Up</a>
          <div className="nav-btn-divider"></div>
          <a href="#enquire" className="nav-btn-enquire">Enquire</a>
        </div>
      </header>
      <div className="navbar-spacer"></div>

      {/* ==================== Hero Section ==================== */}
      <main className="hero-section">
        <div className="hero-main-layout">

          {/* ── Left Hero Content ── */}
          <div className="hero-left-content">

            {/* Eyebrow Badge */}
            <div className="hero-eyebrow">
              <svg className="eyebrow-sparkles-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 2c0 4.418-3.582 8-8 8 4.418 0 8 3.582 8 8 0-4.418 3.582-8 8-8-4.418 0-8-3.582-8-8Z" />
                <path d="M19 5c0 1.657-1.343 3-3 3 1.657 0 3 1.343 3 3 0-1.657 1.343-3 3-3-1.657 0-3-1.343-3-3Z" />
                <path d="M5 16c0 1.105-.895 2-2 2 1.105 0 2 .895 2 2 0-1.105.895-2 2-2-1.105 0-2-.895-2-2Z" />
              </svg>
              <span className="eyebrow-text">THE COMPLETE AI JOURNEY • ONE ECOSYSTEM</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title">
              <span className="title-line">From your first&nbsp;</span>
              <span className="title-line title-gradient">prompt to your</span>
              <span className="title-line">first&nbsp;<em className="title-italic">product.</em></span>
            </h1>

            {/* Subtext */}
            <p className="hero-subtext">
              We don't just teach AI. We train active AI practitioners, mentor them through live builds,
              connect them to AI roles, and back the ones who launch companies.
              <br />
              <span className="hero-subtext-scope">Scoped for schools, colleges, corporate teams, and individuals.</span>
            </p>

            {/* CTA Row */}
            <div className="hero-cta-row">
              <a href="#programs" id="hero-cta-primary" className="btn-cta-gradient">
                Explore Programs
                <span className="btn-arrow-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
              <a href="#consultation" id="hero-cta-secondary" className="btn-cta-outline">
                Request Consultation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* Ecosystem Stats Grid */}
            <div className="hero-stats-row">
              {ecosystemStats.map((stat) => (
                <div key={stat.label} className={`stats-card ${stat.color}`}>
                  <stat.Icon />
                  <span className="card-value">{stat.value}</span>
                  <span className="card-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Partners Row (Below Stats Cards) */}
            <div className="partners-container">
              <div className="partners-badge">SUPPORTED BY LEADING SYSTEMS</div>
              <div className="partners-logos-wrapper">
                <div className="partner-logo-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="partner-logo-svg">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                    <line x1="10" y1="6" x2="10.01" y2="6" />
                    <line x1="10" y1="18" x2="10.01" y2="18" />
                  </svg>
                  <span className="partner-logo-name">INTIME IT SERVICES</span>
                </div>
                <div className="partner-logo-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="partner-logo-svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 11 11 13 15 9" />
                  </svg>
                  <span className="partner-logo-name">ICMAI STRATEGIC PARTNER</span>
                </div>
                <div className="partner-logo-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="partner-logo-svg">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="12 8 13.85 11.83 18.1 12.45 15.02 15.46 15.75 19.69 12 17.77 8.25 19.69 8.98 15.46 5.9 12.45 10.15 11.83 12 8" />
                  </svg>
                  <span className="partner-logo-name">NASSCOM-JUDGED ARENA</span>
                </div>
                <div className="partner-logo-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="partner-logo-svg">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span className="partner-logo-name">HALDIA CO-FUNDED</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right: Platform Hub Card ── */}
          <div className="hero-right-card">
            <div className="hub-card">
              <div className="hub-card-header">
                <div className="hub-pulse-dot"></div>
                <span className="hub-card-eyebrow">CENTRAL PLATFORM HUB</span>
              </div>
              <h2 className="hub-card-title">One Ecosystem.<br />Four Platforms.</h2>
              <p className="hub-card-body">
                AI For Everyone connects four dedicated platforms — Learn, build, recruit, and fund AI companies in one compounding loop.
              </p>
              <div className="hub-platforms-grid">
                {platforms.map((p) => (
                  <div key={p.name} className={`hub-platform-chip ${p.color}`}>
                    <div className={`hub-platform-icon hub-icon-${p.color}`}>
                      {p.icon}
                    </div>
                    <div>
                      <div className="hub-platform-name">{p.name}</div>
                      <div className="hub-platform-desc">{p.desc}</div>
                    </div>
                    <div className="hub-chip-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    {/* ==================== Student In Frame-Scrub Section ==================== */}
    {/* 500vh tall section gives scroll room to step through all 97 frames */}
    <section ref={scrubSectionRef} className="student-in-section">
      <div className="student-in-sticky">
        <canvas ref={canvasRef} className="student-in-canvas" />

        {/* Overlay right side content */}
        <div className="student-content-overlay">
          {/* Header — two-column: title left (card1 width), description right (card2 width) */}
          <div className="services-header">
            <div className="services-header-left">
              <span className="services-eyebrow">WHAT WE DO</span>
              <h2 className="services-title">
                AI <span className="title-for">for</span>{' '}
                <span 
                  key={activeCardIndex} 
                  className={`services-title-animated-span title-theme-${activeCardIndex}`}
                >
                  {activeCardIndex === 0 && "Students"}
                  {activeCardIndex === 1 && "Educators"}
                  {activeCardIndex === 2 && "Legal Minds"}
                  {activeCardIndex === 3 && "Enterprise"}
                </span>
              </h2>
            </div>
            <div className="services-header-right">
              <p className="services-desc">
                We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.
              </p>
            </div>
          </div>

          {/* Cards Area: viewport-col + arrow button */}
          <div className="services-cards-area">
            {/* Viewport column — cards + dots centered within card width */}
            <div className="services-viewport-col">
              <div ref={viewportRef} className="services-cards-viewport">
                <div ref={cardsContainerRef} className="services-cards-track">
              {/* Card 1 */}
              <div className={`service-card student-theme ${activeCardIndex !== 0 ? 'collapsed' : ''}`}>
                {/* Dots grid background */}
                <div className="student-card-dots">
                  <svg className="student-card-dots-svg" width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {(() => {
                      const dots = [];
                      const spacing = 15;
                      const startOffset = 18;
                      for (let r = 0; r < 8; r++) {
                        for (let c = 0; c < 8; c++) {
                          if (r + c >= 7) {
                            const d = r + c - 7;
                            const cx = startOffset + c * spacing;
                            const cy = startOffset + r * spacing;
                            const distFromCorner = 14 - (r + c);
                            const radius = Math.max(0.8, 3.5 - distFromCorner * 0.38);
                            const opacity = Math.max(0.08, 0.9 - distFromCorner * 0.11);
                            
                            const delay = (r + c) * 0.12;
                            dots.push(
                              <circle
                                key={`${r}-${c}`}
                                cx={cx}
                                cy={cy}
                                r={radius}
                                fill="#a855f7"
                                className="animated-dot"
                                style={{
                                  '--base-opacity': opacity,
                                  animationDelay: `${delay}s`
                                }}
                              />
                            );
                          }
                        }
                      }
                      return dots;
                    })()}
                  </svg>
                </div>
                
                {activeCardIndex === 0 ? (
                  <>
                    <div className="student-card-header">
                      <div className="student-card-meta">
                        <span className="student-card-num">01</span>
                        <span className="student-card-badge">Students</span>
                      </div>
                      <div className="student-card-arrow-circle">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>

                    <div className="student-card-content">
                      <h3 className="student-card-title">
                        Learn. Build. Get<br />hired.
                      </h3>
                      <p className="student-card-subtitle">
                        From your first prompt to a portfolio that opens doors.
                      </p>
                      <p className="student-card-body">
                        Structured AI foundations, live project builds judged by industry, and certification paths that connect directly to placement opportunities.
                      </p>
                    </div>

                    <div className="student-card-footer">
                      <div className="student-card-tags">
                        <span className="student-card-tag">AI Foundations</span>
                        <span className="student-card-tag">Portfolio Projects</span>
                        <span className="student-card-tag">Certifications</span>
                        <span className="student-card-tag">Placement Support</span>
                      </div>
                      <button className="student-card-btn">
                        Explore Student Programs
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-top-minimal">
                      <span className="card-number-large" style={{ color: '#a855f7' }}>01</span>
                      <span className="card-arrow-large" style={{ color: '#a855f7' }}>↗</span>
                    </div>
                    <div className="card-bottom-minimal">
                      <h3 className="card-title-large" style={{ color: '#0c0f1d' }}>STUDENTS</h3>
                    </div>
                  </>
                )}
              </div>

              {/* Card 2 */}
              <div className={`service-card ${activeCardIndex === 1 ? 'educator-theme' : ''}`}>
                {/* Dots grid background */}
                <div className="student-card-dots">
                  <svg className="student-card-dots-svg" width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {(() => {
                      const dots = [];
                      const spacing = 15;
                      const startOffset = 18;
                      for (let r = 0; r < 8; r++) {
                        for (let c = 0; c < 8; c++) {
                          if (r + c >= 7) {
                            const cx = startOffset + c * spacing;
                            const cy = startOffset + r * spacing;
                            const distFromCorner = 14 - (r + c);
                            const radius = Math.max(0.8, 3.5 - distFromCorner * 0.38);
                            const opacity = Math.max(0.08, 0.9 - distFromCorner * 0.11);
                            
                            const delay = (r + c) * 0.12;
                            dots.push(
                              <circle
                                key={`${r}-${c}`}
                                cx={cx}
                                cy={cy}
                                r={radius}
                                fill={activeCardIndex === 1 ? '#f43f5e' : 'var(--accent-blue)'}
                                className="animated-dot"
                                style={{
                                  '--base-opacity': opacity,
                                  animationDelay: `${delay}s`
                                }}
                              />
                            );
                          }
                        }
                      }
                      return dots;
                    })()}
                  </svg>
                </div>

                {activeCardIndex === 1 ? (
                  <>
                    <div className="student-card-header">
                      <div className="student-card-meta">
                        <span className="educator-card-num">02</span>
                        <span className="educator-card-badge">Educators</span>
                      </div>
                      <div className="educator-card-arrow-circle">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>

                    <div className="student-card-content">
                      <h3 className="student-card-title" style={{ color: '#0f172a' }}>
                        Bring AI into your classroom.
                      </h3>
                      <p className="student-card-subtitle">
                        Teach with AI — not around it.
                      </p>
                      <p className="student-card-body">
                        Ready-to-run curriculum modules, faculty development programs, and teaching toolkits that make AI approachable for every subject and grade.
                      </p>
                    </div>

                    <div className="student-card-footer">
                      <div className="student-card-tags">
                        <span className="educator-card-tag">Curriculum Design</span>
                        <span className="educator-card-tag">Faculty Development</span>
                        <span className="educator-card-tag">Teaching Toolkits</span>
                        <span className="educator-card-tag">Workshops</span>
                      </div>
                      <button className="educator-card-btn">
                        Explore Educator Programs
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-top-minimal">
                      <span className="card-number-large">02</span>
                      <span className="card-arrow-large">↗</span>
                    </div>
                    <div className="card-bottom-minimal">
                      <h3 className="card-title-large">EDUCATORS</h3>
                    </div>
                  </>
                )}
              </div>

              {/* Card 3 */}
              <div className="service-card">
                {/* Dots grid background */}
                <div className="student-card-dots">
                  <svg className="student-card-dots-svg" width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {(() => {
                      const dots = [];
                      const spacing = 15;
                      const startOffset = 18;
                      for (let r = 0; r < 8; r++) {
                        for (let c = 0; c < 8; c++) {
                          if (r + c >= 7) {
                            const cx = startOffset + c * spacing;
                            const cy = startOffset + r * spacing;
                            const distFromCorner = 14 - (r + c);
                            const radius = Math.max(0.8, 3.5 - distFromCorner * 0.38);
                            const opacity = Math.max(0.08, 0.9 - distFromCorner * 0.11);
                            
                            const delay = (r + c) * 0.12;
                            dots.push(
                              <circle
                                key={`${r}-${c}`}
                                cx={cx}
                                cy={cy}
                                r={radius}
                                fill="var(--accent-blue)"
                                className="animated-dot"
                                style={{
                                  '--base-opacity': opacity,
                                  animationDelay: `${delay}s`
                                }}
                              />
                            );
                          }
                        }
                      }
                      return dots;
                    })()}
                  </svg>
                </div>

                <div className="card-top-minimal">
                  <span className="card-number-large">03</span>
                  <span className="card-arrow-large">↗</span>
                </div>
                <div className="card-bottom-minimal">
                  <h3 className="card-title-large">LEGAL MINDS</h3>
                </div>
              </div>

              {/* Card 4 */}
              <div className="service-card">
                {/* Dots grid background */}
                <div className="student-card-dots">
                  <svg className="student-card-dots-svg" width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {(() => {
                      const dots = [];
                      const spacing = 15;
                      const startOffset = 18;
                      for (let r = 0; r < 8; r++) {
                        for (let c = 0; c < 8; c++) {
                          if (r + c >= 7) {
                            const cx = startOffset + c * spacing;
                            const cy = startOffset + r * spacing;
                            const distFromCorner = 14 - (r + c);
                            const radius = Math.max(0.8, 3.5 - distFromCorner * 0.38);
                            const opacity = Math.max(0.08, 0.9 - distFromCorner * 0.11);
                            
                            const delay = (r + c) * 0.12;
                            dots.push(
                              <circle
                                key={`${r}-${c}`}
                                cx={cx}
                                cy={cy}
                                r={radius}
                                fill="var(--accent-blue)"
                                className="animated-dot"
                                style={{
                                  '--base-opacity': opacity,
                                  animationDelay: `${delay}s`
                                }}
                              />
                            );
                          }
                        }
                      }
                      return dots;
                    })()}
                  </svg>
                </div>

                <div className="card-top-minimal">
                  <span className="card-number-large">04</span>
                  <span className="card-arrow-large">↗</span>
                </div>
                <div className="card-bottom-minimal">
                  <h3 className="card-title-large">ENTERPRISE</h3>
                </div>
              </div>
            </div>{/* end services-cards-track */}
          </div>{/* end services-cards-viewport */}

          {/* Dots — centered within card viewport width */}
          <div className="services-dots">
            {Array.from({ length: CARD_COUNT }).map((_, idx) => (
              <span key={idx} className={`service-dot${idx === activeCardIndex ? ' active' : ''}`} />
            ))}
          </div>
        </div>{/* end services-viewport-col */}

        {/* Right Arrow Button */}
        <button className="next-card-btn" onClick={handleNextCard} aria-label="Next service cards">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>{/* end services-cards-area */}

      </div>{/* end student-content-overlay */}
    </div>{/* end student-in-sticky */}
  </section>
  </>
  );
}
