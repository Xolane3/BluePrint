"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./Mission.css";

const Mission = () => {
  const controls = useAnimation();
  const missionRef = useRef(null);
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
    if (missionRef.current) observer.observe(missionRef.current);
    return () => observer.disconnect();
  }, [controls]);

  const handleMouseMove = (e) => {
    const rect = missionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const circles = [
    { id: 1, size: 120, baseX: 10, baseY: 20, delay: 0 },
    { id: 2, size: 90, baseX: 80, baseY: 30, delay: 0.3 },
    { id: 3, size: 70, baseX: 50, baseY: 70, delay: 0.7 },
    { id: 4, size: 150, baseX: 20, baseY: 80, delay: 1.2 },
  ];

  const getOffset = (baseX, baseY, mx, my, factor = 30) => {
    const offsetX = (mx - 0.5) * factor;
    const offsetY = (my - 0.5) * factor;
    return { left: `calc(${baseX}% + ${offsetX}px)`, top: `calc(${baseY}% + ${offsetY}px)` };
  };

  return (
    <section
      id="mission"
      className="mission-section py-5 position-relative"
      ref={missionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
    >
      <div className="floating-background">
        {circles.map(({ id, size, baseX, baseY, delay }) => {
          const style = getOffset(baseX, baseY, mousePos.x, mousePos.y, size * 0.2);
          return (
            <motion.span
              key={id}
              className="floating-shape"
              style={{ width: size, height: size, ...style }}
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
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

      <div className="container px-4 text-center">
        <motion.h2
          className="fw-bold text-center mb-5 underline-orange"
          animate={controls}
          initial={{ opacity: 0, y: -30 }}
        >
          Mission <span className="underline-orange">& Vision</span>
        </motion.h2>

        <div className="modern-split d-flex flex-wrap justify-content-center align-items-center">
          <motion.div
            className="modern-block bg-white text-dark shadow-lg m-3 p-4 rounded"
            animate={controls}
            initial={{ opacity: 0, x: -50 }}
          >
            <h4 className="orange-text mb-3 fs-3"> Our Mission</h4>
            <p className="fs-5">
              Eliminate fraud & inefficiency by delivering secure, intelligent, user-friendly digital systems.
            </p>
          </motion.div>

          <motion.div
            className="modern-block bg-white text-dark shadow-lg m-3 p-4 rounded"
            animate={controls}
            initial={{ opacity: 0, x: 50 }}
          >
            <h4 className="orange-text mb-3 fs-3"> Our Vision</h4>
            <p className="fs-5">
              Empowering organizations with advanced solutions to enable trust, efficiency, and smarter decisions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
