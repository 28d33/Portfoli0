import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const typewriterText = `Aspiring Cybersecurity Learner | Breaking, Securing & Learning`;

export default function Hero() {
  return (
    <section className="mt-12 mb-16 text-center" id="home">
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
      className="text-xl md:text-2xl font-mono"
      style={{ color: '#fff', textShadow: '0 0 10px #fff' }}
    >
      <span className="typewriter">{text}</span>
    </motion.p>
  );
}
