import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import hookahImageMobile from '../../assets/shisha-exploded-components.png';
import hookahImageDesktop from '../../assets/shisha-exploded-premium.png';

type ShishaComponent = {
  tag: string;
  name: string;
  description: string;
  detail: string;
  yPercent: number;
  xPercent: number;
};

const components: ShishaComponent[] = [
  {
    tag: '01',
    name: 'Pod',
    description: 'Aromaeinheit für schnellen und sauberen Geschmackwechsel.',
    detail: 'Vorkonfektioniertes Pod-System für gleichbleibenden Geschmack ohne klebrigen Tabakaufbau.',
    yPercent: 7,
    xPercent: 24,
  },
  {
    tag: '02',
    name: 'Durchzugmodul',
    description: 'Steuert den Luftfluss gleichmäßig durch das System.',
    detail: 'Optimiertes Airflow-Design sorgt für konstanten Zugwiderstand und ruhiges Rauchverhalten.',
    yPercent: 20,
    xPercent: 24,
  },
  {
    tag: '03',
    name: 'Abdichtung',
    description: 'Dichtet die Module sauber und luftdicht ab.',
    detail: 'Hitze- und feuchtigkeitsresistente Dichtflächen verhindern Nebenluft und Leistungsverlust.',
    yPercent: 33,
    xPercent: 24,
  },
  {
    tag: '04',
    name: 'Bowl',
    description: 'Wasserkammer für Kühlung und ruhigen Durchzug.',
    detail: 'Das abgestimmte Volumen sorgt für weicheres Rauchgefühl über die gesamte Session.',
    yPercent: 48,
    xPercent: 22,
  },
  {
    tag: '05',
    name: 'Keramik-Heizkern',
    description: 'Schnelles Aufheizen mit stabiler Temperatur.',
    detail: 'Thermisch träges Keramikmaterial gleicht Lastspitzen aus und hält den Geschmack konstant.',
    yPercent: 61,
    xPercent: 22,
  },
  {
    tag: '06',
    name: 'Heizkammer',
    description: 'Elektrische Hitzezone statt Kohle.',
    detail: 'Geschlossener Heizbereich mit präziser Leistungsabgabe für reproduzierbaren Dampf.',
    yPercent: 70,
    xPercent: 22,
  },
  {
    tag: '07',
    name: 'Ladepad mit Steuerungs- und Akkuanzeige',
    description: 'Laden, steuern und Akkustand auf einen Blick.',
    detail: 'Integriertes Interface für Sessionkontrolle plus visuelles Feedback zur verbleibenden Akkuleistung.',
    yPercent: 83,
    xPercent: 22,
  },
  {
    tag: '08',
    name: 'Schlauch aus hochwertigem Gummi',
    description: 'Flexibel, robust und geschmacksneutral im Zug.',
    detail: 'Hochwertiges Material bleibt formstabil und sorgt für angenehme Handhabung bei langen Sessions.',
    yPercent: 32,
    xPercent: 62,
  },
  {
    tag: '09',
    name: 'Edelstahl-Mundstück',
    description: 'Hochwertiges Finish mit kühler, präziser Haptik.',
    detail: 'Langlebiger Edelstahl mit sauberem Durchzug und premium Gefühl bei jedem Zug.',
    yPercent: 65,
    xPercent: 88,
  },
];

const SECTION_EYEBROW = 'Komponenten';

const COMPONENT_NAV_HINT = `Kurzbeschreibung und Detailtext zu allen ${components.length} Komponenten.`;

export function ComponentBreakdown() {
  /* ── Mobile accordion state ── */
  const mobileRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mobileRef, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* ── Desktop parallax scroll state ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.min(Math.floor(v * components.length), components.length - 1));
  });

  const active = components[activeIndex];

  return (
    <>
      {/* ─────────────────────────────────────────
          MOBILE  — klassisches Accordion
      ───────────────────────────────────────── */}
      <section ref={mobileRef} className="section-page lg:hidden">
        <div className="max-w-7xl mx-auto w-full space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-white/40 tracking-widest uppercase text-xs">{SECTION_EYEBROW}</span>
            <h2 className="mt-2 text-3xl font-medium">Komponenten im Detail</h2>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <img
              src={hookahImageMobile}
              alt="Shisha Exploded View"
              className="max-w-[220px] w-full h-auto object-contain"
            />
          </motion.div>

          <div className="space-y-2">
            {components.map((comp, index) => (
              <motion.div
                key={comp.tag}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="bg-[#161616] hover:bg-[#1c1c1c] transition-colors rounded-2xl px-4 py-4 cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center shrink-0">
                    <span className="text-white/40 text-xs">{comp.tag}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-white">{comp.name}</div>
                    <div className="mt-1 line-clamp-2 text-sm leading-snug text-white/55">
                      {comp.description}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/20 text-lg shrink-0"
                  >
                    ›
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-11 mt-2 border-l border-white/12 pl-4 pt-1 text-sm leading-relaxed text-white/35">
                        {comp.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs tracking-wider text-white/20">{COMPONENT_NAV_HINT}</p>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          DESKTOP  — Sticky Scroll + Labels
          Outer tall container drives the scroll.
          Inner sticky div stays at top: 0.
      ───────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="hidden lg:block relative"
        style={{ height: `${components.length * 50 + 50}vh` }}
      >
        <div className="sticky top-0 h-dvh min-h-0 overflow-hidden flex flex-col bg-black">
          {/*
            Gleiche horizontale Spur wie .section-page + max-w-7xl (px-10 xl:px-20),
            gleicher vertikaler Rhythmus: pt-14 → Überschrift → pb-10 → Inhalt (wie space-y-10).
          */}
          <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-1 flex-col px-10 pt-14 pb-12 xl:px-20">
            <header className="shrink-0 pb-16 lg:pb-24">
              <span className="text-white/40 tracking-widest uppercase text-xs">{SECTION_EYEBROW}</span>
              <h2 className="mt-2 text-4xl font-medium lg:text-5xl">Komponenten im Detail</h2>
            </header>

            <div className="grid min-h-0 flex-1 grid-cols-2 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)] lg:gap-14 xl:gap-16">
            {/* ── Left: Animated info panel (vertikal zur Bildmitte ausgerichtet) ── */}
            <div className="flex min-h-0 flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  {/* Tag */}
                  <span className="block text-white/30 text-xl tracking-[0.3em] font-black font-mono mb-5">
                    {active.tag}
                  </span>

                  {/* Name */}
                  <h3 className="text-3xl lg:text-4xl font-medium leading-tight">{active.name}</h3>

                  {/* Description */}
                  <p className="text-white/55 text-base leading-relaxed">{active.description}</p>

                  {/* Detail callout */}
                  <p className="text-white/35 text-sm leading-relaxed border-l border-white/12 pl-4">
                    {active.detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress pill indicator */}
              <div className="flex items-center gap-2 mt-10">
                {components.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 rounded-full bg-white"
                    animate={{
                      width: i === activeIndex ? 28 : 6,
                      opacity: i === activeIndex ? 1 : 0.18,
                    }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  />
                ))}
              </div>

              <p className="mt-5 text-xs tracking-wider text-white/20">{COMPONENT_NAV_HINT}</p>
            </div>

            {/* ── Right: Shisha image with annotation dots ── */}
            <div className="flex min-h-0 items-center justify-end xl:-mr-4 2xl:-mr-8">
              {/*
                inline-flex so the wrapper shrinks to image dimensions.
                Dots are absolute-positioned at (xPercent%, yPercent%)
                which maps directly onto the rendered image pixels.
              */}
              <div className="relative inline-flex translate-x-3 lg:translate-x-6 xl:translate-x-12 2xl:translate-x-16">
                <img
                  src={hookahImageDesktop}
                  alt="Shisha Exploded View"
                  className="max-h-[min(76dvh,calc(100dvh-11rem))] w-auto object-contain select-none"
                  draggable={false}
                />

                {components.map((comp, i) => {
                  const isActive = i === activeIndex;
                  const isPast   = i < activeIndex;
                  return (
                    <div
                      key={comp.tag}
                      className="absolute pointer-events-none"
                      style={{
                        top: `${comp.yPercent}%`,
                        left: `${comp.xPercent}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <motion.div
                        className="relative flex items-center justify-center"
                        animate={{ scale: isActive ? 1 : isPast ? 0.75 : 0.6 }}
                        transition={{ duration: 0.4, type: 'spring', bounce: 0.25 }}
                      >
                        {/* Ping ring — pulses only when active, snaps off instantly otherwise */}
                        <motion.div
                          className="absolute w-4 h-4 rounded-full"
                          animate={
                            isActive
                              ? { scale: 3.2, opacity: [0, 0.5, 0], backgroundColor: 'rgba(74,222,128,1)' }
                              : { scale: 1, opacity: 0 }
                          }
                          transition={
                            isActive
                              ? { duration: 1.5, repeat: Infinity, ease: 'easeOut' }
                              : { duration: 0 }
                          }
                        />

                        {/* Core dot */}
                        <motion.div
                          className="w-4 h-4 rounded-full border-[2.5px]"
                          animate={{
                            backgroundColor: isActive
                              ? 'rgba(74,222,128,1)'
                              : isPast
                              ? 'rgba(255,255,255,0.55)'
                              : 'rgba(255,255,255,0.04)',
                            borderColor: isActive
                              ? 'rgba(74,222,128,1)'
                              : isPast
                              ? 'rgba(255,255,255,0.55)'
                              : 'rgba(255,255,255,0.2)',
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
