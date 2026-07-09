import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand-section">
            <Link to="/" className="logo-container" style={{ textDecoration: 'none', marginBottom: '20px' }}>
              <div className="logo-icon">
                <img src="/brain-logo.png" alt="AI for Everyone Logo" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
              </div>
              <div className="logo-text-group">
                <span className="logo-text">AI for Everyone</span>
                <span className="logo-subtitle">LEARN. BUILD. HIRE. INVEST</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              Empowering people and organizations to hire top AI talent and adopt innovative solutions for a better future.
            </p>
            <div className="footer-socials">
              <a href="#linkedin" className="footer-social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#twitter" className="footer-social-link" aria-label="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#instagram" className="footer-social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#slack" className="footer-social-link" aria-label="Slack">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043zm10.135 3.761a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52H10.14a2.528 2.528 0 0 1-2.52-2.52V5.043a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.76 10.135a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z"/>
                </svg>
              </a>
              <a href="#github" className="footer-social-link" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-col">
              <h4>Platform</h4>
              <ul>
                <li><a href="/hire">Hire Talent</a></li>
                <li><a href="/invest">Adopt AI Solutions</a></li>
                <li><a href="https://jobs.aiforeveryone.ai/" target="_blank" rel="noopener noreferrer">Job Portal</a></li>
                <li><a href="https://marketplace.aiforeveryone.ai/" target="_blank" rel="noopener noreferrer">Marketplace</a></li>
                <li><a href="https://lms.aiforeveryone.ai/auth/login?from=%2F" target="_blank" rel="noopener noreferrer">LMS Portal</a></li>
              </ul>
            </div>
            <div className="footer-links-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="/learn">Learn</a></li>
                <li><a href="/guides">Guides</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/hackathons">Hackathons</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
            <div className="footer-links-col">
              <h4>Company</h4>
              <ul>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/partners">Partners</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/newsroom">Newsroom</a></li>
              </ul>
            </div>
            <div className="footer-links-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="/terms">Terms of Use</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/cookies">Cookie Policy</a></li>
                <li><a href="/refund">Refund Policy</a></li>
                <li><a href="/compliance">Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 AI FOR EVERYONE. All rights reserved.
          </div>
          <div className="footer-powered">
            POWERED BY INTIME
          </div>
          <div className="footer-made-by">
            Made with <Heart size={14} className="footer-heart-icon" /> for the AI Community
          </div>
        </div>
      </div>
    </footer>
  );
}