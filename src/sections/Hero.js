"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Hero.css";

const highlights = [
  { icon: "bi-person-check", text: "Facial Recognition Attendance System" },
  { icon: "bi-award", text: "Built by TUT-trained Technologists" },
  { icon: "bi-shield-check", text: "Trusted by ICEP" },
];

const floatingShapes = [
  { id: 1, size: 100, baseX: 15, baseY: 10, delay: 0 },
  { id: 2, size: 80, baseX: 80, baseY: 20, delay: 0.4 },
  { id: 3, size: 60, baseX: 60, baseY: 70, delay: 0.8 },
  { id: 4, size: 120, baseX: 20, baseY: 60, delay: 1.2 },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Rotating highlights
  useEffect(() => {
    const rotate = setInterval(() => {
      setIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(rotate);
  }, []);

  // Animate on scroll (intersection observer)
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          });
        } else {
          controls.start({
            opacity: 0,
            y: 50,
            transition: { duration: 0.8, ease: "easeIn" },
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [controls]);

  const handleMouseMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const getOffset = (baseX, baseY, mx, my, factor = 30) => {
    const offsetX = (mx - 0.5) * factor;
    const offsetY = (my - 0.5) * factor;
    return { left: `calc(${baseX}% + ${offsetX}px)`, top: `calc(${baseY}% + ${offsetY}px)` };
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
    >
      {/* Floating background shapes */}
      <div className="floating-background">
        {floatingShapes.map(({ id, size, baseX, baseY, delay }) => {
          const style = getOffset(baseX, baseY, mousePos.x, mousePos.y, size * 0.15);
          return (
            <motion.span
              key={id}
              className="floating-shape"
              style={{ width: size, height: size, ...style }}
              initial={{ opacity: 0.15 }}
              animate={{
                opacity: [0.15, 0.3, 0.15],
              }}
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

      <motion.div
        className="hero-content"
        animate={controls}
        initial={{ opacity: 1, y: 0 }}
      >
        <h1 className="display-5 fw-bold mb-3 hero-title">
          Secure Digital Solutions for a Smarter Future
        </h1>
        <p className="lead mb-4 hero-subtitle">
          We design intelligent, secure platforms that streamline operations,
          enhance trust, and eliminate fraud.
        </p>

        <AnimatePresence mode="wait">
          <motion.ul
            key={index}
            className="list-unstyled rotating-highlight d-inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <li>
              <i className={`bi ${highlights[index].icon} me-2 fs-3`}></i>
              <span className="highlight-text">{highlights[index].text}</span>
            </li>
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Hero;
