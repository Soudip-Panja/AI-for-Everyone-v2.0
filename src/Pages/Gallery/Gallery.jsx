import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { X } from "lucide-react";
import "./Gallery.css";

const galleryItems = [
  {
    id: 1,
    title: "Grand Finale Showcase",
    category: "Events",
    image: "/Gallery Image/1 grand-finale.jpg",
    desc: "The culmination of our innovation cohorts, presenting final AI solutions to judges."
  },
  {
    id: 2,
    title: "Audience Q&A Session",
    category: "Events",
    image: "/Gallery Image/2 audience-qa.jpg",
    desc: "Engaging discussions with our audience, tech experts, and corporate delegates."
  },
  {
    id: 3,
    title: "Founder Address",
    category: "Events",
    image: "/Gallery Image/3 founder-address.jpg",
    desc: "Soumojit Das addressing the cohort on driving AI adoption across business sectors."
  },
  {
    id: 4,
    title: "Mentor Recognition",
    category: "Workspace",
    image: "/Gallery Image/4  MENTOR RECOGNITION.jpg",
    desc: "Celebrating our dedicated AI mentors who guided teams from ideation to final deployment."
  },
  {
    id: 5,
    title: "Faculty Honours Handover",
    category: "Workspace",
    image: "/Gallery Image/5  MENTOR HANDOVER · FACULTY HONOURS.jpg",
    desc: "Presenting faculty honours to institutional mentors for outstanding guidance."
  },
  {
    id: 6,
    title: "Stage Mentor Handover",
    category: "Workspace",
    image: "/Gallery Image/6  MENTOR HANDOVER · STAGE RECEIPT 06 · MENTOR HANDOVER · STAGE RECEIPT.jpg",
    desc: "Distributing certifications and commemorative kits to our cohort guides."
  },
  {
    id: 7,
    title: "HIT Edition Commemorative Box",
    category: "Hackathons",
    image: "/Gallery Image/7 HIT EDITION · COMMEMORATIVE BOX.jpg",
    desc: "Unboxing the official limited edition commemorative kits for participants."
  },
  {
    id: 8,
    title: "PrepGenius Pod 44 Prize Cohort",
    category: "Hackathons",
    image: "/Gallery Image/8 PREPGENIUS · POD 44 · ₹5K PRIZE COHORT.jpg",
    desc: "Awarding the PrepGenius team for their exceptional GenAI tutoring agent."
  },
  {
    id: 9,
    title: "Pod Kit & Brand Details",
    category: "Hackathons",
    image: "/Gallery Image/9 POD KIT · BRAND DETAIL.jpg",
    desc: "Exploring the custom builder gear provided to our elite developer pods."
  },
  {
    id: 10,
    title: "Winners' Podium Moment",
    category: "Hackathons",
    image: "/Gallery Image/10 WINNERS' MOMENT · ₹50K · ₹30K · ₹10K 10 · WINNERS' MOMENT · ₹50K · ₹30K · ₹10K.jpg",
    desc: "Felicitation ceremony for the top 3 winning pods, taking home cash prizes."
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = ["All", "Workspace", "Events", "Hackathons"];

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      <Navbar />
      <div className="gallery-page-container">
        <main className="gallery-main-content">
          
          {/* Header */}
          <div className="gallery-header">
            <span className="gallery-badge">Media Library</span>
            <h1 className="gallery-title">
              Our Innovation <br />
              <span>Ecosystem Gallery</span>
            </h1>
            <p className="gallery-subtitle">
              Take a visual tour through our collaborative workspaces, live hackathons, mentoring programs, and builder networks.
            </p>
          </div>

          {/* Featured YouTube Video Showcase */}
          <section className="gallery-video-section">
            <div className="gallery-video-card">
              <div className="gallery-video-player">
                <iframe 
                  src="https://www.youtube.com/embed/3_c0IBnAcwU?autoplay=1&mute=1&loop=1&playlist=3_c0IBnAcwU&controls=1&rel=0&modestbranding=1" 
                  title="Ecosystem Walkthrough Video" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="gallery-video-iframe"
                ></iframe>
              </div>
              <div className="gallery-video-info">
                <span className="gallery-video-tag">Featured Video</span>
                <h2 className="gallery-video-title">Innovation Arena Walkthrough</h2>
                <p className="gallery-video-desc">
                  Experience a virtual preview of our physical sandbox arena where developers, corporate partners, and mentors build AI solutions for everyday challenges.
                </p>
              </div>
            </div>
          </section>

          {/* Filter Bar */}
          <div className="gallery-filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="gallery-item-card"
                onClick={() => setLightboxItem(item)}
              >
                <div className="gallery-img-wrapper">
                  <span className="gallery-item-category">{item.category}</span>
                  <img src={item.image} alt={item.title} className="gallery-img" />
                </div>
                <div className="gallery-item-details">
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <p className="gallery-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      {/* Lightbox PopUp Modal */}
      {lightboxItem && (
        <div className="gallery-lightbox" onClick={() => setLightboxItem(null)}>
          <button className="gallery-lightbox-close" onClick={() => setLightboxItem(null)}>
            <X size={24} />
          </button>
          <div className="gallery-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightboxItem.image} alt={lightboxItem.title} className="gallery-lightbox-img" />
            <h3 className="gallery-lightbox-title">{lightboxItem.title}</h3>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}