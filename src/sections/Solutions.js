"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaClock, FaCamera, FaDigitalTachograph } from "react-icons/fa";
import "./Solutions.css";

const Solutions = () => {
  const controls = useAnimation();
  const solutionsRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

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
    if (solutionsRef.current) observer.observe(solutionsRef.current);
    return () => observer.disconnect();
  }, [controls]);

  const handleMouseMove = (e) => {
    const rect = solutionsRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const circles = [
    { id: 1, size: 120, baseX: 10, baseY: 20, delay: 0 },
    { id: 2, size: 90, baseX: 80, baseY: 30, delay: 0.4 },
    { id: 3, size: 70, baseX: 50, baseY: 70, delay: 0.8 },
    { id: 4, size: 150, baseX: 20, baseY: 80, delay: 1.2 },
  ];

  const getOffset = (baseX, baseY, mx, my, factor = 30) => {
    const offsetX = (mx - 0.5) * factor;
    const offsetY = (my - 0.5) * factor;
    return { left: `calc(${baseX}% + ${offsetX}px)`, top: `calc(${baseY}% + ${offsetY}px)` };
  };

  const solutionsData = [
    {
      title: "ClockIT",
      icon: <FaClock size={50} color="#ff6600" />,
      description: "A clocking management system using QR code generation and scanning to mark attendance efficiently and securely.",
    },
    {
      title: "Attendance Management System (AMS)",
      icon: <FaCamera size={50} color="#ff6600" />,
      description: "A secure clock-in system using facial recognition technology to ensure accuracy and prevent buddy punching.",
    },
    {
      title: "System Digitalization Services",
      icon: <FaDigitalTachograph size={50} color="#ff6600" />,
      description: "We analyze and convert outdated paper processes into digital tools tailored to your workflow, increasing productivity and transparency.",
    },
  ];

  return (
    <section
      id="solutions"
      className="solutions-section position-relative py-5"
      ref={solutionsRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
    >
      {/* Floating Circles */}
      <div className="floating-background">
        {circles.map(({ id, size, baseX, baseY, delay }) => {
          const style = getOffset(baseX, baseY, mousePos.x, mousePos.y, size * 0.2);
          return (
            <motion.span
              key={id}
              className="floating-shape"
              style={{ width: size, height: size, ...style }}
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                repeat: Infinity,
                duration: 5,
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
        Our <span className="underline-orange">Solutions</span>
      </motion.h2>

      <div className="container d-flex flex-column gap-5">
        {solutionsData.map((solution, index) => (
          <motion.div
            key={solution.title}
            className={`solution-row d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 ${
              index % 2 === 1 ? "flex-md-row-reverse" : ""
            }`}
            animate={controls}
            initial={{ opacity: 0, y: 40 }}
          >
            <div className="icon-wrapper">{solution.icon}</div>

            <div className="text-wrapper bg-white shadow p-4 rounded">
              <h3 className="orange-text mb-3 fs-3">{solution.title}</h3>
              <p className="fs-5">{solution.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Solutions;
