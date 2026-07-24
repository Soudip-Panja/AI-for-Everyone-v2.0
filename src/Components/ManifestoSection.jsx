import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarfieldManifestoBg from './StarfieldManifestoBg';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textContent = textContentRef.current;

    if (!section || !textContent) return;

    // NO pin, NO y: '100vh', NO slide-up.
    // Section sits in normal document flow immediately after GridTunnelSection.
    // Only animate the inner text content on scroll-enter.
    gsap.set(textContent, {
      y: 40,
      opacity: 0,
      filter: 'blur(6px)',
    });

    const ctx = gsap.context(() => {
      gsap.to(textContent, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power3.out',
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="manifesto-section reveal-active">
      {/* Three.js Starfield Background Scene */}
      <StarfieldManifestoBg sectionRef={sectionRef} />

      {/* Glowing Ambient Radial Overlay */}
      <div className="manifesto-card-glow" aria-hidden="true" />

      {/* Text Content */}
      <div ref={textContentRef} className="manifesto-container">
        {/* Left Column: Heading & Eyebrow */}
        <div className="manifesto-left">
          <span className="manifesto-eyebrow">THE MANIFESTO</span>
          <h2 className="manifesto-title">
            We don't believe in the AI<br />
            gap.<br />
            <span className="manifesto-title-italic">We close it.</span>
          </h2>
          <div className="manifesto-meta">
            MAY 2026 &bull; KOLKATA &bull; WORLDWIDE
          </div>
        </div>

        {/* Right Column: Paragraphs, Quote & Author */}
        <div className="manifesto-right">
          <p className="manifesto-lead">
            The internet shift took ten years. The mobile shift took five. <strong>The AI shift is taking eighteen months.</strong>
          </p>

          <p className="manifesto-body">
            We don't teach AI as theory — we train practitioners who ship. We don't end with a certificate — we end with a product. We mentor cohorts through the Innovation Arena, place them through the AI Jobs marketplace, and back the strongest into companies of their own.
          </p>

          <blockquote className="manifesto-quote">
            "Built in India. Made for the world. Open to anyone willing to ship."
          </blockquote>

          <div className="manifesto-author">
            &mdash; SOUMOJIT DAS &bull; FOUNDER, AI FOR EVERYONE
          </div>
        </div>
      </div>
    </section>
  );
}
