"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "./About.css";

const About = () => {
  const controls = useAnimation();
  const aboutRef = useRef(null);

  // Intersection Observer logic for infinite scroll in/out animation
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

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <section id="about" className="about-section w-100 py-5 bg-white text-dark" ref={aboutRef}>
      <div className="container-fluid px-5 position-relative">

        {/* Floating Who We Are box */}
        <motion.div
          className="who-we-are-floating p-4 shadow rounded bg-light"
          animate={controls}
          initial={{ opacity: 0, y: 50 }}
        >
          <h3 className="fw-bold underline-orange mb-3">👥 Who We Are</h3>
          <ul className="fs-5 list-unstyled">
            <motion.li className="mb-2" whileHover={{ scale: 1.05, color: "#ff6600" }}>
              ✔️ Interns-turned-innovators from Tshwane University of Technology
            </motion.li>
            <motion.li className="mb-2" whileHover={{ scale: 1.05, color: "#ff6600" }}>
              ✔️ Tech enthusiasts with a mission to solve real problems
            </motion.li>
            <motion.li className="mb-2" whileHover={{ scale: 1.05, color: "#ff6600" }}>
              ✔️ A team that blends technical skill with system insight
            </motion.li>
          </ul>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-center fw-bold mb-5"
          animate={controls}
          initial={{ opacity: 0, y: -30 }}
        >
          About <span className="underline-orange">Us</span>
        </motion.h2>

        <div className="row gx-5 align-items-start">
          {/* Our Story */}
          <motion.div
            className="col-md-8"
            animate={controls}
            initial={{ opacity: 0, x: -50 }}
          >
            <h3 className="fw-bold underline-orange">🏗 Our Story</h3>
            <p className="mt-3 fs-5">
              Blueprint Tech was founded in 2025 by a team of 10 developers and 2 business analysts during their internship at ICEP.
              Motivated by the frequent misuse and fraud in paper-based systems—especially student attendance—we took action.
              With a shared passion for informatics and technology, we’re now building secure, digital systems that bring organizations into the future.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
