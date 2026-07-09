import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { 
  BookOpen, 
  Layers, 
  UserPlus, 
  Network, 
  Users, 
  ArrowRight, 
  Code2, 
  UserCheck, 
  Rocket, 
  Building2, 
  Globe, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Handshake, 
  Infinity, 
  Quote,
  Monitor,
  Lightbulb,
  BriefcaseBusiness,
  ShoppingBag,
  X
} from "lucide-react";
import "./AboutUs.css";

const platforms = [
  {
    icon: Monitor,
    label: "LMS Portal",
    desc: "Learn AI with structured courses & certifications",
    color: "platform-blue",
  },
  {
    icon: Lightbulb,
    label: "Pitch Hub",
    desc: "Present your ideas and get investor-ready",
    color: "platform-purple",
  },
  {
    icon: BriefcaseBusiness,
    label: "Jobs Portal",
    desc: "Find AI-ready opportunities across top companies",
    color: "platform-green",
  },
  {
    icon: ShoppingBag,
    label: "A4E Marketplace",
    desc: "Buy, sell and discover AI tools & products",
    color: "platform-orange",
  },
];

export default function AboutUs() {
  const [showPlatforms, setShowPlatforms] = useState(false);
  return (
    <div className="about-page-container">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <div className="about-hero-left">
            <span className="about-badge purple-theme">About Us</span>
            <h1 className="about-hero-title">
              We're on a Mission<br />
              to <span className="about-gradient-text">Empower</span>
            </h1>
            <p className="about-hero-desc">
              AI For Everyone is an ecosystem that transforms learners into builders, connects them with opportunities and helps ideas become real world impact.
            </p>

            <div className="about-hero-aspects">
              <div className="about-aspect-card">
                <div className="about-aspect-icon-wrapper">
                  <BookOpen size={20} />
                </div>
                <h3 className="about-aspect-title">Learn</h3>
                <p className="about-aspect-desc">Industry relevant AI training & certifications</p>
              </div>

              <div className="about-aspect-card">
                <div className="about-aspect-icon-wrapper">
                  <Layers size={20} />
                </div>
                <h3 className="about-aspect-title">Build</h3>
                <p className="about-aspect-desc">Build real products with mentorship and guidance</p>
              </div>

              <div className="about-aspect-card">
                <div className="about-aspect-icon-wrapper">
                  <UserPlus size={20} />
                </div>
                <h3 className="about-aspect-title">Hire</h3>
                <p className="about-aspect-desc">Get discovered by top employers and opportunities</p>
              </div>

              <div className="about-aspect-card">
                <div className="about-aspect-icon-wrapper">
                  <Network size={20} />
                </div>
                <h3 className="about-aspect-title">Adopt</h3>
                <p className="about-aspect-desc">AI adoption for organizations at scale</p>
              </div>
            </div>
          </div>

          <div className="about-hero-right">
            <div className="about-hero-img-container">
              <img 
                src="/Images/About Page/about_hero_image.png" 
                alt="AI Learners and Builders working on laptop" 
                className="about-hero-img" 
              />
            </div>
            <div className="about-hero-floating-card">
              <div className="about-floating-icon-wrapper">
                <Users size={18} />
              </div>
              <div className="about-floating-card-info">
                <span className="about-floating-card-num">1500+</span>
                <span className="about-floating-card-label">Learners Empowered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Mission Section */}
      <section className="about-mission-section">
        <div className="about-mission-content">
          <div className="about-mission-left">
            <span className="about-badge gold-theme">Our Mission</span>
            <h2 className="about-mission-title">
              To democratize AI education and create a new generation of AI builders and innovators.
            </h2>
            <p className="about-mission-desc">
              We believe AI is for everyone. Whether you're a student, a professional, a founder or an organization, our mission is to provide the right learning, the right platform and the right opportunities to help you grow.
            </p>
            <div className="about-ecosystem-toggle">
              {/* Button — fades out when open */}
              <button
                className={`about-btn-primary about-ecosystem-btn ${showPlatforms ? "is-hidden" : ""}`}
                onClick={() => setShowPlatforms(true)}
              >
                Explore Our Ecosystem <ArrowRight size={18} />
              </button>

              {/* Platform reveal — fades in when open */}
              <div className={`about-platforms-reveal ${showPlatforms ? "is-open" : ""}`}>
                {platforms.map(({ icon: Icon, label, color }, i) => (
                  <div
                    key={label}
                    className={`about-platform-btn ${color}`}
                    style={{ transitionDelay: showPlatforms ? `${i * 60}ms` : "0ms" }}
                  >
                    <div className="about-platform-btn-icon">
                      <Icon size={16} />
                    </div>
                    <span>{label}</span>
                  </div>
                ))}

                {/* Close */}
                <button
                  className="about-platforms-close"
                  onClick={() => setShowPlatforms(false)}
                >
                  <X size={13} />
                </button>
              </div>
            </div>

          </div>

          <div className="about-mission-right">
            <div className="about-mission-glow"></div>
            <div className="about-mission-img-wrapper">
              <img 
                src="/Images/About Page/about_mission_image.jpg" 
                alt="AI Keynote presentation and developers audience" 
                className="about-mission-img" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. What Makes Us Different Section */}
      <section className="about-different-section">
        <div className="about-different-container">
          <div className="about-section-header">
            <span className="about-badge blue-theme">What Makes Us Different</span>
            <h2 className="about-section-title">
              Everything you need in one ecosystem to learn, build, hire and adopt AI.
            </h2>
          </div>

          <div className="about-different-grid">
            <div className="about-different-card">
              <div className="about-diff-icon-box theme-blue">
                <BookOpen size={22} />
              </div>
              <h3 className="about-diff-title">End-to-End Ecosystem</h3>
              <p className="about-diff-desc">
                From learning to building, hiring to adopting — everything in one place.
              </p>
              <ArrowRight className="about-diff-arrow" size={18} />
            </div>

            <div className="about-different-card">
              <div className="about-diff-icon-box theme-purple">
                <Code2 size={22} />
              </div>
              <h3 className="about-diff-title">Hands-on Learning</h3>
              <p className="about-diff-desc">
                Practical, project-based programs designed by industry experts.
              </p>
              <ArrowRight className="about-diff-arrow" size={18} />
            </div>

            <div className="about-different-card">
              <div className="about-diff-icon-box theme-orange">
                <UserCheck size={22} />
              </div>
              <h3 className="about-diff-title">Real Opportunities</h3>
              <p className="about-diff-desc">
                Get access to jobs, mentorship, internships and funding.
              </p>
              <ArrowRight className="about-diff-arrow" size={18} />
            </div>

            <div className="about-different-card">
              <div className="about-diff-icon-box theme-green">
                <Rocket size={22} />
              </div>
              <h3 className="about-diff-title">Innovation First</h3>
              <p className="about-diff-desc">
                We encourage creativity and help ideas turn into real products.
              </p>
              <ArrowRight className="about-diff-arrow" size={18} />
            </div>

            <div className="about-different-card">
              <div className="about-diff-icon-box theme-gold">
                <Building2 size={22} />
              </div>
              <h3 className="about-diff-title">Enterprise Ready</h3>
              <p className="about-diff-desc">
                Helping organizations adopt AI and build future-ready teams.
              </p>
              <ArrowRight className="about-diff-arrow" size={18} />
            </div>

            <div className="about-different-card">
              <div className="about-diff-icon-box theme-red">
                <Globe size={22} />
              </div>
              <h3 className="about-diff-title">Impact Driven</h3>
              <p className="about-diff-desc">
                We measure success by the impact created by our community.
              </p>
              <ArrowRight className="about-diff-arrow" size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Arena Section */}
      <section className="about-arena-section">
        <div className="about-arena-container">
          <div className="about-arena-content">
            <span className="about-badge purple-theme">Innovation Arena</span>
            <h2 className="about-arena-title">
              Explore Our <br />
              <span>Innovation Arena</span>
            </h2>
            <p className="about-arena-desc">
              Experience the cutting-edge workspace where AI models, startups, and innovators collaborate to build revolutionary tech products.
            </p>
            <Link to="/gallery" className="about-arena-btn">
              Explore Innovation Arena
              <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="about-arena-video-wrapper">
            <div className="about-arena-video-card">
              <iframe 
                src="https://www.youtube.com/embed/3_c0IBnAcwU?autoplay=1&mute=1&loop=1&playlist=3_c0IBnAcwU&controls=0&showinfo=0&rel=0&modestbranding=1" 
                title="Innovation Arena Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="about-arena-iframe"
              ></iframe>
              <div className="about-arena-video-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. We Value & Stats Section */}
      <section className="about-values-section">
        <div className="about-values-container">
          <div className="about-values-left">
            <span className="about-badge gold-theme">We Value</span>
            <h2 className="about-values-title">
              The principles that drive everything we do.
            </h2>

            <div className="about-values-list">
              <div className="about-value-item">
                <div className="about-value-check-wrapper">
                  <CheckCircle2 size={20} />
                </div>
                <div className="about-value-text-box">
                  <span className="about-value-name">Inclusion</span>
                  <p className="about-value-desc">AI is for everyone, everywhere.</p>
                </div>
              </div>

              <div className="about-value-item">
                <div className="about-value-check-wrapper">
                  <CheckCircle2 size={20} />
                </div>
                <div className="about-value-text-box">
                  <span className="about-value-name">Innovation</span>
                  <p className="about-value-desc">We build, experiment and ship.</p>
                </div>
              </div>

              <div className="about-value-item">
                <div className="about-value-check-wrapper">
                  <CheckCircle2 size={20} />
                </div>
                <div className="about-value-text-box">
                  <span className="about-value-name">Integrity</span>
                  <p className="about-value-desc">We do what's right, always.</p>
                </div>
              </div>

              <div className="about-value-item">
                <div className="about-value-check-wrapper">
                  <CheckCircle2 size={20} />
                </div>
                <div className="about-value-text-box">
                  <span className="about-value-name">Impact</span>
                  <p className="about-value-desc">We create meaningful change.</p>
                </div>
              </div>

              <div className="about-value-item">
                <div className="about-value-check-wrapper">
                  <CheckCircle2 size={20} />
                </div>
                <div className="about-value-text-box">
                  <span className="about-value-name">Growth</span>
                  <p className="about-value-desc">We never stop learning.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-values-right">
            <div className="about-stats-grid">
              <div className="about-stat-item">
                <div className="about-stat-icon-wrapper">
                  <GraduationCap size={28} />
                </div>
                <span className="about-stat-number">1500+</span>
                <span className="about-stat-label">Learners Trained</span>
              </div>

              <div className="about-stat-item">
                <div className="about-stat-icon-wrapper">
                  <Users size={28} />
                </div>
                <span className="about-stat-number">70+</span>
                <span className="about-stat-label">Innovation Teams</span>
              </div>

              <div className="about-stat-item">
                <div className="about-stat-icon-wrapper">
                  <Rocket size={28} />
                </div>
                <span className="about-stat-number">15+</span>
                <span className="about-stat-label">Startups Backed</span>
              </div>

              <div className="about-stat-item">
                <div className="about-stat-icon-wrapper">
                  <Briefcase size={28} />
                </div>
                <span className="about-stat-number">1000+</span>
                <span className="about-stat-label">Opportunities Created</span>
              </div>

              <div className="about-stat-item">
                <div className="about-stat-icon-wrapper">
                  <Handshake size={28} />
                </div>
                <span className="about-stat-number">50+</span>
                <span className="about-stat-label">Enterprise Partners</span>
              </div>

              <div className="about-stat-item">
                <div className="about-stat-icon-wrapper">
                  <Infinity size={28} />
                </div>
                <span className="about-stat-number">∞</span>
                <span className="about-stat-label">Possibilities Ahead</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Founder Quote Section */}
      <section className="about-founder-section">
        <div className="about-founder-container">
          <div className="about-founder-quote-block">
            <span className="about-founder-quote-mark">"</span>
            <p className="about-founder-quote-text">
              AI should not limit — it should liberate. It should give everyone, regardless of background, the power to learn, build and shape their own future.
            </p>
            <div className="about-founder-info">
              <span className="about-founder-name">Soumojit Das</span>
              <span className="about-founder-title">Founder & Director · AI For Everyone</span>
              <p className="about-founder-bio">
                18 years across SAP, digital transformation, AI mentorship & adoption. Certified PMO from IIM Indore. Founder of <strong>InTime IT Services Pvt. Ltd.</strong> — the parent company behind AI For Everyone, Excentra, and Aurevia.
              </p>
            </div>
          </div>

          <div className="about-founder-img-wrap">
            <img
              src="/Images/About Page/founder.jpg"
              alt="Founder of AI For Everyone"
              className="about-founder-img"
            />
            <div className="about-founder-glow"></div>
          </div></div>
      </section>



      {/* 6. Join the AI Revolution (CTA Section) */}

      <section className="about-join-section">
        <div className="about-join-container">
          <h2 className="about-join-title">Join the AI Revolution</h2>
          <p className="about-join-desc">
            Be part of the movement that is shaping the future of work and innovation.
          </p>
          <Link to="/contact-us" className="about-btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Join Us Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}