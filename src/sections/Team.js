"use client";
import React, { useEffect, useRef } from "react";
import { FaLaptopCode, FaUserTie, FaServer } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import "./Team.css";

const team = [
  { name: "Usimamane", role: "Full-Stack Developer", icon: <FaLaptopCode /> },
  { name: "Nthabiseng Baloyi", role: "Business Analyst", icon: <FaUserTie /> },
  { name: "Samuel Mokoena", role: "Backend Developer", icon: <FaServer /> },
  { name: "Thato Khumalo", role: "UI/UX Designer", icon: <FaLaptopCode /> },
  { name: "Lerato Molefe", role: "DevOps Engineer", icon: <FaServer /> },
  { name: "Kabelo M", role: "Frontend Dev", icon: <FaLaptopCode /> },
];

const Team = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
        } else {
          controls.start({ opacity: 0, y: 50 });
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <section id="team" className="team-section" ref={ref}>
      <motion.h2
        className="animated-heading"
        initial={{ opacity: 0, y: -30 }}
        animate={controls}
        transition={{ duration: 0.8 }}
      >
        Our Team <span className="underline" />
      </motion.h2>

      <motion.p
        className="team-description"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        A passionate team of developers and analysts bringing innovation to life.
      </motion.p>

      <div className="dual-marquee-container">
        {/* Upward Scroll */}
        <motion.div
          className="marquee-column"
          animate={{ y: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...team, ...team].map((member, i) => (
            <div className="scrolling-card" key={`up-${i}`}>
              <div className="icon">{member.icon}</div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>
          ))}
        </motion.div>

        {/* Downward Scroll */}
        <motion.div
          className="marquee-column"
          animate={{ y: ["-100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...team, ...team].map((member, i) => (
            <div className="scrolling-card" key={`down-${i}`}>
              <div className="icon">{member.icon}</div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="floating-circles">
        <div className="circle orange"></div>
        <div className="circle glow"></div>
      </div>
    </section>
  );
};

export default Team;
