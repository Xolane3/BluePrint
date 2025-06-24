import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Contact.css";

const circles = [
  { id: 1, size: 80, baseX: 15, baseY: 10, delay: 0 },
  { id: 2, size: 100, baseX: 70, baseY: 40, delay: 0.3 },
  { id: 3, size: 60, baseX: 30, baseY: 65, delay: 0.6 },
  { id: 4, size: 120, baseX: 80, baseY: 80, delay: 0.9 },
  { id: 5, size: 90, baseX: 85, baseY: 20, delay: 1.2 },
];

const Contact = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const getOffset = (baseX, baseY, mx, my, factor = 15) => {
    const offsetX = (mx - 0.5) * factor;
    const offsetY = (my - 0.5) * factor;
    return { left: `calc(${baseX}% + ${offsetX}px)`, top: `calc(${baseY}% + ${offsetY}px)` };
  };

  // Create ref for the section to observe
  const ref = useRef(null);
  // Use inView hook to detect if section is visible on screen
  const isInView = useInView(ref, { margin: "-100px 0px -100px 0px" }); // adjust margin for trigger point

  return (
    <div
      id="contact"
      className="contact-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
    >
      <div className="floating-circles">
        {circles.map(({ id, size, baseX, baseY, delay }) => {
          const style = getOffset(baseX, baseY, mousePos.x, mousePos.y, size * 0.15);
          return (
            <motion.span
              key={id}
              className="circle"
              style={{
                width: size,
                height: size,
                ...style,
              }}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.3, 0.15] }}
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

      <motion.section
        ref={ref}
        className="content"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="animated-heading"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Contact <span className="underline">Us</span>
        </motion.h2>

        <div className="contact-container">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p>
              <strong>Email:</strong> example@blueprinttech.com
            </p>
            <p>
              <strong>Phone:</strong> +27 000 000 0000
            </p>
            <p>
              <strong>Location:</strong> South Africa
            </p>
          </motion.div>

          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send</button>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
