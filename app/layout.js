@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Outfit:wght@200;300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Noto Sans KR', 'Outfit', sans-serif;
  background: #050507;
  color: #C8C8D0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection { background: rgba(167,139,250,0.3); color: #fff; }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.2); border-radius: 10px; }

.font-display { font-family: 'Playfair Display', serif; }
.font-en { font-family: 'Outfit', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }

/* ═══ Gradients ═══ */
.text-shine {
  background: linear-gradient(120deg, #E8E4FF 0%, #A78BFA 30%, #7DD3FC 60%, #E8E4FF 100%);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: textShine 8s ease-in-out infinite;
}

@keyframes textShine {
  0%,100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.text-warm {
  background: linear-gradient(135deg, #FCA5A5, #FBBF24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-cool {
  background: linear-gradient(135deg, #A78BFA, #7DD3FC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ═══ Hero ═══ */
.hero-gradient {
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(167,139,250,0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(125,211,252,0.05) 0%, transparent 50%),
    radial-gradient(ellipse 40% 30% at 20% 70%, rgba(251,191,36,0.03) 0%, transparent 50%),
    #050507;
}

.hero-grid {
  background-image:
    linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px);
  background-size: 100px 100px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

/* ═══ Glass ═══ */
.glass {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  backdrop-filter: blur(24px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(167,139,250,0.15);
  transform: translateY(-2px);
  box-shadow: 0 20px 60px -20px rgba(167,139,250,0.08);
}

.glass-strong {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
}

/* ═══ Buttons ═══ */
.btn-primary {
  background: linear-gradient(135deg, #7C3AED, #6D28D9);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #8B5CF6, #7C3AED);
  opacity: 0;
  transition: opacity 0.4s;
}
.btn-primary:hover::before { opacity: 1; }
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(124,58,237,0.35);
}
.btn-primary:active { transform: translateY(-1px); }

.btn-ghost {
  border: 1px solid rgba(167,139,250,0.25);
  color: #A78BFA;
  transition: all 0.4s;
  cursor: pointer;
}
.btn-ghost:hover {
  background: rgba(167,139,250,0.06);
  border-color: rgba(167,139,250,0.5);
  color: #C4B5FD;
  box-shadow: 0 0 30px rgba(167,139,250,0.08);
}

/* ═══ Section ═══ */
.section-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent);
}

/* ═══ Cards ═══ */
.card-glow {
  position: relative;
}
.card-glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, #7C3AED, #7DD3FC, #FBBF24);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.5s;
}
.card-glow:hover::before { opacity: 1; }

/* ═══ Influencer Card ═══ */
.inf-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.inf-card:hover {
  border-color: rgba(167,139,250,0.3);
  transform: scale(1.03) translateY(-4px);
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5);
}
.inf-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  background: linear-gradient(transparent, rgba(5,5,7,0.95));
  pointer-events: none;
}
.inf-card .inf-overlay {
  position: absolute;
  inset: 0;
  background: rgba(124,58,237,0.15);
  opacity: 0;
  transition: opacity 0.5s;
}
.inf-card:hover .inf-overlay { opacity: 1; }

/* ═══ Stat ═══ */
.stat-glow {
  background: linear-gradient(135deg, rgba(167,139,250,0.06), rgba(125,211,252,0.03));
  border: 1px solid rgba(167,139,250,0.08);
  border-radius: 20px;
  transition: all 0.4s;
}
.stat-glow:hover {
  border-color: rgba(167,139,250,0.2);
  transform: translateY(-2px);
}

/* ═══ Scroll Reveal ═══ */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ═══ Floating ═══ */
@keyframes float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
.float { animation: float 6s ease-in-out infinite; }

@keyframes pulse-dot {
  0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52,211,153,0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(52,211,153,0); }
}
.pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

/* ═══ Marquee ═══ */
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee { animation: scroll-left 40s linear infinite; }

/* ═══ Input ═══ */
input:focus {
  outline: none;
  border-color: rgba(167,139,250,0.5);
  box-shadow: 0 0 0 4px rgba(167,139,250,0.08);
}

/* ═══ Responsive ═══ */
@media (max-width: 768px) {
  .hero-grid { background-size: 60px 60px; }
}
