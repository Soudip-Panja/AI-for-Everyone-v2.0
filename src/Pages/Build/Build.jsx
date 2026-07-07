import { useState, useEffect, useRef } from "react";
import { 
  Lightbulb, 
  ClipboardList, 
  Code, 
  FlaskConical, 
  Rocket, 
  ChevronLeft, 
  ChevronRight, 
  Gauge, 
  FolderGit2, 
  Settings, 
  User 
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import "./Build.css";

export default function Build() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);

  const projectsRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2800); // Transitions step every 2.8 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setHoveredStep(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredStep(null);
  };

  const isStepActive = (index) => {
    return isHovered ? hoveredStep === index : activeStep === index;
  };

  const scrollProjects = (direction) => {
    if (projectsRef.current) {
      const scrollAmount = 300; // width of project card + gap
      projectsRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollTestimonials = (direction) => {
    if (testimonialsRef.current) {
      const scrollAmount = 360; // width of testimonial card + gap
      testimonialsRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="build-page-container">
        
        {/* ==================== HERO SECTION ==================== */}
        <section className="build-hero-section">
          {/* Left Side: Content & Features */}
          <div className="build-hero-left">
            <div className="build-step-badge">Step 2</div>
            
            <h1 className="build-hero-title">
              Build Your <br />
              First <span className="accent-grad">AI</span> Product
            </h1>
            
            <p className="build-hero-desc">
              Turn your ideas into real-world AI solutions. Build, experiment, and launch with guidance from our expert mentors and a powerful builder community.
            </p>
            
            {/* 4 Feature Badges Row */}
            <div className="build-hero-features">
              <div className="build-feature-pill">
                <span className="build-pill-icon blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M12 7v10" />
                    <path d="M12 12h4" />
                    <path d="M12 9h-4" />
                    <path d="M12 15h-4" />
                    <circle cx="12" cy="7" r="1" fill="currentColor" />
                    <circle cx="16" cy="12" r="1" fill="currentColor" />
                    <circle cx="8" cy="9" r="1" fill="currentColor" />
                    <circle cx="8" cy="15" r="1" fill="currentColor" />
                  </svg>
                </span>
                <span className="build-pill-text">Project-Based <br /> Learning</span>
              </div>
              
              <div className="build-feature-pill">
                <span className="build-pill-icon purple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 21v-2a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="9" r="3" />
                    <circle cx="12" cy="9" r="6" />
                    <line x1="12" y1="3" x2="12" y2="5" />
                  </svg>
                </span>
                <span className="build-pill-text">Expert <br /> Mentorship</span>
              </div>
              
              <div className="build-feature-pill">
                <span className="build-pill-icon sky">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                    <path d="M12 12v4" />
                    <path d="M10 14h4" />
                  </svg>
                </span>
                <span className="build-pill-text">Tools & Cloud <br /> Credits</span>
              </div>
              
              <div className="build-feature-pill">
                <span className="build-pill-icon green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M9 21v-2a4 4 0 0 0-3-3.87" />
                    <circle cx="12" cy="7" r="4" />
                    <circle cx="6" cy="11" r="3" />
                    <circle cx="18" cy="11" r="3" />
                  </svg>
                </span>
                <span className="build-pill-text">Community <br /> Support</span>
              </div>
            </div>
          </div>
          
          {/* Right Side: Shared Hero Video Block */}
          <div className="build-hero-right">
            <div className="build-video-glow"></div>
            <div className="build-video-container">
              <video 
                src="/Videos/Build Page/1 Build Hero .mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="build-hero-video"
              />
            </div>
          </div>
        </section>

        {/* ==================== MIDDLE ROW: SUPPORT & COMMUNITY ==================== */}
        <section className="support-community-section">
          <div className="support-card-left">
            <div className="support-card-header">
              <h2 className="support-card-title">We Support You While You Build</h2>
              <p className="support-card-desc">Our mentorship program helps you go from idea to impact.</p>
            </div>
            
            {/* Grid of 4 Mentorship Pills */}
            <div className="mentorship-grid">
              {/* Item 1 */}
              <div className="mentorship-item card-purple">
                <div className="mentorship-icon purple">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="mentorship-text-content">
                  <h3>1:1 Mentorship</h3>
                  <p>Get guidance from AI industry experts</p>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="mentorship-item card-blue">
                <div className="mentorship-icon blue">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div className="mentorship-text-content">
                  <h3>Technical Support</h3>
                  <p>Overcome challenges faster with expert help</p>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="mentorship-item card-green">
                <div className="mentorship-icon green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="mentorship-text-content">
                  <h3>Product Feedback</h3>
                  <p>Get reviews and improve your product</p>
                </div>
              </div>
              
              {/* Item 4 */}
              <div className="mentorship-item card-yellow">
                <div className="mentorship-icon yellow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <div className="mentorship-text-content">
                  <h3>Go-to-Market Help</h3>
                  <p>We help you launch and scale</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Card: Join Builder Community */}
          <div className="community-card-right">
            <div className="community-card-content">
              <h2 className="community-card-title">Join Builder Community</h2>
              <p className="community-card-desc">Connect with 10,000+ builders and innovators.</p>
              
              <button className="join-community-btn">
                <span>Join Now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
            
            {/* Glowing 3D Robot Avatars Vector Graphics */}
            <div className="avatars-graphic-container">
              <svg width="100%" height="100%" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="glowing-avatars-svg">
                <defs>
                  {/* Linear Gradients */}
                  <linearGradient id="main-avatar-grad" x1="100" y1="40" x2="100" y2="130" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  
                  <linearGradient id="side-avatar-grad" x1="50" y1="70" x2="50" y2="130" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.5" />
                  </linearGradient>
                  
                  {/* Filters for Glow Effects */}
                  <filter id="avatar-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="ring-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Left Background Avatar */}
                <g filter="url(#avatar-glow)">
                  <circle cx="60" cy="90" r="22" fill="url(#side-avatar-grad)" />
                  <ellipse cx="60" cy="84" rx="14" ry="7" fill="#1e1b4b" opacity="0.6" />
                  {/* Glow Eyes */}
                  <circle cx="54" cy="84" r="2" fill="#a855f7" />
                  <circle cx="66" cy="84" r="2" fill="#a855f7" />
                  {/* Headphone/Antenna */}
                  <rect x="58" y="62" width="4" height="6" rx="2" fill="#a855f7" />
                </g>

                {/* Right Background Avatar */}
                <g filter="url(#avatar-glow)">
                  <circle cx="140" cy="90" r="22" fill="url(#side-avatar-grad)" />
                  <ellipse cx="140" cy="84" rx="14" ry="7" fill="#1e1b4b" opacity="0.6" />
                  {/* Glow Eyes */}
                  <circle cx="134" cy="84" r="2" fill="#a855f7" />
                  <circle cx="146" cy="84" r="2" fill="#a855f7" />
                  {/* Headphone/Antenna */}
                  <rect x="138" y="62" width="4" height="6" rx="2" fill="#a855f7" />
                </g>

                {/* Central Main Avatar */}
                <g filter="url(#avatar-glow)">
                  <circle cx="100" cy="75" r="30" fill="url(#main-avatar-grad)" />
                  {/* Inner Dark Visor */}
                  <ellipse cx="100" cy="67" rx="20" ry="9" fill="#0f172a" />
                  {/* Neon Cyan/Purple Glowing Eyes */}
                  <circle cx="92" cy="67" r="3.5" fill="#22d3ee" filter="url(#ring-glow)" />
                  <circle cx="108" cy="67" r="3.5" fill="#22d3ee" filter="url(#ring-glow)" />
                  {/* Curved mouth indicator */}
                  <path d="M96 73 Q100 76 104 73" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Headset/Ear Elements */}
                  <rect x="67" y="70" width="4" height="10" rx="2" fill="#d946ef" />
                  <rect x="129" y="70" width="4" height="10" rx="2" fill="#d946ef" />
                  <path d="M70 60 Q100 45 130 60" stroke="#d946ef" strokeWidth="3" fill="none" />
                </g>

                {/* Base platform ring glowing */}
                <ellipse cx="100" cy="125" rx="55" ry="12" stroke="#6366f1" strokeWidth="2.5" fill="none" opacity="0.4" filter="url(#ring-glow)" />
                <ellipse cx="100" cy="125" rx="42" ry="9" stroke="#d946ef" strokeWidth="2" fill="none" opacity="0.6" filter="url(#ring-glow)" />
              </svg>
            </div>
          </div>
        </section>

        {/* ==================== BANNER: HACKATHONS ==================== */}
        <section className="hackathon-banner-section">
          {/* Party Animation Containers */}
          <div className="hackathon-party-container">
            <span className="hackathon-confetti confetti-1"></span>
            <span className="hackathon-confetti confetti-2"></span>
            <span className="hackathon-confetti confetti-3"></span>
            <span className="hackathon-confetti confetti-4"></span>
            <span className="hackathon-confetti confetti-5"></span>
            <span className="hackathon-confetti confetti-6"></span>
            <span className="hackathon-confetti confetti-7"></span>
            <span className="hackathon-confetti confetti-8"></span>
            <span className="hackathon-confetti confetti-9"></span>
            <span className="hackathon-confetti confetti-10"></span>
            <span className="hackathon-confetti confetti-11"></span>
            <span className="hackathon-confetti confetti-12"></span>
            <span className="hackathon-confetti confetti-13"></span>
            
            <span className="hackathon-party-star star-1">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/></svg>
            </span>
            <span className="hackathon-party-star star-2">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/></svg>
            </span>
            <span className="hackathon-party-star star-3">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/></svg>
            </span>
            <span className="hackathon-party-star star-4">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/></svg>
            </span>
            <span className="hackathon-party-star star-5">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/></svg>
            </span>
          </div>

          <div className="hackathon-banner-left">
            <h2 className="hackathon-banner-title">Showcase Your Product in Hackathons</h2>
            <p className="hackathon-banner-desc">
              Present your product in our Innovation Arena and get noticed by industry leaders, investors & top companies.
            </p>
          </div>
          
          <div className="hackathon-banner-right">
            <img src="/trophy.png" alt="Trophy" className="hackathon-trophy-img" />
          </div>
        </section>

        {/* ==================== FOOTER: METRICS ROW ==================== */}
        <section className="metrics-section">
          {/* Stat 1 */}
          <div className="metric-column">
            <span className="metric-number">500+</span>
            <span className="metric-label">Projects Built</span>
          </div>

          {/* Stat 2 */}
          <div className="metric-column">
            <span className="metric-number">70+</span>
            <span className="metric-label">Hackathons Hosted</span>
          </div>

          {/* Stat 3 */}
          <div className="metric-column">
            <span className="metric-number">15K+</span>
            <span className="metric-label">Active Builders</span>
          </div>

          {/* Stat 4 */}
          <div className="metric-column">
            <span className="metric-number">95%</span>
            <span className="metric-label">Projects Deployed</span>
          </div>

          {/* Stat 5 */}
          <div className="metric-column">
            <span className="metric-number">50+</span>
            <span className="metric-label">Industry Partners</span>
          </div>

          {/* Stat 6 */}
          <div className="metric-column">
            <span className="metric-number">100+</span>
            <span className="metric-label">Mentors & Experts</span>
          </div>
        </section>

        {/* ==================== SECTION 5: OUR BUILD PROCESS ==================== */}
        <section className="build-process-section">
          <div className="build-process-header">
            <h2 className="build-process-title">Our Build Process</h2>
            <p className="build-process-subtitle">A structured approach to turn your ideas into impactful solutions.</p>
          </div>

          <div className="build-process-steps">
            {/* Step 1: Ideate */}
            <div 
              className={`process-step ${isStepActive(0) ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="step-header">
                <div className="step-icon-circle">
                  <Lightbulb className="step-icon icon-ideate" strokeWidth={1.8} />
                </div>
                <div className={`step-arrow ${isStepActive(0) ? "active" : ""}`}>
                  <div className="arrow-line-dotted"></div>
                  <div className="arrow-head">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M2 2L6 6L2 10" stroke="#6366f1" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-name">1. Ideate</h3>
                <p className="step-description">Discover real-world problems and choose ideas that inspire you.</p>
              </div>
            </div>

            {/* Step 2: Plan */}
            <div 
              className={`process-step ${isStepActive(1) ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="step-header">
                <div className="step-icon-circle">
                  <ClipboardList className="step-icon icon-plan" strokeWidth={1.8} />
                </div>
                <div className={`step-arrow ${isStepActive(1) ? "active" : ""}`}>
                  <div className="arrow-line-dotted"></div>
                  <div className="arrow-head">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M2 2L6 6L2 10" stroke="#6366f1" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-name">2. Plan</h3>
                <p className="step-description">Define objectives, gather data, and plan your solution.</p>
              </div>
            </div>

            {/* Step 3: Build */}
            <div 
              className={`process-step ${isStepActive(2) ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="step-header">
                <div className="step-icon-circle">
                  <Code className="step-icon icon-build" strokeWidth={1.8} />
                </div>
                <div className={`step-arrow ${isStepActive(2) ? "active" : ""}`}>
                  <div className="arrow-line-dotted"></div>
                  <div className="arrow-head">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M2 2L6 6L2 10" stroke="#6366f1" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-name">3. Build</h3>
                <p className="step-description">Write code, train models, and build your application.</p>
              </div>
            </div>

            {/* Step 4: Test */}
            <div 
              className={`process-step ${isStepActive(3) ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="step-header">
                <div className="step-icon-circle">
                  <FlaskConical className="step-icon icon-test" strokeWidth={1.8} />
                </div>
                <div className={`step-arrow ${isStepActive(3) ? "active" : ""}`}>
                  <div className="arrow-line-dotted"></div>
                  <div className="arrow-head">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M2 2L6 6L2 10" stroke="#6366f1" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-name">4. Test</h3>
                <p className="step-description">Test, evaluate, and iterate to improve performance and accuracy.</p>
              </div>
            </div>

            {/* Step 5: Deploy & Showcase */}
            <div 
              className={`process-step ${isStepActive(4) ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="step-header">
                <div className="step-icon-circle">
                  <Rocket className="step-icon icon-deploy" strokeWidth={1.8} />
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-name">5. Deploy & Showcase</h3>
                <p className="step-description">Deploy your product and showcase it in your portfolio.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== ACHIEVE SECTION ==================== */}
        <section className="achieve-section">
          <div className="achieve-header">
            <h2 className="achieve-title">What You Achieve While Building</h2>
            <p className="achieve-subtitle">Build skills, confidence, and a portfolio that opens doors.</p>
          </div>

          <div className="achieve-content">
            <div className="achieve-left">
              <div className="achieve-grid">
                <div className="achieve-item">
                  <div className="achieve-icon-circle blue">
                    <Gauge className="achieve-icon" strokeWidth={1.8} />
                  </div>
                  <div className="achieve-item-text">
                    <h3 className="achieve-item-title">Practical Skills</h3>
                    <p className="achieve-item-desc">Gain hands-on experience by working on real-world projects.</p>
                  </div>
                </div>

                <div className="achieve-item">
                  <div className="achieve-icon-circle indigo">
                    <FolderGit2 className="achieve-icon" strokeWidth={1.8} />
                  </div>
                  <div className="achieve-item-text">
                    <h3 className="achieve-item-title">Strong Portfolio</h3>
                    <p className="achieve-item-desc">Build an impressive portfolio that showcases your capabilities.</p>
                  </div>
                </div>

                <div className="achieve-item">
                  <div className="achieve-icon-circle violet">
                    <Lightbulb className="achieve-icon" strokeWidth={1.8} />
                  </div>
                  <div className="achieve-item-text">
                    <h3 className="achieve-item-title">Problem Solving</h3>
                    <p className="achieve-item-desc">Enhance your ability to analyze problems and create effective solutions.</p>
                  </div>
                </div>

                <div className="achieve-item">
                  <div className="achieve-icon-circle purple">
                    <Settings className="achieve-icon" strokeWidth={1.8} />
                  </div>
                  <div className="achieve-item-text">
                    <h3 className="achieve-item-title">Industry Ready</h3>
                    <p className="achieve-item-desc">Work on industry-relevant projects and stay ahead of the curve.</p>
                  </div>
                </div>

                <div className="achieve-item">
                  <div className="achieve-icon-circle fuchsia">
                    <User className="achieve-icon" strokeWidth={1.8} />
                  </div>
                  <div className="achieve-item-text">
                    <h3 className="achieve-item-title">Career Advantage</h3>
                    <p className="achieve-item-desc">Stand out to employers with project experience and real impact.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="achieve-right">
              <img src="/achieve_illustration.png" alt="Achievements" className="achieve-illustration-img" />
            </div>
          </div>
        </section>

        {/* ==================== PROJECTS SECTION ==================== */}
        <section className="projects-section">
          <h2 className="projects-title">Real Projects. Real Impact.</h2>
          <p className="projects-subtitle">Projects built by our learners that are making a differences.</p>
          
          <div className="projects-slider-wrapper">
            <div className="projects-list" ref={projectsRef}>
              {/* Card 1 */}
              <div className="project-card">
                <div className="project-cover-container">
                  <img src="/project_cover_healthcare.png" alt="Healthcare Cover" className="project-cover-img" />
                  <span className="project-tag tag-healthcare">Healthcare</span>
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">AI-Powered Disease Prediction</h3>
                  <p className="project-card-desc">Predict disease based on patient symptoms and medical history.</p>
                  <a href="#view" className="view-project-link">
                    <span>View Project</span>
                    <ChevronRight size={15} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="project-card">
                <div className="project-cover-container">
                  <img src="/project_cover_finance.png" alt="Finance Cover" className="project-cover-img" />
                  <span className="project-tag tag-finance">Finance</span>
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">Stock Price Prediction</h3>
                  <p className="project-card-desc">Build a model to forecast stock prices using historical data.</p>
                  <a href="#view" className="view-project-link">
                    <span>View Project</span>
                    <ChevronRight size={15} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Card 3 */}
              <div className="project-card">
                <div className="project-cover-container">
                  <img src="/project_cover_retail.png" alt="Retail Cover" className="project-cover-img" />
                  <span className="project-tag tag-retail">Retail</span>
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">Product Recommendation System</h3>
                  <p className="project-card-desc">Recommend products to users using ML and collaborative filtering.</p>
                  <a href="#view" className="view-project-link">
                    <span>View Project</span>
                    <ChevronRight size={15} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Card 4 */}
              <div className="project-card">
                <div className="project-cover-container">
                  <img src="/project_cover_education.png" alt="Education Cover" className="project-cover-img" />
                  <span className="project-tag tag-education">Education</span>
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">Student Performance Analyzer</h3>
                  <p className="project-card-desc">Analyze student performance and predict future outcomes.</p>
                  <a href="#view" className="view-project-link">
                    <span>View Project</span>
                    <ChevronRight size={15} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              {/* Card 5 */}
              <div className="project-card">
                <div className="project-cover-container">
                  <img src="/project_cover_nlp.png" alt="NLP Cover" className="project-cover-img" />
                  <span className="project-tag tag-nlp">NLP</span>
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-title">Chatbot with NLP</h3>
                  <p className="project-card-desc">Build an intelligent chatbot that understands natural language.</p>
                  <a href="#view" className="view-project-link">
                    <span>View Project</span>
                    <ChevronRight size={15} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* Slider Navigation Button */}
            <button className="projects-nav-btn btn-right" onClick={() => scrollProjects("right")}>
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        </section>

        {/* ==================== TESTIMONIALS SECTION ==================== */}
        <section className="testimonials-section">
          <h2 className="testimonials-title">What Our Builders Say</h2>
          <p className="testimonials-subtitle">Hear from our builders who turned ideas into successful products.</p>
          
          <div className="testimonials-slider-wrapper">
            <button className="testimonials-nav-btn btn-left" onClick={() => scrollTestimonials("left")}>
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>

            <div className="testimonials-list" ref={testimonialsRef}>
              {/* Testimonial 1 */}
              <div className="testimonial-card">
                <div className="testimonial-left-col">
                  <img src="/builder_avatar_arjun.png" alt="Arjun Mehta" className="testimonial-avatar" />
                  <h4 className="testimonial-user-name">Arjun Mehta</h4>
                  <span className="testimonial-user-role">AI/ML Engineer</span>
                </div>
                <div className="testimonial-right-col">
                  <span className="testimonial-quote-icon">“</span>
                  <p className="testimonial-quote">
                    The mentorship and support I received here helped me build my first AI product with confidence.
                  </p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="testimonial-card">
                <div className="testimonial-left-col">
                  <img src="/builder_avatar_priya.png" alt="Priya Sharma" className="testimonial-avatar" />
                  <h4 className="testimonial-user-name">Priya Sharma</h4>
                  <span className="testimonial-user-role">Data Scientist</span>
                </div>
                <div className="testimonial-right-col">
                  <span className="testimonial-quote-icon">“</span>
                  <p className="testimonial-quote">
                    I went from an idea to a live product in just 8 weeks. The community is incredible!
                  </p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="testimonial-card">
                <div className="testimonial-left-col">
                  <img src="/builder_avatar_rohit.png" alt="Rohit Verma" className="testimonial-avatar" />
                  <h4 className="testimonial-user-name">Rohit Verma</h4>
                  <span className="testimonial-user-role">Software Developer</span>
                </div>
                <div className="testimonial-right-col">
                  <span className="testimonial-quote-icon">“</span>
                  <p className="testimonial-quote">
                    The hands-on projects and hackathons gave me the exposure I needed to grow.
                  </p>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="testimonial-card">
                <div className="testimonial-left-col">
                  <img src="/builder_avatar_sneha.png" alt="Sneha Iyer" className="testimonial-avatar" />
                  <h4 className="testimonial-user-name">Sneha Iyer</h4>
                  <span className="testimonial-user-role">Product Founder</span>
                </div>
                <div className="testimonial-right-col">
                  <span className="testimonial-quote-icon">“</span>
                  <p className="testimonial-quote">
                    Thanks to this platform, I launched my product and got my first 100 users!
                  </p>
                </div>
              </div>
            </div>

            <button className="testimonials-nav-btn btn-right" onClick={() => scrollTestimonials("right")}>
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </section>

      </div>
    </>
  );
}
