/* ==========================================================================
   DEEKSHITH (D33) — SYSTEM BREACH // ctOS JAVASCRIPT ENGINE (v5.0)
   Three.js Wireframe Terrain + Central Core Node + Terminal Console
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
       2. SNAPPY CROSSHAIR CURSOR LOGIC
       ========================================================================== */
    const cursor = document.getElementById('cursor-crosshair');

    if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            // Direct instantaneous transformation for snappy military/hacker feel
            cursor.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
        }, { passive: true });

        const bindHoverables = () => {
            const hoverables = document.querySelectorAll('.hoverable, a, button, input');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });
        };

        bindHoverables();
    }

    /* ==========================================================================
       3. GSAP ANIMATIONS & TERMINAL BOOT SEQUENCE
       ========================================================================== */
    function initAnimations() {
        if (typeof gsap === 'undefined') return;

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        const tl = gsap.timeline();

        // Staggered log terminal sequence
        tl.to(".log-line", {
            opacity: 1,
            y: 0,
            duration: 0.08,
            stagger: 0.22,
            ease: "none"
        })
        // Cyan screen flash
        .to("#terminal-loader", {
            backgroundColor: "#00e5ff",
            duration: 0.08,
            delay: 0.3
        })
        // Fade out loader
        .to("#terminal-loader", {
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
            onComplete: () => {
                const loader = document.getElementById('terminal-loader');
                if (loader) loader.style.display = 'none';
                initThreeJS(); // Launch 3D engine immediately after boot
            }
        })
        // Reveal main UI
        .to("#main-ui", {
            opacity: 1,
            duration: 0.1
        }, "-=0.2")
        // Hero text reveals
        .fromTo(".gs-reveal", 
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        )
        .fromTo(".gs-title-line",
            { y: "100%" },
            { y: "0%", duration: 0.9, stagger: 0.12, ease: "power4.out" },
            "-=0.7"
        );

        // Section Headers
        gsap.utils.toArray('.gs-section-header').forEach(header => {
            gsap.fromTo(header,
                { opacity: 0, x: -40 },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%",
                    },
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    ease: "power3.out"
                }
            );
        });

        // Project Cards
        gsap.utils.toArray('.gs-project').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 45 },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: i % 2 === 0 ? 0 : 0.15,
                    ease: "power3.out"
                }
            );
        });

        // Skills Stagger
        gsap.fromTo(".gs-skill",
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: "#specs",
                    start: "top 80%"
                },
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: "power2.out"
            }
        );
    }

    /* ==========================================================================
       4. THREE.JS 3D CYBER DEFENSE ENVIRONMENT
       ========================================================================== */
    function initThreeJS() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020202, 0.04);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 15);
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 2. Wireframe Terrain (The Digital Grid)
        const terrainGeo = new THREE.PlaneGeometry(100, 100, 40, 40);
        terrainGeo.rotateX(-Math.PI / 2);
        
        const vertices = terrainGeo.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i];
            const z = vertices[i + 2];
            vertices[i + 1] = (Math.sin(x * 0.2) * Math.cos(z * 0.2) * 2) + (Math.sin(x * 0.05) * 4);
        }
        terrainGeo.computeVertexNormals();

        const terrainMat = new THREE.MeshBasicMaterial({ 
            color: 0x00e5ff, 
            wireframe: true, 
            transparent: true, 
            opacity: 0.18 
        });
        const terrain = new THREE.Mesh(terrainGeo, terrainMat);
        terrain.position.y = -4;
        scene.add(terrain);

        // 3. Central Data Core Node
        const coreGroup = new THREE.Group();
        
        // Outer Cyan Wireframe Icosahedron
        const outerGeo = new THREE.IcosahedronGeometry(4, 1);
        const outerMat = new THREE.MeshBasicMaterial({
            color: 0x00e5ff,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        const outerCore = new THREE.Mesh(outerGeo, outerMat);
        
        // Inner Red Wireframe Octahedron
        const innerGeo = new THREE.OctahedronGeometry(2, 0);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0xff003c,
            wireframe: true
        });
        const innerCore = new THREE.Mesh(innerGeo, innerMat);

        coreGroup.add(outerCore);
        coreGroup.add(innerCore);
        
        coreGroup.position.set(window.innerWidth > 768 ? 4 : 0, 2, -5);
        scene.add(coreGroup);

        // 4. Floating Cyan Data Stream Particles
        const particlesGeo = new THREE.BufferGeometry();
        const particlesCount = 800;
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }
        
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.06,
            color: 0x00e5ff,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particlesMesh);

        // 5. Interactive Mouse Parallax
        let targetX = 0;
        let targetY = 0;

        window.addEventListener('mousemove', (event) => {
            targetX = (event.clientX / window.innerWidth) * 2 - 1;
            targetY = -(event.clientY / window.innerHeight) * 2 + 1;
        }, { passive: true });

        // 6. GSAP Scroll Connection
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.to(camera.position, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                },
                z: -10,
                y: 10
            });

            gsap.to(coreGroup.rotation, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                },
                x: Math.PI * 2,
                z: Math.PI
            });
        }

        // 7. Resize Handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            coreGroup.position.x = window.innerWidth > 768 ? 4 : 0;
        });

        // 8. Render Loop
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            
            const time = clock.getElapsedTime();

            // Parallax Camera drift
            camera.position.x += (targetX * 2 - camera.position.x) * 0.05;
            camera.position.y += (targetY * 2 + 5 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            // Animate Core Nodes
            outerCore.rotation.y += 0.002;
            outerCore.rotation.x += 0.001;
            innerCore.rotation.y -= 0.005;
            
            // Random glitch jitter on Core
            if (Math.random() > 0.98) {
                innerCore.scale.setScalar(1 + Math.random() * 0.25);
                outerMat.opacity = Math.random() * 0.5 + 0.15;
            } else {
                innerCore.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                outerMat.opacity = 0.35;
            }

            // Infinite terrain flight loop
            terrain.position.z = (time * 2) % 4;

            // Animate floating upward data particles
            const pPositions = particlesGeo.attributes.position.array;
            for (let i = 1; i < particlesCount * 3; i += 3) {
                pPositions[i] += 0.03;
                if (pPositions[i] > 20) pPositions[i] = -20;
            }
            particlesGeo.attributes.position.needsUpdate = true;
            particlesMesh.rotation.y = time * 0.04;

            renderer.render(scene, camera);
        }

        animate();
    }

    /* ==========================================================================
       5. MOBILE MENU
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
       6. INTERACTIVE ctOS TERMINAL DRAWER
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
            this.appendHistory(`d33:root# ${rawCmd}`, 'text-[#00e5ff] font-bold');

            switch (cmd) {
                case 'help':
                    this.appendHistory(`Available Commands:
- whoami       : Operator identity & kernel clearance
- projects     : Database records of security suites
- skills       : Offensive & cryptographic toolsets
- certs        : Verified accreditations & CTF records
- uplink       : Direct communication channels
- clear        : Clear console buffer
- exit         : Terminate session`, 'text-[#00e5ff]');
                    break;

                case 'whoami':
                    this.appendHistory(`OPERATOR : DEEKSHITH (D33)
ROLE     : Offensive Security Architect & Systems Developer
NODE     : Bangalore, Karnataka, India [12.9716° N, 77.5946° E]
CORE     : Low-level C/C++ Cryptography, Pen-Testing, Digital Forensics`, 'text-gray-200');
                    break;

                case 'projects':
                    this.appendHistory(`[0x11A] E-D--Crypto         -> C / OpenSSL / AES-256-CBC / RSA-2048
[0x11B] Perimeter Defense   -> ELK SIEM / Suricata IDS / Zero-Trust DMZ
[0x11C] Security Audit      -> Automated Bandit SAST & OWASP ZAP Pipeline
[0x11D] Data Stream Masking -> C++20 Financial Payload Tokenizer`, 'text-sky-300');
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
- 50+ CTF Flags (PBCTF, IDEEEAS, Triwizard)`, 'text-[#ff003c]');
                    break;

                case 'contact':
                case 'uplink':
                    this.appendHistory(`Email    : d33kshith@proton.me
GitHub   : github.com/28d33
LinkedIn : linkedin.com/in/d33kshithanand
Uplink   : SECURE_SOCKET_OPEN`, 'text-[#00e5ff]');
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
                    this.appendHistory(`Command not recognized: '${rawCmd}'. Type 'help' for command list.`, 'text-[#ff003c]');
                    break;
            }
        }
    }

    /* ==========================================================================
       7. BOOT ON WINDOW LOAD
       ========================================================================== */
    window.addEventListener('load', () => {
        initAnimations();
        initMobileMenu();
        new InteractiveTerminalDrawer();
    });

})();
