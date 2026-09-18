/* ==========================================================================
   DEEKSHITH (D33) — HIGH-ASSURANCE MONOCHROMATIC ASCII TERMINAL ENGINE
   Features:
   - Full-Screen Recursive Animated ASCII Canvas Engine (3D Torus + Hex Streams)
   - Real-time System Uptime & UTC Clock Telemetry
   - Interactive Bash Recon Shell (Ring-0 Terminal)
   - Metric Telemetry Counter & Category Filtering
   - Pure Black & White Aesthetic
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================================================
       1. RECURSIVE ANIMATED ASCII BACKGROUND CANVAS ENGINE
       ========================================================================== */
    class AnimatedAsciiBackgroundEngine {
        constructor() {
            this.canvas = document.getElementById('asciiBgCanvas');
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext('2d');
            this.fontSize = 13;
            this.cols = 0;
            this.rows = 0;

            // 3D Geometry Angles
            this.A = 0;
            this.B = 0;

            // Rain Streams
            this.streams = [];
            
            // x86_64 Kernel & Security Assembly Opcodes
            this.opcodes = [
                'MOV RAX, 0x3B',
                'XOR RDI, RDI',
                'LEA RSI, [RIP+0x20]',
                'SYSCALL',
                'PUSH RBP',
                'MOV RBP, RSP',
                'SUB RSP, 0x30',
                'XOR EAX, EAX',
                'TEST RAX, RAX',
                'JZ .L_DECRYPT',
                'MOV CR0, RAX',
                'INT 0x80',
                'NOP',
                'CALL [RIP+0x40]',
                'MOV [RSP+8], RDX',
                'RET',
                '0x7FFE_8910',
                '0xDEAD_BEEF',
                '0xCAFE_BABE'
            ];

            this.hexChars = '0123456789ABCDEF!#*+-~:/_';

            // Memory Dumps
            this.memoryBuffer = [];
            this.initMemoryBuffer();

            this.resize();
            this.bindEvents();
            this.startLoop();
        }

        initMemoryBuffer() {
            for (let i = 0; i < 30; i++) {
                const addr = '0x' + (0x7ffe1000 + i * 16).toString(16).toUpperCase();
                let hex = '';
                for (let j = 0; j < 8; j++) {
                    hex += Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase() + ' ';
                }
                this.memoryBuffer.push(`${addr}: ${hex} [D33_ROOT]`);
            }
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.cols = Math.floor(this.canvas.width / 11);
            this.rows = Math.floor(this.canvas.height / (this.fontSize + 3));

            this.streams = [];
            for (let i = 0; i < this.cols; i++) {
                this.streams.push({
                    y: Math.random() * this.rows,
                    speed: 0.12 + Math.random() * 0.35,
                    char: this.hexChars[Math.floor(Math.random() * this.hexChars.length)],
                    opcodeIdx: Math.floor(Math.random() * this.opcodes.length)
                });
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => this.resize());
        }

        startLoop() {
            let lastTime = 0;
            const animate = (time) => {
                requestAnimationFrame(animate);
                if (time - lastTime > 38) { // ~26 FPS for crisp retro terminal pulse
                    lastTime = time;
                    this.render(time * 0.001);
                }
            };
            requestAnimationFrame(animate);
        }

        render(t) {
            const ctx = this.ctx;
            const w = this.canvas.width;
            const h = this.canvas.height;

            ctx.clearRect(0, 0, w, h);
            ctx.font = `${this.fontSize}px 'JetBrains Mono', 'Share Tech Mono', monospace`;
            ctx.textBaseline = 'top';

            this.A += 0.035;
            this.B += 0.018;

            // 1. Render Background Opcode & Hex Matrix Rain (Pure White with Variable Opacity)
            for (let col = 0; col < this.cols; col += 3) {
                const stream = this.streams[col];
                if (!stream) continue;

                stream.y += stream.speed;
                if (stream.y > this.rows + 15) {
                    stream.y = -5;
                    stream.speed = 0.12 + Math.random() * 0.35;
                }

                const rowIdx = Math.floor(stream.y);
                const xPos = col * 11;
                const yPos = rowIdx * (this.fontSize + 3);

                if (col % 9 === 0 && rowIdx >= 0 && rowIdx < this.rows) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
                    ctx.fillText(this.opcodes[stream.opcodeIdx], xPos, yPos);
                } else if (rowIdx >= 0 && rowIdx < this.rows) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
                    const ch = this.hexChars[(Math.floor(t * 10) + col) % this.hexChars.length];
                    ctx.fillText(ch, xPos, yPos);
                }
            }

            // 2. Render Mathematical 3D Rotating ASCII Torus in Top Right / Center
            const torusCols = Math.min(46, Math.floor(this.cols * 0.45));
            const torusRows = Math.min(22, Math.floor(this.rows * 0.55));
            const b = [];
            const z = [];
            for (let k = 0; k < torusCols * torusRows; k++) {
                b[k] = ' ';
                z[k] = 0;
            }

            const R1 = 1;
            const R2 = 2.0;
            const K2 = 5;

            for (let j = 0; j < 6.28; j += 0.32) {
                for (let i = 0; i < 6.28; i += 0.14) {
                    const c = Math.sin(i);
                    const d = Math.cos(j);
                    const e = Math.sin(this.A);
                    const f = Math.sin(j);
                    const g = Math.cos(this.A);
                    const h = d + R2;
                    const D = 1 / (c * h * e + f * g + K2);
                    const l = Math.cos(i);
                    const m = Math.cos(this.B);
                    const n = Math.sin(this.B);
                    const torusT = c * h * g - f * e;

                    const x = Math.floor(torusCols / 2 + 34 * D * (l * h * m - torusT * n));
                    const y = Math.floor(torusRows / 2 + 17 * D * (l * h * n + torusT * m));
                    const o = x + torusCols * y;
                    const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

                    if (y >= 0 && y < torusRows && x >= 0 && x < torusCols && D > z[o]) {
                        z[o] = D;
                        const chars = '.,-~:;=!*#$@';
                        b[o] = chars[Math.max(0, Math.min(chars.length - 1, N > 0 ? N : 0))];
                    }
                }
            }

            // Draw projected 3D Wireframe ASCII onto background
            const startX = Math.max(20, w - torusCols * 11 - 30);
            const startY = Math.max(70, Math.floor(h * 0.12));

            ctx.fillStyle = 'rgba(255, 255, 255, 0.48)';
            for (let ty = 0; ty < torusRows; ty++) {
                for (let tx = 0; tx < torusCols; tx++) {
                    const char = b[tx + torusCols * ty];
                    if (char && char !== ' ') {
                        ctx.fillText(char, startX + tx * 11, startY + ty * (this.fontSize + 2));
                    }
                }
            }

            // 3. Render Memory Address Telemetry on Bottom Left
            const memLines = 8;
            const memStartY = h - memLines * (this.fontSize + 4) - 25;
            for (let m = 0; m < memLines; m++) {
                const idx = (Math.floor(t * 2) + m) % this.memoryBuffer.length;
                ctx.fillStyle = 'rgba(200, 200, 200, 0.25)';
                ctx.fillText(this.memoryBuffer[idx], 25, memStartY + m * (this.fontSize + 4));
            }
        }
    }

    new AnimatedAsciiBackgroundEngine();

    /* ==========================================================================
       2. REAL-TIME SYSTEM TELEMETRY (Uptime & UTC Clock)
       ========================================================================== */
    const sysClock = document.getElementById('sysClock');
    const sysUptime = document.getElementById('sysUptime');
    const startTime = Date.now();

    function updateTelemetry() {
        // UTC Clock
        if (sysClock) {
            const now = new Date();
            const utcString = now.toUTCString().split(' ')[4] + ' UTC';
            sysClock.textContent = utcString;
        }

        // Uptime counter
        if (sysUptime) {
            const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
            const hrs = String(Math.floor(elapsedSec / 3600)).padStart(2, '0');
            const mins = String(Math.floor((elapsedSec % 3600) / 60)).padStart(2, '0');
            const secs = String(elapsedSec % 60).padStart(2, '0');
            sysUptime.textContent = `${hrs}:${mins}:${secs}`;
        }
    }

    setInterval(updateTelemetry, 1000);
    updateTelemetry();

    /* ==========================================================================
       3. METRIC COUNTER ANIMATION
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                let cur = 0;
                const inc = Math.max(1, Math.floor(target / 25));
                const timer = setInterval(() => {
                    cur += inc;
                    if (cur >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = cur;
                    }
                }, 35);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => counterObserver.observe(c));

    /* ==========================================================================
       4. INTERACTIVE RECON BASH SHELL DRAWER
       ========================================================================== */
    class HackerTerminal {
        constructor() {
            this.overlay = document.getElementById('terminalOverlay');
            this.openBtn = document.getElementById('terminalToggleBtn');
            this.heroLaunchBtn = document.getElementById('heroShellBtn');
            this.closeBtn = document.getElementById('closeTerminalBtn');
            this.input = document.getElementById('terminalInput');
            this.history = document.getElementById('terminalHistory');

            this.bindEvents();
        }

        bindEvents() {
            if (this.openBtn) this.openBtn.addEventListener('click', () => this.open());
            if (this.heroLaunchBtn) this.heroLaunchBtn.addEventListener('click', () => this.open());
            if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());

            window.addEventListener('keydown', (e) => {
                if (e.key === '`' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    this.toggle();
                } else if (e.key === 'Escape' && this.overlay && !this.overlay.classList.contains('hidden')) {
                    this.close();
                }
            });

            if (this.input) {
                this.input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const cmd = this.input.value.trim();
                        this.processCommand(cmd);
                        this.input.value = '';
                    }
                });
            }
        }

        open() {
            if (this.overlay) {
                this.overlay.classList.remove('hidden');
                setTimeout(() => {
                    if (this.input) this.input.focus();
                }, 100);
            }
        }

        close() {
            if (this.overlay) {
                this.overlay.classList.add('hidden');
            }
        }

        toggle() {
            if (!this.overlay) return;
            if (this.overlay.classList.contains('hidden')) {
                this.open();
            } else {
                this.close();
            }
        }

        processCommand(rawCmd) {
            const cmd = rawCmd.toLowerCase();
            this.appendHistory(`root@d33:~$ ${rawCmd}`, 'color: #ffffff; font-weight: bold;');

            switch (cmd) {
                case 'help':
                    this.appendHistory(`AVAILABLE COMMANDS:
- whoami       : Display operator biometrics and callsign
- about        : View operator dossier & philosophy
- skills       : List offensive & defensive cyber arsenal
- projects     : Inspect deployed exploit repositories
- certs        : View accreditations (TryHackMe, Cisco, IIT, IISc, CTF)
- exp          : View professional engagement history
- contact      : Display direct comms and PGP endpoint
- matrix       : Trigger raw hexadecimal stream
- date         : Show current UTC date & time
- uptime       : Display active session uptime
- clear        : Clear shell display
- exit         : Close shell window`, 'color: #a3a3a3;');
                    break;

                case 'whoami':
                    this.appendHistory(`OPERATOR: DEEKSHITH
CALLSIGN: D33
ROLE    : Ethical Hacker & Exploit Researcher
BASE    : Bangalore, India
STATUS  : Ring-0 Clearance // Active Deployments`, 'color: #ffffff;');
                    break;

                case 'about':
                    this.appendHistory(`MISSION: "Breaking things to make them stronger."
Axiom  : "</> You Are Now Less Valuable Than The Data You Produce </>"
Focus  : Offensive Penetration Testing, Zero-Trust Architecture, Digital Forensics, Low-Level Cryptography (C/C++).`, 'color: #e5e5e5;');
                    break;

                case 'skills':
                    this.appendHistory(`[+] OFFENSIVE : Penetration Testing, Web App Sec (OWASP Top 10), Active Directory, Social Eng, Red Teaming
[+] DEFENSIVE : Digital Forensics, SIEM (ELK Stack), Incident Response, Malware Disassembly, Zero-Trust
[+] LANGUAGES : Python, Bash, C/C++, x86/x64 Assembly, PowerShell, SQL
[+] TOOLS     : Kali Linux, Burp Suite, Metasploit, Nmap, Wireshark, Docker, Volatility, OpenSSL`, 'color: #ffffff;');
                    break;

                case 'projects':
                    this.appendHistory(`CLASSIFIED REPOSITORIES:
1. E-D--Crypto         -> C / OpenSSL / AES-256 / RSA-2048
2. Perimeter_Security  -> Zero-Trust / ELK SIEM / VirtualBox
3. Security_Assessment -> S-SDLC / SAST & DAST Audit
4. Data_Security       -> C++ / Field Encryption / Masking
5. Compliance          -> ISO 27001 / CMMC / GPO Hardening`, 'color: #e5e5e5;');
                    break;

                case 'certs':
                    this.appendHistory(`ACCREDITATIONS & VICTORIES:
* Presecurity - TryHackMe
* Cybersecurity Course - IIT Guwahati
* Ethical Hacker - Cisco
* Cyber Job Simulation - Deloitte Australia
* Cybersecurity Analyst IAM - TCS
* Ethical Hacking - IISc Bangalore
* Critical Infrastructure Protection - OPSWAT Academy
* Cybersecurity Essentials - Cisco
* PBCTF 4.0 / IDEEEAS CTF / Triwizard CTF (50+ Flags)`, 'color: #ffffff;');
                    break;

                case 'exp':
                    this.appendHistory(`LOGGED ENGAGEMENTS:
[1] Cybersecurity Intern @ HUMAN INITIALS (2025 - Active)
    - Risk mitigation, vulnerability scanning, incident response.
[2] Member @ MARVEL UVCE (Level 1 in CLCY Domain - Active)
    - Cloud security research, network defense labs.`, 'color: #e5e5e5;');
                    break;

                case 'contact':
                    this.appendHistory(`DIRECT UPLINK:
Email    : d33kshith@proton.me
GitHub   : github.com/28d33
LinkedIn : linkedin.com/in/d33kshithanand
Location : Bangalore, Karnataka, India`, 'color: #ffffff;');
                    break;

                case 'matrix':
                    this.appendHistory(`01000100 00110011 00110011 01011111 01010010 01001111 01001111 01010100
[+] PACKET STREAM ESTABLISHED. INTEGRITY: 100%`, 'color: #ffffff;');
                    break;

                case 'date':
                    this.appendHistory(new Date().toUTCString(), 'color: #a3a3a3;');
                    break;

                case 'uptime':
                    const elapsed = Math.floor((Date.now() - startTime) / 1000);
                    this.appendHistory(`Session Uptime: ${elapsed} seconds`, 'color: #a3a3a3;');
                    break;

                case 'clear':
                    if (this.history) this.history.innerHTML = '';
                    break;

                case 'exit':
                    this.close();
                    break;

                case '':
                    break;

                default:
                    this.appendHistory(`Command not recognized: '${rawCmd}'. Type 'help' for available options.`, 'color: #737373;');
                    break;
            }

            const body = document.getElementById('terminalBody');
            if (body) body.scrollTop = body.scrollHeight;
        }

        appendHistory(text, style) {
            if (!this.history) return;
            const p = document.createElement('div');
            p.style = `${style || 'color: #a3a3a3;'} white-space: pre-wrap; margin-bottom: 6px; font-family: var(--font-mono);`;
            p.textContent = text;
            this.history.appendChild(p);
        }
    }

    new HackerTerminal();

    /* ==========================================================================
       5. PROJECT CATEGORY FILTERING
       ========================================================================== */
    const filterTabs = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-ascii-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       6. NAVBAR SCROLL & ACTIVE LINK SPY
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        }

        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 140) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    /* ==========================================================================
       7. MOBILE NAVIGATION TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       8. CONTACT FORM DISPATCH
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value || 'Security Consultation';
            const message = document.getElementById('message').value;

            if (formStatus) {
                formStatus.textContent = 'Encrypting & dispatching payload to email client...';
            }

            const body = `Callsign/Name: ${name}\nEmail: ${email}\n\nPayload:\n${message}`;
            const mailtoUrl = `mailto:d33kshith@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            setTimeout(() => {
                window.location.href = mailtoUrl;
                if (formStatus) {
                    formStatus.textContent = 'Transmission dispatched to default mail client. Awaiting handshake.';
                }
                contactForm.reset();
            }, 600);
        });
    }

    console.log('%c[DEEKSHITH // HIGH-ASSURANCE MONOCHROME ASCII WORKSTATION LOADED]', 'color: #ffffff; font-weight: bold; font-family: monospace;');
})();
