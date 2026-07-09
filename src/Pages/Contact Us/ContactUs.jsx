import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import "./ContactUs.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
    // Reset form after a delay or just keep success state
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: ""
      });
    }, 4000);
  };

  return (
    <>
      <Navbar />
      <div className="contact-page-container">
        <main className="contact-main-content">
          
          {/* Header */}
          <div className="contact-header">
            <span className="contact-badge">Get in touch</span>
            <h1 className="contact-title">
              Let's Connect and <br />
              <span>Shape the Future</span>
            </h1>
            <p className="contact-subtitle">
              Have questions about our programs, partnership opportunities, or AI solutions? We'd love to hear from you.
            </p>
          </div>

          {/* Grid Content */}
          <div className="contact-grid">
            
            {/* Left Info Panel */}
            <div className="contact-info-panel">
              <h2 className="contact-info-title">Contact Information</h2>
              <p className="contact-info-desc">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="contact-cards-list">
                
                {/* Email Card */}
                <div className="contact-info-card">
                  <div className="contact-card-icon blue-bg">
                    <Mail size={20} />
                  </div>
                  <div className="contact-card-details">
                    <span className="contact-card-label">Email Us</span>
                    <span className="contact-card-value">
                      <a href="mailto:info@intimeitservices.com">info@intimeitservices.com</a>
                    </span>
                    <span className="contact-card-subtext">Online support response within 24 hours.</span>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="contact-info-card">
                  <div className="contact-card-icon purple-bg">
                    <Phone size={20} />
                  </div>
                  <div className="contact-card-details">
                    <span className="contact-card-label">Call Us</span>
                    <span className="contact-card-value">+91 (123) 456-7890</span>
                    <span className="contact-card-subtext">Mon-Fri from 9am to 6pm IST.</span>
                  </div>
                </div>

                {/* Location Card */}
                <div className="contact-info-card">
                  <div className="contact-card-icon pink-bg">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-card-details">
                    <span className="contact-card-label">Our Headquarters</span>
                    <span className="contact-card-value">InTime IT Services Pvt. Ltd.</span>
                    <span className="contact-card-subtext">Kolkata, West Bengal, India.</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Form Panel */}
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} className="contact-form">
                
                {/* First Name */}
                <div className="contact-form-group">
                  <label htmlFor="firstName" className="contact-form-label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="contact-form-input"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="contact-form-group">
                  <label htmlFor="lastName" className="contact-form-label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="contact-form-input"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="contact-form-group">
                  <label htmlFor="email" className="contact-form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="contact-form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="contact-form-group">
                  <label htmlFor="phone" className="contact-form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="contact-form-input"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Subject */}
                <div className="contact-form-group full-width">
                  <label htmlFor="subject" className="contact-form-label">What are you interested in?</label>
                  <select
                    id="subject"
                    name="subject"
                    className="contact-form-select"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="AI Mentorship & LMS">AI Mentorship & Learning Portal</option>
                    <option value="Startup Pitch & Funding">Startup Pitching & Pitch Hub</option>
                    <option value="Hire Talent">Hiring Talent</option>
                    <option value="Partner With Us">Partnership / Investing</option>
                  </select>
                </div>

                {/* Message */}
                <div className="contact-form-group full-width">
                  <label htmlFor="message" className="contact-form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="contact-form-textarea"
                    placeholder="Leave us a message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Submit button / Success message */}
                {submitted ? (
                  <div className="contact-success-msg">
                    Thank you! Your message has been sent successfully. We will get back to you soon.
                  </div>
                ) : (
                  <button type="submit" className="contact-submit-btn">
                    Send Message
                    <Send size={16} className="contact-btn-icon" />
                  </button>
                )}

              </form>
            </div>

          </div>

        </main>
      </div>
      <Footer />
    </>
  );
}