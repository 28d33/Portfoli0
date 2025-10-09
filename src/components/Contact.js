import React from 'react';

export default function Contact() {
  return (
    <section className="mb-16" id="contact">
  <h2 className="text-2xl font-bold text-neonGreen mb-4" style={{textShadow: '0 0 10px #39ff14'}}>Contact</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow border border-blue-600">
        <p className="mb-2 text-gray-100">Email: <a href="mailto:d33kshith@duck.com" className="text-blue-400 underline hover:text-blue-300">d33kshith@proton.me</a></p>
        <p className="mb-2 text-gray-100">LinkedIn: <a href="https://www.linkedin.com/in/d33kshithanand" className="text-blue-400 underline hover:text-blue-300">linkedin.com/in/d33kshithanand</a></p>
        <p className="mb-2 text-gray-100">GitHub: <a href="https://www.github.com/28d33" className="text-blue-400 underline hover:text-blue-400">github.com/28d33</a></p>
        <div className="mt-4">
        </div>
      </div>
    </section>
  );
}
