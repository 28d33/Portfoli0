/* ==========================================================================
   DEEKSHITH (D33) — CLEAN & MINIMALIST CYBER PORTFOLIO ENGINE
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================================================
       1. SUBTLE AMBIENT ASCII BACKGROUND CANVAS
       ========================================================================== */
    class SubtleAsciiBackground {
        constructor() {
            this.canvas = document.getElementById('asciiBgCanvas');
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext('2d');
            this.fontSize = 12;
            this.cols = 0;
            this.rows = 0;
            this.A = 0;
            this.B = 0;

            this.streams = [];
            this.opcodes = [
                'MOV RAX, 0x3B',
                'XOR RDI, RDI',
                'SYSCALL',
                'PUSH RBP',
                '0x7FFE10',
                '0xDEADBEEF',
                'AES256',
                'RSA2048',
                'RET'
            ];
            this.hexChars = '0123456789ABCDEF!#*+-~:/';

            this.resize();
            this.bindEvents();
            this.startLoop();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.cols = Math.floor(this.canvas.width / 12);
            this.rows = Math.floor(this.canvas.height / (this.fontSize + 4));

            this.streams = [];
            for (let i = 0; i < this.cols; i++) {
                this.streams.push({
                    y: Math.random() * this.rows,
                    speed: 0.08 + Math.random() * 0.2,
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
                if (time - lastTime > 45) { // ~22 FPS for subtle, calm ambient animation
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
            ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
            ctx.textBaseline = 'top';

            this.A += 0.02;
            this.B += 0.01;

            // 1. Subtle Background Matrix Streams
            for (let col = 0; col < this.cols; col += 4) {
                const stream = this.streams[col];
                if (!stream) continue;

                stream.y += stream.speed;
                if (stream.y > this.rows + 10) {
                    stream.y = -5;
                    stream.speed = 0.08 + Math.random() * 0.2;
                }

                const rowIdx = Math.floor(stream.y);
                const xPos = col * 12;
                const yPos = rowIdx * (this.fontSize + 4);

                if (col % 8 === 0 && rowIdx >= 0 && rowIdx < this.rows) {
                    ctx.fillStyle = 'rgba(14, 165, 233, 0.25)'; // Sky blue
                    ctx.fillText(this.opcodes[stream.opcodeIdx], xPos, yPos);
                } else if (rowIdx >= 0 && rowIdx < this.rows) {
                    ctx.fillStyle = 'rgba(16, 185, 129, 0.18)'; // Emerald
                    const ch = this.hexChars[(Math.floor(t * 8) + col) % this.hexChars.length];
                    ctx.fillText(ch, xPos, yPos);
                }
            }

            // 2. Rotating 3D Torus in Upper-Right
            const torusCols = Math.min(38, Math.floor(this.cols * 0.4));
            const torusRows = Math.min(18, Math.floor(this.rows * 0.45));
            const b = [];
            const z = [];
            for (let k = 0; k < torusCols * torusRows; k++) {
                b[k] = ' ';
                z[k] = 0;
            }

            const R1 = 1;
            const R2 = 2.0;
            const K2 = 5;

            for (let j = 0; j < 6.28; j += 0.35) {
                for (let i = 0; i < 6.28; i += 0.16) {
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

                    const x = Math.floor(torusCols / 2 + 28 * D * (l * h * m - torusT * n));
                    const y = Math.floor(torusRows / 2 + 14 * D * (l * h * n + torusT * m));
                    const o = x + torusCols * y;
                    const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

                    if (y >= 0 && y < torusRows && x >= 0 && x < torusCols && D > z[o]) {
                        z[o] = D;
                        const chars = '.,-~:;=!*#$@';
                        b[o] = chars[Math.max(0, Math.min(chars.length - 1, N > 0 ? N : 0))];
                    }
                }
            }

            const startX = Math.max(20, w - torusCols * 12 - 30);
            const startY = Math.max(80, Math.floor(h * 0.1));

            ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
            for (let ty = 0; ty < torusRows; ty++) {
                for (let tx = 0; tx < torusCols; tx++) {
                    const char = b[tx + torusCols * ty];
                    if (char && char !== ' ') {
                        ctx.fillText(char, startX + tx * 12, startY + ty * (this.fontSize + 2));
                    }
                }
            }
        }
    }

    new SubtleAsciiBackground();

    /* ==========================================================================
       2. METRICS COUNTER ANIMATION
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                let cur = 0;
                const inc = Math.max(1, Math.floor(target / 20));
                const timer = setInterval(() => {
                    cur += inc;
                    if (cur >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = cur;
                    }
                }, 40);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => counterObserver.observe(c));

    /* ==========================================================================
       3. INTERACTIVE TERMINAL DRAWER
       ========================================================================== */
    class InteractiveTerminal {
        constructor() {
            this.overlay = document.getElementById('terminalOverlay');
            this.openBtn = document.getElementById('terminalToggleBtn');
            this.closeBtn = document.getElementById('closeTerminalBtn');
            this.input = document.getElementById('terminalInput');
            this.history = document.getElementById('terminalHistory');

            this.bindEvents();
        }

        bindEvents() {
            if (this.openBtn) this.openBtn.addEventListener('click', () => this.open());
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
            this.appendHistory(`d33:~$ ${rawCmd}`, 'color: #10b981; font-weight: 600;');

            switch (cmd) {
                case 'help':
                    this.appendHistory(`Commands:
- whoami       : About Deekshith
- projects     : List key security projects
- skills       : List technical capabilities
- certs        : View certifications
- contact      : Get contact details
- clear        : Clear terminal output
- exit         : Close terminal`, 'color: #94a3b8;');
                    break;

                case 'whoami':
                    this.appendHistory(`Deekshith (D33)
Cybersecurity engineer & penetration tester based in Bangalore, India.
Focus: Offensive testing, digital forensics, cryptographic tools in C/C++.`, 'color: #e2e8f0;');
                    break;

                case 'projects':
                    this.appendHistory(`1. E-D--Crypto         -> C / OpenSSL / AES-256 / RSA-2048
2. Perimeter Security  -> Zero-Trust / ELK SIEM / DMZ
3. Security Assessment -> S-SDLC / SAST & DAST Audit
4. Data Security       -> C++ / Financial Data Masking
5. Compliance          -> ISO 27001 / CMMC / GPO Hardening`, 'color: #0ea5e9;');
                    break;

                case 'skills':
                    this.appendHistory(`Offensive : Penetration Testing, OWASP Top 10, Active Directory
Defensive : Digital Forensics, SIEM (ELK Stack), Incident Response
Languages : Python, Bash, C/C++, x86/x64 Assembly, PowerShell, SQL
Tools     : Kali Linux, Burp Suite, Metasploit, Nmap, Docker, Volatility`, 'color: #e2e8f0;');
                    break;

                case 'certs':
                    this.appendHistory(`- Presecurity (TryHackMe)
- Cybersecurity Course (IIT Guwahati)
- Ethical Hacker (Cisco)
- Cyber Job Simulation (Deloitte Australia)
- Cybersecurity Analyst IAM (TCS)
- Ethical Hacking (IISc Bangalore)
- Critical Infrastructure Protection (OPSWAT)
- PBCTF 4.0 / IDEEEAS / Triwizard CTF (50+ Flags)`, 'color: #f59e0b;');
                    break;

                case 'contact':
                    this.appendHistory(`Email    : d33kshith@proton.me
GitHub   : github.com/28d33
LinkedIn : linkedin.com/in/d33kshithanand
Location : Bangalore, Karnataka, India`, 'color: #e2e8f0;');
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
                    this.appendHistory(`Command not recognized: '${rawCmd}'. Type 'help' for options.`, 'color: #64748b;');
                    break;
            }

            const body = document.getElementById('terminalBody');
            if (body) body.scrollTop = body.scrollHeight;
        }

        appendHistory(text, style) {
            if (!this.history) return;
            const p = document.createElement('div');
            p.style = `${style || 'color: #94a3b8;'} white-space: pre-wrap; margin-bottom: 6px;`;
            p.textContent = text;
            this.history.appendChild(p);
        }
    }

    new InteractiveTerminal();

    /* ==========================================================================
       4. PROJECT CATEGORY FILTERING
       ========================================================================== */
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            const filter = tag.getAttribute('data-filter');

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
       5. NAVBAR SCROLL & ACTIVE LINK SPY
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        }

        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) {
                current = sec.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    /* ==========================================================================
       6. MOBILE MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       7. CONTACT FORM DISPATCH
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value || 'Security Inquiry';
            const message = document.getElementById('message').value;

            if (formStatus) {
                formStatus.textContent = 'Opening email client...';
            }

            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoUrl = `mailto:d33kshith@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            setTimeout(() => {
                window.location.href = mailtoUrl;
                if (formStatus) {
                    formStatus.textContent = 'Message sent to mail client.';
                }
                contactForm.reset();
            }, 500);
        });
    }

})();
