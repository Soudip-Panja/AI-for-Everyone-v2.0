import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

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

  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo-container">
          <div className="logo-icon">
            <img src="/brain-logo.png" alt="AI for Everyone Logo" style={{ width: "62px", height: "62px", objectFit: "contain" }} />
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
