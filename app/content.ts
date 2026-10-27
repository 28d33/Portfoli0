// Auto‑generated portfolio markup (from the original static index.html).
// Do **not** edit this file by hand unless you also regenerate it.
export const portfolioHtml = `<!-- Custom Physics Dual LERP Cursor (Desktop Only) -->
    <div id="cursor-dot"></div>
    <div id="cursor-ring"></div>

    <!-- Preloader Screen (Exact v5 Architecture) -->
    <div id="loader" class="fixed inset-0 z-[100] bg-[#050507] flex flex-col justify-center items-center select-none pointer-events-auto">
        <div class="loader-text font-syne text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter flex overflow-hidden">
            <span class="char opacity-0 translate-y-full inline-block">D</span>
            <span class="char opacity-0 translate-y-full inline-block">E</span>
            <span class="char opacity-0 translate-y-full inline-block">E</span>
            <span class="char opacity-0 translate-y-full inline-block">K</span>
            <span class="char opacity-0 translate-y-full inline-block">S</span>
            <span class="char opacity-0 translate-y-full inline-block">H</span>
            <span class="char opacity-0 translate-y-full inline-block">I</span>
            <span class="char opacity-0 translate-y-full inline-block">T</span>
            <span class="char opacity-0 translate-y-full inline-block">H</span>
            <span class="char opacity-0 translate-y-full inline-block text-[#ccff00]">.</span>
        </div>
        <div class="w-56 max-w-[70vw] h-[2px] bg-white/20 mt-6 relative overflow-hidden rounded-full">
            <div id="loader-progress" class="absolute top-0 left-0 h-full w-0 bg-[#ccff00]"></div>
        </div>
        <p class="font-mono text-xs text-gray-400 mt-4 tracking-widest uppercase">Loading portfolio...</p>
    </div>

    <!-- 10,000 Particle Morphing WebGL Background (v8.5 Engine) -->
    <canvas id="webgl-canvas"></canvas>
    <div class="vignette-overlay"></div>

    <!-- Main UI Content Layer -->
    <div id="ui-layer" class="relative z-10 w-full opacity-0">

        <!-- Sticky Navigation Bar -->
        <nav id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-8 md:px-16 lg:px-6 xl:px-16 py-4 md:py-5 flex justify-between items-center pointer-events-none">
            
            <a href="#" class="flex items-center gap-2.5 sm:gap-3 pointer-events-auto hoverable group mix-diff">
                <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ccff00] group-hover:scale-125 transition-transform"></div>
                <span class="font-syne font-extrabold text-[11px] sm:text-lg lg:text-lg xl:text-xl tracking-[0.12em] sm:tracking-wider text-white uppercase whitespace-nowrap">
                    DEEKSHITH<span class="text-[#ccff00]"> // D33</span>
                </span>
            </a>

            <!-- Desktop Nav Links -->
            <div class="hidden lg:flex items-center gap-4 xl:gap-8 glass-panel px-5 xl:px-6 py-2.5 rounded-full border border-white/10 pointer-events-auto text-xs font-mono tracking-wider uppercase text-white/70">
                <a href="#about" class="hoverable hover:text-[#ccff00] transition-colors">About</a>
                <a href="#horizontal-work" class="hoverable hover:text-[#ccff00] transition-colors">Projects</a>
                <a href="#capabilities" class="hoverable hover:text-[#ccff00] transition-colors">Skills</a>
                <a href="#credentials" class="hoverable hover:text-[#ccff00] transition-colors">Credentials</a>
                <a href="#contact" class="hoverable hover:text-[#ccff00] transition-colors">Contact</a>
            </div>

            <!-- Nav Actions & Mobile Menu Toggle -->
            <div class="flex items-center gap-2 sm:gap-3 pointer-events-auto mix-diff flex-shrink-0">
                <button id="nav-terminal-btn" aria-label="Open terminal" class="hoverable px-2.5 min-[380px]:px-3 sm:px-3.5 py-1.5 rounded-full border border-white/20 glass-panel hover:border-[#ccff00] text-[10px] sm:text-xs font-mono tracking-wider text-white/80 hover:text-[#ccff00] transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                    <i data-lucide="terminal" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ccff00]"></i>
                    <span class="hidden min-[380px]:inline">Terminal</span>
                </button>
                <a href="resume.pdf" target="_blank" rel="noopener noreferrer" class="hoverable hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#ccff00] text-black font-syne font-bold text-xs tracking-wider uppercase hover:bg-white transition-all">
                    <span>Resume</span>
                    <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
                </a>
                <button id="mobileMenuBtn" class="lg:hidden hoverable p-2 rounded-xl glass-panel border border-white/15 text-white flex items-center justify-center">
                    <i data-lucide="menu" class="w-4 h-4"></i>
                </button>
            </div>
        </nav>

        <!-- Mobile Navigation Menu Drawer -->
        <div id="mobileMenu" class="fixed top-16 left-4 right-4 z-50 glass-panel p-6 rounded-2xl border border-white/15 flex-col gap-4 font-mono text-xs uppercase tracking-wider hidden lg:hidden shadow-2xl">
            <a href="#about" class="mobile-nav-link py-2 text-white/80 hover:text-[#ccff00] transition-colors flex items-center justify-between border-b border-white/5">
                <span>01 // About</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-white/30"></i>
            </a>
            <a href="#horizontal-work" class="mobile-nav-link py-2 text-white/80 hover:text-[#ccff00] transition-colors flex items-center justify-between border-b border-white/5">
                <span>02 // Projects</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-white/30"></i>
            </a>
            <a href="#capabilities" class="mobile-nav-link py-2 text-white/80 hover:text-[#ccff00] transition-colors flex items-center justify-between border-b border-white/5">
                <span>03 // Skills</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-white/30"></i>
            </a>
            <a href="#credentials" class="mobile-nav-link py-2 text-white/80 hover:text-[#ccff00] transition-colors flex items-center justify-between border-b border-white/5">
                <span>04 // Credentials</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-white/30"></i>
            </a>
            <a href="#contact" class="mobile-nav-link py-2 text-white/80 hover:text-[#ccff00] transition-colors flex items-center justify-between">
                <span>05 // Contact</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-white/30"></i>
            </a>
            <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                <a href="resume.pdf" target="_blank" rel="noopener noreferrer" class="w-full text-center py-2.5 rounded-xl bg-[#ccff00] text-black font-syne font-bold text-xs tracking-wider uppercase">
                    View Resume (PDF)
                </a>
            </div>
        </div>

        <!-- ================= HERO SECTION (v5 Exact Kinetic Animation & Typography) ================= -->
        <section id="hero" class="min-h-[100dvh] w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 pt-28 sm:pt-24 pb-20 relative text-center">
            <!-- Legibility scrim: darkens the particle field behind the hero copy -->
            <div aria-hidden="true" class="hero-scrim"></div>
            <div class="max-w-6xl mx-auto w-full flex flex-col items-center justify-center z-10">
                
                <!-- Status Pill -->
                <div class="inline-flex items-center justify-center gap-2 sm:gap-3 max-w-[94vw] sm:max-w-none px-4 py-2 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/[0.07] backdrop-blur-sm text-[#ccff00] text-[9px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-widest leading-relaxed mb-7 sm:mb-8 hero-elem">
                    <span class="relative flex h-2 w-2 flex-shrink-0">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]"></span>
                    </span>
                    <span>Open to AI Security &amp; Penetration Testing Roles</span>
                </div>

                <!-- Massive Kinetic Display Headline (Exact v5 kinetic reveal) -->
                <h1 class="font-syne font-extrabold text-[clamp(1.85rem,9.4vw,10rem)] leading-[0.92] tracking-tighter uppercase mb-7 sm:mb-9 text-center">
                    <div class="overflow-hidden"><span class="hero-line block translate-y-full text-white">AI-Driven</span></div>
                    <div class="overflow-hidden"><span class="hero-line block translate-y-full text-outline hoverable cursor-pointer">Security</span></div>
                </h1>

                <!-- Subheadline & Mission Statement -->
                <p class="fluid-body-text text-white/85 max-w-xl mx-auto font-normal leading-relaxed mb-7 hero-elem text-center px-1">
                    Hi, I'm <span class="text-white font-medium">Deekshith (D33)</span> — a CPENT-certified security engineer and AI builder in Bangalore. I build agent harnesses, MCP servers, and automations, then test them the way a real attacker would.
                </p>

                <!-- CPENT + Credential Badges -->
                <div class="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-10 hero-elem">
                    <!-- CPENT Badge -->
                    <a href="#credentials" aria-label="EC-Council CPENT certified — view credentials" class="flex items-center gap-2 px-4 py-2 rounded-full border border-[#ccff00]/40 bg-[#050507]/60 backdrop-blur-md shadow-lg shadow-[#ccff00]/10 hover:border-[#ccff00]/80 transition-colors">
                        <svg class="w-3.5 h-3.5 text-[#ccff00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                        <span class="font-mono text-[10px] sm:text-xs text-[#ccff00] uppercase tracking-widest font-bold">CPENT Certified</span>
                        <span class="font-mono text-[9px] text-[#ccff00]/60 uppercase">· EC-Council</span>
                    </a>
                    <!-- AI Engineering Badge -->
                    <div class="flex items-center gap-2 px-4 py-2 rounded-full border border-[#a78bfa]/40 bg-[#050507]/60 backdrop-blur-md shadow-lg shadow-[#a78bfa]/10">
                        <i data-lucide="brain-circuit" class="w-3.5 h-3.5 text-[#a78bfa] flex-shrink-0"></i>
                        <span class="font-mono text-[10px] sm:text-xs text-[#a78bfa] uppercase tracking-widest font-bold">AI Engineering</span>
                        <span class="font-mono text-[9px] text-[#a78bfa]/60 uppercase">· Agents &amp; MCP</span>
                    </div>
                    <!-- TryHackMe Badge -->
                    <div class="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C11111]/40 bg-[#050507]/60 backdrop-blur-md shadow-lg shadow-[#C11111]/10">
                        <img src="assets/icons/tryhackme-C11111.svg" alt="THM" class="w-3.5 h-3.5 flex-shrink-0" />
                        <span class="font-mono text-[10px] sm:text-xs text-[#ff6b6b] uppercase tracking-widest font-bold">TryHackMe Top 2%</span>
                        <span class="font-mono text-[9px] text-[#ff6b6b]/60 uppercase">· 100+ Day Streak</span>
                    </div>
                    <!-- Ethical Hacker Badge -->
                    <div class="hidden min-[380px]:flex items-center gap-2 px-4 py-2 rounded-full border border-[#1BA0D7]/40 bg-[#050507]/60 backdrop-blur-md shadow-lg shadow-[#1BA0D7]/10">
                        <img src="assets/icons/cisco-1BA0D7.svg" alt="Cisco" class="w-3.5 h-3.5 flex-shrink-0" />
                        <span class="font-mono text-[10px] sm:text-xs text-[#1BA0D7] uppercase tracking-widest font-bold">Ethical Hacker</span>
                        <span class="font-mono text-[9px] text-[#1BA0D7]/60 uppercase">· Cisco</span>
                    </div>
                </div>

                <!-- Action CTA Buttons (Centered) -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto hero-elem">
                    <div class="magnetic-wrap hoverable w-full sm:w-auto">
                        <div class="magnetic-area"></div>
                        <a href="#horizontal-work" class="magnetic-content w-full sm:w-auto text-center px-6 sm:px-8 py-4 rounded-full bg-[#ccff00] text-black font-syne font-bold text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/20 whitespace-nowrap">
                            <span>View Selected Projects</span>
                            <i data-lucide="arrow-down-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                    
                    <a href="#about" class="hoverable w-full sm:w-auto text-center px-6 py-4 rounded-full glass-panel border border-white/20 text-xs font-mono tracking-wider uppercase text-white/80 hover:text-white hover:border-white transition-all flex items-center justify-center gap-2">
                        <i data-lucide="shield" class="w-4 h-4 text-[#06b6d4]"></i>
                        <span>About Me</span>
                    </a>
                </div>

            </div>

            <!-- Centered Scroll Indicator -->
            <div class="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] text-white/50 tracking-widest uppercase hero-elem">
                <span>Scroll to explore</span>
                <div class="w-[1px] h-10 bg-white/20 relative overflow-hidden">
                    <div class="w-full h-full bg-[#ccff00] absolute top-0 left-0 -translate-y-full animate-[scroll_2s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </section>

        <!-- ================= SYSTEM MANIFESTO SECTION (Scroll Phase 1: Morph to Helix) ================= -->
        <section id="about" class="min-h-screen w-full py-24 sm:py-32 px-4 sm:px-8 md:px-16 relative flex items-center">
            <div class="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
                
                <div class="lg:col-span-5 space-y-4">
                    <p class="font-mono text-xs text-[#ccff00] tracking-widest uppercase mb-2">[ PROFILE // 01 ]</p>
                    <h2 class="font-syne text-2xl sm:text-3xl lg:text-[2.15rem] xl:text-[2.45rem] font-extrabold uppercase tracking-tight leading-[1.1]">
                        Security <br><span class="text-white/40">in Practice.</span>
                    </h2>
                    <div class="font-mono text-xs text-white/50 space-y-2 border-l-2 border-[#ccff00]/40 pl-4 mt-6">
                        <p>> FOCUS: AI Security &amp; Offensive Engineering</p>
                        <p>> BUILDS: Agent harnesses · MCP servers · Copilots</p>
                        <p>> BASED IN: Bangalore, India</p>
                        <p>> CERTIFIED: CPENT · EC-Council</p>
                        <p>> EDUCATION: B.Tech CSE · UVCE, Bangalore</p>
                    </div>
                </div>

                <div class="lg:col-span-7">
                    <div class="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border border-white/15 relative overflow-hidden group">
                        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ccff00] to-transparent opacity-60"></div>
                        
                        <p class="text-lg sm:text-xl md:text-2xl text-white font-normal leading-relaxed mb-6">
                            "Find the weakness before someone else does."
                        </p>
                        <p class="text-sm sm:text-base text-white/90 font-light leading-relaxed mb-8">
                            I build AI systems and then try to break them. Day to day that means custom agent harnesses, MCP servers, automations, and copilots — shipped to production with real attention to token cost and model efficiency — alongside penetration testing, red teaming, and secure-by-design review of everything I help ship.
                        </p>

                        <!-- Tech Badges -->
                        <div class="flex flex-wrap gap-2.5 pt-6 border-t border-white/10 font-mono text-[11px] text-white/75">
                            <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hoverable hover:bg-white hover:text-black transition-colors">Kali Linux</span>
                            <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hoverable hover:bg-white hover:text-black transition-colors">Burp Suite</span>
                            <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hoverable hover:bg-white hover:text-black transition-colors">LLM Agents</span>
                            <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hoverable hover:bg-white hover:text-black transition-colors">MCP Servers</span>
                            <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hoverable hover:bg-white hover:text-black transition-colors">Python</span>
                            <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hoverable hover:bg-white hover:text-black transition-colors">RAG Pipelines</span>
                            <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hoverable hover:bg-white hover:text-black transition-colors">AI Red Teaming</span>
                            <span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hoverable hover:bg-white hover:text-black transition-colors">AWS / GCP</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- ================= HORIZONTAL PINNED SHOWCASE SECTION (Fluid Auto-Adjusting Widths) ================= -->
        <section id="horizontal-work" class="relative overflow-hidden bg-black/40 backdrop-blur-sm border-t border-b border-white/10">
            <div id="horizontal-track-container" class="min-h-screen h-[100dvh] w-full flex items-center overflow-hidden py-6 sm:py-8">
                
                <div id="horizontal-track" class="flex gap-10 sm:gap-14 md:gap-20 px-8 sm:px-16 md:px-28 items-center flex-nowrap will-change-transform">
                    
                    <!-- Showcase Intro Card -->
                    <div class="showcase-intro-card flex flex-col justify-center pr-6 sm:pr-10 flex-shrink-0">
                        <p class="text-[#ccff00] font-mono text-xs uppercase tracking-widest mb-3">[ 02 // SELECTED WORK ]</p>
                        <h2 class="font-syne text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold uppercase tracking-tight leading-[1.1] mb-4 sm:mb-6">
                            Selected <br><span class="text-outline text-[#ccff00]">Projects</span>
                        </h2>
                        <p class="text-white/60 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-light">
                            Case studies in penetration testing, security engineering, and applied cryptography. Scroll sideways to browse the work.
                        </p>
                        <div class="flex items-center gap-3 text-xs font-mono text-[#ccff00]">
                            <i data-lucide="arrow-right" class="w-4 h-4 animate-pulse"></i>
                            <span>SCROLL TO BROWSE</span>
                        </div>
                    </div>

                    <!-- Project Card 1: E-D--Crypto -->
                    <div class="showcase-card glass-panel p-6 sm:p-7 md:p-8 rounded-3xl border border-white/10 hoverable group transition-all flex flex-col justify-between flex-shrink-0" data-project="crypto" role="button" tabindex="0" aria-label="View project details">
                        <div>
                            <div class="flex justify-between items-center text-xs font-mono mb-3 text-white/50">
                                <span class="text-[#ccff00] font-bold">PROJECT_01 // CRYPTOGRAPHY</span>
                                <span class="text-[10px] sm:text-xs">C • OpenSSL • AES/RSA</span>
                            </div>
                            <div class="h-28 sm:h-32 md:h-36 w-full bg-gradient-to-tr from-[#050507] via-zinc-950 to-black rounded-2xl relative overflow-hidden mb-4 flex items-center justify-center p-4 border border-white/10">
                                <i data-lucide="key-round" class="w-10 h-10 sm:w-12 sm:h-12 text-[#ccff00] group-hover:scale-110 transition-transform duration-500"></i>
                                <div class="absolute bottom-2.5 right-3 font-mono text-[10px] sm:text-xs text-white/40">AES-256-CBC + RSA-2048</div>
                            </div>
                            <h3 class="font-syne text-xl sm:text-2xl font-extrabold uppercase text-white group-hover:text-[#ccff00] transition-colors leading-tight mb-2">E-D-Crypto Utility</h3>
                            <p class="text-white/85 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-3">
                                C-based file encryption built on OpenSSL: AES-256-CBC payload encryption, RSA-2048 key exchange, and SHA-256 integrity checks.
                            </p>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/10 font-mono text-xs">
                            <div class="flex gap-1.5 sm:gap-2 text-[10px]">
                                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">C</span>
                                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00]">OpenSSL</span>
                            </div>
                            <span class="text-white/60 hover:text-white flex items-center gap-1 text-[11px]">
                                View Details <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                            </span>
                        </div>
                    </div>

                    <!-- Project Card 2: Perimeter Defense & SIEM -->
                    <div class="showcase-card glass-panel p-6 sm:p-7 md:p-8 rounded-3xl border border-white/10 hoverable group transition-all flex flex-col justify-between flex-shrink-0" data-project="siem" role="button" tabindex="0" aria-label="View project details">
                        <div>
                            <div class="flex justify-between items-center text-xs font-mono mb-3 text-white/50">
                                <span class="text-[#06b6d4] font-bold">PROJECT_02 // NETWORK SECURITY</span>
                                <span class="text-[10px] sm:text-xs">IDS / SIEM PIPELINE</span>
                            </div>
                            <div class="h-28 sm:h-32 md:h-36 w-full bg-gradient-to-tr from-[#050507] via-cyan-950/30 to-black rounded-2xl relative overflow-hidden mb-4 flex items-center justify-center p-4 border border-white/10">
                                <i data-lucide="shield-alert" class="w-10 h-10 sm:w-12 sm:h-12 text-[#06b6d4] group-hover:scale-110 transition-transform duration-500"></i>
                                <div class="absolute bottom-2.5 right-3 font-mono text-[10px] sm:text-xs text-white/40">ELK Stack + Zero Trust</div>
                            </div>
                            <h3 class="font-syne text-xl sm:text-2xl font-extrabold uppercase text-white group-hover:text-[#06b6d4] transition-colors leading-tight mb-2">Zero-Trust Network Design</h3>
                            <p class="text-white/85 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-3">
                                Redesigned a segmented, zero-trust network for a cryptocurrency exchange, adding DMZ isolation and continuous threat monitoring with the ELK Stack.
                            </p>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/10 font-mono text-xs">
                            <div class="flex gap-1.5 sm:gap-2 text-[10px]">
                                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Suricata</span>
                                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4]">ELK Stack</span>
                            </div>
                            <span class="text-white/60 hover:text-white flex items-center gap-1 text-[11px]">
                                View Details <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                            </span>
                        </div>
                    </div>

                    <!-- Project Card 3: Automated Security Audit -->
                    <div class="showcase-card glass-panel p-6 sm:p-7 md:p-8 rounded-3xl border border-white/10 hoverable group transition-all flex flex-col justify-between flex-shrink-0" data-project="sast" role="button" tabindex="0" aria-label="View project details">
                        <div>
                            <div class="flex justify-between items-center text-xs font-mono mb-3 text-white/50">
                                <span class="text-purple-400 font-bold">PROJECT_03 // SECURITY REVIEW</span>
                                <span class="text-[10px] sm:text-xs">SAST / DAST PIPELINE</span>
                            </div>
                            <div class="h-28 sm:h-32 md:h-36 w-full bg-gradient-to-tr from-[#050507] via-purple-950/30 to-black rounded-2xl relative overflow-hidden mb-4 flex items-center justify-center p-4 border border-white/10">
                                <i data-lucide="scan-search" class="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 group-hover:scale-110 transition-transform duration-500"></i>
                                <div class="absolute bottom-2.5 right-3 font-mono text-[10px] sm:text-xs text-white/40">SAST + DAST + SDLC</div>
                            </div>
                            <h3 class="font-syne text-xl sm:text-2xl font-extrabold uppercase text-white group-hover:text-purple-400 transition-colors leading-tight mb-2">Security Assessment</h3>
                            <p class="text-white/85 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-3">
                                Ran a security audit that embedded SAST and DAST checks into the CI/CD pipeline, catching insecure code before it reached production.
                            </p>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/10 font-mono text-xs">
                            <div class="flex gap-1.5 sm:gap-2 text-[10px]">
                                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">Python</span>
                                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">OWASP ZAP</span>
                            </div>
                            <span class="text-white/60 hover:text-white flex items-center gap-1 text-[11px]">
                                View Details <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                            </span>
                        </div>
                    </div>

                    <!-- Project Card 4: Data Stream Masking -->
                    <div class="showcase-card glass-panel p-6 sm:p-7 md:p-8 rounded-3xl border border-white/10 hoverable group transition-all flex flex-col justify-between flex-shrink-0" data-project="stream" role="button" tabindex="0" aria-label="View project details">
                        <div>
                            <div class="flex justify-between items-center text-xs font-mono mb-3 text-white/50">
                                <span class="text-[#ccff00] font-bold">PROJECT_04 // DATA PROTECTION</span>
                                <span class="text-[10px] sm:text-xs">ZERO-COPY C++20</span>
                            </div>
                            <div class="h-28 sm:h-32 md:h-36 w-full bg-gradient-to-tr from-[#050507] via-zinc-950 to-black rounded-2xl relative overflow-hidden mb-4 flex items-center justify-center p-4 border border-white/10">
                                <i data-lucide="binary" class="w-10 h-10 sm:w-12 sm:h-12 text-[#ccff00] group-hover:scale-110 transition-transform duration-500"></i>
                                <div class="absolute bottom-2.5 right-3 font-mono text-[10px] sm:text-xs text-white/40">C++ + AES/RSA</div>
                            </div>
                            <h3 class="font-syne text-xl sm:text-2xl font-extrabold uppercase text-white group-hover:text-[#ccff00] transition-colors leading-tight mb-2">Data Security Framework</h3>
                            <p class="text-white/85 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-3">
                                Built a C++ framework for AES/RSA encryption, SHA-256 integrity verification, and data masking to meet regulatory requirements.
                            </p>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/10 font-mono text-xs">
                            <div class="flex gap-1.5 sm:gap-2 text-[10px]">
                                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">C++20</span>
                                <span class="px-2.5 sm:px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00]">Zero-Copy</span>
                            </div>
                            <span class="text-white/60 hover:text-white flex items-center gap-1 text-[11px]">
                                View Details <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ================= CAPABILITIES & SKILLS BREAKDOWN ================= -->
        <section id="capabilities" class="min-h-[100dvh] w-full py-20 sm:py-32 px-4 sm:px-8 md:px-16 relative flex items-center">
            <div class="max-w-6xl mx-auto w-full">
                <div class="mb-10 sm:mb-16">
                    <p class="font-mono text-xs text-[#ccff00] tracking-widest uppercase mb-3">[ CAPABILITIES // 03 ]</p>
                    <h2 class="font-syne fluid-section-title font-extrabold uppercase tracking-tight">Technical Skills</h2>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable group">
                        <i data-lucide="workflow" class="w-7 h-7 sm:w-8 sm:h-8 text-[#a78bfa] mb-4 sm:mb-6 group-hover:scale-110 transition-transform"></i>
                        <h4 class="font-syne text-lg sm:text-xl font-bold uppercase mb-2">AI Engineering</h4>
                        <p class="text-xs text-white/85 font-light leading-relaxed mb-4">Custom agent harnesses, MCP servers, multi-agent automations, copilots, and RAG pipelines — tuned for token cost and model efficiency.</p>
                        <div class="font-mono text-[9px] text-[#a78bfa]">&gt; FOCUS: AGENTS · MCP · TOKEN OPTIMIZATION</div>
                    </div>

                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable group">
                        <i data-lucide="scan-eye" class="w-7 h-7 sm:w-8 sm:h-8 text-rose-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform"></i>
                        <h4 class="font-syne text-lg sm:text-xl font-bold uppercase mb-2">AI Security</h4>
                        <p class="text-xs text-white/85 font-light leading-relaxed mb-4">LLM red teaming, prompt injection, jailbreak and guardrail bypass, AI-assisted offensive security, and pentest-gated production delivery.</p>
                        <div class="font-mono text-[9px] text-rose-400">&gt; FOCUS: LLM RED TEAMING &amp; GUARDRAILS</div>
                    </div>

                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable group">
                        <i data-lucide="shield-check" class="w-7 h-7 sm:w-8 sm:h-8 text-[#06b6d4] mb-4 sm:mb-6 group-hover:scale-110 transition-transform"></i>
                        <h4 class="font-syne text-lg sm:text-xl font-bold uppercase mb-2">Offensive Security</h4>
                        <p class="text-xs text-white/85 font-light leading-relaxed mb-4">Penetration testing, web app and network exploitation, Active Directory attacks, social engineering, and red team operations.</p>
                        <div class="font-mono text-[9px] text-[#06b6d4]">&gt; FOCUS: WEB, NETWORK &amp; ACTIVE DIRECTORY</div>
                    </div>

                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable group">
                        <i data-lucide="lock" class="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform"></i>
                        <h4 class="font-syne text-lg sm:text-xl font-bold uppercase mb-2">Defensive Security</h4>
                        <p class="text-xs text-white/85 font-light leading-relaxed mb-4">SIEM &amp; log analysis, incident response, digital forensics, malware analysis, threat intelligence, and vulnerability assessment.</p>
                        <div class="font-mono text-[9px] text-purple-400">&gt; FOCUS: SIEM, FORENSICS &amp; RESPONSE</div>
                    </div>

                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable group">
                        <i data-lucide="cpu" class="w-7 h-7 sm:w-8 sm:h-8 text-[#ccff00] mb-4 sm:mb-6 group-hover:scale-110 transition-transform"></i>
                        <h4 class="font-syne text-lg sm:text-xl font-bold uppercase mb-2">Programming</h4>
                        <p class="text-xs text-white/85 font-light leading-relaxed mb-4">Python, Bash, JavaScript, C/C++, x86 Assembly, PowerShell, SQL.</p>
                        <div class="font-mono text-[9px] text-[#ccff00]">&gt; FOCUS: PYTHON, C/C++ &amp; ASSEMBLY</div>
                    </div>

                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable group">
                        <i data-lucide="server" class="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform"></i>
                        <h4 class="font-syne text-lg sm:text-xl font-bold uppercase mb-2">Tools &amp; Platforms</h4>
                        <p class="text-xs text-white/85 font-light leading-relaxed mb-4">Kali Linux, Burp Suite, Metasploit, Nmap, Wireshark, ELK Stack, Docker, Kubernetes, Ligolo-ng, BeEF, Evilginx, Hashcat.</p>
                        <div class="font-mono text-[9px] text-emerald-400">&gt; FOCUS: DAILY SECURITY TOOLCHAIN</div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ================= VERIFIED TACTICAL MATRIX ================= -->
        <!-- ================= CERTIFICATIONS & CREDENTIALS SECTION ================= -->
        <section id="credentials" class="w-full py-20 sm:py-32 px-4 sm:px-8 md:px-16 relative">
            <div class="max-w-6xl mx-auto w-full">
                <div class="mb-10 sm:mb-16">
                    <p class="font-mono text-xs text-[#ccff00] tracking-widest uppercase mb-3">[ CREDENTIALS // 04 ]</p>
                    <h2 class="font-syne fluid-section-title font-extrabold uppercase tracking-tight">Credentials</h2>
                </div>

                <!-- Stats Row -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <div class="stat-card glass-panel rounded-2xl p-3 sm:p-4 lg:p-5 text-center border border-white/10">
                        <div class="font-syne stat-value font-extrabold text-[#ccff00]">10+</div>
                        <div class="font-mono text-[10px] text-white/50 mt-1 uppercase tracking-widest">Certifications</div>
                    </div>
                    <div class="stat-card glass-panel rounded-2xl p-3 sm:p-4 lg:p-5 text-center border border-white/10">
                        <div class="font-syne stat-value font-extrabold text-[#06b6d4]">1000+</div>
                        <div class="font-mono text-[10px] text-white/50 mt-1 uppercase tracking-widest">CTF Flags Captured</div>
                    </div>
                    <div class="stat-card glass-panel rounded-2xl p-3 sm:p-4 lg:p-5 text-center border border-white/10">
                        <div class="font-syne stat-value font-extrabold text-purple-400">Top 2%</div>
                        <div class="font-mono text-[10px] text-white/50 mt-1 uppercase tracking-widest">TryHackMe Rank</div>
                    </div>
                    <div class="stat-card glass-panel rounded-2xl p-3 sm:p-4 lg:p-5 text-center border border-white/10">
                        <div class="font-syne stat-value font-extrabold text-amber-400">5+</div>
                        <div class="font-mono text-[10px] text-white/50 mt-1 uppercase tracking-widest">Projects</div>
                    </div>
                </div>

                <!-- CPENT highlight -->
                <div class="glass-panel rounded-2xl border border-[#ccff00]/30 bg-[#ccff00]/[0.04] p-5 sm:p-6 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center gap-4 shadow-lg shadow-[#ccff00]/5">
                    <div class="w-11 h-11 rounded-xl bg-[#ccff00]/15 border border-[#ccff00]/30 flex items-center justify-center flex-shrink-0">
                        <i data-lucide="trophy" class="w-5 h-5 text-[#ccff00]"></i>
                    </div>
                    <div>
                        <p class="font-syne text-sm font-bold uppercase tracking-wide text-white">CPENT — passed during B.Tech</p>
                        <p class="font-mono text-[10px] sm:text-[11px] text-white/60 mt-1 leading-relaxed">Self-studied with no access to EC-Council's official practice range. Exam voucher awarded through the Hackers4Humanity program.</p>
                    </div>
                </div>

                <!-- Certifications Grid with Logos -->
                <div class="mb-6">
                    <p class="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">> CERTIFICATIONS</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">

                    <!-- CPENT — Flagship Certification -->
                    <div class="glass-panel p-5 rounded-2xl border border-[#ccff00]/40 bg-[#ccff00]/[0.04] hoverable group flex items-center gap-4 relative overflow-hidden shadow-lg shadow-[#ccff00]/10">
                        <div class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#ccff00] to-transparent"></div>
                        <div class="w-12 h-12 rounded-xl bg-[#ccff00]/15 border border-[#ccff00]/30 flex items-center justify-center flex-shrink-0">
                            <svg class="w-7 h-7 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h4 class="font-syne text-sm font-bold uppercase">CPENT</h4>
                                <span class="font-mono text-[8px] uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/30 rounded px-1.5 py-0.5">Flagship</span>
                            </div>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">Certified Penetration Testing Professional</p>
                            <p class="font-mono text-[9px] text-[#ccff00]/70 mt-0.5">EC-Council</p>
                        </div>
                    </div>

                    <!-- TryHackMe -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#C11111]/10 border border-[#C11111]/20 flex items-center justify-center flex-shrink-0">
                            <img src="assets/icons/tryhackme-C11111.svg" alt="TryHackMe" class="w-7 h-7" />
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Jr Penetration Tester</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">TryHackMe</p>
                        </div>
                    </div>

                    <!-- TryHackMe Pre -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#C11111]/10 border border-[#C11111]/20 flex items-center justify-center flex-shrink-0">
                            <img src="assets/icons/tryhackme-C11111.svg" alt="TryHackMe" class="w-7 h-7" />
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Pre Security Path</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">TryHackMe</p>
                        </div>
                    </div>

                    <!-- IIT Guwahati -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-7 h-7 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Cybersecurity Course</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">IIT Guwahati</p>
                        </div>
                    </div>

                    <!-- Cisco Ethical Hacker -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#005073]/30 border border-[#005073]/40 flex items-center justify-center flex-shrink-0">
                            <img src="assets/icons/cisco-1BA0D7.svg" alt="Cisco" class="w-7 h-7" />
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Ethical Hacker</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">Cisco</p>
                        </div>
                    </div>

                    <!-- Cisco Essentials -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#005073]/30 border border-[#005073]/40 flex items-center justify-center flex-shrink-0">
                            <img src="assets/icons/cisco-1BA0D7.svg" alt="Cisco" class="w-7 h-7" />
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Cybersecurity Essentials</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">Cisco Networking Academy</p>
                        </div>
                    </div>

                    <!-- Deloitte -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#86BC25]/10 border border-[#86BC25]/20 flex items-center justify-center flex-shrink-0">
                            <span class="font-syne font-extrabold text-[#86BC25] text-xs leading-tight text-center">Deloitte</span>
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Cyber Job Simulation</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">Deloitte Australia</p>
                        </div>
                    </div>

                    <!-- TCS -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#214496]/20 border border-[#214496]/30 flex items-center justify-center flex-shrink-0">
                            <span class="font-syne font-extrabold text-[#214496] text-sm">TCS</span>
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Cybersecurity Analyst (IAM)</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">TCS (Virtual Training)</p>
                        </div>
                    </div>

                    <!-- IISc -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-7 h-7 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Ethical Hacking</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">Indian Institute of Science (IISc)</p>
                        </div>
                    </div>

                    <!-- OPSWAT -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#d12027]/10 border border-[#d12027]/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-7 h-7 text-[#d12027]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Critical Infrastructure</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">OPSWAT Academy</p>
                        </div>
                    </div>

                    <!-- Docker -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#2496ED]/10 border border-[#2496ED]/20 flex items-center justify-center flex-shrink-0">
                            <img src="assets/icons/docker-2496ED.svg" alt="Docker" class="w-7 h-7" />
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">MARVEL Level 3</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">MARVEL, UVCE</p>
                        </div>
                    </div>

                    <!-- CTF Trophies -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-7 h-7 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V18H9v2h6v-2h-2v-2.1a5.01 5.01 0 003.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">CTF Champion</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">PBCTF 4.0 · IDEEEEAS · Triwizard</p>
                        </div>
                    </div>

                    <!-- Positive Technologies -->
                    <div class="glass-panel p-5 rounded-2xl border border-white/10 hoverable group flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-[#22d3ee]/10 border border-[#22d3ee]/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-7 h-7 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                        </div>
                        <div>
                            <h4 class="font-syne text-sm font-bold uppercase">Positive Hack Talks</h4>
                            <p class="font-mono text-[10px] text-white/50 mt-0.5">Positive Technologies, Bengaluru</p>
                        </div>
                    </div>

                </div>

                <!-- Experience Timeline -->
                <div class="mb-6">
                    <p class="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">> FIELD EXPERIENCE</p>
                </div>
                <div class="space-y-4">

                    <!-- Experience 1 -->
                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable">
                        <div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-5 h-5 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                </div>
                                <div>
                                    <h4 class="font-syne text-base sm:text-lg font-bold uppercase">Cybersecurity Intern</h4>
                                    <p class="font-mono text-[10px] text-[#ccff00] mt-0.5">HUMAN INITIALS</p>
                                </div>
                            </div>
                            <span class="font-mono text-[10px] px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00]">2025</span>
                        </div>
                        <p class="text-xs sm:text-sm text-white/90 font-light leading-relaxed mb-4">Reduced attack surface across enterprise networks by running vulnerability scans, assessing security posture, and supporting incident-response work with cross-functional teams.</p>
                        <div class="flex flex-wrap gap-2 font-mono text-[10px]">
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">Threat Analysis</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">Vulnerability Assessment</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">Incident Response</span>
                        </div>
                    </div>

                    <!-- Experience 2 -->
                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable">
                        <div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-5 h-5 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                </div>
                                <div>
                                    <h4 class="font-syne text-base sm:text-lg font-bold uppercase">Core Member, MARVEL</h4>
                                    <p class="font-mono text-[10px] text-[#06b6d4] mt-0.5">Cloud &amp; Cybersecurity · UVCE Bangalore</p>
                                </div>
                            </div>
                            <span class="font-mono text-[10px] px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4]">ACTIVE</span>
                        </div>
                        <p class="text-xs sm:text-sm text-white/90 font-light leading-relaxed mb-4">Core member of MARVEL's syllabus and task-design team at UVCE. Graduated from the Level 3 Cloud & Cybersecurity path, and now researches cloud security architecture while building security tooling and hands-on labs.</p>
                        <div class="flex flex-wrap gap-2 font-mono text-[10px]">
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">L3 Path</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">Task Design</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">Research</span>
                        </div>
                    </div>

                    <!-- Experience 3: Independent Security Researcher -->
                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable">
                        <div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                </div>
                                <div>
                                    <h4 class="font-syne text-base sm:text-lg font-bold uppercase">Independent Security Researcher</h4>
                                    <p class="font-mono text-[10px] text-red-400 mt-0.5">Private engagement · NDA</p>
                                </div>
                            </div>
                            <span class="font-mono text-[10px] px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">Mar – May 2025</span>
                        </div>
                        <p class="text-xs sm:text-sm text-white/90 font-light leading-relaxed mb-4">Invited as the sole researcher to a private vulnerability-testing engagement. Found 8 issues — 1 critical, 1 high, 2 medium, and 4 low — through manual testing. Client and target details remain under NDA.</p>
                        <div class="flex flex-wrap gap-2 font-mono text-[10px]">
                            <span class="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">1 Critical</span>
                            <span class="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">1 High</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">NDA</span>
                        </div>
                    </div>

                    <!-- Experience 4: H4CKING Workshop Facilitator -->
                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable">
                        <div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-5 h-5 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                                </div>
                                <div>
                                    <h4 class="font-syne text-base sm:text-lg font-bold uppercase">Cybersecurity Workshop Facilitator</h4>
                                    <p class="font-mono text-[10px] text-[#ccff00] mt-0.5">H4CKING 2025 · UVCE &amp; Sarvodaya College</p>
                                </div>
                            </div>
                            <span class="font-mono text-[10px] px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00]">2025</span>
                        </div>
                        <p class="text-xs sm:text-sm text-white/90 font-light leading-relaxed mb-4">Ran a four-session ethical hacking workshop at UVCE (about 160 attendees) and a security-awareness session at Sarvodaya Pre-University College (about 100). Built and published a <a href="https://h4cking-certificate-verification.vercel.app" target="_blank" rel="noopener noreferrer" class="text-[#ccff00] hover:underline">certificate verification platform</a> for participants, and demonstrated BadUSB and rogue access-point attacks on Raspberry Pi hardware.</p>
                        <div class="flex flex-wrap gap-2 font-mono text-[10px]">
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">260+ Attendees</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">BadUSB Demo</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">4 Sessions</span>
                        </div>
                    </div>

                    <!-- Experience 5: AWS SBG @ UVCE -->
                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable">
                        <div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-[#FF9900]/10 border border-[#FF9900]/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-5 h-5 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.479.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .406-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.128a.945.945 0 0 1 .32.152.667.667 0 0 1 .2.224.564.564 0 0 1 .063.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.224-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/></svg>
                                </div>
                                <div>
                                    <h4 class="font-syne text-base sm:text-lg font-bold uppercase">AWS SBG — Core Member &amp; Tech Lead</h4>
                                    <p class="font-mono text-[10px] text-[#FF9900] mt-0.5">AWS Student Builder Group · UVCE Bangalore</p>
                                </div>
                            </div>
                            <span class="font-mono text-[10px] px-3 py-1 rounded-full bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900]">ACTIVE</span>
                        </div>
                        <p class="text-xs sm:text-sm text-white/90 font-light leading-relaxed mb-4">Core team member and tech lead of the AWS Student Builder Group at UVCE — running cloud workshops, mentoring project teams, and building on AWS.</p>
                        <div class="flex flex-wrap gap-2 font-mono text-[10px]">
                            <span class="px-2.5 py-1 rounded-full bg-[#FF9900]/10 border border-[#FF9900]/20 text-[#FF9900]">AWS</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">Tech Lead</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">UVCE</span>
                        </div>
                    </div>

                    <!-- Experience 6: Numocity -->
                    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hoverable">
                        <div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-5 h-5 text-[#06b6d4]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                                </div>
                                <div>
                                    <h4 class="font-syne text-base sm:text-lg font-bold uppercase">Factory Data Reconciliation</h4>
                                    <p class="font-mono text-[10px] text-[#06b6d4] mt-0.5">Numocity · Mentor: Sudeep Prasad (VP)</p>
                                </div>
                            </div>
                            <span class="font-mono text-[10px] px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4]">Mar 2026 – Present</span>
                        </div>
                        <p class="text-xs sm:text-sm text-white/90 font-light leading-relaxed mb-4">Working in a five-person team on factory data reconciliation: analyzing production data, identifying anomalies, and building secure, cost-effective pipelines for reliable ingestion.</p>
                        <div class="flex flex-wrap gap-2 font-mono text-[10px]">
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">Data Analysis</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">Secure Pipelines</span>
                            <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">EV Industry</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ================= SOCIAL / CONNECT SECTION ================= -->
        <section class="w-full py-12 px-4 sm:px-8 md:px-16 relative">
            <div class="max-w-6xl mx-auto w-full">
                <p class="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-6">> FIND ME ONLINE</p>
                <div class="flex flex-wrap gap-4">

                    <!-- GitHub -->
                    <a href="https://github.com/28d33" target="_blank" rel="noopener noreferrer" class="glass-panel hoverable px-5 py-3.5 rounded-2xl border border-white/10 flex items-center gap-3 hover:border-white/30 transition-all group">
                        <img src="assets/icons/github-ffffff.svg" alt="GitHub" class="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <div>
                            <div class="font-syne font-bold text-sm">GitHub</div>
                            <div class="font-mono text-[10px] text-white/50">28d33</div>
                        </div>
                    </a>

                    <!-- LinkedIn -->
                    <a href="https://www.linkedin.com/in/d33kshithanand" target="_blank" rel="noopener noreferrer" class="glass-panel hoverable px-5 py-3.5 rounded-2xl border border-white/10 flex items-center gap-3 hover:border-[#0A66C2]/50 transition-all group">
                        <img src="assets/icons/linkedin-ffffff.svg" alt="LinkedIn" class="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <div>
                            <div class="font-syne font-bold text-sm">LinkedIn</div>
                            <div class="font-mono text-[10px] text-white/50">d33kshithanand</div>
                        </div>
                    </a>

                    <!-- TryHackMe -->
                    <a href="https://tryhackme.com/p/28D33" target="_blank" rel="noopener noreferrer" class="glass-panel hoverable px-5 py-3.5 rounded-2xl border border-white/10 flex items-center gap-3 hover:border-[#C11111]/50 transition-all group">
                        <img src="assets/icons/tryhackme-C11111.svg" alt="TryHackMe" class="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <div>
                            <div class="font-syne font-bold text-sm">TryHackMe</div>
                            <div class="font-mono text-[10px] text-white/50">Top 2% Global</div>
                        </div>
                    </a>

                    <!-- Email -->
                    <a href="mailto:d33kshith@proton.me" class="glass-panel hoverable px-5 py-3.5 rounded-2xl border border-white/10 flex items-center gap-3 hover:border-[#6D4AFF]/50 transition-all group">
                        <img src="assets/icons/proton-6D4AFF.svg" alt="ProtonMail" class="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <div>
                            <div class="font-syne font-bold text-sm">ProtonMail</div>
                            <div class="font-mono text-[10px] text-white/50">d33kshith@proton.me</div>
                        </div>
                    </a>

                </div>
            </div>
        </section>

        <!-- ================= CONTACT SECTION (Morph to Vortex) ================= -->
        <section id="contact" class="min-h-[100dvh] w-full flex flex-col justify-center items-center px-4 sm:px-8 py-20 relative">
            <div class="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
                <p class="font-mono text-xs text-[#ccff00] tracking-widest uppercase mb-4 sm:mb-6">[ CONTACT // 05 ]</p>
                
                <div class="magnetic-wrap hoverable w-full">
                    <div class="magnetic-area w-[140%] h-[140%] -left-[20%] -top-[20%]"></div>
                    <a href="mailto:d33kshith@proton.me" class="magnetic-content block text-center">
                        <h2 class="font-syne fluid-hero-title font-extrabold uppercase leading-[0.85] tracking-tighter text-outline hover:text-white transition-all duration-500">
                            LET'S TALK
                        </h2>
                    </a>
                </div>

                <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <button type="button" data-action="copy-email" id="copy-email-btn" class="hoverable px-6 sm:px-8 py-3.5 sm:py-4 rounded-full glass-panel border border-white/20 font-mono text-xs tracking-widest text-white/80 hover:text-white hover:border-[#ccff00] transition-all flex items-center justify-center gap-2">
                        <img src="assets/icons/proton-6D4AFF.svg" alt="ProtonMail" class="w-4 h-4" />
                        <span>d33kshith@proton.me</span>
                    </button>
                    <a href="https://github.com/28d33" target="_blank" rel="noopener noreferrer" class="hoverable px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#ccff00] text-black font-syne font-bold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-2">
                        <img src="assets/icons/github-000000.svg" alt="GitHub" class="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/d33kshithanand" target="_blank" rel="noopener noreferrer" class="hoverable px-6 sm:px-8 py-3.5 sm:py-4 rounded-full glass-panel border border-[#0A66C2]/40 font-syne font-bold text-xs tracking-widest uppercase hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all flex items-center justify-center gap-2">
                        <img src="assets/icons/linkedin-0A66C2.svg" alt="LinkedIn" class="w-4 h-4" />
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>

            <footer class="mt-16 sm:mt-0 sm:absolute sm:bottom-8 w-full px-4 sm:px-8 md:px-16 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-widest gap-3 text-center sm:text-left">
                <p>© 2026 DEEKSHITH (D33). ALL RIGHTS RESERVED.</p>
                <div class="flex gap-5 sm:gap-6 flex-wrap justify-center items-center">
                    <a href="https://github.com/28d33" target="_blank" rel="noopener noreferrer" class="hoverable hover:text-white transition-colors flex items-center gap-1.5">
                        <img src="assets/icons/github-ffffff.svg" alt="GitHub" class="w-3.5 h-3.5 opacity-50 hover:opacity-100 transition-opacity" />GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/d33kshithanand" target="_blank" rel="noopener noreferrer" class="hoverable hover:text-white transition-colors flex items-center gap-1.5">
                        <img src="assets/icons/linkedin-ffffff.svg" alt="LinkedIn" class="w-3.5 h-3.5 opacity-70 hover:opacity-100 transition-opacity" />LinkedIn
                    </a>
                    <a href="https://tryhackme.com/p/28D33" target="_blank" rel="noopener noreferrer" class="hoverable hover:text-white transition-colors flex items-center gap-1.5">
                        <img src="assets/icons/tryhackme-C11111.svg" alt="TryHackMe" class="w-3.5 h-3.5 opacity-70 hover:opacity-100 transition-opacity" />TryHackMe
                    </a>
                </div>
            </footer>

        </section>

    </div>

    <!-- Project Inspection Modal -->
    <div id="project-modal" class="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md hidden items-center justify-center p-4 sm:p-6">
        <div class="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 p-6 sm:p-8 relative">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <span id="modal-tag" class="font-mono text-[10px] px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] uppercase">CRYPTOGRAPHIC SUITE</span>
                    <h3 id="modal-title" class="font-syne text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight mt-3">E-D-Crypto Utility</h3>
                </div>
                <button type="button" data-action="close-modal" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors flex-shrink-0">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
            
            <p id="modal-desc" class="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                C-based file encryption and decryption utility using AES-256-CBC, RSA-2048 (OAEP) key wrapping, and SHA-256 integrity checks through OpenSSL.
            </p>

            <div class="mb-6">
                <div class="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">> TECHNICAL HIGHLIGHTS:</div>
                <ul id="modal-specs" class="font-mono text-xs text-white/80 space-y-1.5 list-disc list-inside">
                    <li>AES-256-CBC file encryption with RSA-2048 (OAEP) key exchange</li>
                    <li>SHA-256 integrity verification for tamper detection</li>
                    <li>OpenSSL EVP interfaces with strict padding validation</li>
                </ul>
            </div>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
                <a id="modal-link" href="https://github.com/28d33" target="_blank" rel="noopener noreferrer" class="px-6 py-2.5 rounded-full bg-[#ccff00] text-black font-syne font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 text-center">
                    <img src="assets/icons/github-000000.svg" alt="" aria-hidden="true" class="w-3.5 h-3.5">
                    <span>View Source Code</span>
                </a>
                <span class="font-mono text-[10px] text-white/40 text-center sm:text-right">STATUS: DEPLOYED</span>
            </div>
        </div>
    </div>

    <!-- Tactical Terminal Drawer -->
    <div id="terminal-drawer" class="fixed bottom-0 right-0 w-full sm:w-[540px] max-w-full h-[360px] sm:h-[400px] z-[120] bg-[#07070a]/95 backdrop-blur-xl border-t sm:border-l border-white/20 transform translate-y-full transition-transform duration-500 ease-in-out flex flex-col font-mono text-xs shadow-2xl">
        <div class="p-3 bg-white/5 border-b border-white/10 flex justify-between items-center select-none">
            <div class="flex items-center gap-2 text-white/70">
                <i data-lucide="terminal" class="w-3.5 h-3.5 text-[#ccff00]"></i>
                <span class="text-[10px] tracking-widest font-bold uppercase truncate">D33 // Terminal</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="hidden sm:inline text-[9px] text-white/40">Press ~ to close</span>
                <button id="close-terminal-btn" class="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white">✕</button>
            </div>
        </div>
        <div id="terminal-logs" class="flex-1 p-4 overflow-y-auto space-y-2 text-[11px] text-white/80 scrollbar-thin whitespace-pre-wrap break-words">
            <div class="text-[#ccff00]">╔════════════════════════════════════════╗<br>║ DEEKSHITH // PORTFOLIO TERMINAL        ║<br>╚════════════════════════════════════════╝</div>
            <div class="text-white/40">Type <span class="text-white font-bold">'help'</span> for available commands.</div>
        </div>
        <div class="p-3 bg-black/40 border-t border-white/10 flex items-center gap-2">
            <span class="text-[#ccff00] font-bold flex-shrink-0">d33@portfolio:~$</span>
            <input id="terminal-input" type="text" class="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs min-w-0" autocomplete="off" spellcheck="false" placeholder="Enter command...">
        </div>
    </div>`;
