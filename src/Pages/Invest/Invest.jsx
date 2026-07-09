import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  LineChart, 
  Building2, 
  Briefcase,
  ChevronRight,
  Send,
  Coins,
  Sprout,
  Scale
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "./Invest.css";

export default function Invest() {
  const [filter, setFilter] = useState("All");
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2800);
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    investmentRange: "$25,000 - $100,000",
    message: "",
    interests: []
  });

  // Sample Startups in Portfolio / Dealflow
  const startups = [
    {
      id: 1,
      name: "CognitiveFlow",
      tagline: "LLM-Native Workflow Automation",
      category: "AI Agents",
      stage: "Pre-Seed",
      raised: 180000,
      goal: 250000,
      growth: "+45% MoM",
      founders: "2x ex-Google founders",
      icon: "CF",
      color: "#0052d4"
    },
    {
      id: 2,
      name: "Synthetix Lab",
      tagline: "Physics-Informed Neural Nets",
      category: "Generative AI",
      stage: "Seed",
      raised: 420000,
      goal: 600000,
      growth: "Enterprise Pilot Active",
      founders: "MIT Ph.D. Team",
      icon: "SL",
      color: "#9333ea"
    },
    {
      id: 3,
      name: "DevMind",
      tagline: "Autonomous Agentic Software Engineers",
      category: "DevTools",
      stage: "Seed",
      raised: 850000,
      goal: 1000000,
      growth: "1,200+ Developer Stars",
      founders: "Y-Combinator Alumni",
      icon: "DM",
      color: "#00b0ff"
    },
    {
      id: 4,
      name: "MedInsight AI",
      tagline: "Clinical Reasoning Assistant for Doctors",
      category: "AI Agents",
      stage: "Pre-Seed",
      raised: 150000,
      goal: 300000,
      growth: "HIPAA Compliant Beta",
      founders: "Stanford MD & CS Duo",
      icon: "MI",
      color: "#10b981"
    },
    {
      id: 5,
      name: "VectorStore Lite",
      tagline: "Edge-Device Vector Database",
      category: "DevTools",
      stage: "Pre-Seed",
      raised: 90000,
      goal: 150000,
      growth: "+30% Github Stars/wk",
      founders: "Ex-Meta Research",
      icon: "VS",
      color: "#f59e0b"
    },
    {
      id: 6,
      name: "PromptOpt",
      tagline: "Real-time LLM Prompt Optimization Engine",
      category: "Generative AI",
      stage: "Pre-Seed",
      raised: 120000,
      goal: 200000,
      growth: "Saving 40% LLM Costs",
      founders: "Ex-OpenAI Engineer",
      icon: "PO",
      color: "#ec4899"
    }
  ];

  const filteredStartups = filter === "All" 
    ? startups 
    : startups.filter(s => s.category === filter);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentInterests = [...prev.interests];
      if (checked) {
        currentInterests.push(value);
      } else {
        const index = currentInterests.indexOf(value);
        if (index > -1) currentInterests.splice(index, 1);
      }
      return {
        ...prev,
        interests: currentInterests
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Investor Request Data submitted: ", formData);
    setSubmitted(true);
  };

  // Pre-load animations or dummy chart calculations
  const [chartVals, setChartVals] = useState([20, 30, 45, 60, 75, 90]);
  useEffect(() => {
    // Subtle animation for chart bars
    const timer = setTimeout(() => {
      setChartVals([35, 55, 48, 72, 85, 96]);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="invest-page-container">
        <Navbar />

        {/* ==================== HERO SECTION ==================== */}
        <section className="invest-hero-section">
          <div className="invest-hero-container">
            <div className="invest-hero-content">
              <div className="invest-hero-left">
                <div className="invest-step-badge">STEP 3</div>
                <h1 className="invest-hero-title">
                  Top Innovation.<br />
                  Real <span className="invest-hero-title-accent">Investment.</span>
                </h1>
                <p className="invest-hero-desc">
                  The best AI products from our platform get<br />
                  noticed by industry leaders and investors.<br />
                  We invest in ideas that build the future.
                </p>
              </div>

              <div className="invest-hero-right">
                <div className="invest-video-container">
                  <video 
                    src="/Videos/Invest%20Page/1%20Invest%20.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="invest-hero-video"
                  />
                </div>
              </div>
            </div>

            {/* Bottom highlight cards */}
            <div className="invest-hero-cards-grid">
              <div className="invest-hero-card">
                <div className="invest-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="11" r="3" />
                    <path d="M7 18c0-3 2.5-4.5 5-4.5s5 1.5 5 4.5" />
                  </svg>
                </div>
                <div className="invest-card-info">
                  <h3 className="invest-card-title">Industry Leaders</h3>
                  <p className="invest-card-desc">Top VCs & Investors</p>
                </div>
              </div>

              <div className="invest-hero-card">
                <div className="invest-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M13 7L9 13h3v4l4-6h-3z" fill="currentColor" />
                  </svg>
                </div>
                <div className="invest-card-info">
                  <h3 className="invest-card-title">Innovation Arena</h3>
                  <p className="invest-card-desc">Present, Demo & Get Noticed</p>
                </div>
              </div>

              <div className="invest-hero-card">
                <div className="invest-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M19 2l1.5 1.5L22 2l-1.5 1.5L19 2z M20 8l1 1-1 1-1-1 1-1z" fill="currentColor" />
                  </svg>
                </div>
                <div className="invest-card-info">
                  <h3 className="invest-card-title">Instant Funding</h3>
                  <p className="invest-card-desc">Selected projects get funded</p>
                </div>
              </div>

              <div className="invest-hero-card">
                <div className="invest-card-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8a3 3 0 0 0-3 3c0 3 3 5 3 5s3-2 3-5a3 3 0 0 0-3-3z" />
                  </svg>
                </div>
                <div className="invest-card-info">
                  <h3 className="invest-card-title">Growth Support</h3>
                  <p className="invest-card-desc">Capital + Mentorship + Network</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ==================== HOW IT WORKS ==================== */}
        <section className="invest-hiw-section">
          <div className="invest-hiw-inner">
            {/* Header */}
            <div className="invest-hiw-header">
              <h2 className="invest-hiw-title">How It Works</h2>
              <span className="invest-hiw-subtitle-pill">From idea to funding or marketplace in one guided path</span>
            </div>

            {/* Steps */}
            <div className="invest-hiw-steps">

              {/* Connecting SVG line */}
              <svg className="invest-hiw-connector" viewBox="0 0 1100 120" preserveAspectRatio="none">
                <path
                  d="M 100 60 C 180 20, 260 100, 320 60 C 400 20, 480 100, 560 60 C 640 20, 720 100, 780 60 C 860 20, 940 100, 1000 60"
                  fill="none" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="8 5"
                />
              </svg>

              {/* Step 01 — Submit */}
              <div 
                className={`invest-hiw-step invest-hiw-step--up invest-hiw-anim invest-step-1 ${isStepActive(0) ? "active" : ""}`} 
                style={{"--delay":"0s"}}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="invest-hiw-num">01</div>
                <div className="invest-hiw-bubble">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div className="invest-hiw-dot" />
                <div className="invest-hiw-card">
                  <h4>1. Submit</h4>
                  <p>Submit your AI startup idea or product.</p>
                </div>
              </div>

              {/* Step 02 — Expert Review */}
              <div 
                className={`invest-hiw-step invest-hiw-step--down invest-hiw-anim invest-step-2 ${isStepActive(1) ? "active" : ""}`} 
                style={{"--delay":"0.15s"}}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="invest-hiw-num">02</div>
                <div className="invest-hiw-bubble">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <path d="M8 11h6M11 8v6"/>
                  </svg>
                </div>
                <div className="invest-hiw-dot" />
                <div className="invest-hiw-card">
                  <h4>2. Expert Review</h4>
                  <p>Our experts review and evaluate your submission.</p>
                </div>
              </div>

              {/* Step 03 — Pitch Day */}
              <div 
                className={`invest-hiw-step invest-hiw-step--up invest-hiw-anim invest-step-3 ${isStepActive(2) ? "active" : ""}`} 
                style={{"--delay":"0.3s"}}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="invest-hiw-num">03</div>
                <div className="invest-hiw-bubble">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="invest-hiw-dot" />
                <div className="invest-hiw-card">
                  <h4>3. Pitch Day</h4>
                  <p>Present to investors and mentors during Pitch Day.</p>
                </div>
              </div>

              {/* Step 04 — Funding Decision */}
              <div 
                className={`invest-hiw-step invest-hiw-step--down invest-hiw-anim invest-step-4 ${isStepActive(3) ? "active" : ""}`} 
                style={{"--delay":"0.45s"}}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="invest-hiw-num">04</div>
                <div className="invest-hiw-bubble invest-hiw-bubble--green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <text x="9" y="15" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">₹</text>
                  </svg>
                </div>
                <div className="invest-hiw-dot" />
                <div className="invest-hiw-card">
                  <h4>4. Funding Decision</h4>
                  <p>Selected ideas receive funding support from our investor network.</p>
                </div>
              </div>

              {/* Step 05 — Marketplace Launch */}
              <div 
                className={`invest-hiw-step invest-hiw-step--up invest-hiw-anim invest-step-5 ${isStepActive(4) ? "active" : ""}`} 
                style={{"--delay":"0.6s"}}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="invest-hiw-num">05</div>
                <div className="invest-hiw-bubble">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 9l1-5h16l1 5"/>
                    <path d="M3 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/>
                    <rect x="5" y="13" width="14" height="8" rx="1"/>
                    <line x1="9" y1="13" x2="9" y2="21"/>
                    <line x1="15" y1="13" x2="15" y2="21"/>
                  </svg>
                </div>
                <div className="invest-hiw-dot" />
                <div className="invest-hiw-card">
                  <h4>5. Marketplace Launch</h4>
                  <p>Market-ready products can sell on A4E Marketplace.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== A4E MARKETPLACE + FUNDED PROJECTS ==================== */}
        <section className="invest-mid-section">
          <div className="invest-mid-container">

            {/* Left: A4E Marketplace Card — full-frame video, button only on top */}
            <div className="invest-marketplace-card">
              {/* Full-frame background video */}
              <video
                src="/Videos/Invest%20Page/2%20A4E%20Market.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="invest-marketplace-video"
              />

              {/* Button only — no overlay, no text */}
              <div className="invest-marketplace-content">
                <a href="https://marketplace.aiforeveryone.ai/" target="_blank" rel="noopener noreferrer" className="invest-marketplace-btn">
                  Visit A4E Marketplace →
                </a>
              </div>
            </div>


            {/* Right: Marketplace Feature List */}
            <div className="invest-feature-panel">

              {/* Feature 1 — Global Audience */}
              <div className="invest-feature-item">
                <div className="invest-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div className="invest-feature-text">
                  <h4 className="invest-feature-title">Global Audience</h4>
                  <p className="invest-feature-desc">Reach real buyers worldwide</p>
                </div>
              </div>

              <div className="invest-feature-divider" />

              {/* Feature 2 — Secure Transactions */}
              <div className="invest-feature-item">
                <div className="invest-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div className="invest-feature-text">
                  <h4 className="invest-feature-title">Secure Transactions</h4>
                  <p className="invest-feature-desc">Verified &amp; trusted platform</p>
                </div>
              </div>

              <div className="invest-feature-divider" />

              {/* Feature 3 — Product Visibility */}
              <div className="invest-feature-item">
                <div className="invest-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <div className="invest-feature-text">
                  <h4 className="invest-feature-title">Product Visibility</h4>
                  <p className="invest-feature-desc">Showcase. Connect. Grow.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Stats Row */}
          <div className="invest-stats-strip">
            <div className="invest-stats-strip-container">
              <div className="invest-stat-strip-item">
                <div className="invest-stat-strip-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <div className="invest-stat-strip-num">150+</div>
                  <div className="invest-stat-strip-label">Startups Funded</div>
                </div>
              </div>

              <div className="invest-stat-strip-divider" />

              <div className="invest-stat-strip-item">
                <div className="invest-stat-strip-icon invest-icon-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="8 6 2 12 8 18"/>
                    <polyline points="16 6 22 12 16 18"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <div>
                  <div className="invest-stat-strip-num invest-num-green">₹50Cr+</div>
                  <div className="invest-stat-strip-label">Invested</div>
                </div>
              </div>

              <div className="invest-stat-strip-divider" />

              <div className="invest-stat-strip-item">
                <div className="invest-stat-strip-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    <circle cx="5" cy="11" r="3"/>
                    <path d="M1 20c0-3 1.8-5 4-5"/>
                    <circle cx="19" cy="11" r="3"/>
                    <path d="M23 20c0-3-1.8-5-4-5"/>
                  </svg>
                </div>
                <div>
                  <div className="invest-stat-strip-num">75+</div>
                  <div className="invest-stat-strip-label">Investors Networked</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ==================== PROOF + INDUSTRY LEADERS SECTION ==================== */}
        <section className="invest-proof-section">
          <div className="invest-proof-container">

            {/* Left: Proof From A4E Innovation Arena */}
            <div className="invest-proof-card">
              <div className="invest-proof-card-header">
                <h3 className="invest-proof-card-title">Funding in Inovation Arena</h3>
                <span className="invest-proof-shield">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
              </div>
              <div className="invest-proof-card-body invest-proof-left-body">
                <div className="invest-proof-photo-wrap" style={{ flex: '0 0 58%' }}>
                  <img
                    src="/Images/Invest%20Page/investors-panel.jpg"
                    alt="AI Innovation Arena 2026 funded team"
                    className="invest-proof-photo"
                  />
                </div>
                <div className="invest-proof-text-wrap">
                  <span className="invest-proof-badge">Selected Project Funded</span>
                  <div className="invest-proof-amount">₹50,000</div>
                  <div className="invest-proof-amount-label">Funding Support</div>
                  <p className="invest-proof-desc">
                    Recognizing promising AI startup ideas and supporting them to build, launch and scale.
                  </p>
                  <a href="#" className="invest-proof-link">View More Success Stories →</a>
                </div>
              </div>
            </div>

            {/* Right: Industry Leaders & Investors */}
            <div className="invest-proof-card">
              <div className="invest-proof-card-header">
                <h3 className="invest-proof-card-title">Industry Leaders &amp; Investors</h3>
                <span className="invest-proof-shield">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
              </div>
              <div className="invest-proof-card-body invest-proof-right-body">
                <div className="invest-proof-photo-full">
                  <img
                    src="/Images/Invest%20Page/team-funded.jpg"
                    alt="Industry leaders and investors panel"
                    className="invest-proof-photo invest-proof-photo-cover"
                  />
                </div>
                <div className="invest-proof-caption">
                  <p className="invest-proof-caption-text">
                    Pitch to mentors, founders, investors and<br />industry decision-makers.
                  </p>
                  <a href="#" className="invest-proof-link">View Investor &amp; Mentor Network →</a>
                </div>
              </div>
            </div>

          </div>
        </section>
        {/* ==================== INDUSTRIES WE SUPPORT ==================== */}
        <section className="invest-industries-section">
          <div className="invest-industries-header">
            <h2 className="invest-industries-title">Industries We Support</h2>
            <p className="invest-industries-subtitle">AI-powered solutions for every major industry.</p>
          </div>

          <div className="invest-industries-grid">

            {/* Healthcare */}
            <div className="invest-industry-card invest-card-rose">
              <div className="invest-industry-icon invest-ind-rose">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </div>
              <h4 className="invest-industry-name">Healthcare</h4>
              <p className="invest-industry-desc">AI for better diagnosis, treatment &amp; patient care.</p>
            </div>

            {/* FinTech */}
            <div className="invest-industry-card invest-card-indigo">
              <div className="invest-industry-icon invest-ind-indigo">
                <Coins size={28} strokeWidth={1.8} />
              </div>
              <h4 className="invest-industry-name">FinTech</h4>
              <p className="invest-industry-desc">AI to detect fraud, optimize risk &amp; automate financial services.</p>
            </div>

            {/* Education */}
            <div className="invest-industry-card invest-card-purple">
              <div className="invest-industry-icon invest-ind-purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <h4 className="invest-industry-name">Education</h4>
              <p className="invest-industry-desc">AI tools to personalize learning and improve outcomes.</p>
            </div>

            {/* Agriculture */}
            <div className="invest-industry-card invest-card-green">
              <div className="invest-industry-icon invest-ind-green">
                <Sprout size={28} strokeWidth={1.8} />
              </div>
              <h4 className="invest-industry-name">Agriculture</h4>
              <p className="invest-industry-desc">AI for precision farming, crop prediction &amp; resource optimization.</p>
            </div>

            {/* Retail */}
            <div className="invest-industry-card invest-card-amber">
              <div className="invest-industry-icon invest-ind-amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <h4 className="invest-industry-name">Retail</h4>
              <p className="invest-industry-desc">AI for customer insights, inventory &amp; demand optimizing.</p>
            </div>

            {/* Legal */}
            <div className="invest-industry-card invest-card-teal">
              <div className="invest-industry-icon invest-ind-teal">
                <Scale size={28} strokeWidth={1.8} />
              </div>
              <h4 className="invest-industry-name">Legal</h4>
              <p className="invest-industry-desc">AI for contract analysis, legal research &amp; case prediction.</p>
            </div>

          </div>
        </section>
        {/* ==================== LMS Portal Promo ==================== */}
        <section className="invest-lms-section">
          <div className="invest-lms-card">

            {/* Left Side: Graphic */}
            <div className="invest-lms-graphics">
              <img src="/Images/Invest Page/invest_lms_laptop.png" alt="LMS Portal Laptop" className="invest-lms-laptop-img" />
            </div>

            {/* Center: Content */}
            <div className="invest-lms-content">
              <div className="invest-lms-tag">READY TO PITCH YOUR BIG IDEA?</div>
              <h2 className="invest-lms-title">
                Access Our <br />
                <span className="invest-lms-title-accent">Pitch Hub</span>
              </h2>
              <p className="invest-lms-desc">
                Pitch your ideas, connect with investors, and turn your vision into reality.
              </p>
            </div>

            {/* Right Side: Actions */}
            <div className="invest-lms-actions">
              <a href="https://pitchub.aiforeveryone.ai/" target="_blank" rel="noopener noreferrer" className="invest-lms-btn" style={{ textDecoration: 'none' }}>
                Go to Pitch Hub
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow-icon">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <span className="invest-lms-subtext">Pitch. Connect. Get Funded.</span>
            </div>

          </div>
        </section>


        <Footer />
      </div>
    </>
  );
}