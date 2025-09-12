import React from 'react';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
  <nav className="flex justify-between items-center py-6 px-4 bg-black shadow-lg border-b border-neonBlue">
      <span className="text-2xl font-bold text-neonGreen tracking-wide">Portfolio</span>
      <ul className="flex space-x-6">
        {navItems.map(item => (
          <li key={item.name}>
            <a
              href={item.href}
              className="text-text hover:text-neonBlue transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-neonBlue"
              style={{ textShadow: '0 0 8px #39ff14' }}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
