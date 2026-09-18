// =========================================================================
// DEEKSHITH (D33) — FLUID AUTO-ADJUSTING FUSION ARCHITECTURE
// Automatic resolution detection for Mobile, Tablet, Laptop, Desktop & 4K
// =========================================================================

(function () {
    'use strict';

    // --- 1. LUCIDE ICONS INITIALIZATION ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. LENIS SMOOTH VIRTUAL SCROLLING ---
    let lenis = null;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: isTouch ? 1.0 : 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 1.8,
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

    // --- 3. MOBILE MENU DRAWER LOGIC ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let isMobileMenuOpen = false;

    function toggleMobileMenu(forceState) {
        if (!mobileMenu) return;
        isMobileMenuOpen = forceState !== undefined ? forceState : !isMobileMenuOpen;
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            gsap.fromTo(mobileMenu, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
        } else {
            gsap.to(mobileMenu, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                }
            });
        }
    }

    mobileMenuBtn?.addEventListener('click', () => toggleMobileMenu());
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // --- 4. CUSTOM DUAL LERP CURSOR (Desktop / Fine Pointer Only) ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let targetX = 0;
    let targetY = 0;

    if (!isTouch) {
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            targetX = (e.clientX / window.innerWidth) * 2 - 1;
            targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        function bindHoverTargets() {
            const hoverables = document.querySelectorAll('.hoverable, button, a, .glass-panel');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });
        }
        bindHoverTargets();

        function renderCursor() {
            dotPos.x += (mouse.x - dotPos.x) * 0.35;
            dotPos.y += (mouse.y - dotPos.y) * 0.35;
            ringPos.x += (mouse.x - ringPos.x) * 0.15;
            ringPos.y += (mouse.y - ringPos.y) * 0.15;
            
            if (cursorDot) cursorDot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px)`;
            if (cursorRing) cursorRing.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
            
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Magnetic Buttons
        function initMagneticButtons() {
            const magnetics = document.querySelectorAll('.magnetic-wrap');
            magnetics.forEach(wrap => {
                const area = wrap.querySelector('.magnetic-area');
                const content = wrap.querySelector('.magnetic-content');
                if (!area || !content) return;
                
                area.addEventListener('mousemove', (e) => {
                    const rect = wrap.getBoundingClientRect();
                    const hx = rect.left + rect.width / 2;
                    const hy = rect.top + rect.height / 2;
                    const dx = (e.clientX - hx) * 0.35;
                    const dy = (e.clientY - hy) * 0.35;
                    gsap.to(content, { x: dx, y: dy, duration: 0.3, ease: "power2.out", overwrite: true });
                });
                
                area.addEventListener('mouseleave', () => {
                    gsap.to(content, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)", overwrite: true });
                });
            });
        }
        initMagneticButtons();
    }


    // --- 5. PRELOADER & HERO ENTRANCE SEQUENCE (Exact v5 Architecture) ---
    function initPreloaderAndHero() {
        if (typeof gsap === 'undefined') return;

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
            delay: 0.15,
            onComplete: () => {
                const loaderEl = document.getElementById('loader');
                if (loaderEl) loaderEl.style.display = 'none';
            }
        })
        .to("#ui-layer", {
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
    }
    initPreloaderAndHero();


    // --- 6. AUTO-ADJUSTING 10,000 PARTICLE MORPHING THREE.JS BACKGROUND ---
    const particleCount = window.innerWidth < 640 ? 6000 : 10000;
    const positionAttributes = {
        shape1: new Float32Array(particleCount * 3), // Hero: Clustered Torus Knot
        shape2: new Float32Array(particleCount * 3), // Manifesto: Twisted Helix Spindle
        shape3: new Float32Array(particleCount * 3), // Pinned Showcase: Undulating Wave Grid
        shape4: new Float32Array(particleCount * 3)  // Contact/Credentials: Cyber Matrix Vortex
    };

    // Generate Shape Coordinate Buffers
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // SHAPE 1: Clustered Torus Knot (Hero)
        const t = (i / particleCount) * Math.PI * 2 * 6;
        const r1 = 10 + Math.sin(t * 3) * 3;
        const x1 = Math.cos(t) * r1;
        const y1 = Math.sin(t) * r1;
        const z1 = Math.sin(t * 4) * 6;
        positionAttributes.shape1[i3] = x1 + (Math.random() - 0.5) * 1.5;
        positionAttributes.shape1[i3 + 1] = y1 + (Math.random() - 0.5) * 1.5;
        positionAttributes.shape1[i3 + 2] = z1 + (Math.random() - 0.5) * 1.5;

        // SHAPE 2: Twisted Helix (Manifesto)
        const t2 = (i / particleCount) * Math.PI * 16;
        const radius2 = 7 + (Math.random() - 0.5) * 2;
        positionAttributes.shape2[i3] = Math.cos(t2) * radius2;
        positionAttributes.shape2[i3 + 1] = ((i / particleCount) - 0.5) * 45;
        positionAttributes.shape2[i3 + 2] = Math.sin(t2) * radius2;

        // SHAPE 3: Undulating Wave Grid (Pinned Showcase)
        const gridCols = Math.round(Math.sqrt(particleCount));
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        const spacing = 0.65;
        const x3 = (col - gridCols / 2) * spacing;
        const z3 = (row - gridCols / 2) * spacing;
        positionAttributes.shape3[i3] = x3;
        positionAttributes.shape3[i3 + 1] = Math.sin(x3 * 0.3) * Math.cos(z3 * 0.3) * 3;
        positionAttributes.shape3[i3 + 2] = z3;

        // SHAPE 4: Cyber Matrix Vortex (Contact)
        const radius4 = 15 + Math.random() * 25;
        const angle4 = Math.random() * Math.PI * 2;
        const height4 = (Math.random() - 0.5) * 50;
        positionAttributes.shape4[i3] = Math.cos(angle4) * radius4;
        positionAttributes.shape4[i3 + 1] = height4;
        positionAttributes.shape4[i3 + 2] = Math.sin(angle4) * radius4;
    }

    let camera = null;
    let renderer = null;
    let particleSystem = null;
    let particleMaterial = null;
    let particleGeometry = null;
    let scrollProgress = 0;

    // Fluid Camera Distance Calculation according to aspect ratio and screen width
    function getResponsiveCamZ() {
        const aspect = window.innerWidth / window.innerHeight;
        if (aspect < 0.75) {
            // Tall portrait mobile
            return 44;
        } else if (aspect < 1.1) {
            // Square screens / Portrait Tablets
            return 38;
        } else if (window.innerWidth >= 2560) {
            // 4K & Ultrawide Monitors
            return 28;
        } else {
            // Standard Laptops (1366x768, 1440x900, 1920x1080)
            return 32;
        }
    }

    function getResponsiveParticleSize() {
        if (window.innerWidth < 640) return 0.38;
        if (window.innerWidth < 1024) return 0.32;
        if (window.innerWidth >= 2560) return 0.24;
        return 0.28;
    }

    function initThreeJS() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2('#050507', 0.02);

        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, getResponsiveCamZ());

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: window.innerWidth >= 768,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Colors: Electric Lime (#ccff00), Cyan (#06b6d4), Indigo (#4f46e5)
        const colors = new Float32Array(particleCount * 3);
        const c1 = new THREE.Color(0xccff00);
        const c2 = new THREE.Color(0x06b6d4);
        const c3 = new THREE.Color(0x4f46e5);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const rand = Math.random();
            const color = rand < 0.5 ? c1.clone().lerp(c2, rand * 2) : c2.clone().lerp(c3, (rand - 0.5) * 2);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        particleGeometry = new THREE.BufferGeometry();
        const currentPositions = new Float32Array(positionAttributes.shape1);
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Generative Circular Particle Texture
        const createCircleTexture = () => {
            const c = document.createElement('canvas');
            c.width = 32; c.height = 32;
            const ctx = c.getContext('2d');
            ctx.beginPath();
            ctx.arc(16, 16, 14, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            return new THREE.CanvasTexture(c);
        };

        particleMaterial = new THREE.PointsMaterial({
            size: getResponsiveParticleSize(),
            vertexColors: true,
            map: createCircleTexture(),
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particleSystem);

        // Global Scroll Progress Tracking
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                scrollProgress = self.progress;
            }
        });

        // Animation Render Loop
        const clock = new THREE.Clock();
        let camOffsetX = 0;
        let camOffsetY = 0;

        function animate() {
            const time = clock.getElapsedTime();

            let fromShape, toShape, factor;
            if (scrollProgress < 0.33) {
                fromShape = positionAttributes.shape1;
                toShape = positionAttributes.shape2;
                factor = scrollProgress / 0.33;
            } else if (scrollProgress < 0.66) {
                fromShape = positionAttributes.shape2;
                toShape = positionAttributes.shape3;
                factor = (scrollProgress - 0.33) / 0.33;
            } else {
                fromShape = positionAttributes.shape3;
                toShape = positionAttributes.shape4;
                factor = (scrollProgress - 0.66) / 0.34;
            }

            factor = Math.max(0, Math.min(1, factor));

            const posArray = particleGeometry.attributes.position.array;
            for (let i = 0; i < particleCount * 3; i += 3) {
                const targetXVal = fromShape[i] + (toShape[i] - fromShape[i]) * factor;
                const targetYVal = fromShape[i + 1] + (toShape[i + 1] - fromShape[i + 1]) * factor;
                const targetZVal = fromShape[i + 2] + (toShape[i + 2] - fromShape[i + 2]) * factor;

                const noise = Math.sin(time * 1.5 + posArray[i] * 0.2) * 0.08;

                posArray[i] += (targetXVal - posArray[i]) * 0.06;
                posArray[i + 1] += (targetYVal + noise - posArray[i + 1]) * 0.06;
                posArray[i + 2] += (targetZVal - posArray[i + 2]) * 0.06;
            }
            particleGeometry.attributes.position.needsUpdate = true;

            particleSystem.rotation.y = time * 0.035;
            particleSystem.rotation.x = Math.sin(time * 0.02) * 0.08;

            if (!isTouch) {
                camOffsetX += (targetX * 2.5 - camOffsetX) * 0.05;
                camOffsetY += (targetY * 2.5 - camOffsetY) * 0.05;
                camera.position.x = camOffsetX;
                camera.position.y = camOffsetY;
            }
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        // Responsive Debounced Resize Handler
        let resizeTimer;
        function handleResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (camera && renderer && particleMaterial) {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.position.z = getResponsiveCamZ();
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    particleMaterial.size = getResponsiveParticleSize();
                }
                ScrollTrigger.refresh();
            }, 80);
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThreeJS);
    } else {
        initThreeJS();
    }


    // --- 7. GSAP HORIZONTAL PINNED SHOWCASE (Auto-Adjusting Horizontal Distance) ---
    function initHorizontalScroll() {
        const horizontalSection = document.getElementById('horizontal-work');
        const track = document.getElementById('horizontal-track');
        if (!horizontalSection || !track) return;

        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + (window.innerWidth < 640 ? 30 : 80));

        gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: horizontalSection,
                start: "top top",
                end: () => `+=${Math.max(window.innerHeight * 1.5, track.scrollWidth - window.innerWidth + 200)}`,
                pin: true,
                scrub: 1.1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHorizontalScroll);
    } else {
        initHorizontalScroll();
    }


    // --- 8. PROJECT INSPECTION MODAL ---
    const projectData = {
        crypto: {
            tag: "CRYPTOGRAPHIC SUITE // C++20",
            title: "E-D--Crypto Engine",
            desc: "High-performance symmetric and asymmetric cryptographic engine implementing AES-256 (CBC/GCM) and RSA-2048 key exchange for ultra-secure payload transmission and hardened memory storage.",
            specs: [
                "SIMD AVX-512 acceleration reaching 1.4 GB/s throughput",
                "Argon2id and PBKDF2 key derivation with zero memory leaks",
                "Constant-time arithmetic implementations to eliminate side-channel timing attacks",
                "Full integration with OpenSSL and custom low-level C bit-rotation routines"
            ],
            link: "https://github.com/28d33"
        },
        siem: {
            tag: "DEFENSIVE PIPELINE // IDS & SIEM",
            title: "Perimeter Defense & SIEM Pipeline",
            desc: "Distributed real-time intrusion detection pipeline integrating custom Suricata IDS rulesets, packet sniffing hooks, and elastic search ingestion for enterprise threat intelligence.",
            specs: [
                "Real-time packet filtering processing 10Gbps line rate",
                "Automated alert correlation with Elasticsearch & Kibana dashboards",
                "Signature-based and heuristic anomaly detection with sub-millisecond alerting",
                "Custom Lua scripts for dynamic payload inspection"
            ],
            link: "https://github.com/28d33"
        },
        sast: {
            tag: "AUTOMATED VULNERABILITY TRIAGE",
            title: "Automated Security Audit Engine",
            desc: "Continuous SAST / DAST scanning orchestration engine combining Bandit, Semgrep, and OWASP ZAP crawlers with automated CVSS v3.1 scoring and issue remediation workflows.",
            specs: [
                "Unified AST parsing engine across Python, C/C++, and Go codebases",
                "Automated OWASP Top 10 dynamic crawling with headless browser injection",
                "Zero false-positive threshold tuning with rule-based heuristics",
                "Automated Jira / GitHub Security Advisories webhook pipeline"
            ],
            link: "https://github.com/28d33"
        },
        stream: {
            tag: "HIGH-THROUGHPUT TOKENIZATION // C++20",
            title: "Data Stream Masking Protocol",
            desc: "Ultra-low latency memory-mapped data stream masking protocol designed for zero-leak data ingestion pipelines in banking and healthcare infrastructures.",
            specs: [
                "Zero-copy memory mapped I/O processing millions of records per second",
                "Format-Preserving Encryption (FPE) with deterministic irreversible pseudonymization",
                "Lock-free ring buffers for multi-threaded consumer-producer streams",
                "Full compliance validation for GDPR and HIPAA data handling"
            ],
            link: "https://github.com/28d33"
        }
    };

    window.openProjectModal = function(key) {
        const data = projectData[key];
        if (!data) return;

        document.getElementById('modal-tag').innerText = data.tag;
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-desc').innerText = data.desc;
        
        const specsList = document.getElementById('modal-specs');
        specsList.innerHTML = '';
        data.specs.forEach(s => {
            const li = document.createElement('li');
            li.innerText = s;
            specsList.appendChild(li);
        });

        document.getElementById('modal-link').href = data.link;

        const modal = document.getElementById('project-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    window.closeProjectModal = function() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    };

    document.getElementById('project-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'project-modal') closeProjectModal();
    });


    // --- 9. TACTICAL TERMINAL DRAWER ---
    const terminalDrawer = document.getElementById('terminal-drawer');
    const terminalInput = document.getElementById('terminal-input');
    const terminalLogs = document.getElementById('terminal-logs');
    const navTerminalBtn = document.getElementById('nav-terminal-btn');
    const closeTerminalBtn = document.getElementById('close-terminal-btn');

    let isTerminalOpen = false;

    function toggleTerminal(state) {
        isTerminalOpen = state !== undefined ? state : !isTerminalOpen;
        if (isTerminalOpen) {
            terminalDrawer.classList.remove('translate-y-full');
            terminalDrawer.classList.add('translate-y-0');
            setTimeout(() => terminalInput?.focus(), 250);
        } else {
            terminalDrawer.classList.add('translate-y-full');
            terminalDrawer.classList.remove('translate-y-0');
        }
    }

    navTerminalBtn?.addEventListener('click', () => toggleTerminal());
    closeTerminalBtn?.addEventListener('click', () => toggleTerminal(false));

    window.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            toggleTerminal();
        }
        if (e.key === 'Escape') {
            closeProjectModal();
            toggleTerminal(false);
            toggleMobileMenu(false);
        }
    });

    const commands = {
        help: () => `OPERATIONAL DIRECTIVES:
- whoami      : Display operator identification & role
- skills      : Capability matrix & security toolkit
- projects    : List active security deployments
- matrix      : Display verified institutional credentials
- contact     : Reveal communication uplink channels
- clear       : Wipe terminal output buffer`,

        whoami: () => `IDENTITY: Deekshith (D33)
ROLE: Offensive Security Architect & Low-Level Systems Developer
LOCATION: Bangalore, India
STACK: C/C++20, x86_64 Assembly, Cryptography, 10k Particle WebGL`,

        skills: () => `CORE CAPABILITIES:
- Languages   : C, C++20, x86_64 Assembly, Python, JavaScript, GLSL
- Security    : Reverse Engineering, Exploitation, Cryptography (AES/RSA), SIEM (Suricata/ELK)
- Forensics   : GDB, Ghidra, Wireshark, Burp Suite, Bandit, OWASP ZAP`,

        projects: () => `DEPLOYED REPOSITORIES:
[01] E-D--Crypto Engine        (AES-256-GCM / RSA-2048 Suite)
[02] Perimeter Defense & SIEM  (Suricata IDS Pipeline)
[03] Automated Security Audit  (SAST/DAST Triage Engine)
[04] Data Stream Masking       (Zero-Copy C++20 Tokenizer)`,

        matrix: () => `VERIFIED CLEARANCE:
- IISc Bangalore & IIT Guwahati (Network Defense Research)
- Cisco Certified Network Security Associate
- TryHackMe Global Top 1% (50+ CTF Flag Captures)
- Deloitte & TCS Cyber Defense Governance`,

        contact: () => `SECURE CHANNELS:
- Email   : deekshith.d33@gmail.com
- GitHub  : https://github.com/28d33
- LinkedIn: https://linkedin.com`,

        clear: () => {
            if (terminalLogs) terminalLogs.innerHTML = '';
            return '';
        }
    };

    terminalInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const raw = terminalInput.value.trim();
            terminalInput.value = '';
            if (!raw) return;

            const cmd = raw.toLowerCase();

            const line = document.createElement('div');
            line.innerHTML = `<span class="text-[#ccff00]">d33@uplink:~$</span> <span class="text-white">${raw}</span>`;
            terminalLogs.appendChild(line);

            const resp = document.createElement('div');
            resp.className = 'text-white/70 whitespace-pre-wrap';

            if (commands[cmd]) {
                const out = commands[cmd]();
                if (out) {
                    resp.innerText = out;
                    terminalLogs.appendChild(resp);
                }
            } else {
                resp.innerHTML = `<span class="text-rose-400">Command '${cmd}' not recognized. Type 'help' for directives.</span>`;
                terminalLogs.appendChild(resp);
            }

            terminalLogs.scrollTop = terminalLogs.scrollHeight;
        }
    });


    // --- 10. COPY EMAIL HELPER ---
    window.copyContactEmail = function() {
        const email = "deekshith.d33@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
            const btn = document.getElementById('copy-email-btn');
            if (btn) {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i><span class="text-emerald-400">COPIED TO CLIPBOARD</span>`;
                if (window.lucide) lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    if (window.lucide) lucide.createIcons();
                }, 2000);
            }
        });
    };

})();
