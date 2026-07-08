import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: "Build", path: "/build" },
    { name: "Invest", path: "/invest" },
    { name: "Hire/Adopt", path: "/hire" },
    { name: "About Us", path: "/#about-us" },
  ];

  const getActiveMenu = () => {
    if (location.pathname === "/learn") return "Learn";
    if (location.pathname === "/build") return "Build";
    if (location.pathname === "/invest") return "Invest";
    if (location.pathname === "/hire") return "Hire/Adopt";
    if (location.pathname === "/") {
      if (location.hash === "#invest") return "Invest";
      if (location.hash === "#hire-adopt") return "Hire/Adopt";
      if (location.hash === "#about-us") return "About Us";
      return "Home";
    }
    return "";
  };

  const activeMenu = getActiveMenu();

  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo-container">
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
        </Link>

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

        <div className="navbar-actions">
          <a href="#login" className="nav-btn-login">Log In</a>
          <a href="#signup" className="nav-btn-signup">Sign Up</a>
          <div className="nav-btn-divider"></div>
          <a href="#enquire" className="nav-btn-enquire">Enquire</a>
        </div>
      </header>
      <div className="navbar-spacer"></div>
    </>
  );
}
