"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px -100px 0px" }); // Adjust margins for trigger timing

  return (
    <footer className="footer" ref={ref}>
      <motion.div
        className="footer-container"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="#solutions">Solutions</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#case">Case Study</a></li>
            <li><a href="#mission">Mission</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Our Services</h4>
          <ul>
            <li>Custom Software</li>
            <li>Web & Mobile Apps</li>
            <li>Facial Recognition</li>
            <li>Tech Consulting</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>Email: info@blueprinttech.com</li>
            <li>Phone: +27 000 000 0000</li>
            <li>Location: South Africa</li>
          </ul>
        </div>
      </motion.div>

      <div className="footer-bottom">
        <p>© 2025 Blueprint Tech. All rights reserved.</p>
        <p>Made with ❤️ in South Africa</p>
      </div>
    </footer>
  );
};

export default Footer;
