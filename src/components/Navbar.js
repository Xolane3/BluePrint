"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = (
    <>
      <li><a href="#hero" onClick={closeMenu}>Home</a></li>
      <li><a href="#about" onClick={closeMenu}>About</a></li>
      <li><a href="#mission" onClick={closeMenu}>Mission</a></li>
      <li><a href="#solutions" onClick={closeMenu}>Solutions</a></li>
      <li><a href="#case" onClick={closeMenu}>Case Study</a></li>
      <li><a href="#team" onClick={closeMenu}>Team</a></li>
      <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="container">
      <div className="logo">Blueprint Tech</div>

      {/* Desktop Links */}
      <ul className="nav-links desktop-only">
        {navLinks}
      </ul>

      {/* Hamburger Icon */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="mobile-menu"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {navLinks}
          </motion.ul>
        )}
      </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
