/* ==========================================================================
   DEEKSHITH (D33) — LUXURY MONOCHROME 3D ENGINE & RECON TERMINAL
   Features:
   - Polished Liquid Chrome & Titanium 3D Quantum Sculpture (No Neon)
   - Real-time Studio Lighting & Pure White Shaders
   - Animated 3D ASCII Torus & Radar Hologram Engine
   - Interactive Hacker Terminal (Ring-0 Bash Shell)
   - Linear/Vercel Monochromatic Spotlight Card Engine
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================================================
       1. THREE.JS 3D CYBER QUANTUM SCULPTURE (Dark Liquid Chrome & Cyber Lighting)
       ========================================================================== */
    class CyberAura3DWorld {
        constructor() {
            this.canvas = document.getElementById('webgl-3d-scene');
            if (!this.canvas || typeof THREE === 'undefined') return;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance'
            });

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.3;

            this.camera.position.set(0, 0, 18);

            // Interaction state
            this.mouseX = 0;
            this.mouseY = 0;
            this.targetRotationX = 0;
            this.targetRotationY = 0;
            this.isDragging = false;
            this.previousMousePosition = { x: 0, y: 0 };

            // Overclock Power Mode
            this.isOverclocked = false;

            // Scroll Staging
            this.scrollProgress = 0;
            this.targetMeshX = 4.2;
            this.targetMeshY = 0;
            this.targetMeshZ = 0;
            this.targetScale = 1.0;

            this.initLights();
            this.initMaterials();
            this.init3DGeometry();
            this.initMonochromeRings();
            this.initParticleDust();
            this.bindEvents();
            this.initOverclockToggle();
            this.animate();
        }

        initLights() {
            // Ambient base
            const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
            this.scene.add(ambientLight);

            // Cobalt Blue Key Light
            this.keyLight = new THREE.PointLight(0x3b82f6, 6, 70);
            this.keyLight.position.set(10, 12, 12);
            this.scene.add(this.keyLight);

            // Crimson Fill Light
            this.fillLight = new THREE.PointLight(0xef4444, 4.5, 60);
            this.fillLight.position.set(-12, -8, 8);
            this.scene.add(this.fillLight);

            // Emerald Rim Light
            this.rimLight = new THREE.PointLight(0x10b981, 3.5, 50);
            this.rimLight.position.set(0, 16, -10);
            this.scene.add(this.rimLight);
        }

        initMaterials() {
            // Liquid Dark Chrome (Reflects Cobalt & Crimson point lights)
            this.chromeMat = new THREE.MeshStandardMaterial({
                color: 0x0a0e17,
                metalness: 0.96,
                roughness: 0.08,
                wireframe: false
            });

            // Glowing Sky Blue Wireframe Inner Core
            this.innerCoreMat = new THREE.MeshBasicMaterial({
                color: 0x38bdf8,
                wireframe: true,
                transparent: true,
                opacity: 0.55
            });

            // Subtle Cobalt Energy Rings
            this.ringMat = new THREE.MeshBasicMaterial({
                color: 0x60a5fa,
                wireframe: true,
                transparent: true,
                opacity: 0.35
            });

            // Multi-color Orbital Node Materials
            this.nodeMats = [
                new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x2563eb, roughness: 0.2 }),
                new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, roughness: 0.2 }),
                new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, roughness: 0.2 }),
                new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, roughness: 0.2 })
            ];
        }

        init3DGeometry() {
            this.sculptureGroup = new THREE.Group();

            // 1. Faceted Torus Knot Outer Cage
            const outerGeo = new THREE.TorusKnotGeometry(3.2, 0.92, 128, 32, 2, 3);
            this.outerMesh = new THREE.Mesh(outerGeo, this.chromeMat);
            this.sculptureGroup.add(this.outerMesh);

            // 2. Inner Energy Core (Icosahedron)
            const innerGeo = new THREE.IcosahedronGeometry(2.0, 2);
            this.innerMesh = new THREE.Mesh(innerGeo, this.innerCoreMat);
            this.sculptureGroup.add(this.innerMesh);

            // 3. Orbiting Data Nodes with distinctive cyber hues
            this.orbitNodes = [];
            for (let i = 0; i < 4; i++) {
                const nodeGeo = new THREE.SphereGeometry(0.35, 16, 16);
                const nodeMesh = new THREE.Mesh(nodeGeo, this.nodeMats[i % this.nodeMats.length]);
                const angle = (i / 4) * Math.PI * 2;
                nodeMesh.position.set(Math.cos(angle) * 5.2, Math.sin(angle) * 3.2, Math.sin(angle) * 2.5);
                nodeMesh.userData = { angle, speed: 0.016 + i * 0.006 };
                this.sculptureGroup.add(nodeMesh);
                this.orbitNodes.push(nodeMesh);
            }

            this.sculptureGroup.position.set(this.targetMeshX, this.targetMeshY, this.targetMeshZ);
            this.scene.add(this.sculptureGroup);
        }

        initMonochromeRings() {
            this.auraRings = [];
            for (let i = 0; i < 3; i++) {
                const ringGeo = new THREE.RingGeometry(4.6 + i * 1.2, 4.65 + i * 1.2, 64);
                const ringMesh = new THREE.Mesh(ringGeo, this.ringMat.clone());
                ringMesh.rotation.x = Math.PI / 2 + (i * 0.3);
                ringMesh.rotation.y = (i * 0.4);
                this.sculptureGroup.add(ringMesh);
                this.auraRings.push(ringMesh);
            }
        }

        initParticleDust() {
            const count = 550;
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            // Palette of subtle cyber particle colors
            const palette = [
                [0.23, 0.51, 0.96], // Cobalt (#3b82f6)
                [0.94, 0.27, 0.27], // Crimson (#ef4444)
                [0.06, 0.72, 0.50], // Emerald (#10b981)
                [0.96, 0.62, 0.04], // Amber (#f59e0b)
                [0.70, 0.50, 0.95], // Violet (#a855f7)
                [0.90, 0.95, 1.00]  // Platinum White
            ];

            for (let i = 0; i < count * 3; i += 3) {
                pos[i] = (Math.random() - 0.5) * 65;
                pos[i + 1] = (Math.random() - 0.5) * 55;
                pos[i + 2] = (Math.random() - 0.5) * 45;

                const c = palette[Math.floor(Math.random() * palette.length)];
                colors[i] = c[0]; 
                colors[i + 1] = c[1]; 
                colors[i + 2] = c[2];
            }

            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const mat = new THREE.PointsMaterial({
                size: 0.2,
                vertexColors: true,
                transparent: true,
                opacity: 0.75,
                blending: THREE.AdditiveBlending
            });

            this.dustParticles = new THREE.Points(geo, mat);
            this.scene.add(this.dustParticles);
        }

        toggleOverclock() {
            this.isOverclocked = !this.isOverclocked;
            const label = document.getElementById('overclockLabel');
            const auraPowerText = document.getElementById('auraPowerText');

            if (this.isOverclocked) {
                document.body.classList.add('overclocked-aura');
                if (label) label.textContent = 'POWER: 300%';
                if (auraPowerText) auraPowerText.textContent = 'OVERCLOCKED (300%)';
                this.keyLight.intensity = 8.0;
                this.fillLight.intensity = 5.0;
            } else {
                document.body.classList.remove('overclocked-aura');
                if (label) label.textContent = 'AURA: BOOST';
                if (auraPowerText) auraPowerText.textContent = 'OPTIMAL (100%)';
                this.keyLight.intensity = 5.0;
                this.fillLight.intensity = 3.0;
            }
        }

        initOverclockToggle() {
            const btn = document.getElementById('overclockBtn');
            if (btn) {
                btn.addEventListener('click', () => this.toggleOverclock());
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);

                if (window.innerWidth < 1024) {
                    this.targetMeshX = 0;
                    this.targetMeshY = 1.5;
                    this.targetScale = 0.75;
                } else {
                    this.targetMeshX = 4.2;
                    this.targetMeshY = 0;
                    this.targetScale = 1.0;
                }
            });

            if (window.innerWidth < 1024) {
                this.targetMeshX = 0;
                this.targetMeshY = 1.5;
                this.targetScale = 0.75;
            }

            window.addEventListener('mousemove', (e) => {
                this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                this.mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;

                if (this.isDragging) {
                    const deltaX = e.clientX - this.previousMousePosition.x;
                    const deltaY = e.clientY - this.previousMousePosition.y;
                    this.targetRotationY += deltaX * 0.008;
                    this.targetRotationX += deltaY * 0.008;
                    this.previousMousePosition = { x: e.clientX, y: e.clientY };
                }
            });

            this.canvas.addEventListener('mousedown', (e) => {
                this.isDragging = true;
                this.previousMousePosition = { x: e.clientX, y: e.clientY };
            });

            window.addEventListener('mouseup', () => {
                this.isDragging = false;
            });

            window.addEventListener('scroll', () => {
                const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                this.scrollProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
                this.updateScrollStage();
            }, { passive: true });
        }

        updateScrollStage() {
            const p = this.scrollProgress;

            if (window.innerWidth >= 1024) {
                if (p < 0.15) {
                    this.targetMeshX = 4.2;
                    this.targetMeshY = 0;
                    this.targetScale = 1.0;
                } else if (p < 0.35) {
                    this.targetMeshX = -4.5;
                    this.targetMeshY = -1;
                    this.targetScale = 0.9;
                } else if (p < 0.6) {
                    this.targetMeshX = 4.0;
                    this.targetMeshY = 1.2;
                    this.targetScale = 0.85;
                } else if (p < 0.85) {
                    this.targetMeshX = -3.8;
                    this.targetMeshY = 0.5;
                    this.targetScale = 0.8;
                } else {
                    this.targetMeshX = 0;
                    this.targetMeshY = -1.5;
                    this.targetScale = 1.1;
                }
            }
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            const time = Date.now() * 0.001;
            const speedMultiplier = this.isOverclocked ? 2.5 : 1.0;

            if (!this.isDragging) {
                this.targetRotationY += 0.005 * speedMultiplier;
                this.targetRotationX = Math.sin(time * 0.5) * 0.16;
            }

            this.sculptureGroup.rotation.y += (this.targetRotationY + this.mouseX * 0.4 - this.sculptureGroup.rotation.y) * 0.06;
            this.sculptureGroup.rotation.x += (this.targetRotationX - this.mouseY * 0.3 - this.sculptureGroup.rotation.x) * 0.06;

            this.sculptureGroup.position.x += (this.targetMeshX - this.sculptureGroup.position.x) * 0.05;
            this.sculptureGroup.position.y += (this.targetMeshY + Math.sin(time * 1.5) * 0.25 - this.sculptureGroup.position.y) * 0.05;
            this.sculptureGroup.position.z += (this.targetMeshZ - this.sculptureGroup.position.z) * 0.05;

            const curScale = this.sculptureGroup.scale.x;
            const newScale = curScale + (this.targetScale - curScale) * 0.05;
            this.sculptureGroup.scale.set(newScale, newScale, newScale);

            this.orbitNodes.forEach((node) => {
                node.userData.angle += node.userData.speed * speedMultiplier;
                node.position.x = Math.cos(node.userData.angle) * 5.2;
                node.position.y = Math.sin(node.userData.angle * 1.5) * 2.8;
                node.position.z = Math.sin(node.userData.angle) * 3.0;
            });

            this.auraRings.forEach((ring, idx) => {
                ring.rotation.z += (0.01 + idx * 0.005) * speedMultiplier;
                const scalePulse = 1 + Math.sin(time * 2 + idx) * 0.04;
                ring.scale.set(scalePulse, scalePulse, scalePulse);
            });

            const pulse = 1 + Math.sin(time * 2.5) * 0.08;
            this.innerMesh.scale.set(pulse, pulse, pulse);
            this.innerMesh.rotation.y = -time * 0.5 * speedMultiplier;

            if (this.dustParticles) {
                this.dustParticles.rotation.y = time * 0.02 * speedMultiplier;
            }

            this.renderer.render(this.scene, this.camera);
        }
    }

    const cyberWorld = new CyberAura3DWorld();

    /* ==========================================================================
       2. RECURSIVE BACKGROUND TERMINAL ASCII ENGINE (Strictly Terminal Style)
       ========================================================================== */
    class RecursiveBackgroundTerminalAsciiEngine {
        constructor() {
            this.canvas = document.getElementById('bg-ascii-canvas');
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext('2d');
            this.fontSize = 13;
            this.cols = 0;
            this.rows = 0;

            // Mathematical 3D Torus angles
            this.A = 0;
            this.B = 0;
            this.radarAngle = 0;
            this.streamOffsets = [];
            this.memoryBuffer = [];

            // Low-level x86_64 / Kernel Terminal Opcodes
            this.opcodes = [
                'MOV RAX, 0x3B',
                'XOR RDI, RDI',
                'LEA RSI, [RIP+0x20]',
                'SYSCALL',
                'PUSH RBP',
                'MOV RBP, RSP',
                'SUB RSP, 0x40',
                'XOR EAX, EAX',
                'TEST RAX, RAX',
                'JZ .L_DECRYPT',
                'MOV CR0, RAX',
                'INT 0x80',
                'NOP',
                'CALL [RIP+0x80]',
                'MOV [RSP+0x10], RDX',
                'RET'
            ];

            this.hexChars = '0123456789ABCDEF!#*+-~:/';

            this.initMemoryBuffer();
            this.resize();
            this.bindEvents();
            this.startLoop();
        }

        initMemoryBuffer() {
            for (let i = 0; i < 40; i++) {
                const addr = '0x' + (0x7ffe0000 + i * 16).toString(16).toUpperCase();
                let hex = '';
                for (let j = 0; j < 8; j++) {
                    hex += Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase() + ' ';
                }
                this.memoryBuffer.push(`${addr}: ${hex} [D33_ROOT]`);
            }
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.cols = Math.floor(this.canvas.width / 10);
            this.rows = Math.floor(this.canvas.height / (this.fontSize + 3));

            this.streamOffsets = [];
            for (let i = 0; i < this.cols; i++) {
                this.streamOffsets.push({
                    y: Math.random() * this.rows,
                    speed: 0.15 + Math.random() * 0.45,
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
                if (time - lastTime > 40) { // ~25 FPS for authentic terminal pulse
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
            ctx.font = `${this.fontSize}px 'JetBrains Mono', 'Share Tech Mono', monospace`;
            ctx.textBaseline = 'top';

            // Phase cycle: alternates smoothly between 3D Torus projection & Matrix Opcodes
            this.A += 0.035;
            this.B += 0.018;
            this.radarAngle += 0.03;

            // 1. Render Background Matrix Rain of Low-Level Opcodes & Hex
            for (let col = 0; col < this.cols; col += 3) {
                const stream = this.streamOffsets[col];
                if (!stream) continue;

                stream.y += stream.speed;
                if (stream.y > this.rows + 15) {
                    stream.y = -5;
                    stream.speed = 0.15 + Math.random() * 0.45;
                }

                const rowIdx = Math.floor(stream.y);
                const xPos = col * 10;
                const yPos = rowIdx * (this.fontSize + 3);

                if (col % 9 === 0 && rowIdx >= 0 && rowIdx < this.rows) {
                    ctx.fillStyle = 'rgba(59, 130, 246, 0.38)';
                    ctx.fillText(this.opcodes[stream.opcodeIdx], xPos, yPos);
                } else if (rowIdx >= 0 && rowIdx < this.rows) {
                    ctx.fillStyle = 'rgba(16, 185, 129, 0.32)';
                    const ch = this.hexChars[(Math.floor(t * 10) + col) % this.hexChars.length];
                    ctx.fillText(ch, xPos, yPos);
                }
            }

            // 2. Render 3D Rotating Monospace Wireframe in Upper-Right / Center
            const torusCols = Math.min(48, Math.floor(this.cols * 0.5));
            const torusRows = Math.min(22, Math.floor(this.rows * 0.6));
            const b = [];
            const z = [];
            for (let k = 0; k < torusCols * torusRows; k++) {
                b[k] = ' ';
                z[k] = 0;
            }

            const R1 = 1;
            const R2 = 2.2;
            const K2 = 5;

            for (let j = 0; j < 6.28; j += 0.32) {
                for (let i = 0; i < 6.28; i += 0.14) {
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

                    const x = Math.floor(torusCols / 2 + 36 * D * (l * h * m - torusT * n));
                    const y = Math.floor(torusRows / 2 + 18 * D * (l * h * n + torusT * m));
                    const o = x + torusCols * y;
                    const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

                    if (y >= 0 && y < torusRows && x >= 0 && x < torusCols && D > z[o]) {
                        z[o] = D;
                        const chars = '.,-~:;=!*#$@';
                        b[o] = chars[Math.max(0, Math.min(chars.length - 1, N > 0 ? N : 0))];
                    }
                }
            }

            // Draw projected 3D Wireframe ASCII onto background
            const startX = Math.max(20, w - torusCols * 11 - 40);
            const startY = Math.max(60, Math.floor(h * 0.15));

            ctx.fillStyle = 'rgba(52, 211, 153, 0.45)';
            for (let ty = 0; ty < torusRows; ty++) {
                for (let tx = 0; tx < torusCols; tx++) {
                    const char = b[tx + torusCols * ty];
                    if (char && char !== ' ') {
                        ctx.fillText(char, startX + tx * 10, startY + ty * (this.fontSize + 2));
                    }
                }
            }

            // 3. Render Cyber Terminal Memory Addresses on Bottom Left
            const memLines = 10;
            const memStartY = h - memLines * (this.fontSize + 4) - 30;
            for (let m = 0; m < memLines; m++) {
                const idx = (Math.floor(t * 2) + m) % this.memoryBuffer.length;
                ctx.fillStyle = 'rgba(148, 163, 184, 0.28)';
                ctx.fillText(this.memoryBuffer[idx], 30, memStartY + m * (this.fontSize + 4));
            }
        }
    }

    new RecursiveBackgroundTerminalAsciiEngine();

    /* ==========================================================================
       4. INTERACTIVE HACKER RECON TERMINAL (BASH SHELL)
       ========================================================================== */
    class HackerTerminal {
        constructor() {
            this.overlay = document.getElementById('terminalOverlay');
            this.openBtn = document.getElementById('terminalToggleBtn');
            this.heroLaunchBtn = document.getElementById('heroTerminalBtn');
            this.closeBtn = document.getElementById('closeTerminalBtn');
            this.input = document.getElementById('terminalInput');
            this.history = document.getElementById('terminalHistory');

            this.bindEvents();
        }

        bindEvents() {
            if (this.openBtn) this.openBtn.addEventListener('click', () => this.open());
            if (this.heroLaunchBtn) this.heroLaunchBtn.addEventListener('click', () => this.open());
            if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());

            window.addEventListener('keydown', (e) => {
                if (e.key === '`' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    this.toggle();
                } else if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) {
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
                setTimeout(() => this.input.focus(), 100);
            }
        }

        close() {
            if (this.overlay) {
                this.overlay.classList.add('hidden');
            }
        }

        toggle() {
            if (this.overlay.classList.contains('hidden')) {
                this.open();
            } else {
                this.close();
            }
        }

        processCommand(rawCmd) {
            const cmd = rawCmd.toLowerCase();
            this.appendHistory(`root@d33:~$ ${rawCmd}`, 't-prompt-echo');

            switch (cmd) {
                case 'help':
                    this.appendHistory(`Available Commands:
- whoami        : Display operator biometrics & clearance
- skills        : List offensive & defensive capabilities
- projects      : View classified exploit repositories
- certs         : View accreditations (CPENT, Cisco, IIT, etc.)
- overclock     : Surge 3D Quantum Core power output
- matrix        : Trigger binary data stream
- clear         : Clear shell output
- exit          : Close terminal drawer`, 't-output-dim');
                    break;

                case 'whoami':
                    this.appendHistory(`OPERATOR: DEEKSHITH (D33)
ROLE: Red Team Specialist // Exploit Architect
STATUS: Available for Offensive Security Deployments
BASE: Bangalore, India // Ring-0 Clearance`, 't-output-green');
                    break;

                case 'skills':
                    this.appendHistory(`ARSENAL DUMP:
[+] Offensive: Penetration Testing, Web App Sec, AD Attacks, OWASP Top 10, Social Eng
[+] Defensive: Digital Forensics, SIEM (ELK Stack), Incident Response, Malware Analysis
[+] Systems  : Python, C/C++, Bash, PowerShell, Assembly (x86), SQL
[+] Platforms: Kali Linux, Burp Suite Pro, Metasploit, Docker, Volatility`, 't-highlight');
                    break;

                case 'projects':
                    this.appendHistory(`CLASSIFIED REPOSITORIES:
1. E-D--Crypto         -> C / OpenSSL / AES-256 / RSA-2048
2. Perimeter_Security  -> Zero-Trust / ELK SIEM / VirtualBox
3. Security_Assessment -> S-SDLC / SAST / DAST Audit
4. Data_Security       -> C++ / Field Encryption / Masking
5. Compliance          -> ISO 27001 / CMMC / GPO Hardening`, 't-output-green');
                    break;

                case 'certs':
                    this.appendHistory(`ACCREDITATIONS:
* CPENT (Certified Penetration Testing Professional - EC-Council)
* TryHackMe Presecurity
* Cybersecurity Program - IIT Guwahati
* Ethical Hacker - Cisco
* Cyber Job Simulation - Deloitte Australia
* Ethical Hacking - IISc Bangalore
* IAM Analyst - TCS Virtual
* MARVELOps Docker 101
* PBCTF 4.0 & IDEEEAS CTF Victor`, 't-output-green');
                    break;

                case 'overclock':
                    cyberWorld.toggleOverclock();
                    this.appendHistory(`[+] 3D QUANTUM CORE OVERCLOCKED: Kinetic power surged to 300%!`, 't-highlight');
                    break;

                case 'matrix':
                    this.appendHistory(`01000100 00110011 00110011 01001011 01010011 01001000
[+] NEURAL UPLINK ESTABLISHED. ACCESS GRANTED.`, 't-output-green');
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
                    this.appendHistory(`Command not recognized: '${rawCmd}'. Type 'help' for available commands.`, 't-output-dim');
                    break;
            }

            const body = document.getElementById('terminalBody');
            if (body) body.scrollTop = body.scrollHeight;
        }

        appendHistory(text, className) {
            if (!this.history) return;
            const p = document.createElement('div');
            p.className = className || 't-output-dim';
            p.style.whiteSpace = 'pre-wrap';
            p.style.marginBottom = '6px';
            p.textContent = text;
            this.history.appendChild(p);
        }
    }

    new HackerTerminal();

    /* ==========================================================================
       5. SPOTLIGHT CARD TRACKER (Linear / Vercel Monochromatic Flashlight)
       ========================================================================== */
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ==========================================================================
       6. NAVBAR SCROLL & ACTIVE LINK SPY
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }

        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 150) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    /* ==========================================================================
       7. METRICS COUNTER ANIMATION
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                let cur = 0;
                const inc = Math.max(1, Math.floor(target / 30));
                const t = setInterval(() => {
                    cur += inc;
                    if (cur >= target) {
                        el.textContent = target;
                        clearInterval(t);
                    } else {
                        el.textContent = cur;
                    }
                }, 35);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => counterObserver.observe(c));

    /* ==========================================================================
       8. PROJECT CATEGORY FILTERING
       ========================================================================== */
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-showcase-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(14px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    /* ==========================================================================
       9. MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       10. CONTACT FORM DISPATCH
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value || 'Security Consultation';
            const message = document.getElementById('message').value;

            if (formStatus) {
                formStatus.textContent = 'Encrypting & dispatching to mail client...';
            }

            const body = `Callsign/Name: ${name}\nEmail: ${email}\n\nPayload:\n${message}`;
            const mailtoUrl = `mailto:d33kshith@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            setTimeout(() => {
                window.location.href = mailtoUrl;
                if (formStatus) {
                    formStatus.textContent = 'Transmission launched in client. Awaiting handshake.';
                }
                contactForm.reset();
            }, 800);
        });
    }

    console.log('%c[DEEKSHITH // LUXURY MONOCHROME 3D ENGINE LOADED] // CALLSIGN: D33', 'color: #ffffff; font-weight: bold; font-size: 13px;');
})();
