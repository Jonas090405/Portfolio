import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import wheelHeroImg from 'figma:asset/8ca5e4ae60b9bcd3aa445793c4ce3d717e8eecc4.png';
import { FinishCarousel } from '../components/FinishCarousel';
import { ModelsSection } from '../components/ModelsSection';
import { ColorFinishesSection } from '../components/ColorFinishesSection';
import { PersonalizationSection } from '../components/PersonalizationSection';
import { AboutSection } from '../components/AboutSection';
import { FooterSection } from '../components/FooterSection';
import { CountUp } from '../components/CountUp';

const NAV_SECTIONS = [
  { id: 'modelle', label: 'Modelle' },
  { id: 'oberflaechen', label: 'Oberflächen' },
  { id: 'farbfinishes', label: 'Farbfinishes' },
  { id: 'personalisierung', label: 'Personalisierung' },
  { id: 'about', label: 'Über uns' },
];

export function LandingPage() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // ─── Forge spark canvas ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Spark = {
      x: number; y: number;
      px: number; py: number;
      vx: number; vy: number;
      size: number;
      life: number;
      maxLife: number;
      hue: number;
    };

    const makeSpark = (stagger = false): Spark => {
      const maxLife = 110 + Math.random() * 150;
      return {
        x: w * (0.08 + Math.random() * 0.84),
        y: h * (0.15 + Math.random() * 0.78),
        px: 0, py: 0,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.22 + Math.random() * 0.7),
        size: 0.7 + Math.random() * 2.1,
        life: stagger ? Math.random() * maxLife : 0,
        maxLife,
        hue: 12 + Math.random() * 33,
      };
    };

    const SPARK_COUNT = 40;
    const sparks: Spark[] = Array.from({ length: SPARK_COUNT }, () => makeSpark(true));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of sparks) {
        p.px = p.x;
        p.py = p.y;
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.038) * 0.18;
        p.y += p.vy;
        p.vy -= 0.0028;
        p.vx *= 0.9995;

        if (p.life > p.maxLife) {
          Object.assign(p, makeSpark());
          continue;
        }

        const t = p.life / p.maxLife;
        const alpha = Math.min(t * 9, 1) * (1 - t * t) * 0.78;
        if (alpha < 0.015) continue;

        // Short trail in the direction of travel
        const trailDx = p.x - p.px;
        const trailDy = p.y - p.py;
        if (Math.abs(trailDx) + Math.abs(trailDy) > 0.3) {
          ctx.beginPath();
          ctx.moveTo(p.px - trailDx * 2.5, p.py - trailDy * 2.5);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `hsla(${p.hue + 15}, 100%, 72%, ${alpha * 0.6})`;
          ctx.lineWidth = p.size * 0.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Soft outer glow
        const r = p.size * 4.5;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        glow.addColorStop(0,   `hsla(${p.hue + 22}, 100%, 85%, ${alpha * 0.65})`);
        glow.addColorStop(0.4, `hsla(${p.hue + 8},  95%, 55%, ${alpha * 0.25})`);
        glow.addColorStop(1,   `hsla(${p.hue},       90%, 35%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Hot white-yellow core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(52, 100%, 96%, ${alpha * 0.92})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ─── Nav scroll state ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to md+
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (label: string) => {
    const section = NAV_SECTIONS.find(s => s.label === label);
    if (section) {
      setMenuOpen(false);
      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const LogoSVG = ({ w = 52, h = 62 }: { w?: number; h?: number }) => (
    <svg width={w} height={h} viewBox="0 0 50 60" fill="none">
      <circle cx="25" cy="20" r="18" stroke="#dc2626" strokeWidth="1.5" fill="none" />
      <circle cx="25" cy="20" r="4" fill="#dc2626" />
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg - 90) * Math.PI / 180;
        return (
          <line
            key={i}
            x1={25 + 4 * Math.cos(rad)} y1={20 + 4 * Math.sin(rad)}
            x2={25 + 16 * Math.cos(rad)} y2={20 + 16 * Math.sin(rad)}
            stroke="white" strokeWidth="2" strokeLinecap="round"
          />
        );
      })}
      <text x="25" y="52" fill="white" textAnchor="middle"
        style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em' }}>
        FORGED
      </text>
    </svg>
  );

  return (
    <div style={{ background: '#080808' }}>

      {/* ─── Fixed Nav ───────────────────────────────────────────────────────── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-10 py-3 sm:py-4 transition-all duration-400"
        style={{
          background: navScrolled || menuOpen ? 'rgba(8,8,8,0.97)' : 'transparent',
          backdropFilter: navScrolled || menuOpen ? 'blur(18px)' : 'none',
          borderBottom: navScrolled || menuOpen ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Logo + Tagline — grouped together */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center group"
          >
            <LogoSVG />
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-px h-4 bg-white/20" />
            <span
              className="text-red-500 tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em', fontSize: '0.75rem' }}
            >
              Präzisions-Schmiedefelgen
            </span>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_SECTIONS.map(({ id, label }) => {
            const isHovered = hoveredNav === id;
            return (
              <button
                key={id}
                onClick={() => handleNavClick(label)}
                onMouseEnter={() => setHoveredNav(id)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative uppercase py-1 transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.15em',
                  fontSize: '0.82rem',
                  color: isHovered ? '#dc2626' : 'rgba(255,255,255,0.75)',
                }}
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 h-px bg-red-600 transition-all duration-300"
                  style={{ width: isHovered ? '100%' : '0%' }}
                />
              </button>
            );
          })}
        </div>

        {/* Right side: CTA + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/configure')}
            className="bg-red-600 hover:bg-red-500 text-white uppercase transition-all px-4 sm:px-6 py-2.5 sm:py-3"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.14em',
              fontSize: '0.72rem',
              fontWeight: 700,
              clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
            }}
          >
            Konfigurator
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menü"
          >
            <span
              className="block w-5 h-px bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translate(2px, 3px)' : 'none' }}
            />
            <span
              className="block w-5 h-px bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-white transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translate(2px, -3px)' : 'none' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[64px] left-0 right-0 z-40 md:hidden"
            style={{ background: 'rgba(8,8,8,0.98)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex flex-col divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {NAV_SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(label)}
                  className="text-left px-6 py-4 text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-4"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em', fontSize: '0.82rem', textTransform: 'uppercase' }}
                >
                  <div className="w-3 h-px bg-red-600" />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden pt-12 lg:pt-16" id="hero">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        <div className="relative z-10 min-h-screen grid lg:grid-cols-2 items-center">

          {/* Left: Text */}
          <div className="flex flex-col justify-center px-5 sm:px-10 lg:px-20 pt-10 sm:pt-12
           pb-10 lg:pt-0 lg:pb-0">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white mb-5 sm:mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
              }}
            >
              GESTALTE<br />
              DEINE<br />
              PERFEKTION
              <div style={{ fontSize: 'clamp(1.4rem, 4vw, 3.2rem)', fontWeight: 600, marginTop: '0.4rem', letterSpacing: '0.05em' }}>
                mit Forged
              </div>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-white/70 mb-8 sm:mb-12 max-w-md"
              style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, letterSpacing: '0.01em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
            >
              Jede Speiche durchdacht. Jede Oberfläche verfeinert. Konfiguriere deine Felge
              von Grund auf — Präzisionshandwerk trifft totale Individualität.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <button
                onClick={() => navigate('/configure')}
                className="group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white px-7 sm:px-10 py-4 sm:py-5 transition-all duration-300 w-full sm:w-auto text-center"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              >
                <span className="relative z-10 uppercase">Konfiguration starten</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
              </button>

              <button
                onClick={() => document.getElementById('modelle')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white/65 hover:text-white/90 transition-colors flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em', fontSize: '0.85rem' }}
              >
                <span>Designs entdecken</span>
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                  <path d="M0 4H14M11 1L14 4L11 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center gap-5 sm:gap-8 mt-10 sm:mt-16 pt-8 sm:pt-10"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              {[
                { to: 3,  label: 'Designs' },
                { to: 4,  label: 'Oberflächen' },
                { to: 16, label: 'Farben' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <CountUp
                    to={stat.to}
                    duration={750}
                    delay={1100 + i * 60}
                    className="text-white"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700, lineHeight: 1 }}
                  />
                  <span className="text-white/55 tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em', fontSize: '0.72rem' }}>
                    {stat.label}
                  </span>
                </div>
              ))}

              {/* ∞ — scale-in instead of count-up */}
              <div className="flex flex-col gap-1">
                <motion.span
                  className="text-white"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700, lineHeight: 1 }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  ∞
                </motion.span>
                <span className="text-white/55 tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em', fontSize: '0.72rem' }}>
                  Kombinationen
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Wheel image */}
          <div className="relative flex items-center justify-center lg:h-screen px-4 py-10 lg:py-0">
            {/* Wheel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ width: 'min(870px, 95vw)', height: 'min(870px, 95vw)' }}
              className="relative z-10"
            >
              <img
                src={wheelHeroImg}
                alt="Premium forged wheel"
                className="w-full h-full object-contain"
                style={{ filter: 'brightness(1.0) contrast(1.05)', mixBlendMode: 'multiply' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll label */}
        <motion.div
          className="absolute bottom-6 left-5 sm:left-10 text-white/30 text-sm tracking-widest uppercase pointer-events-none hidden sm:block"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em', writingMode: 'vertical-lr' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
        >
          Scrollen zum Entdecken
        </motion.div>
      </section>

      {/* ─── Sections ─────────────────────────────────────────────────────────── */}
      <section id="modelle"><ModelsSection /></section>
      <section id="oberflaechen"><FinishCarousel /></section>
      <section id="farbfinishes"><ColorFinishesSection /></section>
      <section id="personalisierung"><PersonalizationSection /></section>
      <section id="about"><AboutSection /></section>
      <FooterSection />

    </div>
  );
}
