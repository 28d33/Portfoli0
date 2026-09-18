/* ==========================================================================
   DEEKSHITH (D33) — 10,000 PARTICLE MORPHING ENGINE (v8.0)
   Three.js Mathematical Morphing + Lenis Smooth Scroll + Terminal Console
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
       2. LENIS SMOOTH SCROLLING SETUP
       ========================================================================== */
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }

    /* ==========================================================================
       3. CUSTOM DUAL LERP CURSOR LOGIC
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let targetX = 0;
    let targetY = 0;

    if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Normalized coordinates for Three.js parallax
            targetX = (e.clientX / window.innerWidth) * 2 - 1;
            targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        }, { passive: true });

        const bindHoverables = () => {
            const interactiveElements = document.querySelectorAll('.interactive-el, a, button, input');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
            });
        };

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        }

        bindHoverables();
        requestAnimationFrame(animateCursor);
    }

    /* ==========================================================================
       4. THREE.JS 10,000 PARTICLE MORPHING ENGINE
       ========================================================================== */
    const particleCount = 10000;
    const positionAttributes = {
        shape1: new Float32Array(particleCount * 3), // Hero: Clustered Sphere
        shape2: new Float32Array(particleCount * 3), // About: Twisted Helix / Torus Knot
        shape3: new Float32Array(particleCount * 3), // Work: Wavy Grid
        shape4: new Float32Array(particleCount * 3)  // Contact: Massive Vortex / Explosion
    };

    let particleSystem = null;
    let scrollState = {
        progress: 0,
        activeShape: 1,
        morphFactor: 0
    };

    function randomPointInSphere(radius) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random()) * radius;
        const sinPhi = Math.sin(phi);
        return [
            r * sinPhi * Math.cos(theta),
            r * sinPhi * Math.sin(theta),
            r * Math.cos(phi)
        ];
    }

    // Generate Shape Coordinate Buffers
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // SHAPE 1: Clustered Sphere (Hero)
        const p1 = randomPointInSphere(12);
        positionAttributes.shape1[i3] = p1[0];
        positionAttributes.shape1[i3 + 1] = p1[1];
        positionAttributes.shape1[i3 + 2] = p1[2];

        // SHAPE 2: Twisted Helix / Torus Knot (Vision / About)
        const t = (i / particleCount) * Math.PI * 2 * 10;
        const r2 = 8 + Math.sin(t * 3) * 2;
        const x2 = Math.cos(t) * r2;
        const y2 = Math.sin(t) * r2;
        const z2 = Math.sin(t * 4) * 6;
        positionAttributes.shape2[i3] = x2 + (Math.random() - 0.5) * 2;
        positionAttributes.shape2[i3 + 1] = y2 + (Math.random() - 0.5) * 2;
        positionAttributes.shape2[i3 + 2] = z2 + (Math.random() - 0.5) * 2;

        // SHAPE 3: Wavy Grid (Archive / Work)
        const gridCols = Math.sqrt(particleCount);
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        const spacing = 0.5;
        const x3 = (col - gridCols / 2) * spacing;
        const z3 = (row - gridCols / 2) * spacing;
        positionAttributes.shape3[i3] = x3;
        positionAttributes.shape3[i3 + 1] = (Math.random() - 0.5) * 1;
        positionAttributes.shape3[i3 + 2] = z3;

        // SHAPE 4: Massive Spatial Vortex / Explosion (Contact)
        const radius4 = 30 + Math.random() * 20;
        const angle4 = Math.random() * Math.PI * 2;
        const height4 = (Math.random() - 0.5) * 50;
        positionAttributes.shape4[i3] = Math.cos(angle4) * radius4;
        positionAttributes.shape4[i3 + 1] = height4;
        positionAttributes.shape4[i3 + 2] = Math.sin(angle4) * radius4;
    }

    function initThreeJS() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2('#050505', 0.025);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Buffer Geometry
        const geometry = new THREE.BufferGeometry();
        const currentPositions = new Float32Array(positionAttributes.shape1);
        geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

        // Radial Gradient Glowing Particle Texture
        const particleCanvas = document.createElement('canvas');
        particleCanvas.width = 32;
        particleCanvas.height = 32;
        const pCtx = particleCanvas.getContext('2d');
        const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0, 255, 255, 0.85)'); // Cyan glow
        gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.3)');  // Violet edge
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        pCtx.fillStyle = gradient;
        pCtx.fillRect(0, 0, 32, 32);
        const particleTexture = new THREE.CanvasTexture(particleCanvas);

        const material = new THREE.PointsMaterial({
            size: 0.4,
            map: particleTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            color: 0xffffff
        });

        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        // ScrollTrigger 4-Phase Shape Mapping
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: (self) => {
                    scrollState.progress = self.progress;
                    const p = self.progress;
                    if (p < 0.25) {
                        scrollState.activeShape = 1;
                        scrollState.morphFactor = p / 0.25;
                    } else if (p < 0.5) {
                        scrollState.activeShape = 2;
                        scrollState.morphFactor = (p - 0.25) / 0.25;
                    } else if (p < 0.75) {
                        scrollState.activeShape = 3;
                        scrollState.morphFactor = (p - 0.5) / 0.25;
                    } else {
                        scrollState.activeShape = 4;
                        scrollState.morphFactor = (p - 0.75) / 0.25;
                    }
                }
            });
        }

        // Render Loop
        const clock = new THREE.Clock();
        let currentCameraX = 0;
        let currentCameraY = 0;

        function animate() {
            requestAnimationFrame(animate);
            
            const time = clock.getElapsedTime();
            const positions = particleSystem.geometry.attributes.position.array;

            let sourceArray = positionAttributes['shape' + scrollState.activeShape];
            let targetArray = positionAttributes['shape' + Math.min(scrollState.activeShape + 1, 4)];
            
            if (scrollState.activeShape === 4) {
                targetArray = positionAttributes.shape4;
            }

            // Polynomial ease in-out
            const t = scrollState.morphFactor;
            const easeMorph = t * t * (3 - 2 * t);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                
                let x = sourceArray[i3] + (targetArray[i3] - sourceArray[i3]) * easeMorph;
                let y = sourceArray[i3 + 1] + (targetArray[i3 + 1] - sourceArray[i3 + 1]) * easeMorph;
                let z = sourceArray[i3 + 2] + (targetArray[i3 + 2] - sourceArray[i3 + 2]) * easeMorph;

                // Dynamic breathing/wave motion
                if (scrollState.activeShape === 1) {
                    const pulse = Math.sin(time * 2 + i) * 0.08;
                    x += x * pulse;
                    y += y * pulse;
                    z += z * pulse;
                } else if (scrollState.activeShape === 3 || (scrollState.activeShape === 2 && scrollState.morphFactor > 0.5)) {
                    y += Math.sin(x * 0.5 + time * 2) * 2 + Math.cos(z * 0.5 + time) * 2;
                }

                positions[i3] = x;
                positions[i3 + 1] = y;
                positions[i3 + 2] = z;
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;

            // Global System Rotation based on time and scroll progress
            particleSystem.rotation.y = time * 0.05 + scrollState.progress * Math.PI * 2;
            particleSystem.rotation.x = scrollState.progress * Math.PI;

            // Smooth Camera Parallax
            currentCameraX += (targetX * 5 - currentCameraX) * 0.05;
            currentCameraY += (targetY * 5 - currentCameraY) * 0.05;
            
            camera.position.x = currentCameraX;
            camera.position.y = currentCameraY;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    /* ==========================================================================
       5. GSAP UI ANIMATIONS & PRELOADER
       ========================================================================== */
    function initUIAnimations() {
        if (typeof gsap === 'undefined') return;

        let loadProgress = { val: 0 };
        gsap.to(loadProgress, {
            val: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
                const progressEl = document.getElementById('loader-progress');
                const percentEl = document.getElementById('loader-percentage');
                if (progressEl) progressEl.style.width = `${loadProgress.val}%`;
                if (percentEl) percentEl.innerText = `${Math.floor(loadProgress.val).toString().padStart(3, '0')}%`;
            },
            onComplete: () => {
                gsap.to("#loader", {
                    opacity: 0,
                    duration: 0.9,
                    ease: "power2.inOut",
                    onComplete: () => {
                        const loader = document.getElementById('loader');
                        if (loader) loader.style.display = 'none';

                        gsap.to(".gs-reveal-up", {
                            y: 0,
                            duration: 1.1,
                            stagger: 0.1,
                            ease: "power4.out"
                        });
                        gsap.fromTo(".gs-reveal", 
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 0.3, ease: "power2.out" }
                        );
                    }
                });
            }
        });

        gsap.to("#loader-title", {
            y: 0,
            duration: 1,
            ease: "power4.out",
            delay: 0.2
        });

        // Section Scroll Triggers
        gsap.utils.toArray('.gs-fade').forEach(elem => {
            gsap.fromTo(elem, 
                { opacity: 0, y: 40 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );
        });
    }

    /* ==========================================================================
       6. MOBILE MENU
       ========================================================================== */
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const menu = document.getElementById('mobileMenu');
        const links = document.querySelectorAll('.mobile-nav-link');

        if (menuBtn && menu) {
            menuBtn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });

            links.forEach(l => {
                l.addEventListener('click', () => {
                    menu.classList.add('hidden');
                });
            });
        }
    }

    /* ==========================================================================
       7. INTERACTIVE TERMINAL DRAWER
       ========================================================================== */
    class InteractiveTerminalDrawer {
        constructor() {
            this.modal = document.getElementById('terminalModal');
            this.openBtn = document.getElementById('terminalToggleBtn');
            this.mobileOpenBtn = document.getElementById('mobileTerminalBtn');
            this.closeBtn = document.getElementById('closeTerminalBtn');
            this.input = document.getElementById('terminalInput');
            this.history = document.getElementById('terminalHistory');

            this.bindEvents();
        }

        bindEvents() {
            if (this.openBtn) this.openBtn.addEventListener('click', () => this.open());
            if (this.mobileOpenBtn) this.mobileOpenBtn.addEventListener('click', () => this.open());
            if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());

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
            div.className = `${styleClass} whitespace-pre-wrap leading-relaxed font-mono`;
            div.textContent = text;
            this.history.appendChild(div);

            const body = document.getElementById('terminalBody');
            if (body) body.scrollTop = body.scrollHeight;
        }

        processCommand(rawCmd) {
            const cmd = rawCmd.toLowerCase();
            this.appendHistory(`d33:~$ ${rawCmd}`, 'text-cyan-400 font-bold');

            switch (cmd) {
                case 'help':
                    this.appendHistory(`Available Commands:
- whoami       : Operator credentials & core identity
- projects     : Production engineering & security suites
- skills       : Offensive & cryptographic toolsets
- certs        : Verified industry accreditations
- contact      : Direct communication coordinates
- clear        : Clear console output
- exit         : Close terminal`, 'text-cyan-400');
                    break;

                case 'whoami':
                    this.appendHistory(`OPERATOR : DEEKSHITH (D33)
ROLE     : Offensive Security Architect & Low-Level Systems Developer
LOCATION : Bangalore, Karnataka, India [12.9716° N, 77.5946° E]
CORE     : Low-Level Cryptography (C/C++), Penetration Testing, Digital Forensics`, 'text-gray-200');
                    break;

                case 'projects':
                case 'works':
                    this.appendHistory(`1. E-D--Crypto         -> C / OpenSSL / AES-256-CBC / RSA-2048
2. Perimeter Defense   -> ELK SIEM / Suricata IDS / Zero-Trust DMZ
3. Security Audit      -> Automated Bandit SAST & OWASP ZAP Pipeline
4. Data Stream Masking -> C++20 Financial Payload Tokenizer`, 'text-purple-300');
                    break;

                case 'skills':
                    this.appendHistory(`Offensive : Pen-Testing, OWASP Top 10, Active Directory, Reverse Engineering
Languages : C, C++20, Python, Bash, x86_64 Assembly, SQL, JavaScript
Tools     : OpenSSL, Burp Suite, Metasploit, Nmap, Wireshark, Volatility, YARA
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
- 50+ CTF Flags (PBCTF, IDEEEAS, Triwizard)`, 'text-cyan-400');
                    break;

                case 'contact':
                    this.appendHistory(`Email    : d33kshith@proton.me
GitHub   : github.com/28d33
LinkedIn : linkedin.com/in/d33kshithanand
Location : Bangalore, India`, 'text-cyan-400');
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
       8. BOOTSTRAP ON WINDOW LOAD
       ========================================================================== */
    window.addEventListener('load', () => {
        initThreeJS();
        initUIAnimations();
        initMobileMenu();
        new InteractiveTerminalDrawer();
    });

})();
