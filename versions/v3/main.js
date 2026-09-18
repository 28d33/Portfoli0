/* ==========================================================================
   DEEKSHITH (D33) — PROCEDURAL ASCII FLOW & TERMINAL PORTFOLIO
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================================================
       1. PROCEDURAL ASCII FLOW BACKGROUND ENGINE (Wave Scale=10, Speed=1.3, Complexity=1.0)
       ========================================================================== */
    class ProceduralAsciiFlowEngine {
    constructor() {
        this.container = document.getElementById('ascii-background');
        if (!this.container) return;

        // Character set mapped from darkest to lightest value
        this.chars = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
        this.charLen = this.chars.length;

        // Configuration with user requested parameters
        this.config = {
            fontSize: 14,
            density: 10,       // Wave Scale = 10
            speed: 1.3,        // Time Multiplier = 1.3
            complexity: 1.0,   // Interference = 1.0
            theme: 'ghost',    // Default clean theme
            mouseX: -0.2,
            mouseY: -0.2,
            targetMouseX: 0,
            targetMouseY: 0
        };

        this.cols = 0;
        this.rows = 0;
        this.time = 0;

        this.calculateGrid();
        this.bindEvents();
        this.startLoop();
    }

    calculateGrid() {
        const charWidth = this.config.fontSize * 0.6;
        const charHeight = this.config.fontSize;
        this.cols = Math.ceil(window.innerWidth / charWidth);
        this.rows = Math.ceil(window.innerHeight / charHeight);
    }

    bindEvents() {
        window.addEventListener('resize', () => this.calculateGrid());

        window.addEventListener('mousemove', (e) => {
            this.config.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.config.targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches.length > 0) {
                this.config.targetMouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
                this.config.targetMouseY = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
            }
        }, { passive: true });
    }

    calculateIntensity(x, y, t) {
        const aspectRatio = this.rows / (this.cols || 1);
        const nx = (x / this.cols - 0.5) * this.config.density;
        const ny = (y / this.rows - 0.5) * (this.config.density * aspectRatio);

        const dx = nx - (this.config.mouseX * (this.config.density / 3));
        const dy = ny - (this.config.mouseY * (this.config.density / 3));
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 1. Base ripple expanding from center
        let value = Math.sin(distance - t);

        // 2. Overlapping sine/cosine waves for complexity/interference
        value += Math.sin(nx * (this.config.complexity / 2) + t * 0.7);
        value += Math.cos(ny * (this.config.complexity / 2) - t * 0.5);

        // 3. Rotational swirling influence
        const angle = Math.atan2(dy, dx);
        value += Math.sin(angle * 3 + t * 0.8) * 0.5;

        // Normalize combined wave value
        value = (value + 3.5) / 7;

        // Subtle vignette effect
        const edgeDistance = Math.sqrt(Math.pow((x / this.cols) - 0.5, 2) + Math.pow((y / this.rows) - 0.5, 2));
        const vignette = Math.max(0, 1 - (edgeDistance * 1.5));
        value = value * vignette;

        return Math.max(0, Math.min(0.999, value));
    }

    updateThemeVisuals() {
        const xPos = ((this.config.mouseX + 1) / 2) * 100;
        const yPos = ((this.config.mouseY + 1) / 2) * 100;

        // Spotlight gradient text clipping with subtle base illumination
        this.container.style.backgroundImage = `radial-gradient(circle at ${xPos}% ${yPos}%, rgba(255, 255, 255, 0.95) 0%, rgba(52, 211, 153, 0.45) 25%, rgba(148, 163, 184, 0.3) 55%, rgba(100, 116, 139, 0.18) 100%)`;
        this.container.style.webkitBackgroundClip = 'text';
        this.container.style.backgroundClip = 'text';
        this.container.style.webkitTextFillColor = 'transparent';
    }

    startLoop() {
        const render = () => {
            this.config.mouseX += (this.config.targetMouseX - this.config.mouseX) * 0.05;
            this.config.mouseY += (this.config.targetMouseY - this.config.mouseY) * 0.05;

            this.time += 0.05 * this.config.speed;

            let outputString = '';
            for (let y = 0; y < this.rows; y++) {
                for (let x = 0; x < this.cols; x++) {
                    const intensity = this.calculateIntensity(x, y, this.time);
                    const charIndex = Math.floor(intensity * this.charLen);
                    outputString += this.chars[charIndex];
                }
                outputString += '\n';
            }

            this.container.textContent = outputString;
            this.updateThemeVisuals();

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }
}

new ProceduralAsciiFlowEngine();

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
