import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('About');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const viewportRef = useRef(null);
  const CARD_COUNT = 4;

  const videoRef = useRef(null);
  const reversingRef = useRef(false);
  // How many seconds to step back per frame during reverse (~24fps feel)
  const STEP = 1 / 24;

  // ── Scrum frame-sequence scrub refs ──
  const canvasRef       = useRef(null);
  const scrubSectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const framesRef       = useRef([]);   // preloaded Image objects
  const FRAME_COUNT     = 40;
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

  // ── Preload all frames + scroll-scrub ──
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = scrubSectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');

    // Helper: zero-pad frame number to 4 digits
    const pad = (n) => String(n).padStart(4, '0');

    // Preload every frame
    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = `${FRAME_BASE}${pad(i + 1)}.png`;
      return img;
    });
    framesRef.current = images;

    // Draw at exactly 1:1 — no destination size = no JS scaling at all
    const drawFrame = (index) => {
      const img = images[index];
      if (!img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };

    const initCanvasSize = () => {
      if (images[0].naturalWidth > 0) {
        canvas.width = images[0].naturalWidth;
        canvas.height = images[0].naturalHeight;
        drawFrame(0);
      }
    };

    // Draw frame 0 as soon as it's ready
    if (images[0].complete) {
      initCanvasSize();
    } else {
      images[0].onload = initCanvasSize;
    }

    // Scroll handler: map scroll position → frame index only (cards handled by button click)
    const onScroll = () => {
      const rect       = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled   = -rect.top;
      const progress   = Math.min(1, Math.max(0, scrolled / scrollable));
      const frameIndex = Math.round(progress * (FRAME_COUNT - 1));
      drawFrame(frameIndex);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // ── Card navigation: compute card width from viewport and slide track ──
  const handleNextCard = () => {
    const viewport = viewportRef.current;
    const track = cardsContainerRef.current;
    if (!viewport || !track) return;

    const nextIndex = (activeCardIndex + 1) % CARD_COUNT;
    setActiveCardIndex(nextIndex);

    // Each card occupies exactly half the viewport width (minus the gap)
    const cardWidth = (viewport.offsetWidth - 44) / 2;
    const offset = nextIndex * (cardWidth + 44);
    const maxOffset = track.scrollWidth - viewport.offsetWidth;
    track.style.transform = `translate3d(-${Math.min(offset, maxOffset)}px, 0, 0)`;

    // Update dots
    const dots = document.querySelectorAll('.service-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === nextIndex);
    });
  };

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
              <h2 className="services-title">Our Services</h2>
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
              <div className="service-card">
                <div className="card-top">
                  <div className="card-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <div className="card-meta">
                    <span className="card-number">01</span>
                    <span className="card-arrow">↗</span>
                  </div>
                </div>
                <div className="card-middle">
                  <h3 className="card-title">UI/UX Design</h3>
                  <p className="card-body">
                    End-to-end product design — research, UX flows, polished UI systems, and developer-ready handoff.
                  </p>
                </div>
                <div className="card-divider"></div>
                <div className="card-bottom">
                  <div>
                    <h4 className="card-col-title">Services</h4>
                    <ul className="card-list">
                      <li className="card-list-item"><span className="card-list-bullet">•</span> User Research & Strategy</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> UX Flows & Wireframes</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> UI Systems & Prototypes</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Design Ops & Handoff</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="card-col-title">Tools</h4>
                    <div className="card-tools-grid">
                      <span className="tool-icon-box" title="Figma">
                        <svg width="16" height="16" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.5 19C9.5 13.8 13.8 9.5 19 9.5C24.2 9.5 28.5 13.8 28.5 19V28.5H19C13.8 28.5 9.5 24.2 9.5 19Z" fill="#F24E1E" />
                          <path d="M9.5 9.5C9.5 4.3 13.8 0 19 0C24.2 0 28.5 4.3 28.5 9.5V19H19C13.8 19 9.5 14.7 9.5 9.5Z" fill="#A259FF" />
                          <path d="M9.5 47.5C9.5 42.3 13.8 38 19 38C24.2 38 28.5 42.3 28.5 47.5C28.5 52.7 24.2 57 19 57C13.8 57 9.5 52.7 9.5 47.5Z" fill="#1ABCFE" />
                          <path d="M19 28.5H28.5V38H19V28.5Z" fill="#0ACF83" />
                          <path d="M28.5 19C28.5 13.8 32.8 9.5 38 9.5C43.2 9.5 47.5 13.8 47.5 19C47.5 24.2 43.2 28.5 38 28.5H28.5V19Z" fill="#FF7262" transform="translate(-9.5)" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="Sketch">
                        <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M256 32L32 192L256 480L480 192L256 32Z" fill="#FDB300" />
                          <path d="M256 32L128 192H384L256 32Z" fill="#F17C00" />
                          <path d="M256 32L32 192H128L256 32Z" fill="#FFC107" />
                          <path d="M256 32L480 192H384L256 32Z" fill="#E65100" />
                          <path d="M256 480L32 192H128L256 480Z" fill="#FFE082" />
                          <path d="M256 480L480 192H384L256 480Z" fill="#FFB300" />
                          <path d="M256 480L128 192H384L256 480Z" fill="#FFCA28" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="Framer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0h12v12h-12zM0 12h12v12l-12-12zM12 12h12v12h-12z" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="Creative Cloud">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 .002C5.373.002 0 5.376 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.624-5.373-11.998-12-11.998zm2.296 16.945c-.413.413-.912.75-1.496.966-.583.216-1.217.324-1.9.324a5.952 5.952 0 0 1-2.274-.436c-.696-.289-1.289-.705-1.782-1.246a5.533 5.533 0 0 1-1.127-1.9c-.267-.74-.4-1.543-.4-2.408 0-.847.133-1.645.4-2.394.267-.75.642-1.39 1.127-1.921A5.31 5.31 0 0 1 8.625 7.1c.696-.307 1.454-.46 2.274-.46.729 0 1.393.12 1.993.36s1.115.6 1.545 1.08c.43.48.749 1.07.957 1.77.208.7.312 1.52.312 2.457 0 .198-.01.391-.03.58a7.016 7.016 0 0 1-.09 1.02H9.083c.04.593.18 1.107.42 1.54a2.76 2.76 0 0 0 1.075 1.025c.44.234.935.35 1.485.35.433 0 .808-.06 1.125-.18a2.124 2.124 0 0 0 .785-.49l1.328 1.8z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="service-card">
                <div className="card-top">
                  <div className="card-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div className="card-meta">
                    <span className="card-number">02</span>
                    <span className="card-arrow">↗</span>
                  </div>
                </div>
                <div className="card-middle">
                  <h3 className="card-title">Website Design</h3>
                  <p className="card-body">
                    Modern, responsive websites built for performance, scalability, and great user experiences.
                  </p>
                </div>
                <div className="card-divider"></div>
                <div className="card-bottom">
                  <div>
                    <h4 className="card-col-title">Services</h4>
                    <ul className="card-list">
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Responsive Web Design</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Landing Pages</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> CMS Integration</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Performance Audit</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="card-col-title">Tools</h4>
                    <div className="card-tools-grid">
                      <span className="tool-icon-box" title="React">
                        <svg width="16" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#00d8ff" strokeWidth="2" fill="none" transform="rotate(0 50 50)" />
                          <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#00d8ff" strokeWidth="2" fill="none" transform="rotate(60 50 50)" />
                          <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#00d8ff" strokeWidth="2" fill="none" transform="rotate(120 50 50)" />
                          <circle cx="50" cy="50" r="4" fill="#00d8ff" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="WordPress">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.158 12.786l-2.698 7.84c.834.238 1.708.374 2.61.374.606 0 1.196-.062 1.768-.175l-1.68-8.039zm4.275 6.012A9.742 9.742 0 0021.75 12c0-2.47-.92-4.72-2.434-6.435L16.433 18.8zm-1.89-10.741c.642 0 1.118-.535 1.118-1.071c0-.49-.344-.925-.875-1.071c-1.125-.306-2.906-.306-4.032 0c-.53.146-.874.58-.874 1.07c0 .537.476 1.072 1.118 1.072c.69-.036 1.848-.036 2.545 0zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12s12-5.373 12-12S18.627 0 12 0zm-8.318 6.47c1.47 2.052 3.822 5.253 5.4 7.424l-3.328 9.605C3.212 21.037 1.8 16.812 1.8 12c0-2.023.63-3.896 1.882-5.53z" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="Webflow">
                        <svg width="16" height="16" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M92.1 20.3L77.9 66.5c-.9 3-2.9 4-4.8 4s-3.7-1.1-4.7-4.1L57.5 35.8L46.6 66.5c-.9 3-2.9 4-4.8 4s-3.7-1.1-4.7-4.1L23 20.3c-.6-2 .1-3.6 2-3.6h9c1.9 0 3 .9 3.5 2.5L46 51.5L56.9 20.3c.5-1.6 1.6-2.5 3.5-2.5h8.9c1.9 0 3 .9 3.5 2.5L83.7 51.5l7.9-25c.5-1.6 1.6-2.5 3.5-2.5h1.9c1.9.1 2.6 1.7 2.1 3.8L92.1 20.3zM14.9 20.3L6 49.2c-.6 2-.1 3.6 2 3.6h9c1.9 0 3-.9 3.5-2.5L26.4 20c.5-1.6 1.6-2.5 3.5-2.5h1.9c1.9 0 2.6.9 2.1 2.8L21.3 62.1c-.9 3-2.9 4-4.8 4s-3.7-1.1-4.7-4.1L3.1 20.3c-.6-2 .1-3.6 2-3.6h9.1c1.9.1 2.6 1.7 2.1 3.6h-.1z" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="Tailwind">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6.002C12 2.69 14.69 0 18 0c1.803 0 3.42.793 4.5 2.054a5.973 5.973 0 004.5-2.052c0 3.312-2.69 6-6 6a5.977 5.977 0 00-4.5-2.054A5.972 5.972 0 0012 6.002zM0 18.002c0-3.312 2.69-6 6-6a5.977 5.977 0 004.5 2.054 5.972 5.972 0 004.5-2.052c0 3.312-2.69 6-6 6a5.977 5.977 0 00-4.5-2.054A5.972 5.972 0 000 18.002z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="service-card">
                <div className="card-top">
                  <div className="card-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <div className="card-meta">
                    <span className="card-number">03</span>
                    <span className="card-arrow">↗</span>
                  </div>
                </div>
                <div className="card-middle">
                  <h3 className="card-title">App Development</h3>
                  <p className="card-body">
                    Native and cross-platform mobile apps crafted with fluid motion, offline capabilities, and native integrations.
                  </p>
                </div>
                <div className="card-divider"></div>
                <div className="card-bottom">
                  <div>
                    <h4 className="card-col-title">Services</h4>
                    <ul className="card-list">
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Native iOS & Android</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Flutter/React Native</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Cloud API Syncing</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Store Optimizations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="card-col-title">Tools</h4>
                    <div className="card-tools-grid">
                      <span className="tool-icon-box" title="Swift">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.5 14.1c-.2-.4-1.2-1.5-1.9-2.2-.3-.3-.9-1-1.3-1.4-.4-.4-.8-.7-1.1-.9-.3-.2-.5-.3-.5-.3s-.1 0-.2.1c0 0-.2.2-.3.4-.2.4-.4.8-.4 1.3 0 1.2.6 2.3 1.4 3.1.8.8 1.9 1.4 3.1 1.4.5 0 .9-.2 1.3-.4.2-.1.4-.3.4-.3s-.2-.3-.5-.7z" />
                          <path d="M12.9 6.2c-.3 0-.6.1-.8.3-.5.4-.8 1.1-.8 1.8 0 1 .4 1.9 1.1 2.6.7.7 1.6 1.1 2.6 1.1.7 0 1.4-.3 1.8-.8.2-.2.3-.5.3-.8 0-.7-.4-1.4-.8-1.8L12.9 6.2z" />
                          <path d="M19.1 16.5c-1.3-1.3-3.1-2.1-5-2.1-2.2 0-4.1 1.1-5.3 2.8-.2.3-.3.7-.3 1 0 1.1.9 2 2 2h7.3c1.1 0 2-.9 2-2 0-.7-.3-1.3-.7-1.7z" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="Flutter">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.3 0L5.5 8.8l3.7 3.7 8.8-8.8H14.3zm5.4 11.1L10.9 20l8.8 4h4.3l-8.8-8.8 4.7-4.1h-4.2z" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="Node">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7.8v11.6L12 22l10-5.6V7.8L12 2zm8 13.3L12 19.8l-8-4.5V8.9l8-4.5 8 4.5v6.4z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="service-card">
                <div className="card-top">
                  <div className="card-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
                      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
                    </svg>
                  </div>
                  <div className="card-meta">
                    <span className="card-number">04</span>
                    <span className="card-arrow">↗</span>
                  </div>
                </div>
                <div className="card-middle">
                  <h3 className="card-title">AI & Data Solutions</h3>
                  <p className="card-body">
                    Integrating intelligence into workflows — custom LLM fine-tuning, retrieval systems, and prediction models.
                  </p>
                </div>
                <div className="card-divider"></div>
                <div className="card-bottom">
                  <div>
                    <h4 className="card-col-title">Services</h4>
                    <ul className="card-list">
                      <li className="card-list-item"><span className="card-list-bullet">•</span> LLM & Agent Pipelines</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Semantic Vector Search</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Data Science Pipelines</li>
                      <li className="card-list-item"><span className="card-list-bullet">•</span> Custom Model Training</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="card-col-title">Tools</h4>
                    <div className="card-tools-grid">
                      <span className="tool-icon-box" title="Python">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9 0c-2.4 0-4.6.2-4.6 2.3v1.8h4.7v.6H5.2c-2.1 0-3.3 1.2-3.3 3.3v4.6c0 2 1.3 3.3 3.3 3.3h1.8v-2.5c0-2 1.6-3.7 3.7-3.7h4.7V5.2c0-2-1.3-3.3-3.3-3.3l-.2-.1.3-1.8zm6.9 8.7v2.5c0 2-1.6 3.7-3.7 3.7h-4.7v4.6c0 2 1.3 3.3 3.3 3.3h2.4c2.4 0 4.6-.2 4.6-2.3v-1.8h-4.7v-.6h6.7c2.1 0 3.3-1.2 3.3-3.3V9.5c0-2.1-1.3-3.3-3.3-3.3h-1.8v2.5z" />
                        </svg>
                      </span>
                      <span className="tool-icon-box" title="OpenAI">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.5 10.7a4.99 4.99 0 0 0-1.7-3.7 5.11 5.11 0 0 0-4.8-.8A5 5 0 0 0 12 2.5a5.03 5.03 0 0 0-4 3.7 5.12 5.12 0 0 0-4.8.8 4.99 4.99 0 0 0-1.7 3.7c0 1.2.4 2.3 1.2 3.2v.3a4.99 4.99 0 0 0 1.7 3.7c1 .8 2.2 1.2 3.5 1a5.11 5.11 0 0 0 4.8.8A5 5 0 0 0 12 21.5c1.5 0 3-.7 4-2a5.12 5.12 0 0 0 4.8-.8 4.99 4.99 0 0 0 1.7-3.7c0-1.2-.4-2.3-1.2-3.2l.2-.1z" />
                        </svg>
                      </span>
                    </div>
                  </div>
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
