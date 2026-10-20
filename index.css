@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Manrope:wght@400;500;600;700;800&family=Caveat:wght@500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-serif: "Cormorant Garamond", "Georgia", serif;
  --font-sans: "Manrope", system-ui, sans-serif;
  --font-hand: "Caveat", cursive;
  --color-parchment: #f6efe1;
  --color-parchment-dark: #ece0c8;
  --color-ink: #15120d;
  --color-ink-soft: #2a251b;
  --color-cornflower: #3a5fbf;
  --color-cornflower-light: #7fa0ff;
  --color-embroidery: #c1272d;
  --color-gold: #c9a227;
  --color-gold-light: #f0d98c;
  --color-moss: #4a5d3a;
}

html { scroll-behavior: smooth; }
body {
  background: #15120d;
  color: #f6efe1;
  font-family: "Manrope", system-ui, sans-serif;
  overflow-x: hidden;
}
::selection { background: #c9a227; color: #15120d; }

/* scrollbar */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #15120d; }
::-webkit-scrollbar-thumb { background: #3a3528; border-radius: 8px; }
::-webkit-scrollbar-thumb:hover { background: #c9a227; }

.font-serif-d { font-family: "Cormorant Garamond", Georgia, serif; }
.font-hand { font-family: "Caveat", cursive; }

/* ornament strip - belarusian diamond */
.ornament-strip {
  height: 18px;
  background-image: repeating-linear-gradient(90deg, transparent 0 10px, rgba(201,162,39,.9) 10px 12px, transparent 12px 22px),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='18' viewBox='0 0 36 18'%3E%3Cpath d='M18 1 L23 9 L18 17 L13 9 Z M18 5 L20.5 9 L18 13 L15.5 9 Z' fill='%23c9a227'/%3E%3Ccircle cx='4' cy='9' r='1.6' fill='%23c1272d'/%3E%3Ccircle cx='32' cy='9' r='1.6' fill='%23c1272d'/%3E%3C/svg%3E");
  background-size: auto, 36px 18px;
  background-repeat: repeat-x;
  background-position: center;
  opacity: .9;
}
.ornament-strip-red {
  height: 14px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='14' viewBox='0 0 48 14'%3E%3Cpath d='M24 1 L28 7 L24 13 L20 7 Z' fill='none' stroke='%23c1272d' stroke-width='1.2'/%3E%3Cpath d='M8 7 h8 M32 7 h8' stroke='%23c9a227' stroke-width='1'/%3E%3Crect x='0' y='5.5' width='4' height='3' fill='%23c9a227'/%3E%3Crect x='44' y='5.5' width='4' height='3' fill='%23c9a227'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  background-size: 48px 14px;
}

.paper {
  background-color: #f6efe1;
  background-image:
    radial-gradient(ellipse at 20% 10%, rgba(201,162,39,.12), transparent 55%),
    radial-gradient(ellipse at 90% 90%, rgba(58,95,191,.08), transparent 50%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
}

.ink-card {
  background: linear-gradient(160deg, #201b12 0%, #15120d 60%, #1d182f 100%);
  border: 1px solid rgba(201,162,39,.22);
}

.gold-text {
  background: linear-gradient(105deg, #f0d98c 0%, #c9a227 35%, #fff3c4 50%, #c9a227 65%, #f0d98c 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shine 6s linear infinite;
}
@keyframes shine { to { background-position: 200% center; } }

@keyframes twinkle { 0%,100% { opacity: .2; transform: scale(.8);} 50% { opacity: 1; transform: scale(1.15);} }
@keyframes floaty { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-12px);} }
@keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }
.animate-marquee { animation: marquee 32s linear infinite; }
.animate-floaty { animation: floaty 6s ease-in-out infinite; }

.reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1); }
.reveal.visible { opacity: 1; transform: none; }

.poem-text { white-space: pre-line; line-height: 1.9; }

.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

/* custom range */
input[type="range"] { accent-color: #c9a227; }

/* map pulse */
@keyframes pulse-ring { 0% { transform: scale(.6); opacity:.9;} 100% { transform: scale(2.2); opacity:0;} }
.pulse-ring::after { content:""; position:absolute; inset:0; border-radius:9999px; border:2px solid #c9a227; animation: pulse-ring 2s ease-out infinite; }

.vignette::before {
  content:""; position:absolute; inset:0; pointer-events:none;
  background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.55) 100%);
}
