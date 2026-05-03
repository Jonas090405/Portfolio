import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import wheel1Img from 'figma:asset/8ca5e4ae60b9bcd3aa445793c4ce3d717e8eecc4.png';

const ENGRAVING_EXAMPLES = [
  'MÜNCHEN · 2024',
  'RS · EDITION',
  'PORSCHE GT3',
  'YOUR NAME',
  '911 TURBO S',
];

/** Engraving text follows the outer rim arc of the wheel photo — no decorative illustration, text only */
function RimEngraving({ text, isTyping }: { text: string; isTyping: boolean }) {
  const label = text || '· · · · ·';

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Arc path following the outer rim of the Mesh RS wheel photo */}
        <path id="rimArc" d="M 16,210 A 194,194 0 0 1 404,210" />

        {/* Metallic silver gradient for the engraved text */}
        <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="30%" stopColor="#e8e8e8" stopOpacity="1" />
          <stop offset="65%" stopColor="#c0c0c0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#888888" stopOpacity="0.9" />
        </linearGradient>

        {/* Engraved depth: dark shadow below + bright highlight above */}
        <filter id="engraveF" x="-5%" y="-40%" width="110%" height="180%">
          <feDropShadow dx="0" dy="2.2" stdDeviation="1.4"
            floodColor="#000000" floodOpacity="0.9" result="darkShadow" />
          <feDropShadow dx="0" dy="-0.8" stdDeviation="0.5"
            floodColor="#ffffff" floodOpacity="0.5" result="hiLight" />
          <feMerge>
            <feMergeNode in="darkShadow" />
            <feMergeNode in="hiLight" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Engraved text directly on the rim */}
      <text
        dy="48"
        filter="url(#engraveF)"
        fill="url(#silverGrad)"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '19px',
          fontWeight: 700,
          letterSpacing: '7px',
          textTransform: 'uppercase',
        }}
      >
        <textPath href="#rimArc" textAnchor="middle" startOffset="50%">
          {label}
        </textPath>
      </text>

    </svg>
  );
}

export function PersonalizationSection() {
  const navigate = useNavigate();
  const [engravingText, setEngravingText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [exampleIndex, setExampleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isUserTyping, setIsUserTyping] = useState(false);

  useEffect(() => {
    if (isUserTyping) return;
    const example = ENGRAVING_EXAMPLES[exampleIndex];
    let charIdx = 0;
    setIsTyping(true);
    setDisplayText('');
    const t = setInterval(() => {
      if (charIdx < example.length) {
        setDisplayText(example.slice(0, charIdx + 1));
        charIdx++;
      } else {
        clearInterval(t);
        setIsTyping(false);
        setTimeout(() => setExampleIndex(p => (p + 1) % ENGRAVING_EXAMPLES.length), 2200);
      }
    }, 80);
    return () => clearInterval(t);
  }, [exampleIndex, isUserTyping]);

  const activeText = isUserTyping ? engravingText : displayText;

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* ── Content ── */}
      <div className="relative z-10">

        {/* ── Header ── */}
        <div className="px-5 sm:px-10 lg:px-20 pt-16 sm:pt-20 pb-0">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-red-600" />
            <span
              className="text-red-500 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.25em' }}
            >
              Personalisierung
            </span>
          </div>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            DEINE HANDSCHRIFT.<br />
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>AUF JEDEM SPEICHEN.</span>
          </h2>
        </div>

        {/* ── Main content ── */}
        <div className="flex flex-col lg:flex-row">

          {/* ── Left: Input + CTA ── */}
          <div className="lg:w-1/2 px-5 sm:px-10 lg:px-20 py-10 sm:py-14 flex flex-col justify-center">

            {/* Description */}
            <p
              className="text-white/50 mb-10 max-w-md"
              style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8 }}
            >
              Individueller Text, bogenförmig auf der inneren Felgenfläche graviert —
              bis zu 28 Zeichen. Namen, Daten, Signaturen oder Widmungen.
            </p>

            {/* Live text input */}
            <div className="mb-10">
              <div
                className="text-white/40 uppercase tracking-widest mb-3"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.22em', fontSize: '0.72rem' }}
              >
                Text eingeben &amp; live vorschauen
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={engravingText}
                  onChange={e => {
                    setEngravingText(e.target.value.slice(0, 28));
                    setIsUserTyping(true);
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)';
                    if (!engravingText) setIsUserTyping(false);
                  }}
                  placeholder="z. B. MÜNCHEN · 2024"
                  maxLength={28}
                  className="w-full bg-transparent text-white outline-none transition-all"
                  style={{
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.22em',
                    fontSize: '1.1rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderBottom: '2px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.025)',
                    textTransform: 'uppercase',
                    padding: '1.25rem 3.5rem 1.25rem 1.4rem',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(220,38,38,0.45)';
                    e.target.style.borderBottomColor = 'rgba(220,38,38,0.7)';
                  }}
                />
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {engravingText.length}/28
                </div>
              </div>

              {/* Quick-fill example chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {ENGRAVING_EXAMPLES.map(ex => (
                  <button
                    key={ex}
                    onClick={() => { setEngravingText(ex); setIsUserTyping(true); }}
                    className="text-white/30 hover:text-white/65 text-xs px-3 py-1.5 transition-all"
                    style={{
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.1em',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/configure')}
              className="group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white px-10 py-5 transition-all duration-300 self-start"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                clipPath:
                  'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              <span className="relative z-10">Jetzt personalisieren</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
            </button>
          </div>

          {/* ── Right: Real wheel photo + engraving text overlay ── */}
          <div
            className="lg:w-1/2 flex items-center justify-center py-10 lg:py-16 px-4"
            style={{ minHeight: 'min(560px, 90vw)' }}
          >
            <motion.div
              className="relative flex-shrink-0"
              style={{ width: 'min(540px, 88vw)', aspectRatio: '1/1' }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Real wheel photo — the actual rim is at ~46% from edge, matching the SVG arc */}
              <img
                src={wheel1Img}
                alt="Mesh RS Felge mit Gravurvorschau"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ filter: 'brightness(0.88) contrast(1.1)' }}
              />
              {/* Engraving text sits directly on the rim of the wheel photo */}
              <RimEngraving text={activeText} isTyping={isTyping && !isUserTyping} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}