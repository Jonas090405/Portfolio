import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

const sections = [
  { id: 'hero',         label: 'Shisha simplified' },
  { id: 'product',      label: 'Produkt' },
  { id: 'components',   label: 'Komponenten' },
  { id: 'how-it-works', label: 'So funktioniert es' },
  { id: 'app-control',  label: 'Appsteuerung' },
  { id: 'performance',  label: 'Performance' },
  { id: 'experience',   label: 'Experience' },
  { id: 'benefits',     label: 'Vorteile' },
  { id: 'closing',      label: 'Jetzt kaufen' },
];

// Spring config — high stiffness + damping for snappy but fluid feel
const SPRING = { type: 'spring' as const, stiffness: 380, damping: 36, mass: 0.6 };

export function ScrollProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Continuous fractional progress: e.g. 1.4 = between section 1 and 2, 40% through
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 260, damping: 28, mass: 0.5 });

  const [hovered, setHovered] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHoverZoneActive, setIsHoverZoneActive] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ticking = useRef(false);
  const isMobileOpenRef = useRef(false);
  isMobileOpenRef.current = isMobileOpen;

  // Handle hover zone visibility
  useEffect(() => {
    if (isHoverZoneActive) {
      setIsVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    } else {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        if (!isMobileOpenRef.current) setIsVisible(false);
      }, 1500);
    }
  }, [isHoverZoneActive]);

  // Reveal navigation when pointer is near the left-center sidebar area (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) {
        if (isHoverZoneActive) setIsHoverZoneActive(false);
        return;
      }

      const nearSidebarX = e.clientX <= 140;
      const nearSidebarY = Math.abs(e.clientY - window.innerHeight / 2) <= 260;
      const isNearSidebar = nearSidebarX && nearSidebarY;

      if (isNearSidebar !== isHoverZoneActive) {
        setIsHoverZoneActive(isNearSidebar);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHoverZoneActive]);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const scrollY = window.scrollY;

        // Visibility
        if (scrollY > 80) {
          setIsVisible(true);
          if (hideTimer.current) clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => {
            if (!isMobileOpenRef.current && !isHoverZoneActive) setIsVisible(false);
          }, 2000);
        } else {
          if (!isHoverZoneActive) setIsVisible(false);
        }

        // On mobile, collapse the expanded sheet when the user scrolls.
        if (window.innerWidth < 1024 && isMobileOpenRef.current) {
          setIsMobileOpen(false);
        }

        // Compute continuous fractional index
        const offsets = sections.map(s => {
          const el = document.getElementById(s.id);
          if (!el) return 0;
          return el.getBoundingClientRect().top + scrollY;
        });

        let fractional = 0;
        const activationPoint = 0.5;
        for (let i = 0; i < offsets.length; i++) {
          const threshold = offsets[i] - window.innerHeight * activationPoint;
          if (scrollY >= threshold) {
            const next = offsets[i + 1]
              ? offsets[i + 1] - window.innerHeight * activationPoint
              : threshold + window.innerHeight;
            const span = next - threshold;
            const t = Math.min(1, Math.max(0, (scrollY - threshold) / span));
            fractional = i + t;
          }
        }

        rawProgress.set(fractional);
        // Use floor so the nav switches only after entering the next section.
        setActiveIndex(Math.min(sections.length - 1, Math.floor(fractional + 0.0001)));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [rawProgress, isHoverZoneActive]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileOpen(false);
  };

  return (
    <AnimatePresence>
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-2 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161616]/85 px-2 py-1.5 shadow-xl"
          onMouseEnter={() => setIsHoverZoneActive(true)}
          onClick={() => {
            setIsHoverZoneActive(true);
            setIsVisible(true);
          }}
          aria-label="Navigation minimiert"
          title="Navigation minimiert"
        >
          <span className="sr-only">Navigation minimiert</span>
          <motion.div
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1 w-1 rounded-full bg-white/80"
          />
          <div className="flex flex-col gap-0.5">
            <div className="h-[2px] w-2 rounded-full bg-white/45" />
            <div className="h-[2px] w-3 rounded-full bg-white/65" />
            <div className="h-[2px] w-2 rounded-full bg-white/45" />
          </div>
        </motion.button>
      )}

      {isVisible && (
        <>
          {/* ── Hover zone (desktop only) ── */}
          <div
            className="fixed left-0 top-1/2 -translate-y-1/2 w-16 h-80 z-40 hidden lg:block"
            onMouseEnter={() => setIsHoverZoneActive(true)}
            onMouseLeave={() => setIsHoverZoneActive(false)}
          />

          {/* ── Desktop sidebar ── */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-0.5"
            onMouseEnter={() => setIsHoverZoneActive(true)}
            onMouseLeave={() => {
              setHovered(null);
              setIsHoverZoneActive(false);
            }}
          >
            {sections.map((section, i) => {
              const isActive = activeIndex === i;
              const isHov = hovered === i;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  onMouseEnter={() => setHovered(i)}
                  className="relative flex items-center h-7 cursor-pointer group"
                  style={{ width: 180 }}
                  aria-label={section.label}
                >
                  {/* Track line */}
                  <motion.div
                    animate={{
                      width: isActive ? 30 : isHov ? 20 : 8,
                      backgroundColor: isActive
                        ? '#ffffff'
                        : isHov
                        ? 'rgba(255,255,255,0.55)'
                        : 'rgba(255,255,255,0.18)',
                      scaleY: isActive ? 1.4 : 1,
                    }}
                    transition={SPRING}
                    className="h-[2px] rounded-full shrink-0 origin-left"
                  />

                  {/* Label — always mounted, opacity animated */}
                  <motion.span
                    animate={{
                      opacity: isActive ? 1 : isHov ? 0.55 : 0,
                      x: isActive || isHov ? 0 : -6,
                    }}
                    transition={SPRING}
                    className="absolute left-10 text-xs whitespace-nowrap select-none pointer-events-none"
                    style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
                  >
                    {section.label}
                  </motion.span>
                </button>
              );
            })}
          </motion.nav>
        </>
      )}

      {/* ── Mobile pill (always visible on mobile) ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 left-4 z-50 lg:hidden"
      >
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mb-3 bg-[#161616] border border-white/8 rounded-3xl py-2 overflow-hidden shadow-2xl"
            >
              {sections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-left"
                >
                  <motion.div
                    animate={{
                      backgroundColor: activeIndex === i ? '#ffffff' : 'rgba(255,255,255,0.18)',
                      width: activeIndex === i ? 16 : 8,
                      scaleY: activeIndex === i ? 1.25 : 1,
                    }}
                    transition={SPRING}
                    className="h-[2px] rounded-full shrink-0"
                  />
                  <motion.span
                    animate={{ opacity: activeIndex === i ? 1 : 0.38 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-white"
                  >
                    {section.label}
                  </motion.span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsMobileOpen(p => !p)}
          aria-expanded={isMobileOpen}
          aria-label="Navigationsmenu umschalten"
          className="flex items-center gap-2.5 bg-[#161616] border border-white/10 rounded-3xl px-4 py-2.5 shadow-xl"
        >
          <div className="flex gap-[3px] items-center">
            {sections.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: activeIndex === i ? '#ffffff' : 'rgba(255,255,255,0.18)',
                  width: activeIndex === i ? 14 : 4,
                  scaleY: activeIndex === i ? 1.25 : 1,
                }}
                transition={SPRING}
                className="h-[3px] rounded-full"
              />
            ))}
          </div>
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="text-white/60 text-xs"
          >
            {sections[activeIndex]?.label}
          </motion.span>
          <motion.span
            animate={{ rotate: isMobileOpen ? 225 : 45 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-2.5 h-2.5 border-r border-b border-white/70 shrink-0"
          />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}