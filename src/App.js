"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Solutions from "./sections/Solutions";
import CaseStudy from "./sections/CaseStudy";
import Team from "./sections/Team";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Mission from "./sections/Mission";

const App = () => (
  <div>
    <Navbar />
    <Hero />
    <About />
    <Mission />
    <Solutions />
    <CaseStudy />
    <Team />
    <Contact />
    <Footer />
  </div>
);

export default App;
