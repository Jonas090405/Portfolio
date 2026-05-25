import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import hookahImageMobile from '../../assets/shisha-exploded-components.png';
import hookahImageDesktop from '../../assets/shisha-exploded-premium.png';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

type ShishaComponent = {
  tag: string;
  name: string;
  description: string;
  detail: string;
  yPercent: number;
  xPercent: number;
};

const COMPONENT_LAYOUT = [
  { tag: '01', yPercent: 7, xPercent: 24 },
  { tag: '02', yPercent: 20, xPercent: 24 },
  { tag: '03', yPercent: 33, xPercent: 24 },
  { tag: '04', yPercent: 48, xPercent: 22 },
  { tag: '05', yPercent: 61, xPercent: 22 },
  { tag: '06', yPercent: 70, xPercent: 22 },
  { tag: '07', yPercent: 83, xPercent: 22 },
  { tag: '08', yPercent: 32, xPercent: 62 },
  { tag: '09', yPercent: 65, xPercent: 88 },
] as const;

export function ComponentBreakdown() {
  const { audience } = useAudience();
  const { componentBreakdown } = audienceContent[audience];

  const components: ShishaComponent[] = useMemo(
    () =>
      COMPONENT_LAYOUT.map((layout, i) => ({
        ...layout,
        ...componentBreakdown.items[i],
      })),
    [componentBreakdown.items],
  );
  /* ── Mobile accordion state ── */
  const mobileRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mobileRef, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* ── Desktop step-scroll state ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    setOpenIndex(null);
    setActiveIndex(0);
    activeIndexRef.current = 0;
  }, [audience]);
  const isSteppingRef = useRef(false);
  const wheelEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastDeltaRef = useRef(0);
  const deltaAccumRef = useRef(0);

  // How much total deltaY must accumulate before advancing one step
  const STEP_THRESHOLD = 250;

  const scrollToStep = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollable = containerHeight - viewportHeight;
    const progress = index / (components.length - 1);
    window.scrollTo({ top: containerTop + progress * scrollable, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const inSection = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!inSection) return;

      const absDelta = Math.abs(e.deltaY);
      const prevDelta = Math.abs(lastDeltaRef.current);
      lastDeltaRef.current = e.deltaY;

      // A new intentional gesture starts with a sharp jump in delta after inertia winds down
      const isNewGesture = isSteppingRef.current && absDelta > prevDelta * 3 && absDelta > 15;
      if (isNewGesture) {
        isSteppingRef.current = false;
        deltaAccumRef.current = 0;
        if (wheelEndTimerRef.current) { clearTimeout(wheelEndTimerRef.current); wheelEndTimerRef.current = null; }
      }

      // Reset the "gesture ended" timer on every event
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = setTimeout(() => {
        isSteppingRef.current = false;
        deltaAccumRef.current = 0;
        wheelEndTimerRef.current = null;
      }, 450);

      const idx = activeIndexRef.current;
      const goingDown = e.deltaY > 0;
      const atBoundary = (goingDown && idx >= components.length - 1) || (!goingDown && idx <= 0);

      // At boundaries let the page scroll naturally so the user can leave the section
      if (atBoundary) return;

      e.preventDefault();

      if (isSteppingRef.current) return;

      // Accumulate until threshold is reached
      deltaAccumRef.current += e.deltaY;
      if (Math.abs(deltaAccumRef.current) < STEP_THRESHOLD) return;

      deltaAccumRef.current = 0;
      isSteppingRef.current = true;

      if (goingDown) {
        const next = idx + 1;
        activeIndexRef.current = next;
        setActiveIndex(next);
        scrollToStep(next);
      } else {
        const prev = idx - 1;
        activeIndexRef.current = prev;
        setActiveIndex(prev);
        scrollToStep(prev);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollToStep]);

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
            <span className="text-white/40 tracking-widest uppercase text-xs">{componentBreakdown.eyebrow}</span>
            <h2 className="mt-2 text-3xl font-medium">{componentBreakdown.headline}</h2>
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
          <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-1 flex-col px-10 pt-14 pb-6 xl:px-20">
            <header className="shrink-0 pb-8 lg:pb-14">
              <span className="text-white/40 tracking-widest uppercase text-xs">{componentBreakdown.eyebrow}</span>
              <h2 className="mt-2 text-4xl font-medium lg:text-5xl">{componentBreakdown.headline}</h2>
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
                  className="max-h-[min(85dvh,calc(100dvh-7rem))] w-auto object-contain select-none"
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
