import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: "Build", path: "/build" },
    { name: "Invest", path: "/invest" },
    { name: "Hire/Adopt", path: "/hire" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const getActiveMenu = () => {
    if (location.pathname === "/learn") return "Learn";
    if (location.pathname === "/build") return "Build";
    if (location.pathname === "/invest") return "Invest";
    if (location.pathname === "/hire") return "Hire/Adopt";
    if (location.pathname === "/about-us") return "About Us";
    if (location.pathname === "/contact-us") return "Contact Us";
    if (location.pathname === "/") {
      if (location.hash === "#invest") return "Invest";
      if (location.hash === "#hire-adopt") return "Hire/Adopt";
      return "Home";
    }
    return "";
  };

  const activeMenu = getActiveMenu();

  // Close mobile menu when route or hash changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock background body scroll when mobile menu overlay is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close full-screen mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close full-screen mobile menu automatically when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1150) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={`navbar ${isMobileMenuOpen ? "mobile-active" : ""}`}>
        <Link to="/" className="logo-container" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="logo-icon">
            <img
              src="/brain-logo.png"
              alt="AI for Everyone Logo"
              style={{ width: "48px", height: "48px", objectFit: "contain" }}
            />
          </div>
          <div className="logo-text-group">
            <span className="logo-text">AI for Everyone</span>
            <span className="logo-subtitle">LEARN. BUILD. HIRE. INVEST</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="nav-menu-container">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-menu-item ${activeMenu === item.name ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <a href="#login" className="nav-btn-login">Log In</a>
          <a href="#signup" className="nav-btn-signup">Sign Up</a>
          <div className="nav-btn-divider"></div>
          <a href="#enquire" className="nav-btn-enquire">Enquire</a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className={`nav-mobile-toggle ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div className={`mobile-fullscreen-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-overlay-header">
          <Link to="/" className="logo-container" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="logo-icon">
              <img
                src="/brain-logo.png"
                alt="AI for Everyone Logo"
                style={{ width: "48px", height: "48px", objectFit: "contain" }}
              />
            </div>
            <div className="logo-text-group">
              <span className="logo-text">AI for Everyone</span>
              <span className="logo-subtitle">LEARN. BUILD. HIRE. INVEST</span>
            </div>
          </Link>
          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="mobile-overlay-body">
          <nav className="mobile-nav-menu">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`mobile-nav-item ${activeMenu === item.name ? "active" : ""}`}
                style={{ animationDelay: `${0.04 * (index + 1)}s` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-item-name">{item.name}</span>
                {activeMenu === item.name && (
                  <span className="mobile-active-badge">Active</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mobile-overlay-footer">
            <div className="mobile-actions-row">
              <a href="#login" className="mobile-btn-login" onClick={() => setIsMobileMenuOpen(false)}>Log In</a>
              <a href="#signup" className="mobile-btn-signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</a>
            </div>
            <a href="#enquire" className="mobile-btn-enquire" onClick={() => setIsMobileMenuOpen(false)}>
              Enquire Now
            </a>
          </div>
        </div>
      </div>

      <div className="navbar-spacer"></div>
    </>
  );
}
