import React from 'react';

const projects = [
  {
    title: 'E-D--Crypto',
    description: 'A C++ project related to cryptography. Exploration of encryption/decryption / crypto algorithms.',  
    link: 'https://github.com/28d33/E-D--Crypto',
    tags: ['C++', 'Cryptography','OEPA Padding','PEM','Base64','CLI','openssl','RSA','AES'],
  },
  {
    title: 'Perimeter_Security',
    description: 'A security tool or project focused on perimeter security (e.g. protecting network edges).',
    link: 'https://github.com/28d33/Perimeter_Security',
    tags: ['VirtualBox', 'ELK Stack','Filebeat','VPN','Networking','Network Security','Firewall','Security Monitoring'],
  },
  {
    title: 'Security_Assessment',
    description: 'Repository for assessing security posture, performing audits or risk analysis.',
    link: 'https://github.com/28d33/Security_Assessment',
    tags: ['Trivy', 'Bash', 'CVE Analysis','Vulnerability Scanning','Container Security','Secure SDLC','Threat Modeling'],
  },
  {
    title: 'Compliance',
    description: 'Tools/scripts or documentation to ensure compliance with security or regulatory frameworks.',
    link: 'https://github.com/28d33/Compliance',
    tags: ['Windows and Linux System Hardning', 'Audits','BYOD and Email Policies','MDM','GDPR','HIPAA','ISO 27001','CASB','CMMC','NIST SP 800-53'],
  },
  {
    title: 'Data_Security',
    description: 'Focus on securing data — possibly encryption, secure storage, or integrity checks.',
    link: 'https://github.com/28d33/Data_Security',
    tags: ['CIA','GDPR','PSI-DSS','HIPAA','MFA', 'Breach Response Procedures','Data Encryption','Data Masking','Data Loss Prevention (DLP)','Database Security','Access Controls'],
  },
];


export default function Projects() {
  return (
    <section className="mb-16" id="projects">
  <h2 className="text-2xl font-bold text-blue-500 mb-4">Projects</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map(project => (
          <div key={project.title} className="bg-gray-800 p-6 rounded-lg shadow border border-blue-600 hover:shadow-lg hover:bg-gray-700 transition-shadow">
            <h3 className="text-xl font-bold text-green-500 mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tags.map(tag => (
                <span key={tag} className="bg-blue-600 text-gray-100 px-2 py-1 rounded text-xs font-mono">{tag}</span>
              ))}
            </div>
            <a href={project.link} className="text-blue-400 underline hover:text-blue-300">View</a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <a
          href="resume/Resume.pdf"
          download
          className="inline-block px-6 py-2 bg-blue-600 text-gray-100 font-bold rounded shadow hover:bg-blue-700 hover:text-blue-300 transition-colors duration-200 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
