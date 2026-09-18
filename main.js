/* ==========================================================================
   DEEKSHITH (D33) — CLEAN CYBER PORTFOLIO & ASCII MOTION GRAPHICS ENGINE
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================================================
       1. LANDING STAGE: DYNAMIC ASCII MOTION GRAPHICS ENGINE
       ========================================================================== */
    class AsciiMotionGraphicsEngine {
        constructor() {
            this.canvas = document.getElementById('asciiMotionCanvas');
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext('2d');
            this.fontSize = 12;
            this.cols = 0;
            this.rows = 0;

            // Geometry angles
            this.A = 0;
            this.B = 0;
            this.C = 0;

            // Mouse parallax
            this.mouseX = 0;
            this.mouseY = 0;
            this.targetMouseX = 0;
            this.targetMouseY = 0;

            // Particles
            this.particles = [];
            this.numParticles = 40;

            // ASCII character ramp
            this.chars = ' .,-~:;=!*#$@';

            this.resize();
            this.initParticles();
            this.bindEvents();
            this.startLoop();
        }

        resize() {
            const parent = this.canvas.parentElement;
            this.canvas.width = parent ? parent.clientWidth : window.innerWidth;
            this.canvas.height = parent ? parent.clientHeight : window.innerHeight;
            this.cols = Math.floor(this.canvas.width / 11);
            this.rows = Math.floor(this.canvas.height / (this.fontSize + 3));
        }

        initParticles() {
            this.particles = [];
            for (let i = 0; i < this.numParticles; i++) {
                this.particles.push({
                    x: Math.random() * (this.canvas.width || 800),
                    y: Math.random() * (this.canvas.height || 600),
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    char: ['+', 'x', '.', ':', '*', '#'][Math.floor(Math.random() * 6)],
                    alpha: 0.1 + Math.random() * 0.3
                });
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => {
                this.resize();
                this.initParticles();
            });

            window.addEventListener('mousemove', (e) => {
                this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            });
        }

        startLoop() {
            const renderFrame = () => {
                requestAnimationFrame(renderFrame);
                this.render();
            };
            requestAnimationFrame(renderFrame);
        }

        render() {
            const ctx = this.ctx;
            const w = this.canvas.width;
            const h = this.canvas.height;

            ctx.clearRect(0, 0, w, h);
            ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
            ctx.textBaseline = 'top';

            // Smooth mouse follow
            this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
            this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

            this.A += 0.018 + this.mouseY * 0.01;
            this.B += 0.012 + this.mouseX * 0.01;
            this.C += 0.008;

            // 1. Draw floating ambient ASCII cyber particles
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
                ctx.fillText(p.char, p.x, p.y);
            }

            // 2. Render 3D Rotating ASCII Torus Knot / Cyber Sphere
            const torusCols = Math.min(50, Math.floor(this.cols * 0.55));
            const torusRows = Math.min(24, Math.floor(this.rows * 0.65));
            const b = [];
            const z = [];
            for (let k = 0; k < torusCols * torusRows; k++) {
                b[k] = ' ';
                z[k] = 0;
            }

            const R1 = 1.1;
            const R2 = 2.2;
            const K2 = 5;

            for (let j = 0; j < 6.28; j += 0.28) {
                for (let i = 0; i < 6.28; i += 0.12) {
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

                    const x = Math.floor(torusCols / 2 + 32 * D * (l * h * m - torusT * n));
                    const y = Math.floor(torusRows / 2 + 16 * D * (l * h * n + torusT * m));
                    const o = x + torusCols * y;
                    const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

                    if (y >= 0 && y < torusRows && x >= 0 && x < torusCols && D > z[o]) {
                        z[o] = D;
                        b[o] = this.chars[Math.max(0, Math.min(this.chars.length - 1, N > 0 ? N : 0))];
                    }
                }
            }

            // Position torus on the right side of the landing screen
            const startX = Math.max(20, w - torusCols * 11 - 50);
            const startY = Math.max(40, Math.floor((h - torusRows * (this.fontSize + 2)) / 2));

            ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
            for (let ty = 0; ty < torusRows; ty++) {
                for (let tx = 0; tx < torusCols; tx++) {
                    const char = b[tx + torusCols * ty];
                    if (char && char !== ' ') {
                        // Alternate subtle cyan/emerald tone
                        ctx.fillStyle = (tx + ty) % 4 === 0 ? 'rgba(14, 165, 233, 0.55)' : 'rgba(16, 185, 129, 0.45)';
                        ctx.fillText(char, startX + tx * 11, startY + ty * (this.fontSize + 2));
                    }
                }
            }
        }
    }

    new AsciiMotionGraphicsEngine();

    /* ==========================================================================
       2. TYPEWRITER EFFECT FOR LANDING COMMAND
       ========================================================================== */
    const typingEl = document.getElementById('landingCommandTyping');
    if (typingEl) {
        const fullText = './boot_system.sh --operator=DEEKSHITH --mode=PRO';
        typingEl.textContent = '';
        let charIdx = 0;

        function typeChar() {
            if (charIdx < fullText.length) {
                typingEl.textContent += fullText.charAt(charIdx);
                charIdx++;
                setTimeout(typeChar, 35 + Math.random() * 30);
            }
        }

        setTimeout(typeChar, 300);
    }

    /* ==========================================================================
       3. METRICS COUNTER ANIMATION
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
       4. INTERACTIVE TERMINAL DRAWER
       ========================================================================== */
    class InteractiveTerminal {
        constructor() {
            this.overlay = document.getElementById('terminalOverlay');
            this.openBtn = document.getElementById('terminalToggleBtn');
            this.heroOpenBtn = document.getElementById('landingShellBtn');
            this.closeBtn = document.getElementById('closeTerminalBtn');
            this.input = document.getElementById('terminalInput');
            this.history = document.getElementById('terminalHistory');

            this.bindEvents();
        }

        bindEvents() {
            if (this.openBtn) this.openBtn.addEventListener('click', () => this.open());
            if (this.heroOpenBtn) this.heroOpenBtn.addEventListener('click', () => this.open());
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
                    this.appendHistory(`Available Commands:
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
       5. PROJECT CATEGORY FILTERING
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
       6. NAVBAR SCROLL & ACTIVE LINK SPY
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
       7. MOBILE MENU
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
       8. CONTACT FORM DISPATCH
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
