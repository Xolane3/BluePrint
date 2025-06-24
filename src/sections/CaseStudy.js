"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaExclamationTriangle, FaLightbulb, FaChartLine } from "react-icons/fa";
import "./CaseStudy.css";

const CaseStudy = () => {
  const controls = useAnimation();
  const caseRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } });
        } else {
          controls.start({ opacity: 0, y: 50, transition: { duration: 1, ease: "easeIn" } });
        }
      },
      { threshold: 0.3 }
    );
    if (caseRef.current) observer.observe(caseRef.current);
    return () => observer.disconnect();
  }, [controls]);

  const handleMouseMove = (e) => {
    const rect = caseRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const circles = [
    { id: 1, size: 140, baseX: 10, baseY: 20, delay: 0 },
    { id: 2, size: 90, baseX: 80, baseY: 25, delay: 0.3 },
    { id: 3, size: 60, baseX: 50, baseY: 70, delay: 0.6 },
    { id: 4, size: 160, baseX: 30, baseY: 80, delay: 1.0 },
  ];

  const getOffset = (baseX, baseY, mx, my, factor = 40) => {
    const offsetX = (mx - 0.5) * factor;
    const offsetY = (my - 0.5) * factor;
    return { left: `calc(${baseX}% + ${offsetX}px)`, top: `calc(${baseY}% + ${offsetY}px)` };
  };

  const caseData = [
    {
      title: "The Problem",
      icon: <FaExclamationTriangle size={50} color="#ff6600" />,
      description: "ICEP relied on paper attendance, resulting in fraud, inaccuracies, and admin fatigue.",
    },
    {
      title: "Our Solution",
      icon: <FaLightbulb size={50} color="#ff6600" />,
      description: "An in-house built clocking management system using secure digital technologies.",
    },
    {
      title: "Results",
      icon: <FaChartLine size={50} color="#ff6600" />,
      description: "No manual checking, accurate records, and drastically reduced fraud risk.",
    },
  ];

  return (
    <section
      id="case"
      className="case-study-section position-relative py-5"
      ref={caseRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
    >
      {/* Floating Circles */}
      <div className="floating-background">
        {circles.map(({ id, size, baseX, baseY, delay }) => {
          const style = getOffset(baseX, baseY, mousePos.x, mousePos.y, size * 0.25);
          return (
            <motion.span
              key={id}
              className="floating-shape"
              style={{ width: size, height: size, ...style }}
              initial={{ opacity: 0.07 }}
              animate={{ opacity: [0.07, 0.15, 0.07] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                delay,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <motion.h2
        className="fw-bold text-center mb-5 underline-orange"
        animate={controls}
        initial={{ opacity: 0, y: -30 }}
      >
        Case Study: <span className="underline-orange">ICEP</span>
      </motion.h2>

      <div
        className="horizontal-carousel"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="carousel-track"
          animate={{ x: ["0%", "-33%", "-66%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
            pauseOnHover: false, // native framer-motion doesn't support this directly
          }}
          style={{
            animationPlayState: isHovering ? "paused" : "running",
          }}
        >
          {caseData.concat(caseData).map((item, index) => (
            <div key={`${item.title}-${index}`} className="carousel-card">
              <div className="icon-wrapper-glass mb-3">{item.icon}</div>
              <div className="glass-card p-4 rounded-4">
                <h3 className="orange-text mb-3 fs-3 text-center">{item.title}</h3>
                <p className="fs-5 text-center">{item.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudy;
