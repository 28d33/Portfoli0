/* ==========================================================================
   DEEKSHITH (D33) — 3D IMMERSIVE PORTFOLIO & INTERACTIVE SYSTEMS
   Three.js WebGL Particle Engine + Parallax + Terminal Interface
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================================================
       1. LUCIDE ICONS INITIALIZATION
       ========================================================================== */
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       2. THREE.JS 3D PARTICLE TORUS KNOT BACKGROUND ENGINE
       ========================================================================== */
    class ThreeJsBackgroundEngine {
        constructor() {
            this.canvas = document.getElementById('webgl-canvas');
            if (!this.canvas || typeof THREE === 'undefined') return;

            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.objectsGroup = null;
            this.torusKnot = null;
            this.material = null;
            this.dustParticles = null;
            this.clock = new THREE.Clock();

            this.mouseX = 0;
            this.mouseY = 0;
            this.targetX = 0;
            this.targetY = 0;
            this.scrollY = 0;

            this.init();
            this.bindEvents();
            this.animate();
        }

        createCircleTexture() {
            const matCanvas = document.createElement('canvas');
            matCanvas.width = 64;
            matCanvas.height = 64;
            const ctx = matCanvas.getContext('2d');
            
            // Solid center core
            ctx.beginPath();
            ctx.arc(32, 32, 28, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            
            // Soft glow outer ring
            ctx.beginPath();
            ctx.arc(32, 32, 30, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.lineWidth = 2;
            ctx.stroke();

            return new THREE.CanvasTexture(matCanvas);
        }

        init() {
            // 1. Scene Setup
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.FogExp2(0x020617, 0.05);

            // 2. Camera Setup
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 15;
            this.camera.position.y = 2;

            // 3. Renderer Setup
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance'
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // 4. Object Group
            this.objectsGroup = new THREE.Group();
            this.scene.add(this.objectsGroup);

            // 5. Torus Knot Particle Mesh
            const particleTexture = this.createCircleTexture();
            const geometry = new THREE.TorusKnotGeometry(6, 1.5, 300, 40);
            
            this.material = new THREE.PointsMaterial({
                size: 0.16,
                map: particleTexture,
                transparent: true,
                opacity: 0.85,
                color: 0x0ea5e9, // Tailwind sky-500
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            this.torusKnot = new THREE.Points(geometry, this.material);
            this.torusKnot.position.x = window.innerWidth > 1024 ? 5 : 0;
            this.objectsGroup.add(this.torusKnot);

            // 6. Ambient Floating Dust Particles
            const dustGeometry = new THREE.BufferGeometry();
            const dustCount = 1000;
            const posArray = new Float32Array(dustCount * 3);
            for (let i = 0; i < dustCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 40;
            }
            dustGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const dustMaterial = new THREE.PointsMaterial({
                size: 0.05,
                color: 0x8b5cf6, // Tailwind violet-500
                transparent: true,
                opacity: 0.45,
                blending: THREE.AdditiveBlending
            });
            
            this.dustParticles = new THREE.Points(dustGeometry, dustMaterial);
            this.scene.add(this.dustParticles);
        }

        bindEvents() {
            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;

            window.addEventListener('mousemove', (e) => {
                this.mouseX = (e.clientX - windowHalfX) * 0.001;
                this.mouseY = (e.clientY - windowHalfY) * 0.001;
            }, { passive: true });

            window.addEventListener('touchmove', (e) => {
                if (e.touches && e.touches.length > 0) {
                    this.mouseX = (e.touches[0].clientX - windowHalfX) * 0.001;
                    this.mouseY = (e.touches[0].clientY - windowHalfY) * 0.001;
                }
            }, { passive: true });

            window.addEventListener('scroll', () => {
                this.scrollY = window.scrollY;
            }, { passive: true });

            window.addEventListener('resize', () => {
                if (!this.camera || !this.renderer) return;
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);

                if (this.torusKnot) {
                    this.torusKnot.position.x = window.innerWidth > 1024 ? 5 : 0;
                }
            });
        }

        animate() {
            const renderLoop = () => {
                const elapsedTime = this.clock.getElapsedTime();

                // Easing for smooth mouse follow
                this.targetX = this.mouseX * 0.5;
                this.targetY = this.mouseY * 0.5;

                if (this.objectsGroup) {
                    this.objectsGroup.rotation.y += 0.05 * (this.targetX - this.objectsGroup.rotation.y);
                    this.objectsGroup.rotation.x += 0.05 * (this.targetY - this.objectsGroup.rotation.x);
                }

                // Continuous baseline rotation for the Torus Knot
                if (this.torusKnot) {
                    this.torusKnot.rotation.y += 0.0025;
                    this.torusKnot.rotation.z += 0.0015;
                }

                // Animate dust particles slowly upwards & oscillating
                if (this.dustParticles) {
                    this.dustParticles.rotation.y = -elapsedTime * 0.02;
                    this.dustParticles.position.y = Math.sin(elapsedTime * 0.2) * 0.5;
                    this.dustParticles.rotation.x = this.scrollY * 0.001;
                }

                // Color breathing effect shifting between sky-blue (#0ea5e9) and violet (#8b5cf6)
                if (this.material) {
                    const r = 14 / 255 + Math.abs(Math.sin(elapsedTime * 0.5)) * (139 / 255 - 14 / 255);
                    const g = 165 / 255 + Math.abs(Math.sin(elapsedTime * 0.5)) * (92 / 255 - 165 / 255);
                    const b = 233 / 255 + Math.abs(Math.sin(elapsedTime * 0.5)) * (246 / 255 - 233 / 255);
                    this.material.color.setRGB(r, g, b);
                }

                // Scroll Parallax effect
                if (this.camera) {
                    this.camera.position.y = 2 - (this.scrollY * 0.004);
                    this.camera.position.z = 15 - (this.scrollY * 0.0015);
                }

                if (this.renderer && this.scene && this.camera) {
                    this.renderer.render(this.scene, this.camera);
                }

                requestAnimationFrame(renderLoop);
            };

            requestAnimationFrame(renderLoop);
        }
    }

    /* ==========================================================================
       3. SCROLL REVEAL OBSERVER
       ========================================================================== */
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                root: null,
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            reveals.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            function checkScroll() {
                const windowHeight = window.innerHeight;
                reveals.forEach(el => {
                    const top = el.getBoundingClientRect().top;
                    if (top < windowHeight - 80) {
                        el.classList.add('active');
                    }
                });
            }
            window.addEventListener('scroll', checkScroll);
            checkScroll();
        }
    }

    /* ==========================================================================
       4. NAVBAR SCROLL GLASS EFFECT & ACTIVE LINK SPY
       ========================================================================== */
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('main[id], section[id]');

        window.addEventListener('scroll', () => {
            if (navbar) {
                if (window.scrollY > 40) {
                    navbar.classList.add('glass');
                    navbar.classList.remove('py-4');
                    navbar.classList.add('py-2');
                } else {
                    navbar.classList.remove('glass');
                    navbar.classList.add('py-4');
                    navbar.classList.remove('py-2');
                }
            }

            let current = '';
            sections.forEach(sec => {
                if (window.scrollY >= sec.offsetTop - 150) {
                    current = sec.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-sky-400');
                    link.classList.remove('text-gray-300');
                } else {
                    link.classList.remove('text-sky-400');
                    link.classList.add('text-gray-300');
                }
            });
        }, { passive: true });
    }

    /* ==========================================================================
       5. MOBILE DRAWER NAVIGATION
       ========================================================================== */
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }

    /* ==========================================================================
       6. INTERACTIVE TERMINAL DRAWER & KEYBOARD SHORTCUTS
       ========================================================================== */
    class InteractiveTerminalDrawer {
        constructor() {
            this.modal = document.getElementById('terminalModal');
            this.openBtn = document.getElementById('terminalLaunchBtn');
            this.mobileOpenBtn = document.getElementById('mobileTerminalLaunchBtn');
            this.closeBtn = document.getElementById('closeTerminalBtn');
            this.input = document.getElementById('terminalInput');
            this.history = document.getElementById('terminalHistory');

            this.bindEvents();
        }

        bindEvents() {
            if (this.openBtn) this.openBtn.addEventListener('click', () => this.open());
            if (this.mobileOpenBtn) this.mobileOpenBtn.addEventListener('click', () => this.open());
            if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());

            // Global shortcut: '~' or '`' to open, 'Escape' to close
            window.addEventListener('keydown', (e) => {
                if ((e.key === '`' || e.key === '~') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    this.toggle();
                } else if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
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

            if (this.modal) {
                this.modal.addEventListener('click', (e) => {
                    if (e.target === this.modal) {
                        this.close();
                    }
                });
            }
        }

        open() {
            if (this.modal) {
                this.modal.classList.remove('hidden');
                setTimeout(() => {
                    if (this.input) this.input.focus();
                }, 100);
            }
        }

        close() {
            if (this.modal) {
                this.modal.classList.add('hidden');
            }
        }

        toggle() {
            if (!this.modal) return;
            if (this.modal.classList.contains('hidden')) {
                this.open();
            } else {
                this.close();
            }
        }

        appendHistory(text, styleClass = 'text-gray-300') {
            if (!this.history) return;
            const div = document.createElement('div');
            div.className = `${styleClass} whitespace-pre-wrap leading-relaxed`;
            div.textContent = text;
            this.history.appendChild(div);

            const body = document.getElementById('terminalBody');
            if (body) body.scrollTop = body.scrollHeight;
        }

        processCommand(rawCmd) {
            const cmd = rawCmd.toLowerCase();
            this.appendHistory(`d33:~$ ${rawCmd}`, 'text-emerald-400 font-semibold');

            switch (cmd) {
                case 'help':
                    this.appendHistory(`Available Commands:
- whoami       : Operator credentials & core specialization
- projects     : Production engineering & security projects
- skills       : Offensive & low-level cryptographic tools
- certs        : Verified cybersecurity credentials
- contact      : Direct communication endpoints
- clear        : Wipe terminal buffer
- exit         : Terminate terminal session`, 'text-sky-300');
                    break;

                case 'whoami':
                    this.appendHistory(`DEEKSHITH (D33)
Role     : Cybersecurity Engineer & Systems Developer
Location : Bangalore, Karnataka, India
Focus    : Offensive Security, Cryptography in C/C++, Digital Forensics`, 'text-gray-200');
                    break;

                case 'projects':
                    this.appendHistory(`1. E-D--Crypto         -> C / OpenSSL / AES-256 / RSA-2048
2. Perimeter Defense   -> ELK SIEM / Suricata IDS / Zero-Trust DMZ
3. Security Audit      -> Automated Bandit SAST & OWASP ZAP Framework
4. Data Stream Masking -> C++20 Real-Time Financial Payload Sanitizer
5. GPO Hardening       -> ISO 27001 & NIST 800-171 Compliance Automation
6. Memory Forensics    -> Volatility 3 & YARA Malware Pipeline`, 'text-cyan-300');
                    break;

                case 'skills':
                    this.appendHistory(`Offensive : Penetration Testing, OWASP Top 10, Active Directory, Reverse Eng
Languages : C, C++20, Python, Bash, x86_64 Assembly, SQL, JavaScript
Security  : OpenSSL, Burp Suite, Metasploit, Nmap, Wireshark, Volatility, YARA
Defensive : ELK Stack, Suricata IDS/IPS, Linux Kernel Hardening, GPO`, 'text-gray-200');
                    break;

                case 'certs':
                    this.appendHistory(`- Ethical Hacking (IISc Bangalore)
- Cybersecurity Course (IIT Guwahati)
- Ethical Hacker (Cisco)
- Presecurity Certified (TryHackMe)
- Cyber Job Simulation (Deloitte Australia)
- Cybersecurity Analyst IAM (TCS)
- Critical Infrastructure Protection (OPSWAT)
- 50+ CTF Flags (PBCTF, IDEEEAS, Triwizard)`, 'text-amber-300');
                    break;

                case 'contact':
                    this.appendHistory(`Email    : d33kshith@proton.me
GitHub   : github.com/28d33
LinkedIn : linkedin.com/in/d33kshithanand
Location : Bangalore, India`, 'text-sky-300');
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
                    this.appendHistory(`Command not recognized: '${rawCmd}'. Type 'help' for options.`, 'text-rose-400');
                    break;
            }
        }
    }

    /* ==========================================================================
       7. BOOTSTRAP APPLICATION
       ========================================================================== */
    function initApp() {
        new ThreeJsBackgroundEngine();
        initScrollReveal();
        initNavbar();
        initMobileMenu();
        new InteractiveTerminalDrawer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();
