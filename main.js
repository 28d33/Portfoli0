/* ==========================================================================
   DEEKSHITH (D33) — ANIMUS // GENETIC MEMORY UPLINK (v6.0)
   Three.js Memory Corridor Void + GSAP Sequence + Interactive Terminal
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
       2. CUSTOM GEOMETRIC ANIMUS CURSOR LOGIC
       ========================================================================== */
    const cursor = document.getElementById('custom-cursor');

    if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let cursorX = window.innerWidth / 2;
        let cursorY = window.innerHeight / 2;

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        const renderCursor = () => {
            cursorX += (mouse.x - cursorX) * 0.22;
            cursorY += (mouse.y - cursorY) * 0.22;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        const bindHoverables = () => {
            const hoverables = document.querySelectorAll('.hoverable, a, button, input');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    document.body.classList.add('hovering');
                    if (el.classList.contains('desync-hover')) {
                        document.body.classList.add('desync-hover');
                    }
                });
                el.addEventListener('mouseleave', () => {
                    document.body.classList.remove('hovering');
                    document.body.classList.remove('desync-hover');
                });
            });
        };

        bindHoverables();
    }

    /* ==========================================================================
       3. GSAP PRELOADER & SCROLLTRIGGER ANIMATIONS
       ========================================================================== */
    function initAnimations() {
        if (typeof gsap === 'undefined') return;

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        const tl = gsap.timeline();

        // Preloader Sequence
        tl.to("#loader-text-1", { opacity: 1, duration: 0.45 })
          .to("#loader-text-1", { opacity: 0, duration: 0.25, delay: 0.4 })
          .to("#loader-text-2", { opacity: 1, duration: 0.45 })
          .to("#loader-text-2", { opacity: 0, duration: 0.25, delay: 0.45 })
          .to("#loader-text-3", { opacity: 1, duration: 0.45 })
          .to("#animus-loader", {
              opacity: 0,
              duration: 0.8,
              delay: 0.35,
              ease: "power2.inOut",
              onComplete: () => {
                  const loader = document.getElementById('animus-loader');
                  if (loader) loader.style.display = 'none';
                  initThreeJS(); // Launch 3D Memory Corridor
              }
          })
          // Reveal Main UI
          .to("#main-ui", { opacity: 1, duration: 0.8 }, "-=0.4")
          
          // Hero Sequence Reveal
          .fromTo(".gs-title",
              { y: 80, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out" }
          )
          .fromTo(".gs-reveal",
              { opacity: 0, x: -30 },
              { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
              "-=0.4"
          )
          .fromTo(".gs-fade",
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" },
              "-=0.4"
          );

        // Section Headers Reveal
        gsap.utils.toArray('.gs-section-header').forEach(header => {
            gsap.fromTo(header,
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }
            );
        });

        // Memory Project Cards Reveal
        gsap.utils.toArray('.gs-memory').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay: i % 2 === 0 ? 0 : 0.15,
                    ease: "power3.out"
                }
            );
        });

        // Eagle Vision Skills
        gsap.fromTo(".gs-skill",
            { opacity: 0, scale: 0.95 },
            {
                scrollTrigger: {
                    trigger: "#skills",
                    start: "top 75%"
                },
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.12,
                ease: "back.out(1.2)"
            }
        );
    }

    /* ==========================================================================
       4. THREE.JS 3D ANIMUS MEMORY CORRIDOR
       ========================================================================== */
    function initThreeJS() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020611, 0.025);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Corridor Group
        const corridorGroup = new THREE.Group();
        scene.add(corridorGroup);

        // 2. Floating Memory Shards (Tetrahedrons)
        const shardGeo = new THREE.TetrahedronGeometry(1.5, 0);
        const shardMatCyan = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.18 });
        const shardMatWhite = new THREE.MeshBasicMaterial({ color: 0xe0f7fa, wireframe: true, transparent: true, opacity: 0.12 });

        const shardCount = 80;
        const shards = [];

        for (let i = 0; i < shardCount; i++) {
            const isCyan = Math.random() > 0.45;
            const mesh = new THREE.Mesh(shardGeo, isCyan ? shardMatCyan : shardMatWhite);
            
            mesh.position.x = (Math.random() - 0.5) * 40;
            mesh.position.y = (Math.random() - 0.5) * 40;
            mesh.position.z = (Math.random() - 1) * 100;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            mesh.userData = {
                rotX: (Math.random() - 0.5) * 0.012,
                rotY: (Math.random() - 0.5) * 0.012
            };

            corridorGroup.add(mesh);
            shards.push(mesh);
        }

        // 3. Genetic Data Particles (DNA Helix Cloud)
        const particlesGeo = new THREE.BufferGeometry();
        const particleCount = 1500;
        const posArray = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            const radius = 5 + Math.random() * 15;
            const angle = Math.random() * Math.PI * 2;
            
            posArray[i] = Math.cos(angle) * radius;
            posArray[i + 1] = Math.sin(angle) * radius;
            posArray[i + 2] = (Math.random() - 1) * 120;
        }
        
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.09,
            color: 0x00e5ff,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
        corridorGroup.add(particlesMesh);

        // 4. Perspective Corridor Guide Lines
        const lineMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.06 });
        for (let i = 0; i < 4; i++) {
            const points = [];
            points.push(new THREE.Vector3((i % 2 === 0 ? -10 : 10), (i < 2 ? -10 : 10), 20));
            points.push(new THREE.Vector3((i % 2 === 0 ? -2 : 2), (i < 2 ? -2 : 2), -100));
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeo, lineMat);
            corridorGroup.add(line);
        }

        // 5. Parallax Look-Ahead Variables
        let targetX = 0;
        let targetY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        window.addEventListener('mousemove', (event) => {
            targetX = (event.clientX - windowHalfX) * 0.002;
            targetY = (event.clientY - windowHalfY) * 0.002;
        }, { passive: true });

        // 6. GSAP Scroll Connection (The Memory Dive)
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.to(camera.position, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                },
                z: -50,
                ease: "none"
            });
            
            gsap.to(corridorGroup.rotation, {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2
                },
                z: Math.PI / 4,
                ease: "none"
            });
        }

        // 7. Resize Handler
        window.addEventListener('resize', () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 8. Render Loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Mouse Parallax Look-Ahead
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (-targetY - camera.position.y) * 0.05;
            camera.lookAt(0, 0, camera.position.z - 10);

            // Shards Floating & Rotating
            shards.forEach(shard => {
                shard.rotation.x += shard.userData.rotX;
                shard.rotation.y += shard.userData.rotY;
                shard.position.y += Math.sin(Date.now() * 0.001 + shard.position.x) * 0.01;
            });

            // Cloud Rotation
            particlesMesh.rotation.z -= 0.0005;

            renderer.render(scene, camera);
        }

        animate();
    }

    /* ==========================================================================
       5. MOBILE MENU DRAWER
       ========================================================================= */
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
       6. INTERACTIVE ANIMUS TERMINAL DRAWER
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
            this.appendHistory(`d33:animus# ${rawCmd}`, 'text-[#00e5ff] font-bold');

            switch (cmd) {
                case 'help':
                    this.appendHistory(`Available Commands:
- whoami       : Subject identity & synchronization metrics
- memories     : Extracted project memory blocks
- skills       : Eagle Vision tactical capability matrix
- certs        : Verified accreditations & CTF records
- contact      : Direct communication uplink
- clear        : Clear buffer
- exit         : Terminate session`, 'text-[#00e5ff]');
                    break;

                case 'whoami':
                    this.appendHistory(`SUBJECT  : DEEKSHITH (D33) [SUBJECT_17]
TITLE    : Master Architect & Offensive Cybersecurity Engineer
LOCATION : Bangalore, Karnataka, India [12.9716° N, 77.5946° E]
CORE     : Low-Level Cryptography (C/C++), Penetration Testing, Digital Forensics`, 'text-gray-200');
                    break;

                case 'memories':
                case 'projects':
                    this.appendHistory(`[MEMORY 01] E-D--Crypto         -> C / OpenSSL / AES-256-CBC / RSA-2048
[MEMORY 02] Perimeter Defense   -> ELK SIEM / Suricata IDS / Zero-Trust DMZ
[MEMORY 03] Security Audit      -> Automated Bandit SAST & OWASP ZAP Pipeline
[MEMORY 04] Data Stream Masking -> C++20 Financial Payload Tokenizer`, 'text-[#e0f7fa]');
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
- 50+ CTF Flags (PBCTF, IDEEEAS, Triwizard)`, 'text-[#00e5ff]');
                    break;

                case 'contact':
                    this.appendHistory(`Email    : d33kshith@proton.me
GitHub   : github.com/28d33
LinkedIn : linkedin.com/in/d33kshithanand
Uplink   : GENETIC_MEMORY_SYNCHRONIZED`, 'text-[#00e5ff]');
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
                    this.appendHistory(`Command not recognized: '${rawCmd}'. Type 'help' for command list.`, 'text-[#ff3333]');
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
