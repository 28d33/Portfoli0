// =========================================================================
// DEEKSHITH (D33) — PROCEDURAL ASCII FLOW ENGINE & PORTFOLIO
// Native Mathematical Wave Dynamics • Real-time Shaders • Security Systems
// =========================================================================

// --- 1. INTRO SEQUENCE ORCHESTRATION ---
document.addEventListener("DOMContentLoaded", () => {
    const uiLayer = document.getElementById('ui-layer');
    const asciiContainer = document.getElementById('ascii-container');
    const introScreen = document.getElementById('intro-screen');

    // Initial hidden state for main content
    if (uiLayer) {
        uiLayer.style.opacity = '0';
        uiLayer.style.transform = 'translateY(30px)';
        uiLayer.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (asciiContainer) {
        asciiContainer.style.opacity = '0';
    }

    // Sync with skull zoom explosion animation (~2.5s)
    setTimeout(() => {
        if (asciiContainer) asciiContainer.style.opacity = '0.8';
        if (uiLayer) {
            uiLayer.style.opacity = '1';
            uiLayer.style.transform = 'translateY(0)';
        }
        
        if (introScreen) {
            introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.remove();
            }, 1000);
        }
    }, 2400); 
});

// Ensure Lucide icons load safely
try {
    if (window.lucide) {
        lucide.createIcons();
    }
} catch (e) {
    console.warn("Lucide icons notice:", e);
}

// --- 2. NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
const navbarInner = document.getElementById('navbar-inner');

window.addEventListener('scroll', () => {
    if (!navbar || !navbarInner) return;
    if (window.scrollY > 40) {
        navbar.classList.add('py-2');
        navbar.classList.remove('py-4');
        navbarInner.classList.add('glass');
    } else {
        navbar.classList.add('py-4');
        navbar.classList.remove('py-2');
        navbarInner.classList.remove('glass');
    }
});


// --- 3. PROCEDURAL ASCII MOTION ENGINE ---
const outputElement = document.getElementById('ascii-output');

// Character density maps (from dark to bright)
const charSets = {
    standard: " .:-=+*#%@",
    binary: "01",
    blocks: " ░▒▓█",
    matrix: " ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ"
};

// Engine State (Linked to UI Controls)
const state = {
    scale: 0.05,
    speed: 1.0,
    complexity: 2.0,
    charset: charSets.standard,
    time: 0,
    cols: 0,
    rows: 0
};

// UI Elements Binding
const uiScale = document.getElementById('ctrl-scale');
const uiSpeed = document.getElementById('ctrl-speed');
const uiComplex = document.getElementById('ctrl-complex');
const uiCharset = document.getElementById('ctrl-charset');

const valScale = document.getElementById('val-scale');
const valSpeed = document.getElementById('val-speed');
const valComplex = document.getElementById('val-complex');

if (uiScale) {
    uiScale.addEventListener('input', (e) => {
        state.scale = parseFloat(e.target.value);
        if (valScale) valScale.innerText = state.scale.toFixed(2);
    });
}

if (uiSpeed) {
    uiSpeed.addEventListener('input', (e) => {
        state.speed = parseFloat(e.target.value);
        if (valSpeed) valSpeed.innerText = state.speed.toFixed(1);
    });
}

if (uiComplex) {
    uiComplex.addEventListener('input', (e) => {
        state.complexity = parseFloat(e.target.value);
        if (valComplex) valComplex.innerText = state.complexity.toFixed(1);
    });
}

if (uiCharset) {
    uiCharset.addEventListener('change', (e) => {
        state.charset = charSets[e.target.value] || charSets.standard;
    });
}

// Theme Switching Logic
const themeBtns = document.querySelectorAll('.theme-btn');
themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        themeBtns.forEach(b => {
            b.classList.remove('glass', 'border-white/20', 'active');
            b.classList.add('border-transparent');
        });
        const target = e.currentTarget;
        target.classList.add('glass', 'border-white/20', 'active');
        target.classList.remove('border-transparent');

        const theme = target.getAttribute('data-theme');
        document.body.className = '';
        document.body.classList.add(theme);
    });
});

// Grid Dimension Sizing based on Monospace character bounding box
function resizeGrid() {
    const charWidth = 9;
    const charHeight = 16;
    state.cols = Math.floor(window.innerWidth / charWidth) + 4;
    state.rows = Math.floor(window.innerHeight / charHeight) + 4;
}

window.addEventListener('resize', resizeGrid);
resizeGrid();

// Density Calculation via Harmonic Wave Superposition
function getDensityAt(x, y, t) {
    // Primary diagonal traveling wave
    const wave1 = Math.sin((x * state.scale) + (y * state.scale) + t);
    
    // Secondary interfering counter-wave
    const wave2 = Math.cos((x * state.scale * state.complexity) - (y * state.scale) - (t * 0.5));
    
    // Center-origin radial harmonic ripples
    const cx = x - state.cols / 2;
    const cy = y - state.rows / 2;
    const dist = Math.sqrt(cx * cx + cy * cy);
    const radialWave = Math.sin((dist * state.scale * 0.5) - (t * 2));

    // Normalize combined amplitude to [0.0, 1.0]
    const combined = (wave1 + wave2 + radialWave) / 3;
    return (combined + 1) / 2;
}

// Procedural Animation Render Loop
function render() {
    if (!outputElement) return;

    let frameString = "";
    const charLen = state.charset.length;

    for (let y = 0; y < state.rows; y++) {
        for (let x = 0; x < state.cols; x++) {
            let density = getDensityAt(x, y, state.time);
            density = Math.max(0, Math.min(0.99, density));
            const charIndex = Math.floor(density * charLen);
            frameString += state.charset[charIndex];
        }
        frameString += "\n";
    }

    outputElement.innerText = frameString;
    state.time += 0.05 * state.speed;

    requestAnimationFrame(render);
}
requestAnimationFrame(render);


// --- 4. PROJECT INSPECTION MODAL ---
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


// --- 5. INTERACTIVE TERMINAL DRAWER ---
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
    }
});

const commands = {
    help: () => `OPERATIONAL DIRECTIVES:
- whoami      : Display operator identification & role
- skills      : Capability matrix & security toolkit
- projects    : List active security deployments
- matrix      : Display verified institutional credentials
- theme <name>: Switch theme (ghost | synthwave | terminal | lava | ocean)
- scale <val> : Set wave scale (e.g. scale 0.08)
- speed <val> : Set motion speed (e.g. speed 2.5)
- contact     : Reveal communication uplink channels
- clear       : Wipe terminal output buffer`,

    whoami: () => `IDENTITY: Deekshith (D33)
ROLE: Offensive Security Architect & Low-Level Systems Developer
LOCATION: Bangalore, India
SPECIALIZATION: Cryptography, Memory Corruption, SIEM Automation, Procedural Motion`,

    skills: () => `CORE CAPABILITIES:
- Languages   : C, C++20, x86_64 Assembly, Python, JavaScript, GLSL
- Security    : Reverse Engineering, Exploitation, Cryptography, SIEM (Suricata/ELK)
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

        const parts = raw.split(' ');
        const cmd = parts[0].toLowerCase();
        const arg = parts[1];

        const line = document.createElement('div');
        line.innerHTML = `<span class="text-brand">d33@uplink:~$</span> <span class="text-white">${raw}</span>`;
        terminalLogs.appendChild(line);

        const resp = document.createElement('div');
        resp.className = 'text-white/70 whitespace-pre-wrap';

        if (cmd === 'theme' && arg) {
            const validThemes = ['ghost', 'synthwave', 'terminal', 'lava', 'ocean'];
            if (validThemes.includes(arg)) {
                document.body.className = '';
                document.body.classList.add(`theme-${arg}`);
                resp.innerText = `Theme switched to 'theme-${arg}'.`;
            } else {
                resp.innerText = `Invalid theme. Choose from: ${validThemes.join(', ')}`;
            }
            terminalLogs.appendChild(resp);
        } else if (cmd === 'scale' && arg) {
            const val = parseFloat(arg);
            if (!isNaN(val) && val >= 0.01 && val <= 0.2) {
                state.scale = val;
                if (uiScale) uiScale.value = val;
                if (valScale) valScale.innerText = val.toFixed(2);
                resp.innerText = `Wave scale set to ${val}.`;
            } else {
                resp.innerText = `Scale must be between 0.01 and 0.20`;
            }
            terminalLogs.appendChild(resp);
        } else if (cmd === 'speed' && arg) {
            const val = parseFloat(arg);
            if (!isNaN(val) && val >= 0.1 && val <= 5.0) {
                state.speed = val;
                if (uiSpeed) uiSpeed.value = val;
                if (valSpeed) valSpeed.innerText = val.toFixed(1);
                resp.innerText = `Time multiplier set to ${val}x.`;
            } else {
                resp.innerText = `Speed must be between 0.1 and 5.0`;
            }
            terminalLogs.appendChild(resp);
        } else if (commands[cmd]) {
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


// --- 6. COPY EMAIL HELPER ---
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
