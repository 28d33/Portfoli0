/* ==========================================================================
   DEEKSHITH (D33) — 3D SPATIAL INTERACTIVE PORTFOLIO (v7.0)
   Three.js Spatial Core + Lenis Smooth Scroll + Horizontal Pin Track + GSAP
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
            duration: 1.2,
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
       3. CUSTOM DUAL LERP CURSOR
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let cursorX = window.innerWidth / 2;
        let cursorY = window.innerHeight / 2;
        let outlineX = cursorX;
        let outlineY = cursorY;

        window.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        }, { passive: true });

        const bindHoverables = () => {
            const interactiveElements = document.querySelectorAll('a, button, input, .hoverable, .cursor-pointer');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });
        };

        function animateCursor() {
            outlineX += (cursorX - outlineX) * 0.18;
            outlineY += (cursorY - outlineY) * 0.18;
            
            cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        }

        bindHoverables();
        requestAnimationFrame(animateCursor);
    }

    /* ==========================================================================
       4. THREE.JS 3D MULTILAYER SPATIAL CORE & GALAXY
       ========================================================================== */
    let scene, camera, renderer, coreGroup, innerMesh, outerMesh, particleSystem;
    let dirLight1, dirLight2;
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

    function initThreeJS() {
        const canvas = document.getElementById('webgl-container');
        if (!canvas || typeof THREE === 'undefined') return;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030303, 0.02);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 15);

        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        dirLight1 = new THREE.DirectionalLight(0x4f46e5, 3);
        dirLight1.position.set(5, 5, 5);
        scene.add(dirLight1);

        dirLight2 = new THREE.DirectionalLight(0x00f0ff, 2.5);
        dirLight2.position.set(-5, -5, 2);
        scene.add(dirLight2);

        // Core Group
        coreGroup = new THREE.Group();
        scene.add(coreGroup);

        // Layer 1: Inner Solid Metallic Icosahedron
        const innerGeo = new THREE.IcosahedronGeometry(2, 1);
        const innerMat = new THREE.MeshPhysicalMaterial({
            color: 0x11141c,
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            wireframe: false
        });
        innerMesh = new THREE.Mesh(innerGeo, innerMat);
        coreGroup.add(innerMesh);

        // Layer 2: Outer Glowing Wireframe Icosahedron
        const outerGeo = new THREE.IcosahedronGeometry(2.5, 2);
        const outerMat = new THREE.MeshStandardMaterial({
            color: 0x4f46e5,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        outerMesh = new THREE.Mesh(outerGeo, outerMat);
        coreGroup.add(outerMesh);

        // Layer 3: Orbiting Spherical Particle Dust Galaxy (3,000 points)
        const particlesGeo = new THREE.BufferGeometry();
        const particlesCount = 3000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            const radius = 3 + Math.random() * 8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            
            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i + 2] = radius * Math.cos(phi);
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.025,
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending
        });
        particleSystem = new THREE.Points(particlesGeo, particlesMat);
        coreGroup.add(particleSystem);

        // Mouse Listeners
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        window.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        }, { passive: true });

        // Window Resize
        window.addEventListener('resize', () => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Start Render Loop
        const clock = new THREE.Clock();

        function render() {
            const elapsedTime = clock.getElapsedTime();

            innerMesh.rotation.y += 0.002;
            innerMesh.rotation.x += 0.001;
            
            outerMesh.rotation.y -= 0.003;
            outerMesh.rotation.z += 0.002;

            particleSystem.rotation.y = elapsedTime * 0.05;
            outerMesh.scale.setScalar(1 + Math.sin(elapsedTime * 1.5) * 0.05);

            // Parallax mouse follow
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;
            
            coreGroup.rotation.y += 0.05 * (targetX - coreGroup.rotation.y);
            coreGroup.rotation.x += 0.05 * (targetY - coreGroup.rotation.x);

            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        
        render();
    }

    /* ==========================================================================
       5. GSAP HORIZONTAL & VERTICAL SCROLL ANIMATIONS
       ========================================================================== */
    function initAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Preloader Animation
        gsap.to("#loader-progress", {
            width: "100%",
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to("#loader", {
                    yPercent: -100,
                    duration: 0.9,
                    ease: "power4.inOut",
                    onComplete: () => {
                        const loader = document.getElementById('loader');
                        if (loader) loader.style.display = 'none';
                        startScrollOrchestration();
                    }
                });
            }
        });

        function startScrollOrchestration() {
            // Hero Text Reveal
            gsap.fromTo(".gs-hero-reveal", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: "power3.out" }
            );

            // General section text reveals
            gsap.utils.toArray('.gs-fade-up').forEach(element => {
                gsap.fromTo(element, 
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        },
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out"
                    }
                );
            });

            // 1. Vertical 3D Choreography Timeline
            if (coreGroup) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#ui-layer",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1
                    }
                });

                // Section 1 (About) -> Shift Core to Left, zoom in slightly
                tl.to(coreGroup.position, {
                    x: window.innerWidth > 768 ? -4 : 0,
                    y: 1,
                    z: 2,
                    ease: "none"
                }, 0.1);
                
                if (dirLight1) tl.to(dirLight1.color, { r: 0, g: 1, b: 0.8 }, 0.1);
                if (outerMesh) tl.to(outerMesh.material.color, { r: 0.3, g: 0.2, b: 1 }, 0.1);

                // Section 2 (Horizontal Works) -> Center core, push back
                tl.to(coreGroup.position, {
                    x: 0,
                    y: 0,
                    z: -4,
                    ease: "none"
                }, 0.35);

                // Section 3 (Capabilities) -> Lift core
                tl.to(coreGroup.position, {
                    x: window.innerWidth > 768 ? 3.5 : 0,
                    y: -0.5,
                    z: 0,
                    ease: "none"
                }, 0.65);

                // Section 4 (Contact) -> Fly straight THROUGH the particle core
                tl.to(coreGroup.position, {
                    x: 0,
                    y: -1.5,
                    z: 12,
                    ease: "none"
                }, 0.9);

                tl.to(coreGroup.rotation, {
                    x: Math.PI * 2,
                    y: Math.PI * 4,
                    ease: "none"
                }, 0);
            }

            // 2. PINNED HORIZONTAL SCROLL TRACK
            const horizontalSection = document.getElementById('horizontal-work');
            const track = document.getElementById('horizontal-track');

            if (horizontalSection && track) {
                const getScrollAmount = () => {
                    return -(track.scrollWidth - window.innerWidth);
                };

                gsap.to(track, {
                    x: getScrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalSection,
                        pin: true,
                        start: "top top",
                        end: () => `+=${track.scrollWidth - window.innerWidth}`,
                        scrub: 1,
                        invalidateOnRefresh: true
                    }
                });
            }
        }
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
- whoami       : Operator profile & core credentials
- projects     : Production engineering & security suites
- skills       : Offensive & cryptographic toolsets
- certs        : Verified industry accreditations
- contact      : Direct communication coordinates
- clear        : Clear console output
- exit         : Close terminal`, 'text-cyan-400');
                    break;

                case 'whoami':
                    this.appendHistory(`OPERATOR : DEEKSHITH (D33)
ROLE     : Offensive Security Architect & Low-Level Systems Engineer
LOCATION : Bangalore, Karnataka, India [12.9716° N, 77.5946° E]
CORE     : Low-Level Cryptography (C/C++), Penetration Testing, Real-Time Forensics`, 'text-gray-200');
                    break;

                case 'projects':
                case 'works':
                    this.appendHistory(`1. E-D--Crypto         -> C / OpenSSL / AES-256-CBC / RSA-2048
2. Perimeter Defense   -> ELK SIEM / Suricata IDS / Zero-Trust DMZ
3. Security Audit      -> Automated Bandit SAST & OWASP ZAP Pipeline
4. Data Stream Masking -> C++20 Real-Time Financial Tokenizer`, 'text-indigo-300');
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
        initAnimations();
        initMobileMenu();
        new InteractiveTerminalDrawer();
    });

})();
