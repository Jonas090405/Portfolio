import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect, useMemo } from 'react';
import hookahImageMobile from '../../assets/shisha-exploded-components.png';
import explodeVideo from '../../assets/shisha-explode.mp4';
import explodePoster from '../../assets/shisha-explode-poster.webp';
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

/*
 * Dot positions mapped onto the FINAL (fully-exploded, static) frame of the
 * reveal video — measured as a percentage of the video box, so they scale and
 * move together with the device at any size / breakpoint.
 * Order: cap → chimney → seal/vapour gap → glass bowl → glowing core →
 * heat chamber → charging base → hose → mouthpiece.
 */
const COMPONENT_LAYOUT = [
  { tag: '01', yPercent: 10, xPercent: 50 },
  { tag: '02', yPercent: 24, xPercent: 50 },
  { tag: '03', yPercent: 39, xPercent: 51 },
  { tag: '04', yPercent: 51, xPercent: 40 },
  { tag: '05', yPercent: 50, xPercent: 49 },
  { tag: '06', yPercent: 55, xPercent: 50 },
  { tag: '07', yPercent: 61, xPercent: 49 },
  { tag: '08', yPercent: 50, xPercent: 78 },
  { tag: '09', yPercent: 72, xPercent: 31 },
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

  /* ── Mobile accordion state (unchanged: old image + dropdown) ── */
  const mobileRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mobileRef, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* ── Desktop discrete step state ──
     step 0 = assembled (intro, no dot); steps 1..n = one component each,
     shown on the fully-exploded, static device. */
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  const STEPS = components.length + 1;

  /* Largest box of the video's real aspect ratio that fits the available
     stage — measured in JS (aspect read from the loaded video) so the device
     is always as big as fits, fully shown via object-contain (never clipped),
     and the dot overlay matches the video box exactly. */
  const aspectRef = useRef(600 / 1066);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = stageRef.current;
    const video = videoRef.current;
    if (!el) return;
    const measure = () => {
      const aw = el.clientWidth;
      const ah = el.clientHeight;
      if (!aw || !ah) return;
      const a = aspectRef.current;
      let h = ah;
      let w = h * a;
      if (w > aw) { w = aw; h = w / a; }
      setBox({ w: Math.round(w), h: Math.round(h) });
    };
    const onMeta = () => {
      if (video && video.videoWidth) aspectRef.current = video.videoWidth / video.videoHeight;
      measure();
    };
    if (video) video.addEventListener('loadedmetadata', onMeta);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (video) video.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  useEffect(() => {
    setOpenIndex(null);
    setStep(0);
    stepRef.current = 0;
    if (videoRef.current) { try { videoRef.current.currentTime = 0; } catch { /* noop */ } }
  }, [audience]);

  /*
   * Discrete, one-at-a-time stepping.
   *
   * Inside the pinned section every wheel gesture is captured: accumulated
   * delta past a threshold advances EXACTLY one step, then a lock (timeout)
   * blocks further input until that step's transition has settled — so a hard
   * flick can never skip multiple components. The explosion plays only on the
   * 0→1 transition (eased video tween); afterwards the device is static and
   * each step simply swaps the active dot/info. At the first/last step the
   * wheel is released so the page scrolls in/out of the section normally.
   */
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let lock = false;
    let accum = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    let tweenRaf = 0;
    const THRESHOLD = 120;

    const targetTime = (s: number) =>
      s === 0 || !video.duration ? 0 : video.duration - 0.05;

    const tweenTo = (to: number, dur: number) => {
      if (tweenRaf) cancelAnimationFrame(tweenRaf);
      const from = video.currentTime;
      const delta = to - from;
      if (Math.abs(delta) < 0.001) return;
      const t0 = performance.now();
      const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
      const frame = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        try { video.currentTime = from + delta * ease(p); } catch { /* not seekable */ }
        if (p < 1) tweenRaf = requestAnimationFrame(frame);
      };
      tweenRaf = requestAnimationFrame(frame);
    };

    const scrollToStep = (s: number) => {
      const top = container.offsetTop;
      const scrollable = container.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (s / (STEPS - 1)) * scrollable, behavior: 'smooth' });
    };

    const goToStep = (s: number) => {
      const next = Math.max(0, Math.min(STEPS - 1, s));
      if (next === stepRef.current) return;
      const isExplosion =
        (stepRef.current === 0 && next === 1) || (stepRef.current === 1 && next === 0);
      stepRef.current = next;
      setStep(next);
      tweenTo(targetTime(next), isExplosion ? 1100 : 260);
      scrollToStep(next);
      return isExplosion;
    };

    const onWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return;

      const goingDown = e.deltaY > 0;
      const atStart = stepRef.current <= 0 && !goingDown;
      const atEnd = stepRef.current >= STEPS - 1 && goingDown;
      if (atStart || atEnd) return; // let the page scroll out of the section

      e.preventDefault();
      if (lock) return;

      accum += e.deltaY;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { accum = 0; }, 180);
      if (Math.abs(accum) < THRESHOLD) return;

      const dir = accum > 0 ? 1 : -1;
      accum = 0;
      lock = true;
      const wasExplosion = goToStep(stepRef.current + dir);
      setTimeout(() => { lock = false; accum = 0; }, wasExplosion ? 1200 : 620);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (resetTimer) clearTimeout(resetTimer);
      if (tweenRaf) cancelAnimationFrame(tweenRaf);
    };
  }, [STEPS]);

  const activeIndex = step - 1;
  const active = activeIndex >= 0 ? components[activeIndex] : null;

  return (
    <>
      {/* ─────────────────────────────────────────
          MOBILE  — klassisches Accordion (altes Bild)
      ───────────────────────────────────────── */}
      <section ref={mobileRef} className="section-page xl:hidden">
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
          DESKTOP  — Sticky scroll-scrubbed explosion video
      ───────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="hidden xl:block relative"
        style={{ height: `${STEPS * 42}vh` }}
      >
        <div className="sticky top-0 h-dvh overflow-hidden bg-black">
          {/* Section heading — top-left overlay */}
          <div className="absolute left-10 top-7 z-20 xl:left-14">
            <span className="text-white/40 tracking-widest uppercase text-xs">{componentBreakdown.eyebrow}</span>
            <h2 className="mt-1 text-3xl font-medium lg:text-4xl">{componentBreakdown.headline}</h2>
          </div>

          {/* Stage — device fills the full viewport height, offset right to
              leave room for the text overlay on the left. */}
          <div ref={stageRef} className="absolute inset-y-0 right-0 left-[24rem] z-0 xl:left-[26rem]">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: box.w || undefined, height: box.h || undefined }}
            >
              {/* Soft brand glow behind the device */}
              <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 50% 58% at 50% 48%, rgba(0,255,136,0.12), transparent 70%)',
                }}
              />

              <video
                ref={videoRef}
                src={explodeVideo}
                poster={explodePoster}
                muted
                playsInline
                preload="auto"
                aria-label="Animierte Explosionsdarstellung der Shisha"
                className="absolute inset-0 h-full w-full object-contain select-none pointer-events-none"
              />

              {/* Single active annotation dot — appears once its part has settled */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    key={activeIndex}
                    className="absolute pointer-events-none"
                    style={{
                      top: `${active.yPercent}%`,
                      left: `${active.xPercent}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulsing ring — fades in AND out each cycle, no hard reset flash */}
                      <motion.div
                        className="absolute w-5 h-5 rounded-full"
                        style={{ backgroundColor: 'rgba(0,255,136,0.9)' }}
                        animate={{ scale: [1, 3.4], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      {/* Core dot */}
                      <div
                        className="w-5 h-5 rounded-full border-[2.5px]"
                        style={{
                          backgroundColor: 'rgba(0,255,136,1)',
                          borderColor: 'rgba(0,255,136,1)',
                          boxShadow: '0 0 16px 2px rgba(0,255,136,0.6)',
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Info overlay — left column */}
          <div className="absolute left-10 top-1/2 z-20 w-[20rem] -translate-y-1/2 xl:left-14 xl:w-[22rem]">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-5"
                >
                  <span className="block text-white/30 text-xl tracking-[0.3em] font-black font-mono mb-5">
                    {active.tag}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-medium leading-tight">{active.name}</h3>
                  <p className="text-white/55 text-base leading-relaxed">{active.description}</p>
                  <p className="text-white/35 text-sm leading-relaxed border-l border-white/12 pl-4">
                    {active.detail}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <h3 className="text-3xl lg:text-4xl font-medium leading-tight">
                    Jedes Bauteil,<br /><span className="text-white/35">einzeln betrachtet.</span>
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress pills */}
            <div className="flex items-center gap-2 mt-10">
              {components.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 rounded-full bg-white"
                  animate={{
                    width: i === activeIndex ? 28 : 6,
                    opacity: i === activeIndex ? 1 : i < activeIndex ? 0.4 : 0.16,
                  }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                />
              ))}
            </div>

            <p className="mt-6 text-white/25 text-xs tracking-widest uppercase">
              {active ? `${activeIndex + 1} / ${components.length}` : 'Scrollen zum Zerlegen'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
