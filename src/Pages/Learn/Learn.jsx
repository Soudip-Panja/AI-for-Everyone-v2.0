import { useRef, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "./Learn.css";

export default function Learn() {
  const brainVideoRef = useRef(null);
  const brainReversingRef = useRef(false);
  const SEEK_STEP = 1 / 24;

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const video = brainVideoRef.current;
    if (!video) return;

    const onSeeked = () => {
      if (!brainReversingRef.current) return;

      if (video.currentTime <= 0.06) {
        // Hit the start — play forward again
        brainReversingRef.current = false;
        video.currentTime = 0;
        video.play().catch(() => {});
        return;
      }

      // Trigger the next reverse step
      video.currentTime = Math.max(0, video.currentTime - SEEK_STEP);
    };

    const handleTimeUpdate = () => {
      // Trigger reverse play slightly before the actual absolute end to avoid freezing/stalling
      if (!brainReversingRef.current && video.duration && video.currentTime >= video.duration - 0.06) {
        brainReversingRef.current = true;
        video.pause();
        video.currentTime = Math.max(0, video.duration - SEEK_STEP);
      }
    };

    const onEnded = () => {
      if (!brainReversingRef.current) {
        brainReversingRef.current = true;
        video.pause();
        video.currentTime = Math.max(0, video.duration - SEEK_STEP);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("seeked", onSeeked);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("seeked", onSeeked);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="learn-page-container">
        
        {/* ==================== Hero Section ==================== */}
        <section className="learn-hero-section">
          
          {/* Left Side: Content */}
          <div className="learn-hero-left">
            <div className="learn-step-badge">Step 1: Learn</div>
            
            <h1 className="learn-hero-title">
              Learn <span className="accent-grad">AI.</span><br />
              Shape the Future.
            </h1>
            
            <p className="learn-hero-desc">
              Master AI from industry experts through our structured, hands-on programs. 
              Get certified with credentials that are recognized by top companies worldwide.
            </p>
            
            {/* Features Capsule */}
            <div className="learn-features-container">
              <div className="learn-features-list">
                
                <div className="learn-feature-item">
                  <div className="learn-feature-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <span className="learn-feature-text">Industry Recognized Certificates</span>
                </div>

                <div className="learn-feature-item">
                  <div className="learn-feature-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 10h-6" />
                      <path d="M19 7v6" />
                    </svg>
                  </div>
                  <span className="learn-feature-text">Expert Led Training</span>
                </div>

                <div className="learn-feature-item">
                  <div className="learn-feature-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <span className="learn-feature-text">Hands-on Projects</span>
                </div>

                <div className="learn-feature-item">
                  <div className="learn-feature-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 11l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="learn-feature-text">Career Support</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Video Block */}
          <div className="learn-hero-right">
            <div className="learn-video-glow"></div>
            <div className="learn-video-container">
              <video 
                src="/Videos/2 Learn Page/1 Learning.webm" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="learn-hero-video"
              />
            </div>
          </div>

        </section>

        {/* ==================== Stats Section ==================== */}
        <section className="learn-metrics-section">
          <div className="learn-metrics-capsule">
            
            <div className="learn-metric-item">
              <span className="learn-metric-value">10K+</span>
              <span className="learn-metric-label">Learners Trained</span>
            </div>

            <div className="learn-metric-item">
              <span className="learn-metric-value">50+</span>
              <span className="learn-metric-label">AI Courses</span>
            </div>

            <div className="learn-metric-item">
              <span className="learn-metric-value">500+</span>
              <span className="learn-metric-label">Industry Mentors</span>
            </div>

            <div className="learn-metric-item">
              <span className="learn-metric-value">95%</span>
              <span className="learn-metric-label">Certification Success</span>
            </div>

          </div>
        </section>

        {/* ==================== How You Can Learn Section ==================== */}
        <section className="learn-modes-section">
          
          <div className="learn-modes-header">
            <h2 className="learn-modes-title">How You Can Learn With Us</h2>
            <p className="learn-modes-subtitle">
              Flexible learning modes designed for every learner, everywhere.
            </p>
          </div>

          <div className="learn-modes-grid">

            {/* Card 1: Online Live Classes */}
            <div className="learn-mode-card">
              <div className="learn-mode-card-header">
                <div className="learn-mode-card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="learn-mode-card-title">Online Live Classes</h3>
              </div>
              
              <ul className="learn-mode-card-bullets">
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Interactive live sessions with experts
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Learn from anywhere in the world
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Real-time doubt solving
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Recorded sessions for revision
                </li>
              </ul>
              
              <div className="learn-mode-card-badge">
                Best for Individuals & Professionals
              </div>
            </div>

            {/* Card 2: Self-Paced Online */}
            <div className="learn-mode-card">
              <div className="learn-mode-card-header">
                <div className="learn-mode-card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <polygon points="10 8 14 10 10 12" fill="none" />
                  </svg>
                </div>
                <h3 className="learn-mode-card-title">Self-Paced Online</h3>
              </div>
              
              <ul className="learn-mode-card-bullets">
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Learn at your own pace
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Lifetime access to course content
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Hands-on projects & assignments
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Flexible schedule
                </li>
              </ul>
              
              <div className="learn-mode-card-badge">
                Best for Self Learners
              </div>
            </div>

            {/* Card 3: Offline Classroom Training */}
            <div className="learn-mode-card">
              <div className="learn-mode-card-header">
                <div className="learn-mode-card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="learn-mode-card-title">Offline Classroom Training</h3>
              </div>
              
              <ul className="learn-mode-card-bullets">
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  In-person training by AI experts
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Hands-on workshops & labs
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Peer collaboration & networking
                </li>
                <li className="learn-mode-card-bullet-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-mode-card-bullet-icon">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  Placement & career guidance
                </li>
              </ul>
              
              <div className="learn-mode-card-badge">
                Best for Students & Institutions
              </div>
            </div>

          </div>
        </section>

        {/* ==================== What You Achieve Section ==================== */}
        <section className="learn-achieve-section">
          <div className="learn-achieve-card">
            <div className="learn-achieve-header">
              <h2 className="learn-achieve-title">What You Achieve After Learning AI</h2>
              <p className="learn-achieve-subtitle">
                Our programs are designed to give you real-world skills and future-ready career opportunities.
              </p>
            </div>

            <div className="learn-achieve-grid">
              <div className="learn-achieve-item">
                <div className="learn-achieve-icon-wrap">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <span className="learn-achieve-label">Industry Recognized Certification</span>
              </div>

              <div className="learn-achieve-item">
                <div className="learn-achieve-icon-wrap">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                </div>
                <span className="learn-achieve-label">Build Real-World AI Projects</span>
              </div>

              <div className="learn-achieve-item">
                <div className="learn-achieve-icon-wrap">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    <path d="m10 14 1.5 1.5 3-3" />
                  </svg>
                </div>
                <span className="learn-achieve-label">Job & Internship Opportunities</span>
              </div>

              <div className="learn-achieve-item">
                <div className="learn-achieve-icon-wrap">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M19 8v4" />
                    <path d="M19 16v.01" />
                  </svg>
                </div>
                <span className="learn-achieve-label">Mentorship from Industry Experts</span>
              </div>

              <div className="learn-achieve-item">
                <div className="learn-achieve-icon-wrap">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <span className="learn-achieve-label">Global Community Access</span>
              </div>

              <div className="learn-achieve-item">
                <div className="learn-achieve-icon-wrap">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                </div>
                <span className="learn-achieve-label">Lifelong Learning Resources</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== Skills You Gain Section ==================== */}
        <section className="learn-skills-section">
          <div className="learn-skills-card">
            <div className="learn-skills-layout">
              {/* Left Side: Content & List */}
              <div className="learn-skills-left">
                <h2 className="learn-skills-title">Skills You Gain</h2>
                <p className="learn-skills-subtitle">
                  Future-ready skills that empower you to solve real-world problems and build intelligent solutions.
                </p>

                <div className="learn-skills-list">
                  <div className="learn-skills-item">
                    <div className="learn-skills-check">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" />
                        <circle cx="12" cy="12" r="8" stroke="#6366f1" strokeWidth="1.5" />
                        <polyline points="9 12 11 14 15 10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="learn-skills-text">
                      <h4 className="learn-skill-name">AI & Machine Learning Fundamentals</h4>
                      <p className="learn-skill-desc">Understand core concepts and algorithms</p>
                    </div>
                  </div>

                  <div className="learn-skills-item">
                    <div className="learn-skills-check">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" />
                        <circle cx="12" cy="12" r="8" stroke="#6366f1" strokeWidth="1.5" />
                        <polyline points="9 12 11 14 15 10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="learn-skills-text">
                      <h4 className="learn-skill-name">Data Analysis & Visualization</h4>
                      <p className="learn-skill-desc">Extract insights from data and make smarter decisions</p>
                    </div>
                  </div>

                  <div className="learn-skills-item">
                    <div className="learn-skills-check">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" />
                        <circle cx="12" cy="12" r="8" stroke="#6366f1" strokeWidth="1.5" />
                        <polyline points="9 12 11 14 15 10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="learn-skills-text">
                      <h4 className="learn-skill-name">Deep Learning & Neural Networks</h4>
                      <p className="learn-skill-desc">Build powerful models for complex problems</p>
                    </div>
                  </div>

                  <div className="learn-skills-item">
                    <div className="learn-skills-check">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" />
                        <circle cx="12" cy="12" r="8" stroke="#6366f1" strokeWidth="1.5" />
                        <polyline points="9 12 11 14 15 10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="learn-skills-text">
                      <h4 className="learn-skill-name">Generative AI & LLMs</h4>
                      <p className="learn-skill-desc">Create intelligent apps with cutting-edge AI</p>
                    </div>
                  </div>

                  <div className="learn-skills-item">
                    <div className="learn-skills-check">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" />
                        <circle cx="12" cy="12" r="8" stroke="#6366f1" strokeWidth="1.5" />
                        <polyline points="9 12 11 14 15 10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="learn-skills-text">
                      <h4 className="learn-skill-name">AI Product Development</h4>
                      <p className="learn-skill-desc">Build, test and deploy AI-powered products</p>
                    </div>
                  </div>
                </div>

                <button className="learn-skills-explore-btn">
                  Explore All Courses
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow-icon">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Right Side: Brain Video Block */}
              <div className="learn-skills-right">
                <div className="learn-skills-video-glow"></div>
                <div className="learn-skills-video-container">
                  <video 
                    ref={brainVideoRef}
                    src="/Videos/2 Learn Page/2 Brain.webm" 
                    autoPlay 
                    muted 
                    playsInline 
                    className="learn-skills-video"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== Impact Section ==================== */}
        <section className="learn-impact-section">
          <div className="learn-impact-header">
            <h2 className="learn-impact-title">Impact in Your Life</h2>
            <p className="learn-impact-subtitle">
              AI skills can transform your career, productivity, and impact.
            </p>
          </div>

          <div className="learn-impact-grid">
            {/* Card 1 */}
            <div className="learn-impact-card">
              <div className="learn-impact-image-wrap">
                <img src="/Images/Learning Page/career_growth.png" alt="Career Growth" className="learn-impact-img" />
                <div className="learn-impact-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </div>
              </div>
              <div className="learn-impact-info">
                <h3 className="learn-impact-card-title">Career Growth</h3>
                <p className="learn-impact-card-desc">
                  Stand out in the job market with in-demand AI skills and get better career opportunities.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="learn-impact-card">
              <div className="learn-impact-image-wrap">
                <img src="/Images/Learning Page/earning_potential.png" alt="Higher Earning Potential" className="learn-impact-img" />
                <div className="learn-impact-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="8" y1="18" x2="8" y2="14"></line>
                    <line x1="16" y1="18" x2="16" y2="10"></line>
                  </svg>
                </div>
              </div>
              <div className="learn-impact-info">
                <h3 className="learn-impact-card-title">Higher Earning Potential</h3>
                <p className="learn-impact-card-desc">
                  AI professionals earn more and have stronger career advancement prospects.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="learn-impact-card">
              <div className="learn-impact-image-wrap">
                <img src="/Images/Learning Page/solve_problems.png" alt="Solve Real Problems" className="learn-impact-img" />
                <div className="learn-impact-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
              </div>
              <div className="learn-impact-info">
                <h3 className="learn-impact-card-title">Solve Real Problems</h3>
                <p className="learn-impact-card-desc">
                  Use AI to solve meaningful problems and create positive impact in the world.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="learn-impact-card">
              <div className="learn-impact-image-wrap">
                <img src="/Images/Learning Page/work_smarter.png" alt="Work Smarter" className="learn-impact-img" />
                <div className="learn-impact-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </div>
              <div className="learn-impact-info">
                <h3 className="learn-impact-card-title">Work Smarter</h3>
                <p className="learn-impact-card-desc">
                  Automate tasks, analyze data faster, and make better decisions every day.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="learn-impact-card">
              <div className="learn-impact-image-wrap">
                <img src="/Images/Learning Page/future_ready.png" alt="Future Ready" className="learn-impact-img" />
                <div className="learn-impact-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
              </div>
              <div className="learn-impact-info">
                <h3 className="learn-impact-card-title">Future Ready</h3>
                <p className="learn-impact-card-desc">
                  Stay ahead in the AI-driven world and future-proof your career.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== Learn From The Best Section ==================== */}
        <section className="learn-instructors-section">
          <div className="learn-instructors-header">
            <h2 className="learn-instructors-title">Learn From The Best</h2>
            <p className="learn-instructors-subtitle">
              Industry experts and AI practitioners who teach what works in the real world.
            </p>
          </div>

          <div className="learn-instructors-grid-wrap">
            <div className="learn-instructors-grid">
              {/* Card 1 */}
              <div className="learn-instructor-card">
                <div className="learn-instructor-avatar-wrap">
                  <img src="/Images/Learning Page/instructor_arjun.png" alt="Dr. Arjun Mehta" className="learn-instructor-avatar" />
                </div>
                <div className="learn-instructor-details">
                  <h3 className="learn-instructor-name">Dr. Arjun Mehta</h3>
                  <p className="learn-instructor-role">AI Research Scientist</p>
                  <p className="learn-instructor-prev">Former Google AI</p>
                  <div className="learn-instructor-company">
                    {/* Google Brand Logo */}
                    <svg viewBox="0 0 74 24" width="70" height="20" className="company-logo-svg">
                      <path d="M7.8 11.2v2.7h6.6c-.2 1.4-1.6 4-6.6 4-4.3 0-7.8-3.6-7.8-8s3.5-8 7.8-8c2.5 0 4.1 1 5 1.9l2.1-2.1C13.5 2.1 11 1 7.8 1 3.5 1 0 4.5 0 8.8s3.5 7.8 7.8 7.8c4.5 0 7.5-3.2 7.5-7.7 0-.5-.1-1-.2-1.3H7.8z" fill="#4285F4"/>
                      <path d="M21.2 5.5c-3.1 0-5.7 2.4-5.7 5.7s2.5 5.7 5.7 5.7 5.7-2.4 5.7-5.7-2.5-5.7-5.7-5.7zm0 8.7c-1.7 0-3.2-1.4-3.2-3s1.5-3 3.2-3 3.2 1.4 3.2 3-1.5 3-3.2 3z" fill="#EA4335"/>
                      <path d="M33.8 5.5c-3.1 0-5.7 2.4-5.7 5.7s2.5 5.7 5.7 5.7 5.7-2.4 5.7-5.7-2.5-5.7-5.7-5.7zm0 8.7c-1.7 0-3.2-1.4-3.2-3s1.5-3 3.2-3 3.2 1.4 3.2 3-1.5 3-3.2 3z" fill="#FBBC05"/>
                      <path d="M46.1 5.5c-3 0-5.6 2.4-5.6 5.7s2.5 5.7 5.6 5.7c1.3 0 2.3-.5 2.9-1.2v.9c0 2.2-1.2 3.4-3.1 3.4-1.6 0-2.6-1.1-3-2.1l-2.4 1c.7 1.7 2.5 3.8 5.4 3.8 3.1 0 5.7-1.8 5.7-5.9V5.8h-2.7v1c-.6-.8-1.7-1.3-2.8-1.3zm.2 8.7c-1.7 0-3.1-1.4-3.1-3s1.4-3 3.1-3 3.1 1.4 3.1 3-1.4 3-3.1 3z" fill="#4285F4"/>
                      <path d="M54.5 1V16h2.7V1h-2.7z" fill="#34A853"/>
                      <path d="M64.6 5.5c-2.7 0-4.9 1.2-5.7 3.1l8 3.3-.3.7c-.5 1.4-2.1 4.1-5.7 4.1-3.6 0-6.6-2.8-6.6-5.7s2.9-5.7 6.6-5.7c2.9 0 4.6 1.8 5.3 2.8l-2.2 1.5c-.7-1-1.6-1.8-3.1-1.8z" fill="#EA4335"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="learn-instructor-card">
                <div className="learn-instructor-avatar-wrap">
                  <img src="/Images/Learning Page/instructor_neha.png" alt="Neha Sharma" className="learn-instructor-avatar" />
                </div>
                <div className="learn-instructor-details">
                  <h3 className="learn-instructor-name">Neha Sharma</h3>
                  <p className="learn-instructor-role">Machine Learning Lead</p>
                  <p className="learn-instructor-prev">
                    Microsoft
                    <span className="verified-badge" style={{ marginLeft: '4px', verticalAlign: 'middle', display: 'inline-flex' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </span>
                  </p>
                  <div className="learn-instructor-company">
                    {/* Microsoft Logo */}
                    <svg viewBox="0 0 110 23" width="95" height="20" className="company-logo-svg">
                      <path d="M0 0h11v11H0z" fill="#F25022"/><path d="M12 0h11v11H12z" fill="#7FBA00"/><path d="M0 12h11v11H0z" fill="#00A4EF"/><path d="M12 12h11v11H12z" fill="#FFB900"/>
                      <text x="28" y="17" fontFamily="Segoe UI, sans-serif" fontWeight="600" fontSize="16" fill="#334155">Microsoft</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="learn-instructor-card">
                <div className="learn-instructor-avatar-wrap">
                  <img src="/Images/Learning Page/instructor_rohit.png" alt="Rohit Verma" className="learn-instructor-avatar" />
                </div>
                <div className="learn-instructor-details">
                  <h3 className="learn-instructor-name">Rohit Verma</h3>
                  <p className="learn-instructor-role">Data Science Manager</p>
                  <p className="learn-instructor-prev">Amazon</p>
                  <div className="learn-instructor-company">
                    {/* Amazon Logo */}
                    <svg viewBox="0 0 95 24" width="75" height="22" className="company-logo-svg">
                      <text x="0" y="17" fontFamily="Segoe UI, sans-serif" fontWeight="700" fontSize="16" fill="#111111">amazon</text>
                      <path d="M6 21c8 2.5 18 2.5 26 0" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
                      <path d="M31 19l2 2-2 2" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="learn-instructor-card">
                <div className="learn-instructor-avatar-wrap">
                  <img src="/Images/Learning Page/instructor_sneha.png" alt="Sneha Iyer" className="learn-instructor-avatar" />
                </div>
                <div className="learn-instructor-details">
                  <h3 className="learn-instructor-name">Sneha Iyer</h3>
                  <p className="learn-instructor-role">
                    NLP Engineer
                    <span className="verified-badge" style={{ marginLeft: '4px', verticalAlign: 'middle', display: 'inline-flex' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </span>
                  </p>
                  <p className="learn-instructor-prev">Meta</p>
                  <div className="learn-instructor-company">
                    {/* Meta Logo */}
                    <svg viewBox="0 0 90 24" width="75" height="22" className="company-logo-svg">
                      <path d="M13.1 7.7a4 4 0 0 0-5.6 0L7 8.4l-.7-.7a4 4 0 0 0-5.6 0 4 4 0 0 0 0 5.7l.7.7.7-.7a4 4 0 0 0 5.6 0l.7-.7.7.7a4 4 0 0 0 5.6 0 4 4 0 0 0 0-5.7zm-7 5.1a2.8 2.8 0 0 1-4 0l-.5-.5a2.8 2.8 0 0 1 0-4 2.8 2.8 0 0 1 4 0l.5.5-.5.5a2.8 2.8 0 0 1 0 4l.5.5-.5-.5zm6.1 0a2.8 2.8 0 0 1-4 0l-.5-.5a2.8 2.8 0 0 1 0-4l.5-.5a2.8 2.8 0 0 1 4 0 2.8 2.8 0 0 1 0 4l-.5.5z" fill="#0668E1" />
                      <text x="18" y="17" fontFamily="Segoe UI, sans-serif" fontWeight="600" fontSize="16" fill="#111111">Meta</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== LMS Promo Section ==================== */}
        <section className="learn-lms-section">
          <div className="learn-lms-card">
            
            {/* Left Side: Graphic */}
            <div className="learn-lms-graphics">
              <img src="/Images/Learning Page/user_laptop.png" alt="LMS Portal Laptop" className="learn-lms-laptop-img" />
            </div>

            {/* Center: Content */}
            <div className="learn-lms-content">
              <div className="learn-lms-tag">READY TO START YOUR AI JOURNEY?</div>
              <h2 className="learn-lms-title">Access Our LMS Portal</h2>
              <p className="learn-lms-desc">
                Explore 100+ courses, hands-on projects, quizzes and certifications — all in one place.
              </p>
            </div>

            {/* Right Side: Actions */}
            <div className="learn-lms-actions">
              <a href="https://lms.aiforeveryone.ai/auth/login?from=%2F" target="_blank" rel="noopener noreferrer" className="learn-lms-btn" style={{ textDecoration: 'none' }}>
                Go to LMS Portal
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow-icon">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <span className="learn-lms-subtext">Learn anytime, anywhere</span>
            </div>

          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}