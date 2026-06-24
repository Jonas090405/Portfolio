import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { WheelPreview } from '../components/WheelPreview';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import wheel1Img from 'figma:asset/8ca5e4ae60b9bcd3aa445793c4ce3d717e8eecc4.png';
import wheel2Img from 'figma:asset/53050a87cc813c0e5002ad63c20fae5cc58a7a54.png';
import wheel3Img from 'figma:asset/8714368a00845f423eaf512444b5c30bf00920e8.png';

type Finish = 'polished' | 'gloss' | 'matte';
type WheelSize = '18' | '19' | '20' | '21' | '22';

interface WheelConfig {
  designId: number;
  finish: Finish;
  size: WheelSize;
  engraving: string;
  capColor: string;
}

const DEFAULT_CONFIG: WheelConfig = {
  designId: 1,
  finish: 'polished',
  size: '20',
  engraving: '',
  capColor: '#b8b8b8',
};

const wheelDesigns = [
  { id: 1, name: 'Mesh RS', subtitle: '14-Speichen Matrix', image: wheel1Img },
  { id: 2, name: 'Classic 5', subtitle: '5-Speichen Touring', image: wheel2Img },
  { id: 3, name: 'Twin 5 Sport', subtitle: 'Geteilte 5-Speichen', image: wheel3Img },
];

const finishes: { id: Finish; label: string; description: string }[] = [
  { id: 'polished', label: 'Poliert', description: 'Spiegelglanz Silber' },
  { id: 'gloss', label: 'Hochglanz', description: 'Glänzender Chromlack' },
  { id: 'matte', label: 'Matt', description: 'Flache Graphitoberfläche' },
];

const sizes: WheelSize[] = ['18', '19', '20', '21', '22'];

const capColors = [
  { hex: '#1c1c1c', label: 'Satin Schwarz' },
  { hex: '#b8b8b8', label: 'Poliersilber' },
  { hex: '#f0f0f0', label: 'Perlweiß' },
];

const finishPreviewColors: Record<Finish, string> = {
  polished: 'linear-gradient(135deg, #e8e8e8 0%, #a0a0a0 50%, #d0d0d0 100%)',
  gloss: 'linear-gradient(135deg, #f0f0f0 0%, #c8c8c8 30%, #f8f8f8 70%, #d0d0d0 100%)',
  matte: 'linear-gradient(135deg, #707070 0%, #505050 100%)',
};

function InfoTooltip({ text }: { text: string }) {
  return (
    <Tooltip delayDuration={80}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label="Mehr Informationen"
          className="flex items-center justify-center text-white/30 hover:text-red-500 transition-colors shrink-0 -my-1 p-1"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 7.2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="4.6" r="0.95" fill="currentColor" />
          </svg>
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[230px] bg-[#16110f] text-white/80 border border-white/12 text-xs font-normal leading-relaxed shadow-xl"
        style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.01em' }}
      >
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

function SectionLabel({ children, info }: { children: React.ReactNode; info?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-4 h-px bg-red-600" />
      <span
        className="text-white/40 text-sm tracking-widest uppercase"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em' }}
      >
        {children}
      </span>
      {info && <InfoTooltip text={info} />}
    </div>
  );
}

export function ConfiguratorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [config, setConfig] = useState<WheelConfig>(() => {
    const designParam = searchParams.get('design');
    const designId = designParam ? parseInt(designParam, 10) : DEFAULT_CONFIG.designId;
    const validId = wheelDesigns.some(d => d.id === designId) ? designId : DEFAULT_CONFIG.designId;
    return { ...DEFAULT_CONFIG, designId: validId };
  });
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  // Always start at the top of the page when entering the configurator
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // ─── Subtle forge sparks in the center stage ──────────────────────────────
  useEffect(() => {
    const canvas = sparkCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type Spark = {
      x: number; y: number;
      px: number; py: number;
      vx: number; vy: number;
      size: number;
      life: number; maxLife: number;
      hue: number;
    };

    const makeSpark = (stagger = false): Spark => {
      const maxLife = 90 + Math.random() * 130;
      return {
        x: w * (0.1 + Math.random() * 0.8),
        y: h * (0.25 + Math.random() * 0.7),
        px: 0, py: 0,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(0.14 + Math.random() * 0.48),
        size: 0.4 + Math.random() * 1.5,
        life: stagger ? Math.random() * maxLife : 0,
        maxLife,
        hue: 12 + Math.random() * 33,
      };
    };

    const SPARK_COUNT = 22;
    const sparks: Spark[] = Array.from({ length: SPARK_COUNT }, () => makeSpark(true));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of sparks) {
        p.px = p.x; p.py = p.y;
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.041) * 0.14;
        p.y += p.vy;
        p.vy -= 0.002;
        p.vx *= 0.9996;

        if (p.life > p.maxLife) { Object.assign(p, makeSpark()); continue; }

        const t = p.life / p.maxLife;
        const alpha = Math.min(t * 9, 1) * (1 - t * t) * 0.42;
        if (alpha < 0.012) continue;

        // Trail
        const trailDx = p.x - p.px;
        const trailDy = p.y - p.py;
        if (Math.abs(trailDx) + Math.abs(trailDy) > 0.3) {
          ctx.beginPath();
          ctx.moveTo(p.px - trailDx * 2.5, p.py - trailDy * 2.5);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `hsla(${p.hue + 15}, 100%, 72%, ${alpha * 0.55})`;
          ctx.lineWidth = p.size * 0.45;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Glow
        const r = p.size * 3.5;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        glow.addColorStop(0,   `hsla(${p.hue + 22}, 100%, 85%, ${alpha * 0.6})`);
        glow.addColorStop(0.4, `hsla(${p.hue + 8},  95%, 55%, ${alpha * 0.22})`);
        glow.addColorStop(1,   `hsla(${p.hue},       90%, 35%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(52, 100%, 96%, ${alpha * 0.88})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  const [customColor, setCustomColor] = useState(config.capColor);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'design' | 'options'>('design');

  const finishRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const sparkCanvasRef = useRef<HTMLCanvasElement>(null);

  const update = (partial: Partial<WheelConfig>) => {
    setConfig(prev => ({ ...prev, ...partial }));
  };

  const reset = () => {
    setConfig({ ...DEFAULT_CONFIG });
  };

  const handleZoneClick = (zone: 'rim' | 'spoke' | 'cap') => {
    if (zone === 'rim') {
      setActivePanel('finish');
      finishRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (zone === 'cap') {
      setActivePanel('cap');
      capRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setActivePanel('design');
      designRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const selectedDesign = wheelDesigns.find(d => d.id === config.designId);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ background: '#080808' }}>
      {/* Nav bar */}
      <motion.div
        className="flex items-center justify-between px-6 md:px-10 py-5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.14)' }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#dc2626" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="1" />
            <circle cx="16" cy="16" r="3" fill="#dc2626" />
            {[0, 72, 144, 216, 288].map((deg, i) => {
              const rad = (deg - 90) * Math.PI / 180;
              const x1 = 16 + 8 * Math.cos(rad);
              const y1 = 16 + 8 * Math.sin(rad);
              const x2 = 16 + 14 * Math.cos(rad);
              const y2 = 16 + 14 * Math.sin(rad);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1" />;
            })}
          </svg>
          <span
            className="text-white tracking-widest uppercase text-sm group-hover:text-white/70 transition-colors"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.2em' }}
          >
            Forged
          </span>
        </button>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm text-white/30" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}>
          <span className="text-white/20 uppercase tracking-widest">Konfigurator</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-white/50 uppercase tracking-widest">{selectedDesign?.name}</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-red-500 uppercase tracking-widest">{config.finish} · {config.size}"</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="text-white/30 hover:text-white/60 text-sm tracking-widest uppercase transition-colors flex items-center gap-2"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6C1 3.24 3.24 1 6 1c1.66 0 3.12.8 4.05 2.03L12 4.5M11 6c0 2.76-2.24 5-5 5-1.66 0-3.12-.8-4.05-2.03L0 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="hidden lg:inline">Zurücksetzen</span>
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 text-white text-sm tracking-widest uppercase px-4 lg:px-5 py-2.5 transition-all whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          >
            Angebot anfragen
          </button>
        </div>
      </motion.div>

      {/* Mobile tab switcher */}
      <div className="md:hidden flex border-b" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
        {(['design', 'options'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className="flex-1 py-3 text-sm tracking-widest uppercase transition-colors"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em',
              color: mobileTab === tab ? '#fff' : 'rgba(255,255,255,0.3)',
              borderBottom: mobileTab === tab ? '1px solid #dc2626' : '1px solid transparent',
            }}
          >
            {tab === 'design' ? 'Design' : 'Optionen'}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* Left panel — Design selector */}
        <motion.div
          className={`md:w-56 lg:w-72 border-r overflow-y-auto overscroll-contain flex-shrink-0 ${mobileTab === 'design' ? 'block' : 'hidden'} md:block`}
          style={{ borderColor: 'rgba(255,255,255,0.14)', background: 'rgba(0,0,0,0.3)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Mobile compact preview */}
          <div className="md:hidden w-full flex items-center justify-center py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.4)', height: '180px' }}>
            <WheelPreview config={{ ...config, capDesign: 'standard' }} onZoneClick={handleZoneClick} />
          </div>
          <div className="p-4 lg:p-6" ref={designRef}>
            <SectionLabel info="Das Speichendesign prägt den Charakter der Felge – sportlich-aggressiv, klassisch oder progressiv. Es beeinflusst Optik, Gewicht und die Sicht auf die Bremsanlage.">Felgendesign</SectionLabel>

            <div className="grid grid-cols-2 gap-3">
              {wheelDesigns.map(design => (
                <motion.button
                  key={design.id}
                  onClick={() => update({ designId: design.id })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden text-left transition-all"
                  style={{
                    background: config.designId === design.id ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.03)',
                    border: config.designId === design.id ? '1px solid rgba(220,38,38,0.5)' : '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Wheel thumbnail */}
                  <div
                    className="w-full aspect-square flex items-center justify-center overflow-hidden"
                    style={{ background: '#000' }}
                  >
                    <img
                      src={design.image}
                      alt={design.name}
                      className="w-full h-full object-contain p-2"
                      style={{
                        filter: config.designId === design.id
                          ? 'brightness(1.05) contrast(1.05)'
                          : 'brightness(0.55) contrast(0.9)',
                        opacity: config.designId === design.id ? 1 : 0.7,
                      }}
                    />
                  </div>

                  {/* Label */}
                  <div className="p-2.5">
                    <div
                      className="text-white text-sm"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.08em' }}
                    >
                      {design.name}
                    </div>
                    <div
                      className="text-white/30 mt-0.5"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.05em' }}
                    >
                      {design.subtitle}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {config.designId === design.id && (
                    <motion.div
                      layoutId="designActive"
                      className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Size selector */}
            <div className="mt-8">
              <SectionLabel info="Der Felgendurchmesser in Zoll. Größere Felgen wirken sportlicher und füllen den Radkasten aus, kleinere lassen mehr Reifenflanke für besseren Fahrkomfort.">Felgengröße</SectionLabel>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(sz => (
                  <motion.button
                    key={sz}
                    onClick={() => update({ size: sz })}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2.5 text-sm transition-all"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: config.size === sz ? '#fff' : 'rgba(255,255,255,0.35)',
                      background: config.size === sz ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.04)',
                      border: config.size === sz ? '1px solid rgba(220,38,38,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {sz}"
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center — Wheel preview (desktop only, hidden on mobile) */}
        <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">
          {/* Background grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Forge sparks */}
          <canvas ref={sparkCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Center glow — sits on top of sparks to keep wheel readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(30,30,30,0.8) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 w-full h-full flex items-center justify-center p-3 lg:p-8">
            <WheelPreview
              config={{ ...config, capDesign: 'standard' }}
              onZoneClick={handleZoneClick}
            />
          </div>
        </div>

        {/* Right panel — Configuration options */}
        <motion.div
          className={`md:w-64 lg:w-80 border-l overflow-y-auto overscroll-contain flex-shrink-0 ${mobileTab === 'options' ? 'block' : 'hidden'} md:block`}
          style={{ borderColor: 'rgba(255,255,255,0.14)', background: 'rgba(0,0,0,0.3)' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Mobile compact preview */}
          <div className="md:hidden w-full flex items-center justify-center py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.4)', height: '180px' }}>
            <WheelPreview config={{ ...config, capDesign: 'standard' }} onZoneClick={handleZoneClick} />
          </div>
          <div className="p-4 lg:p-6 flex flex-col gap-6 lg:gap-8">

            {/* Finish */}
            <div ref={finishRef}>
              <SectionLabel info="Die Oberflächenveredelung – von spiegelndem Hochglanz bis mattem Graphit. Sie bestimmt Reflexion, Tiefenwirkung und den Pflegeaufwand der Felge.">Oberfläche</SectionLabel>
              <div className="grid grid-cols-2 gap-2">
                {finishes.map(f => (
                  <motion.button
                    key={f.id}
                    onClick={() => update({ finish: f.id })}
                    whileTap={{ scale: 0.97 }}
                    className={`relative overflow-hidden p-3 text-left transition-all ${
                      activePanel === 'finish' && config.finish !== f.id ? 'ring-1 ring-white/10' : ''
                    }`}
                    style={{
                      background: config.finish === f.id ? 'rgba(220,38,38,0.1)' : 'rgba(255,255,255,0.03)',
                      border: config.finish === f.id ? '1px solid rgba(220,38,38,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Finish preview swatch */}
                    <div
                      className="w-full h-6 mb-2 rounded-sm"
                      style={{ background: finishPreviewColors[f.id] }}
                    />
                    <div
                      className="text-sm"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        color: config.finish === f.id ? '#fff' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {f.label}
                    </div>
                    <div
                      className="text-white/25 mt-0.5"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem' }}
                    >
                      {f.description}
                    </div>
                    {config.finish === f.id && (
                      <motion.div
                        layoutId="finishActive"
                        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Center Cap Color */}
            <div ref={capRef}>
              <SectionLabel info="Die Farbe des zentralen Nabendeckels setzt einen gezielten Akzent in der Felgenmitte – ideal abgestimmt auf Lackierung oder Bremssättel.">Nabendeckel Farbe</SectionLabel>

              {/* Preset swatches grid */}
              <div className="grid grid-cols-5 gap-2">
                {capColors.map(c => (
                  <motion.button
                    key={c.hex}
                    onClick={() => { update({ capColor: c.hex }); setCustomColor(c.hex); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    title={c.label}
                    className="relative aspect-square overflow-hidden transition-all"
                    style={{
                      background: c.hex,
                      borderRadius: '3px',
                      border: config.capColor === c.hex
                        ? '2px solid rgba(220,38,38,0.9)'
                        : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: config.capColor === c.hex
                        ? `0 0 10px ${c.hex}60, inset 0 0 0 1px rgba(255,255,255,0.15)`
                        : 'none',
                    }}
                  >
                    {config.capColor === c.hex && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L4.5 8.5L10 3" stroke={['#b8b8b8','#f0f0f0'].includes(c.hex) ? '#000' : '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Custom color toggle */}
              <div className="mt-3">
                <button
                  onClick={() => setColorPickerOpen(v => !v)}
                  className="flex items-center gap-2.5 w-full text-left group"
                >
                  {/* Current color preview */}
                  <div
                    className="w-7 h-7 flex-shrink-0"
                    style={{
                      background: config.capColor,
                      borderRadius: '3px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      boxShadow: `0 0 8px ${config.capColor}40`,
                    }}
                  />
                  <div className="flex-1">
                    <div
                      className="text-white/35 text-sm tracking-widest uppercase group-hover:text-white/55 transition-colors"
                      style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}
                    >
                      Eigene Farbe
                    </div>
                    <div
                      className="text-white/20 text-sm mt-0.5 font-mono"
                    >
                      {config.capColor.toUpperCase()}
                    </div>
                  </div>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{
                      transform: colorPickerOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: 'rgba(255,255,255,0.25)',
                    }}
                  >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Expanded custom picker */}
                {colorPickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 p-3 overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      className="text-white/25 text-sm uppercase tracking-widest mb-2"
                      style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em', fontSize: '0.6rem' }}
                    >
                      Hex-Code
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Color input that opens native picker */}
                      <div
                        className="relative w-10 h-10 flex-shrink-0 cursor-pointer overflow-hidden"
                        style={{
                          background: customColor,
                          borderRadius: '3px',
                          border: '1px solid rgba(255,255,255,0.12)',
                        }}
                      >
                        <input
                          type="color"
                          value={customColor}
                          onChange={e => {
                            setCustomColor(e.target.value);
                            update({ capColor: e.target.value });
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          title="Farbe wählen"
                        />
                      </div>
                      {/* Hex text input */}
                      <input
                        type="text"
                        value={customColor}
                        onChange={e => {
                          const val = e.target.value;
                          setCustomColor(val);
                          if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                            update({ capColor: val });
                          }
                        }}
                        onBlur={e => {
                          if (!/^#[0-9A-Fa-f]{6}$/.test(customColor)) {
                            setCustomColor(config.capColor);
                          }
                        }}
                        maxLength={7}
                        className="min-w-0 flex-1 bg-transparent border text-white text-sm px-3 py-2 outline-none font-mono uppercase"
                        style={{
                          borderColor: 'rgba(255,255,255,0.1)',
                          background: 'rgba(255,255,255,0.04)',
                          letterSpacing: '0.1em',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(220,38,38,0.5)')}
                        onBlurCapture={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                      <button
                        onClick={() => { update({ capColor: customColor }); setColorPickerOpen(false); }}
                        disabled={!/^#[0-9A-Fa-f]{6}$/.test(customColor)}
                        className="px-3 py-2 text-sm uppercase tracking-widest transition-all"
                        style={{
                          fontFamily: 'var(--font-display)',
                          letterSpacing: '0.12em',
                          background: 'rgba(220,38,38,0.15)',
                          border: '1px solid rgba(220,38,38,0.3)',
                          color: 'rgba(255,255,255,0.6)',
                        }}
                      >
                        OK
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Engraving */}
            <div>
              <SectionLabel info="Ein individueller Schriftzug, der bogenförmig in die innere Felge graviert wird – für ein unverwechselbares, persönliches Detail.">Gravur</SectionLabel>
              <div className="relative">
                <input
                  type="text"
                  value={config.engraving}
                  onChange={e => update({ engraving: e.target.value.slice(0, 28) })}
                  placeholder="Ihr Name oder Text..."
                  maxLength={28}
                  className="w-full bg-transparent border text-white text-sm px-4 py-3 outline-none transition-all placeholder-white/20"
                  style={{
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.12em',
                    borderColor: config.engraving ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(220,38,38,0.5)')}
                  onBlur={e => (e.target.style.borderColor = config.engraving ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.1)')}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {config.engraving.length}/28
                </div>
              </div>
              {config.engraving && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 px-3 py-2 bg-white/3 border border-white/5"
                >
                  <div
                    className="text-white/40 text-sm"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em' }}
                  >
                    Vorschau: {config.engraving.toUpperCase()}
                  </div>
                </motion.div>
              )}
              <p className="text-white/20 text-sm mt-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem' }}>
                Text erscheint graviert auf der inneren Felge. Bogenförmige Platzierung.
              </p>
            </div>

            {/* Specs summary */}
            <div className="border border-white/6 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <SectionLabel info="Eine Zusammenfassung deiner aktuellen Auswahl auf einen Blick – die Grundlage für dein individuelles Angebot.">Konfigurationsübersicht</SectionLabel>
              <div className="space-y-2.5">
                {[
                  { label: 'Design', value: selectedDesign?.name },
                  { label: 'Oberfläche', value: finishes.find(f => f.id === config.finish)?.label },
                  { label: 'Größe', value: `${config.size}" Durchmesser` },
                  { label: 'Nabenfarbe', value: capColors.find(c => c.hex === config.capColor)?.label || 'Benutzerdefiniert' },
                  { label: 'Gravur', value: config.engraving || 'Keine' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span
                      className="text-white/30 text-sm tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="text-white/70 text-sm"
                      style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em', maxWidth: '140px', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset + Quote */}
            <div className="flex flex-col gap-3 pb-6">
              <button
                className="w-full bg-red-600 hover:bg-red-500 text-white py-4 text-sm tracking-widest uppercase transition-all"
                style={{
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.2em',
                  fontWeight: 700,
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
              >
                Angebot anfragen
              </button>
              <button
                onClick={reset}
                className="w-full text-white/25 hover:text-white/50 py-2 text-sm tracking-widest uppercase transition-colors border border-white/8 hover:border-white/15"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em' }}
              >
                Standard zurücksetzen
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
