import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const typewriterText = `Aspiring Cybersecurity Learner | Breaking, Securing & Learning`;

export default function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen text-center"
      id="home"
    >
      <motion.h1
        initial={{ opacity: 0, y: -33 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
        style={{ textShadow: '0 0 15px #fff' }}
      >
        0xD33kshith
      </motion.h1>
      {/* Dynamic color changing typewriter */}
      <DynamicTypewriter text={typewriterText} />
      {/* Scroll down prompt */}
      <div className="mt-10 flex flex-col items-center animate-bounce">
        <span className="text-white text-lg mb-2">Scroll down</span>
        <svg width="24" height="24" fill="none" stroke="#39ff14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
}

// Helper component for dynamic color changing typewriter
function DynamicTypewriter({ text }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="text-xl md:text-2xl font-mono text-center"
      style={{ color: '#fff', textShadow: '0 0 10px #fff' }}
    >
      <span className="typewriter">{text}</span>
    </motion.p>
  );
}
