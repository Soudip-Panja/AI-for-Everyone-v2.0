import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { 
  UserCheck, 
  Briefcase, 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  Users, 
  Building2, 
  Sparkles, 
  Settings, 
  CheckCircle2 
} from "lucide-react";
import "./Hire.css";

export default function Hire() {
  return (
    <div className="hire-page-container">
      <Navbar />
      
      <main className="hire-hero-section">
        <div className="hire-hero-content">
          <div className="hire-hero-left">
            <span className="hire-step-badge">Step 4</span>
            <h1 className="hire-hero-title">
              Hire <span className="hire-hero-title-accent">Talent.</span><br />
              Adopt <span className="hire-hero-title-accent">Innovation.</span>
            </h1>
            <p className="hire-hero-desc">
              We connect top AI talent with leading companies and help organizations adopt cutting-edge AI solutions built by our community.
            </p>
          </div>
          
          <div className="hire-hero-right">
            <div className="hire-video-container">
              <div className="hire-video-glow"></div>
              <video 
                className="hire-hero-video" 
                src="/Videos/Hired/Hired.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
          </div>
        </div>

        <div className="hire-cards-grid">
          <div className="hire-card">
            <div className="hire-card-icon-container">
              <UserCheck />
            </div>
            <div className="hire-card-info">
              <h3 className="hire-card-title">Hire Top Talent</h3>
              <p className="hire-card-desc">AI-trained & verified professionals</p>
            </div>
          </div>

          <div className="hire-card">
            <div className="hire-card-icon-container green-theme">
              <Briefcase />
            </div>
            <div className="hire-card-info">
              <h3 className="hire-card-title">For Companies</h3>
              <p className="hire-card-desc">Find skilled AI talent faster</p>
            </div>
          </div>

          <div className="hire-card">
            <div className="hire-card-icon-container">
              <Compass />
            </div>
            <div className="hire-card-info">
              <h3 className="hire-card-title">Adopt AI Solutions</h3>
              <p className="hire-card-desc">Discover & adopt innovative products</p>
            </div>
          </div>

          <div className="hire-card">
            <div className="hire-card-icon-container">
              <ShieldCheck />
            </div>
            <div className="hire-card-info">
              <h3 className="hire-card-title">Verified & Trusted</h3>
              <p className="hire-card-desc">Quality. Verified. Reliable.</p>
            </div>
          </div>
        </div>
      </main>

      <div className="hire-below-hero-container">
        {/* Portal Grid: Job Portal Card & For Institutions Card */}
        <section className="hire-portals-grid">
          {/* Card 1: Job Portal */}
          <div className="hire-portal-card dark-portal">
            <div className="hire-portal-left">
              <h2 className="hire-portal-title">Job Portal</h2>
              <p className="hire-portal-subtitle">Find AI Jobs. Build Your Career.</p>
              
              <div className="hire-portal-stats">
                <div className="hire-portal-stat-col">
                  <span className="hire-portal-stat-num">12K+</span>
                  <span className="hire-portal-stat-label">Jobs Available</span>
                </div>
                <div className="hire-portal-stat-divider"></div>
                <div className="hire-portal-stat-col">
                  <span className="hire-portal-stat-num">5K+</span>
                  <span className="hire-portal-stat-label">Companies Hiring</span>
                </div>
                <div className="hire-portal-stat-divider"></div>
                <div className="hire-portal-stat-col">
                  <span className="hire-portal-stat-num">50K+</span>
                  <span className="hire-portal-stat-label">Active Job Seekers</span>
                </div>
              </div>
              
              <a href="https://jobs.aiforeveryone.ai/" target="_blank" rel="noopener noreferrer" className="hire-portal-btn dark-btn">
                Visit Job Portal <ArrowRight size={16} />
              </a>
            </div>
            <div className="hire-portal-right">
              <img src="/Images/Hire Page/job_portal_mockup.png" alt="Job Portal Mockup" className="hire-portal-img" />
            </div>
          </div>

          {/* Card 2: For Job Seekers */}
          <div className="hire-portal-card light-portal">
            <div className="hire-portal-left">
              <h2 className="hire-portal-title">For Job Seekers</h2>
              <p className="hire-portal-subtitle">Accelerate your AI career with elite training, hackathons and placements.</p>
              
              <ul className="hire-portal-list">
                <li>
                  <span className="hire-list-bullet"></span>
                  AI Training & Certifications
                </li>
                <li>
                  <span className="hire-list-bullet"></span>
                  Hackathons & Innovation Arena
                </li>
                <li>
                  <span className="hire-list-bullet"></span>
                  Placement & Career Support
                </li>
              </ul>
              
              <a href="#jobs" className="hire-portal-btn light-btn">
                Explore Opportunities <ArrowRight size={16} />
              </a>
            </div>
            <div className="hire-portal-right">
              <img src="/Images/Hire Page/student_portal.png" alt="AI Student Builder" className="hire-portal-student-img" />
            </div>
            {/* Robot standing outside */}
            <div className="hire-portal-robot-container">
              <img src="/Images/Hire Page/robot.png" alt="AI Robot" className="hire-portal-robot-img" />
            </div>
          </div>
        </section>

        {/* Stats Ribbon */}
        <section className="hire-stats-ribbon">
          <div className="hire-ribbon-item">
            <div className="hire-ribbon-icon-container">
              <UserCheck size={24} />
            </div>
            <div className="hire-ribbon-info">
              <span className="hire-ribbon-num">10K+</span>
              <span className="hire-ribbon-label">Students Hired</span>
            </div>
          </div>
          <div className="hire-ribbon-item">
            <div className="hire-ribbon-icon-container">
              <Users size={24} />
            </div>
            <div className="hire-ribbon-info">
              <span className="hire-ribbon-num">500+</span>
              <span className="hire-ribbon-label">Hiring Partners</span>
            </div>
          </div>
          <div className="hire-ribbon-item">
            <div className="hire-ribbon-icon-container">
              <Building2 size={24} />
            </div>
            <div className="hire-ribbon-info">
              <span className="hire-ribbon-num">200+</span>
              <span className="hire-ribbon-label">Colleges & Institutions</span>
            </div>
          </div>
          <div className="hire-ribbon-item">
            <div className="hire-ribbon-icon-container">
              <Sparkles size={24} />
            </div>
            <div className="hire-ribbon-info">
              <span className="hire-ribbon-num">100%</span>
              <span className="hire-ribbon-label">Placement Support</span>
            </div>
          </div>
        </section>

        {/* Detailed Columns Container */}
        <section className="hire-details-row">
          {/* Box 1: For Companies */}
          <div className="hire-detail-box companies-box">
            <h2 className="hire-detail-box-title">For Companies</h2>
            <p className="hire-detail-box-desc">
              Hire AI-ready talent with confidence. Our platform connects you with verified, skilled professionals who are trained for real-world impact.
            </p>
            
            <div className="hire-detail-features-grid">
              <div className="hire-detail-feature">
                <div className="hire-feature-icon-wrapper blue-icon">
                  <ShieldCheck size={28} />
                </div>
                <div className="hire-feature-text">
                  <h4>Verified AI Talent</h4>
                  <p>Rigorous verification ensures quality and credibility.</p>
                </div>
              </div>
              
              <div className="hire-detail-feature">
                <div className="hire-feature-icon-wrapper green-icon">
                  <Settings size={28} />
                </div>
                <div className="hire-feature-text">
                  <h4>Skill-Based Matching</h4>
                  <p>AI-driven matching for better fit and faster shortlisting.</p>
                </div>
              </div>
              
              <div className="hire-detail-feature">
                <div className="hire-feature-icon-wrapper purple-icon">
                  <Briefcase size={28} />
                </div>
                <div className="hire-feature-text">
                  <h4>Internship to Hiring</h4>
                  <p>Seamless campus-to-company hiring pipeline.</p>
                </div>
              </div>
              
              <div className="hire-detail-feature">
                <div className="hire-feature-icon-wrapper blue-icon">
                  <Compass size={28} />
                </div>
                <div className="hire-feature-text">
                  <h4>Dedicated Support</h4>
                  <p>End-to-end support from search to onboarding.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: For Institutions */}
          <div className="hire-detail-box jobseekers-box">
            <h2 className="hire-detail-box-title">For Institutions</h2>
            <p className="hire-detail-box-desc">
              Empower your students with industry-aligned AI training, hackathons, and placement support. Partner with us to bridge the campus-to-corporate gap.
            </p>
            
            <div className="hire-institution-split">
              <ul className="hire-institution-checklist">
                <li>
                  <span className="hire-check-icon">
                    <CheckCircle2 size={16} fill="#0066ff" color="#ffffff" />
                  </span>
                  AI Curriculum Integration
                </li>
                <li>
                  <span className="hire-check-icon">
                    <CheckCircle2 size={16} fill="#0066ff" color="#ffffff" />
                  </span>
                  Hackathons & Live Challenges
                </li>
                <li>
                  <span className="hire-check-icon">
                    <CheckCircle2 size={16} fill="#0066ff" color="#ffffff" />
                  </span>
                  Exclusive Placement Support
                </li>
                <li>
                  <span className="hire-check-icon">
                    <CheckCircle2 size={16} fill="#0066ff" color="#ffffff" />
                  </span>
                  Faculty Development Programs
                </li>
                <li>
                  <span className="hire-check-icon">
                    <CheckCircle2 size={16} fill="#0066ff" color="#ffffff" />
                  </span>
                  Collaborative AI Labs & Projects
                </li>
              </ul>
              
              <div className="hire-institution-img-container">
                <img src="/Images/Hire Page/university_building.png" alt="University Building" className="hire-institution-building-img" />
              </div>
            </div>
            <div className="hire-portal-dots"></div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section className="hire-cta-banner">
          <div className="hire-cta-content">
            <div className="hire-cta-left">
              <h2 className="hire-cta-title">Ready to hire talent or adopt innovation?</h2>
              <p className="hire-cta-desc">Join thousands of companies and institutions building the future with AI.</p>
            </div>
            <div className="hire-cta-actions">
              <Link to="/contact-us" className="hire-cta-btn btn-filled">Partner With Us</Link>
              <a href="https://jobs.aiforeveryone.ai/" target="_blank" rel="noopener noreferrer" className="hire-cta-btn btn-outlined">Visit Job Portal</a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}