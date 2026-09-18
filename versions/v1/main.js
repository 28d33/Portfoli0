/* =====================================================================
   CREATIVE MAZE SOLVER BACKGROUND
   - Multiple colored snakes solving the maze simultaneously
   - Particle burst when a snake reaches the goal
   - Glow trails and pulsing walls
   - Mouse interaction: walls near cursor glow brighter
   
   CARD MATRIX RAIN
   - Each .glass card gets a tiny matrix rain waterfall effect
   ===================================================================== */

(function initMaze() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    const CELL = 20;
    const WALL_W = 1.5;
    let cols, rows, grid;
    let baseMazePath;
    let snakes = [];
    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    let solvedCount = 0;

    // Snake configs — 3 snakes with different colors
    const SNAKE_CONFIGS = [
        { color: '#00ff41', glow: 'rgba(0,255,65,', startCorner: 'tl', endCorner: 'br', tailLen: 40 },
        { color: '#a78bfa', glow: 'rgba(167,139,250,', startCorner: 'tr', endCorner: 'bl', tailLen: 30 },
        { color: '#22d3ee', glow: 'rgba(34,211,238,', startCorner: 'bl', endCorner: 'tr', tailLen: 25 }
    ];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.floor(canvas.width / CELL);
        rows = Math.floor(canvas.height / CELL);
        generateMaze();
    }

    function idx(r, c) { return r * cols + c; }

    // ── Maze generation (recursive backtracker) ──
    function generateMaze() {
        grid = [];
        for (let r = 0; r < rows; r++)
            for (let c = 0; c < cols; c++)
                grid.push({ r, c, walls: [true, true, true, true], visited: false });

        const stack = [];
        const start = grid[idx(0, 0)];
        start.visited = true;
        stack.push(start);

        while (stack.length > 0) {
            const cur = stack[stack.length - 1];
            const nb = getUnvisited(cur);
            if (nb.length === 0) { stack.pop(); continue; }
            const next = nb[Math.floor(Math.random() * nb.length)];
            removeWalls(cur, next);
            next.visited = true;
            stack.push(next);
        }

        // Reset snakes
        solvedCount = 0;
        snakes = SNAKE_CONFIGS.map(cfg => {
            const sr = cfg.startCorner.includes('t') ? 0 : rows - 1;
            const sc = cfg.startCorner.includes('l') ? 0 : cols - 1;
            const er = cfg.endCorner.includes('t') ? 0 : rows - 1;
            const ec = cfg.endCorner.includes('l') ? 0 : cols - 1;
            const path = solveBFS(sr, sc, er, ec);
            return {
                ...cfg, path, pathIdx: 0,
                trail: [{ r: sr, c: sc }],
                done: false
            };
        });

        // Precompute base wall paths
        baseMazePath = new Path2D();
        for (let cell of grid) {
            const x = cell.c * CELL, y = cell.r * CELL;
            if (cell.walls[0]) { baseMazePath.moveTo(x, y); baseMazePath.lineTo(x + CELL, y); }
            if (cell.walls[1]) { baseMazePath.moveTo(x + CELL, y); baseMazePath.lineTo(x + CELL, y + CELL); }
            if (cell.walls[2]) { baseMazePath.moveTo(x, y + CELL); baseMazePath.lineTo(x + CELL, y + CELL); }
            if (cell.walls[3]) { baseMazePath.moveTo(x, y); baseMazePath.lineTo(x, y + CELL); }
        }
    }

    function getUnvisited(cell) {
        const { r, c } = cell;
        const n = [];
        if (r > 0 && !grid[idx(r - 1, c)].visited) n.push(grid[idx(r - 1, c)]);
        if (c < cols - 1 && !grid[idx(r, c + 1)].visited) n.push(grid[idx(r, c + 1)]);
        if (r < rows - 1 && !grid[idx(r + 1, c)].visited) n.push(grid[idx(r + 1, c)]);
        if (c > 0 && !grid[idx(r, c - 1)].visited) n.push(grid[idx(r, c - 1)]);
        return n;
    }

    function removeWalls(a, b) {
        const dr = b.r - a.r, dc = b.c - a.c;
        if (dr === -1) { a.walls[0] = false; b.walls[2] = false; }
        if (dr === 1) { a.walls[2] = false; b.walls[0] = false; }
        if (dc === 1) { a.walls[1] = false; b.walls[3] = false; }
        if (dc === -1) { a.walls[3] = false; b.walls[1] = false; }
    }

    // ── BFS solver ──
    function solveBFS(sr, sc, er, ec) {
        const visited = new Set();
        const queue = [{ r: sr, c: sc, path: [{ r: sr, c: sc }] }];
        visited.add(idx(sr, sc));
        while (queue.length > 0) {
            const { r, c, path: p } = queue.shift();
            if (r === er && c === ec) return p;
            const cell = grid[idx(r, c)];
            const dirs = [[-1, 0, 0], [0, 1, 1], [1, 0, 2], [0, -1, 3]];
            for (const [dr, dc, w] of dirs) {
                if (cell.walls[w]) continue;
                const nr = r + dr, nc = c + dc;
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
                const ni = idx(nr, nc);
                if (visited.has(ni)) continue;
                visited.add(ni);
                queue.push({ r: nr, c: nc, path: [...p, { r: nr, c: nc }] });
            }
        }
        return [{ r: sr, c: sc }];
    }

    // ── Particles ──
    function spawnBurst(x, y, color) {
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.015 + Math.random() * 0.02,
                color,
                size: 2 + Math.random() * 3
            });
        }
    }

    // ── Drawing ──
    let frame = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawWalls();
        drawGoals();
        drawSnakes();
        drawParticles();

        // Advance snakes
        frame++;
        if (frame % 2 === 0) {
            for (const s of snakes) {
                if (s.done) continue;
                if (s.pathIdx < s.path.length - 1) {
                    s.pathIdx++;
                    s.trail.push(s.path[s.pathIdx]);
                    if (s.trail.length > s.tailLen) s.trail.shift();
                } else if (!s.done) {
                    s.done = true;
                    solvedCount++;
                    const last = s.path[s.path.length - 1];
                    spawnBurst(last.c * CELL + CELL / 2, last.r * CELL + CELL / 2, s.color);
                }
            }
        }

        // All solved → wait then regenerate
        if (solvedCount >= snakes.length) {
            frame++;
            if (frame > 120) { generateMaze(); frame = 0; }
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            p.vx *= 0.97; p.vy *= 0.97;
            p.life -= p.decay;
            if (p.life <= 0) particles.splice(i, 1);
        }

        requestAnimationFrame(draw);
    }

    function drawWalls() {
        const time = Date.now() * 0.001;

        ctx.strokeStyle = `rgba(0, 255, 65, 0.15)`;
        ctx.lineWidth = WALL_W;
        if (baseMazePath) ctx.stroke(baseMazePath);

        if (mouse.x > -1000) {
            const glowRadius = 200;
            const cMin = Math.max(0, Math.floor((mouse.x - glowRadius) / CELL));
            const cMax = Math.min(cols - 1, Math.floor((mouse.x + glowRadius) / CELL));
            const rMin = Math.max(0, Math.floor((mouse.y - glowRadius) / CELL));
            const rMax = Math.min(rows - 1, Math.floor((mouse.y + glowRadius) / CELL));

            for (let r = rMin; r <= rMax; r++) {
                for (let c = cMin; c <= cMax; c++) {
                    const idxCell = idx(r, c);
                    if (idxCell < 0 || idxCell >= grid.length) continue;
                    const cell = grid[idxCell];
                    const x = cell.c * CELL;
                    const y = cell.r * CELL;

                    const dm = Math.hypot(mouse.x - (x + CELL / 2), mouse.y - (y + CELL / 2));
                    if (dm < glowRadius) {
                        const mouseAlpha = (1 - dm / glowRadius) * 0.375;
                        const pulse = Math.sin(time + cell.r * 0.3 + cell.c * 0.3) * 0.03;
                        const alpha = mouseAlpha + pulse;
                        if (alpha > 0) {
                            ctx.strokeStyle = `rgba(0, 255, 65, ${alpha})`;
                            ctx.beginPath();
                            if (cell.walls[0]) { ctx.moveTo(x, y); ctx.lineTo(x + CELL, y); }
                            if (cell.walls[1]) { ctx.moveTo(x + CELL, y); ctx.lineTo(x + CELL, y + CELL); }
                            if (cell.walls[2]) { ctx.moveTo(x, y + CELL); ctx.lineTo(x + CELL, y + CELL); }
                            if (cell.walls[3]) { ctx.moveTo(x, y); ctx.lineTo(x, y + CELL); }
                            ctx.stroke();
                        }
                    }
                }
            }
        }
    }

    function drawGoals() {
        const time = Date.now() * 0.003;
        for (const s of snakes) {
            if (s.done) continue;
            const last = s.path[s.path.length - 1];
            const gx = last.c * CELL + CELL / 2;
            const gy = last.r * CELL + CELL / 2;
            const pulseR = 4 + Math.sin(time) * 2;

            ctx.shadowBlur = 18;
            ctx.shadowColor = s.color;
            ctx.fillStyle = s.color;
            ctx.globalAlpha = 0.6 + Math.sin(time) * 0.3;
            ctx.beginPath();
            ctx.arc(gx, gy, pulseR, 0, Math.PI * 2);
            ctx.fill();

            // Outer ring
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(gx, gy, pulseR + 6 + Math.sin(time * 2) * 3, 0, Math.PI * 2);
            ctx.stroke();

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }
    }

    function drawSnakes() {
        for (const s of snakes) {
            for (let i = 0; i < s.trail.length; i++) {
                const { r, c } = s.trail[i];
                const sx = c * CELL + 2;
                const sy = r * CELL + 2;
                const sw = CELL - 4;
                const isHead = i === s.trail.length - 1;
                const alpha = 0.05 + (i / s.trail.length) * 0.6;

                if (isHead) {
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = s.color;
                    ctx.fillStyle = s.color;
                    ctx.fillRect(sx, sy, sw, sw);
                    ctx.shadowBlur = 0;

                    // Head highlight dot
                    ctx.fillStyle = '#ffffff';
                    ctx.globalAlpha = 0.7;
                    ctx.beginPath();
                    ctx.arc(sx + sw / 2, sy + sw / 2, 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                } else {
                    ctx.fillStyle = s.glow + alpha + ')';
                    ctx.fillRect(sx, sy, sw, sw);
                }
            }
        }
    }

    function drawParticles() {
        for (const p of particles) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }

    document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('resize', resize);
    resize();
    draw();
})();



/* ===== Custom Cursor ===== */
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let dotX = mouseX, dotY = mouseY;
let ringX = mouseX, ringY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Dot instantly follows mouse to avoid any feeling of lag/unsmoothness
    dotX = mouseX;
    dotY = mouseY;

    // Ring follows smoothly
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;

    // Hardware accelerated, sub-pixel accurate transform without calc()
    cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousedown', () => { cursorDot.classList.add('click'); cursorRing.classList.add('click'); });
document.addEventListener('mouseup', () => { cursorDot.classList.remove('click'); cursorRing.classList.remove('click'); });

document.querySelectorAll('a, button, .skill-chip, .project-card, .cert-card, .filter-btn, .social-btn, .hex, .experience-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '48px';
        cursorRing.style.height = '48px';
        cursorRing.style.borderColor = 'rgba(0,255,65,0.7)';
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '32px';
        cursorRing.style.height = '32px';
        cursorRing.style.borderColor = 'rgba(0,255,65,0.4)';
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
    });
});
if ('ontouchstart' in window) { cursorDot.style.display = 'none'; cursorRing.style.display = 'none'; }

/* ===== 3D Card Tilt ===== */
function applyTilt(el, e) {
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateX(${dy * -6}deg) rotateY(${dx * 6}deg) scale(1.02)`;
    el.style.boxShadow = `${-dx * 10}px ${-dy * 10}px 40px rgba(0,0,0,0.3),0 0 20px rgba(0,255,65,0.06)`;
}
function resetTilt(el) { el.style.transform = ''; el.style.boxShadow = ''; }
document.querySelectorAll('.tilt-card, .project-card, .cert-card, .experience-card').forEach(card => {
    card.addEventListener('mousemove', (e) => applyTilt(card, e));
    card.addEventListener('mouseleave', () => resetTilt(card));
});

/* ===== Navbar ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => { navLinksEl.classList.toggle('open'); hamburger.classList.toggle('active'); });
navLinksEl.querySelectorAll('a').forEach(l => l.addEventListener('click', () => { navLinksEl.classList.remove('open'); hamburger.classList.remove('active'); }));

/* ===== Typing ===== */
function typeText(el, text, speed, cb) {
    let i = 0; el.textContent = '';
    const t = setInterval(() => { if (i < text.length) el.textContent += text.charAt(i++); else { clearInterval(t); if (cb) cb(); } }, speed);
}
window.addEventListener('load', () => {
    const n = document.getElementById('typingName');
    const r = document.getElementById('typingRole');
    setTimeout(() => typeText(n, 'Deekshith', 75, () => setTimeout(() => typeText(r, '> Bug hunter | Security Researcher', 38), 300)), 600);
});

/* ===== Scroll Fade-in ===== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.opacity = '1'; el.style.transform = 'translateY(0)';
        el.querySelectorAll('.stat-num').forEach(counter => {
            const target = parseInt(counter.dataset.target); let cur = 0;
            const inc = Math.ceil(target / 40);
            const t = setInterval(() => { cur = Math.min(cur + inc, target); counter.textContent = cur; if (cur >= target) clearInterval(t); }, 40);
        });
        observer.unobserve(el);
    });
}, { threshold: 0.12 });
document.querySelectorAll('.glass, .project-card, .cert-card, .experience-card, .skill-category').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
});

/* ===== Skill Chip Ripple ===== */
document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = chip.getBoundingClientRect();
        ripple.style.cssText = `position:absolute;border-radius:50%;width:80px;height:80px;background:rgba(0,255,65,0.15);transform:translate(-50%,-50%) scale(0);left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;animation:rippleOut 0.5s ease-out forwards;pointer-events:none;`;
        chip.style.position = 'relative'; chip.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
});
const rstyle = document.createElement('style');
rstyle.textContent = `@keyframes rippleOut { to { transform:translate(-50%,-50%) scale(2.5); opacity:0; } }`;
document.head.appendChild(rstyle);

/* ===== Hex Parallax ===== */
const hexGrid = document.querySelector('.hex-grid');
if (hexGrid) document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    hexGrid.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
});

/* ===== Project Filter ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.project-card').forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            if (show) { card.style.display = 'flex'; setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 20); }
            else { card.style.opacity = '0'; card.style.transform = 'translateY(16px)'; setTimeout(() => card.style.display = 'none', 300); }
        });
    });
});

/* ===== Contact Form ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const note = document.getElementById('formNote');
    btn.textContent = '[ Connecting... ]'; btn.disabled = true;

    // Construct mailto
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value || 'Security Consultation';
    let message = document.getElementById('message').value;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    // Trigger mailto link
    window.location.href = `mailto:d33kshith@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => { note.textContent = '> Email client opened!'; btn.textContent = '[ Sent ✓ ]'; contactForm.reset(); setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; note.textContent = ''; }, 3000); }, 1400);
});

/* ===== Name Glitch ===== */
const glitchEl = document.querySelector('.name-glitch');
if (glitchEl) setInterval(() => { glitchEl.style.textShadow = `${(Math.random() * 6 - 3).toFixed(1)}px 0 #fb7185,${(Math.random() * -6 + 3).toFixed(1)}px 0 #22d3ee`; setTimeout(() => glitchEl.style.textShadow = 'none', 90); }, 4500);


/* ===== Card Matrix Rain (75% Visibility) ===== */
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');

document.querySelectorAll('.glass').forEach(card => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.50';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.borderRadius = 'inherit';

    // Push card content above canvas
    Array.from(card.children).forEach(child => {
        child.style.position = 'relative';
        child.style.zIndex = '1';
    });

    card.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let drops = [];
    const fontSize = 14;

    function resizeCardCanvas() {
        width = canvas.width = card.offsetWidth;
        height = canvas.height = card.offsetHeight;
        const columns = Math.ceil(width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start at random negative heights 
        }
    }

    // Resize observer instead of window resize for better performance
    new ResizeObserver(resizeCardCanvas).observe(card);

    function drawCardMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Card surface color with alpha for trail
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff41'; // Hacker green
        ctx.font = fontSize + 'px "Share Tech Mono"';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.95) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Animate only when card is visible in viewport
    let isIntersecting = false;
    new IntersectionObserver((entries) => {
        isIntersecting = entries[0].isIntersecting;
    }).observe(card);

    setInterval(() => {
        if (isIntersecting) drawCardMatrix();
    }, 50);
});
