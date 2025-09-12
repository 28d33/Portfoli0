import React from 'react';

const skills = [
  'Network Security',
  'Ethical Hacking',
  'Penetration Testing',
  'Python & Bash Scripting',
  'Incident Response',
  'Linux Administration',
  'Web Security',
  'Cryptography',
];

const certifications = [
  'IIT-Guwahati cybersecurity Micro Credit Program',
  'Ethical Hacker - Cisco',
  'Positive Technologies - Positive Hack Talks Bengaluru',
  'PBCTF 4.0 - DCSE Bangalore',
  'IDEEEAS CTF - SIT Tumakuru',
  'Triwizard CTF - DSU Bangalore',
  'Cybersecurity Essentials - Cisco Networking Acadamy',
  'Deloitte Australia - Cyber job simulation',
  'MARVELOps: DOCKER 101 WORKSHOP',
  'Cyber Intilligence -UVCE GA',
  'Cybersecurity Analyst IAM - TCS (virtual training)',
  'Introduction to critical infractructure protection - OPSWAT Acadamy',
  'Ethical Hacking - IISc Bangalore',
];

const tools = [
  'Kali Linux',
  'Wireshark',
  'Ghidra',
  'Burp Suite',
  'Nmap',
  'John the Ripper',
  'Hashcat',
];

export default function About() {
  return (
    <section className="mb-16" id="about">
  <h2 className="text-2xl font-bold text-white mb-4" style={{textShadow: '0 0 10px #fff'}}>About Me</h2>
    <div className="mb-4 bg-gray-800 rounded shadow px-4 py-3">
      <p className="text-lg font-bold text-white">
        A cybersecurity enthusiast with a keen interest in safeguarding digital landscapes, thrives on exploring the ever-evolving
        world of information security. Skilled in identifying vulnerabilities, analyzing threats, and implementing robust solutions,
        they are dedicated to protecting systems from malicious attacks. With a solid foundation in Linux, Network Security, and
        Data Privacy. Enjoys staying ahead of cyber risks by learning the latest tools and trends. Their commitment to continuous
        learning and problem-solving drives their ambition to contribute to a safer and more secure digital future.
      </p>
    </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
  <h3 className="text-lg font-semibold text-neonBlue mb-2" style={{textShadow: '0 0 8px #00ffff'}}>Certifications</h3>
      <ul className="space-y-2">
        {certifications.map(cert => (
          <li key={cert} className="bg-gray-800 px-4 py-2 rounded shadow text-blue-400 border-l-4 border-green-600">{cert}</li>
        ))}
      </ul>
    </div>
    <div>
  <h3 className="text-lg font-semibold text-neonPink mb-2" style={{textShadow: '0 0 8px #ff00cc'}}>Skills</h3>
      <ul className="space-y-2">
        {skills.map(skill => (
          <li key={skill} className="bg-gray-800 px-4 py-2 rounded shadow text-blue-400 border-l-4 border-green-600">{skill}</li>
        ))}
      </ul>
    </div>
    <div>
  <h3 className="text-lg font-semibold text-yellow-400 mb-2" style={{textShadow: '0 0 8px #ffff00'}}>Tools</h3>
      <ul className="space-y-2">
        {tools.map(tool => (
          <li key={tool} className="bg-gray-800 px-4 py-2 rounded shadow text-blue-400 border-l-4 border-green-600">{tool}</li>
        ))}
      </ul>
    </div>
  </div>
    </section>
  );
}
