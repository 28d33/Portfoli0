/* ==========================================================================
   DEEKSHITH (D33) — ADVANCED 3D MOTION PORTFOLIO (v4.0)
   GSAP Preloader & ScrollTrigger + Three.js Liquid Distortion Sphere + Terminal
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================================================
       1. LUCIDE ICONS
       ========================================================================== */
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       2. CUSTOM LERP CURSOR LOGIC
       ========================================================================== */
    const dot = document.getElementById('cursor-dot');
    const circle = document.getElementById('cursor-circle');

    if (dot && circle && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let circlePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        const bindHoverables = () => {
            const hoverables = document.querySelectorAll('.hoverable, a, button, input');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });
        };

        const lerp = (start, end, factor) => start + (end - start) * factor;

        function animateCursor() {
            dotPos.x = lerp(dotPos.x, mouse.x, 0.4);
            dotPos.y = lerp(dotPos.y, mouse.y, 0.4);
            
            circlePos.x = lerp(circlePos.x, mouse.x, 0.15);
            circlePos.y = lerp(circlePos.y, mouse.y, 0.15);

            dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
            circle.style.transform = `translate(${circlePos.x}px, ${circlePos.y}px) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        }

        bindHoverables();
        requestAnimationFrame(animateCursor);
    }

    /* ==========================================================================
       3. GSAP SCROLL ANIMATIONS & CINEMATIC PRELOADER
       ========================================================================== */
    function initGsapAnimations() {
        if (typeof gsap === 'undefined') return;

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Preloader Timeline Sequence
        const tl = gsap.timeline();

        tl.to("#loader-progress", {
            width: "100%",
            duration: 1.4,
            ease: "power3.inOut"
        })
        .to(".loader-text .char", {
            y: "0%",
            opacity: 1,
            stagger: 0.04,
            duration: 0.7,
            ease: "power4.out"
        }, "-=0.4")
        .to("#loader", {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            delay: 0.15
        })
        .to("#main-content", {
            opacity: 1,
            duration: 0.1
        }, "-=0.9")
        .to(".hero-line", {
            y: "0%",
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out"
        }, "-=0.4")
        .fromTo(".hero-elem", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" },
            "-=0.7"
        );

        // Section Title Reveals
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.to(title, {
                scrollTrigger: {
                    trigger: title.parentElement,
                    start: "top 85%",
                },
                y: "0%",
                duration: 1,
                ease: "power4.out"
            });
        });

        // Project Cards Parallax & Scroll Reveal
        gsap.utils.toArray('.project-card').forEach(card => {
            const img = card.querySelector('.parallax-img');
            
            gsap.fromTo(card,
                { opacity: 0, y: 80 },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    ease: "power3.out"
                }
            );

            if (img) {
                gsap.to(img, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    },
                    yPercent: 18,
                    ease: "none"
                });
            }
        });

        // Expertise Cards Stagger
        gsap.fromTo('.expertise-card', 
            { opacity: 0, x: 40 },
            {
                scrollTrigger: {
                    trigger: "#expertise",
                    start: "top 65%",
                },
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out"
            }
        );
    }

    /* ==========================================================================
       4. THREE.JS PROCEDURAL LIQUID DISTORTION PARTICLE SPHERE
       ========================================================================== */
    function initThreeJS() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        // 1. Scene & Camera Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.03);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 12;
        
        if (window.innerWidth > 768) {
            camera.position.x = 2; 
        }

        // 2. Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 3. Icosahedron High-Detail Mesh (~9,000 vertices)
        const geometry = new THREE.IcosahedronGeometry(4, 30);
        const basePositions = new Float32Array(geometry.attributes.position.array);

        // Circular Soft-Glow Texture
        const createCircleTexture = () => {
            const cvs = document.createElement('canvas');
            cvs.width = 64;
            cvs.height = 64;
            const ctx = cvs.getContext('2d');
            ctx.beginPath();
            ctx.arc(32, 32, 28, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            return new THREE.CanvasTexture(cvs);
        };

        const material = new THREE.PointsMaterial({
            size: 0.08,
            color: 0xd8f34c, // Theme accent neon lime
            map: createCircleTexture(),
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particleMesh = new THREE.Points(geometry, material);
        scene.add(particleMesh);

        // 4. Background Star/Dust Field
        const dustGeo = new THREE.BufferGeometry();
        const dustCount = 1500;
        const dustPos = new Float32Array(dustCount * 3);
        for (let i = 0; i < dustCount * 3; i++) {
            dustPos[i] = (Math.random() - 0.5) * 60;
        }
        dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xffffff,
            transparent: true,
            opacity: 0.25
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        scene.add(dust);

        // 5. Interactivity Variables
        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        window.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.001;
            mouseY = (event.clientY - windowHalfY) * 0.001;
        }, { passive: true });

        // ScrollTrigger 3D Manipulations
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.to(particleMesh.rotation, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                },
                x: Math.PI * 2,
                y: Math.PI
            });
            
            gsap.to(particleMesh.position, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                },
                z: -5
            });
        }

        // Resize Handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (window.innerWidth > 768) {
                camera.position.x = 2; 
            } else {
                camera.position.x = 0;
            }
        });

        // 6. Animation Loop (Liquid Vertex Mathematics)
        const clock = new THREE.Clock();
        const positions = particleMesh.geometry.attributes.position.array;

        function animate() {
            requestAnimationFrame(animate);
            
            const time = clock.getElapsedTime();

            // Parallax Mouse Follow
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            // Organic Vertex Mathematical Distortion
            for (let i = 0; i < positions.length; i += 3) {
                const bx = basePositions[i];
                const by = basePositions[i + 1];
                const bz = basePositions[i + 2];

                const noise = Math.sin(bx * 1.5 + time) * 
                              Math.cos(by * 1.5 + time) * 
                              Math.sin(bz * 1.5 + time);

                const wave = Math.sin(time * 0.5 + by * 0.5) * 0.5;

                const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
                const nx = bx / len;
                const ny = by / len;
                const nz = bz / len;

                const displacement = noise * 0.8 + wave;

                positions[i] = bx + nx * displacement;
                positions[i + 1] = by + ny * displacement;
                positions[i + 2] = bz + nz * displacement;
            }

            particleMesh.geometry.attributes.position.needsUpdate = true;

            // Ambient mesh rotation
            particleMesh.rotation.y += 0.001;
            dust.rotation.y -= 0.0005;
            dust.rotation.x += 0.0002;

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
       6. INTERACTIVE TERMINAL DRAWER
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
            div.className = `${styleClass} whitespace-pre-wrap leading-relaxed`;
            div.textContent = text;
            this.history.appendChild(div);

            const body = document.getElementById('terminalBody');
            if (body) body.scrollTop = body.scrollHeight;
        }

        processCommand(rawCmd) {
            const cmd = rawCmd.toLowerCase();
            this.appendHistory(`d33:~$ ${rawCmd}`, 'text-[#d8f34c] font-semibold');

            switch (cmd) {
                case 'help':
                    this.appendHistory(`Available Commands:
- whoami       : Security credentials & profile
- projects     : Production engineering & security suites
- skills       : Offensive & cryptographic toolsets
- certs        : Industry certifications & CTF awards
- contact      : Direct communication coordinates
- clear        : Clear terminal output
- exit         : Close terminal`, 'text-[#d8f34c]');
                    break;

                case 'whoami':
                    this.appendHistory(`DEEKSHITH (D33)
Specialization : Offensive Cybersecurity, Cryptography (C/C++), Digital Forensics
Location       : Bangalore, Karnataka, India
Philosophy     : Hardening defenses through adversarial exploit depth`, 'text-gray-200');
                    break;

                case 'projects':
                    this.appendHistory(`1. E-D--Crypto         -> Pure C / OpenSSL / AES-256 / RSA-2048 Hybrid
2. Perimeter Defense   -> ELK SIEM / Suricata IDS / Zero-Trust DMZ
3. Security Audit      -> Automated Bandit SAST & OWASP ZAP Pipeline
4. Data Stream Masking -> C++20 Financial Payload Sanitizer & Tokenizer`, 'text-sky-300');
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
- 50+ CTF Flags (PBCTF, IDEEEAS, Triwizard)`, 'text-amber-300');
                    break;

                case 'contact':
                    this.appendHistory(`Email    : d33kshith@proton.me
GitHub   : github.com/28d33
LinkedIn : linkedin.com/in/d33kshithanand
Location : Bangalore, India`, 'text-[#d8f34c]');
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
       7. INITIALIZATION ON WINDOW LOAD
       ========================================================================== */
    window.addEventListener('load', () => {
        initGsapAnimations();
        initThreeJS();
        initMobileMenu();
        new InteractiveTerminalDrawer();
    });

})();
