import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Timer, Cloud, Lightbulb, Gauge, Activity } from 'lucide-react';
import appMockup from '../../assets/mockup.png';
import appMockupMobile from '../../assets/mockup_mobile.png';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

const CONTROL_ICONS = [Activity, Timer, Cloud, Lightbulb, Gauge];

export function AppControlSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { audience } = useAudience();
  const { appControl } = audienceContent[audience];

  return (
    <section ref={ref} className="section-page">
      <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-14">

        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`app-header-${audience}`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-white/40 tracking-widest uppercase text-sm sm:text-xs">
              {appControl.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">
              {appControl.headline}
            </h2>
            <p className="text-white/50 text-base sm:text-base mt-4 leading-relaxed">
              {appControl.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-8 sm:gap-7 xl:gap-10 items-start xl:items-center">
          {/* Mobile/Tablet mockup */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="order-1 xl:hidden flex items-center justify-center mb-20"
          >
            <img
              src={appMockupMobile}
              alt="Mobiles App-Mockup"
              className="w-full max-w-[180px] sm:max-w-[210px] h-auto object-contain drop-shadow-[0_18px_38px_rgba(0,0,0,0.45)]"
              loading="lazy"
            />
          </motion.div>

          {/* Desktop mockup */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 hidden xl:flex p-2 sm:p-4 xl:p-6 items-center justify-center xl:justify-end overflow-hidden"
          >
            <div className="relative w-full flex items-center justify-center">
              <div className="absolute inset-x-10 bottom-8 h-16 bg-[#1DB954]/15 blur-2xl rounded-full pointer-events-none" />
              <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[430px] xl:max-w-[520px] xl:translate-x-8 2xl:translate-x-20">
                <img
                  src={appMockup}
                  alt="App-Mockup mit Hand und iPhone"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
                  loading="lazy"
                />
                <div className="absolute -left-24 sm:-left-32 xl:-left-40 2xl:-left-52 right-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/75 to-transparent z-20 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Controls grid */}
          <div className="order-2 xl:order-1 grid grid-cols-2 gap-4 sm:gap-7 content-start max-w-4xl">
            {appControl.controls.map((item, index) => {
              const Icon = CONTROL_ICONS[index];
              return (
                <motion.article
                  key={`${audience}-${item.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.16 + index * 0.09 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white mx-auto flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-black/85" strokeWidth={2.1} />
                  </div>
                  <h3 className="text-white text-base sm:text-xl font-medium leading-tight">{item.title}</h3>
                  <p className="text-white/45 text-sm sm:text-sm leading-relaxed mt-2 max-w-[28ch] mx-auto">{item.subtext}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
