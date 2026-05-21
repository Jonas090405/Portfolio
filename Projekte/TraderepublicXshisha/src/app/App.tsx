import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { InfluencerSection } from './components/InfluencerSection';
import { ProductOverview } from './components/ProductOverview';
import { ComponentBreakdown } from './components/ComponentBreakdown';
import { SmokePerformance } from './components/SmokePerformance';
import { HowItWorks } from './components/HowItWorks';
import { AppControlSection } from './components/AppControlSection';
import { ExperienceSection } from './components/ExperienceSection';
import { BenefitsGrid } from './components/BenefitsGrid';
import { ClosingSection } from './components/ClosingSection';
import { ScrollProgress } from './components/ScrollProgress';
import { AudienceContext } from './context/AudienceContext';
import type { AudienceId } from './context/AudienceContext';
import { audienceContent } from './data/audienceContent';

export default function App() {
  const [audience, setAudience] = useState<AudienceId>(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTimer, setToastTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const switchAudience = useCallback(
    (id: AudienceId) => {
      setAudience(id);
      setToastVisible(true);
      if (toastTimer) clearTimeout(toastTimer);
      const t = setTimeout(() => setToastVisible(false), 3000);
      setToastTimer(t);
    },
    [toastTimer],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === '1') switchAudience(1);
      if (e.key === '2') switchAudience(2);
      if (e.key === '3') switchAudience(3);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [switchAudience]);

  useEffect(() => () => { if (toastTimer) clearTimeout(toastTimer); }, [toastTimer]);

  const current = audienceContent[audience];

  return (
    <AudienceContext.Provider value={{ audience, setAudience: switchAudience }}>
      <div className="bg-black text-white min-h-screen antialiased">
        <ScrollProgress />

        <div id="hero"><HeroSection /></div>
        <div id="influencer"><InfluencerSection /></div>
        <div id="product"><ProductOverview /></div>
        <div id="components"><ComponentBreakdown /></div>
        <div id="how-it-works"><HowItWorks /></div>
        <div id="app-control"><AppControlSection /></div>
        <div id="performance"><SmokePerformance /></div>
        <div id="experience"><ExperienceSection /></div>
        <div id="benefits"><BenefitsGrid /></div>
        <div id="closing"><ClosingSection /></div>
      </div>

      {/* ── Audience indicator toast ── */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            key="audience-toast"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-[rgba(20,20,20,0.92)] backdrop-blur-md">
              <div className="flex gap-1.5">
                {([1, 2, 3] as AudienceId[]).map((id) => (
                  <div
                    key={id}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      background: id === audience ? '#00ff88' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-white/60 font-medium tracking-wide">
                {current.label}
              </span>
              <span className="text-xs font-semibold ml-1 text-[#00ff88]">
                [{audience}]
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AudienceContext.Provider>
  );
}
