// =========================================================================
// DEEKSHITH (D33) — IMMERSIVE 3D VERTICAL MOTION ARCHITECTURE
// Three.js Torus Knot Core • Lenis Smooth Scroll • GSAP 3D Choreography
// =========================================================================

// --- 1. LENIS VIRTUAL SMOOTH SCROLL INTEGRATION ---
const lenis = new Lenis({
    duration: 1.5, // Cinematic weight
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Sync Lenis with GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// --- 2. CUSTOM PHYSICS CURSOR (LERP BASED) & PARALLAX TRACKING ---
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Normalized coordinates for 3D Camera Parallax (-1 to 1)
let targetX = 0;
let targetY = 0;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    // Map to -1 to 1 for Three.js camera parallax
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Hover States Management
function bindHoverTargets() {
    const hoverTargets = document.querySelectorAll('.hover-target, button, a, .project-row');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}
bindHoverTargets();

// Magnetic Buttons Logic (GSAP Elastic Return)
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
            const dx = (e.clientX - hx) * 0.4; // Intensity multiplier
            const dy = (e.clientY - hy) * 0.4;
            
            gsap.to(content, { x: dx, y: dy, duration: 0.4, ease: "power2.out", overwrite: true });
        });
        
        area.addEventListener('mouseleave', () => {
            gsap.to(content, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)", overwrite: true });
        });
    });
}
initMagneticButtons();

function renderCursor() {
    // Fast LERP for core dot
    dotPos.x += (mouse.x - dotPos.x) * 0.3;
    dotPos.y += (mouse.y - dotPos.y) * 0.3;
    
    // Slower LERP for outer ring (trailing fluidity)
    ringPos.x += (mouse.x - ringPos.x) * 0.15;
    ringPos.y += (mouse.y - ringPos.y) * 0.15;
    
    if (cursorDot) cursorDot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px)`;
    if (cursorRing) cursorRing.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
    
    requestAnimationFrame(renderCursor);
}
renderCursor();


// --- 3. THREE.JS 3D ENVIRONMENT SETUP ---
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();

// Deep exponential fog to create endless cyber void effect
scene.fog = new THREE.FogExp2('#050505', 0.015);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 35); // Initial camera position pulled back

const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// --- 4. CONSTRUCTING THE 3D OBJECTS (ABSTRACT TORUS KNOT CORE) ---
const coreGroup = new THREE.Group();
scene.add(coreGroup);

// Object 1: Complex Glowing Torus Knot (Wireframe Edges)
const knotGeometry = new THREE.TorusKnotGeometry(8, 2.5, 256, 64, 3, 5);
const edgesGeometry = new THREE.EdgesGeometry(knotGeometry);
const knotMaterial = new THREE.LineBasicMaterial({
    color: 0x4F46E5, // Indigo base
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
});
const knotMesh = new THREE.LineSegments(edgesGeometry, knotMaterial);
coreGroup.add(knotMesh);

// Object 2: Solid Inner Core with Glass/Reflective Physical Material
const innerGeo = new THREE.TorusKnotGeometry(7.8, 2.3, 128, 32, 3, 5);
const innerMat = new THREE.MeshPhysicalMaterial({
    color: 0x050505,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.5,
    ior: 1.5,
    transparent: true,
    opacity: 0.8
});
const innerMesh = new THREE.Mesh(innerGeo, innerMat);
coreGroup.add(innerMesh);

// Object 3: Orbiting Particle System (3,000 Vertex Gradient Particles)
const particleCount = 3000;
const particleGeo = new THREE.BufferGeometry();
const particlePos = new Float32Array(particleCount * 3);
const particleColors = new Float32Array(particleCount * 3);

const color1 = new THREE.Color(0x06b6d4); // Cyan
const color2 = new THREE.Color(0x4F46E5); // Indigo

for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 20 + Math.random() * 50;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    particlePos[i] = radius * Math.sin(phi) * Math.cos(theta);     // x
    particlePos[i + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
    particlePos[i + 2] = radius * Math.cos(phi);                   // z

    // Interpolate colors between Cyan and Indigo
    const mixedColor = color1.clone().lerp(color2, Math.random());
    particleColors[i] = mixedColor.r;
    particleColors[i + 1] = mixedColor.g;
    particleColors[i + 2] = mixedColor.b;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

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

const particleMat = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    map: createCircleTexture(),
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particleSystem = new THREE.Points(particleGeo, particleMat);
scene.add(particleSystem);

// Scene Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x06b6d4, 3, 100);
pointLight.position.set(0, 0, 0); // Inside the knot center
scene.add(pointLight);


// --- 5. LOADING SEQUENCE & ORCHESTRATION ---
let loadProgress = { val: 0 };

gsap.to(loadProgress, {
    val: 100,
    duration: 2.2,
    ease: "power3.inOut",
    onUpdate: () => {
        const bar = document.getElementById('loader-bar');
        const percent = document.getElementById('loader-percent');
        if (bar) bar.style.width = `${loadProgress.val}%`;
        if (percent) percent.innerText = `${loadProgress.val.toFixed(2).padStart(5, '0')}%`;
    },
    onComplete: initExperience
});

function initExperience() {
    // Dismiss Loader
    gsap.to("#loader", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
            const loaderEl = document.getElementById('loader');
            if (loaderEl) loaderEl.style.display = 'none';
        }
    });

    // Reveal Hero Typography
    gsap.to(".hero-reveal", {
        y: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.2
    });

    // Initialize ScrollTriggers for UI & 3D
    setupScrollAnimations();
    setup3DScrollOrchestration();
}

function setupScrollAnimations() {
    // About Section Typography Reveal
    gsap.to(".about-reveal", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
        },
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
    });

    // Fade-in Elements
    gsap.utils.toArray('.gs-fade').forEach(elem => {
        gsap.fromTo(elem, 
            { opacity: 0, y: 35 },
            {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                },
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "power3.out"
            }
        );
    });

    // Project Rows Stagger
    gsap.fromTo(".project-row", 
        { opacity: 0, y: 30 },
        {
            scrollTrigger: {
                trigger: "#work",
                start: "top 70%",
            },
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power3.out"
        }
    );
}

// 3D Master Timeline tied to Total Scroll Progress
function setup3DScrollOrchestration() {
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5 // Smooth interpolation for the scrub
        }
    });

    const colorCyan = new THREE.Color(0x06b6d4);
    const colorWhite = new THREE.Color(0xffffff);
    const colorIndigo = new THREE.Color(0x4F46E5);

    // Journey Phase 1: Scroll down from Hero to About
    // Camera physically flies forwards, the core rotates and shifts right, knot color shifts to Cyan
    scrollTl.to(camera.position, { z: 12, ease: "power1.inOut" }, 0)
            .to(coreGroup.position, { x: 6, ease: "power1.inOut" }, 0)
            .to(coreGroup.rotation, { x: Math.PI / 2, y: Math.PI / 4, z: Math.PI / 2, ease: "none" }, 0)
            .to(knotMaterial, { opacity: 0.8, ease: "none" }, 0)
            .to(knotMaterial.color, { r: colorCyan.r, g: colorCyan.g, b: colorCyan.b, ease: "none" }, 0)
            .to(pointLight.color, { r: 0.31, g: 0.27, b: 0.9, ease: "none" }, 0);

    // Journey Phase 2: About to Work
    // Camera plunges directly THROUGH the core structure (z: -5)
    scrollTl.to(camera.position, { z: -5, ease: "power1.inOut" }, 1)
            .to(coreGroup.position, { x: -8, y: -2, ease: "power1.inOut" }, 1)
            .to(coreGroup.rotation, { x: Math.PI, y: -Math.PI / 4, z: Math.PI, ease: "none" }, 1)
            .to(knotMaterial, { opacity: 0.15, ease: "none" }, 1)
            .to(knotMaterial.color, { r: colorWhite.r, g: colorWhite.g, b: colorWhite.b, ease: "none" }, 1);

    // Journey Phase 3: Work to Contact (Footer)
    // Camera pulls back out looking down, Core shrinks, particles swirl rapidly
    scrollTl.to(camera.position, { z: 30, y: 10, ease: "power2.inOut" }, 2)
            .to(camera.rotation, { x: -0.15, ease: "power2.inOut" }, 2)
            .to(coreGroup.position, { x: 0, y: 5, ease: "power2.inOut" }, 2)
            .to(coreGroup.scale, { x: 0.5, y: 0.5, z: 0.5, ease: "power2.inOut" }, 2)
            .to(knotMaterial, { opacity: 0.6, ease: "none" }, 2)
            .to(knotMaterial.color, { r: colorIndigo.r, g: colorIndigo.g, b: colorIndigo.b, ease: "none" }, 2)
            .to(particleSystem.rotation, { y: Math.PI * 2, ease: "power1.in" }, 2);
}


// --- 6. RENDER LOOP (BREATHING ANIMATIONS & MOUSE PARALLAX) ---
const clock = new THREE.Clock();
let currentCameraOffsetX = 0;
let currentCameraOffsetY = 0;

function animate() {
    const time = clock.getElapsedTime();

    // 1. Idle breathing rotations for Torus Knot Core
    coreGroup.rotation.y += 0.001;
    coreGroup.rotation.x += 0.0005;

    // 2. Animate Particle Field floating waves
    const positions = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.01;
    }
    particleGeo.attributes.position.needsUpdate = true;
    particleSystem.rotation.y = time * 0.03; // Ambient orbit

    // 3. Mouse Parallax Effect (LERP)
    currentCameraOffsetX += (targetX * 2 - currentCameraOffsetX) * 0.05;
    currentCameraOffsetY += (targetY * 2 - currentCameraOffsetY) * 0.05;
    
    camera.position.x = currentCameraOffsetX;
    camera.position.y += (currentCameraOffsetY * 0.05 - camera.position.y * 0.01); 

    // Maintain focal orientation
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// --- 7. PROJECT MODAL INSPECTOR ---
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
    gsap.fromTo(modal.querySelector('.glass-panel'), { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" });
};

window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    gsap.to(modal.querySelector('.glass-panel'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });
};

// Close modal on background click or Escape key
document.getElementById('project-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') closeProjectModal();
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
        toggleTerminal(false);
    }
});


// --- 8. COPY EMAIL TO CLIPBOARD HELPER ---
window.copyContactEmail = function() {
    const email = "deekshith.d33@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById('copy-email-btn');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i><span class="text-emerald-400">COPIED TO CLIPBOARD</span>`;
        lucide.createIcons();
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            lucide.createIcons();
        }, 2000);
    });
};


// --- 9. INTERACTIVE TACTICAL TERMINAL DRAWER ---
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
        setTimeout(() => terminalInput.focus(), 300);
    } else {
        terminalDrawer.classList.add('translate-y-full');
        terminalDrawer.classList.remove('translate-y-0');
    }
}

navTerminalBtn?.addEventListener('click', () => toggleTerminal());
closeTerminalBtn?.addEventListener('click', () => toggleTerminal(false));

// Hotkey ~ or ` toggles terminal
window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        toggleTerminal();
    }
});

// Terminal Commands Processor
const commands = {
    help: () => `AVAILABLE DIRECTIVES:
- whoami      : Display security clearance and identity
- skills      : Print offensive security & low-level skill tree
- projects    : List active repositories & deployments
- matrix      : Display verified institutional accreditations
- contact     : Reveal secure communication endpoints
- fetch       : System telemetry and environment specs
- date        : Current timestamp in UTC / Bangalore (IST)
- clear       : Wipe terminal output buffer
- sudo        : Execute privileged root command`,

    whoami: () => `IDENTITY: Deekshith (D33)
ROLE: Offensive Security Architect & Low-Level Systems Developer
BASE: Bangalore, India
FOCUS: Cryptography, Memory Corruption, SIEM Automation, WebGL Shaders`,

    skills: () => `CAPABILITY MATRIX:
- Languages   : C, C++20, x86_64 Assembly, Python, JavaScript, GLSL
- Security    : Reverse Engineering, Exploitation, Cryptography (AES/RSA/ChaCha), SIEM (Suricata/ELK)
- Tools       : GDB, Ghidra, Wireshark, Burp Suite, Bandit, OWASP ZAP, Docker
- Graphics    : Three.js, WebGL Shaders, GSAP Motion, Canvas API`,

    projects: () => `DEPLOYED REPOSITORIES:
[01] E-D--Crypto Engine        (AES-256-GCM / RSA-2048 Suite)
[02] Perimeter Defense & SIEM  (Suricata IDS Pipeline)
[03] Automated Security Audit  (SAST/DAST Triage Engine)
[04] Data Stream Masking       (Zero-Copy C++20 Tokenizer)`,

    matrix: () => `VERIFIED ACCREDITATIONS:
- IISc Bangalore & IIT Guwahati (Advanced Network Security Research)
- Cisco Certified Network Security Associate
- TryHackMe Global Top 1% (50+ CTF Root Flags)
- Deloitte & TCS Cyber Defense Governance Certified`,

    contact: () => `COMMUNICATION UPLINKS:
- Email   : deekshith.d33@gmail.com
- GitHub  : https://github.com/28d33
- LinkedIn: https://linkedin.com
- X/Twitter: https://x.com`,

    fetch: () => `SYSTEM STATUS:
OS: D33_SEC_ARCH Linux x86_64
KERNEL: 6.9.1-arch-security
GRAPHICS: Three.js WebGL2 Renderer (Additive Torus Knot Core)
FPS: 60.0 fps (VSYNC LOCK)
STATUS: 100% OPERATIONAL`,

    date: () => `TIMESTAMP: ${new Date().toUTCString()} [Bangalore IST: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}]`,

    clear: () => {
        terminalLogs.innerHTML = '';
        return '';
    },

    sudo: () => `PERMISSION DENIED: Operator key required. Contact Deekshith directly for root access token.`
};

terminalInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        if (!cmd) return;

        // Print entered command
        const line = document.createElement('div');
        line.innerHTML = `<span class="text-[#06b6d4]">d33@uplink:~$</span> <span class="text-white">${cmd}</span>`;
        terminalLogs.appendChild(line);

        // Process response
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
