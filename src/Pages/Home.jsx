import { useState } from 'react';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState('About');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <div className="home-wrapper">
      {/* Background Video */}
      <div className="bg-video-container">
        <video 
          className="bg-video" 
          src="/Hero Section Video.mp4" 
          autoPlay 
          loop 
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
  );
}
