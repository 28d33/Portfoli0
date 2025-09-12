import React from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MatrixRain from './components/MatrixRain';

function App() {
  return (
    <div className="bg-black min-h-screen text-text font-mono relative overflow-hidden">
      <MatrixRain />
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
