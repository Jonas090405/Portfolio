import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Zap, Droplets, Wind } from 'lucide-react';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

const icons = [Zap, Droplets, Wind];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { audience } = useAudience();
  const { howItWorks } = audienceContent[audience];

  return (
    <section ref={ref} className="section-page">
      <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-14">

        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`hiw-header-${audience}`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/40 tracking-widest uppercase text-xs">
              {howItWorks.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">
              {howItWorks.headline}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="wait">
            {howItWorks.steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={`${audience}-step-${step.number}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="bg-[#161616] rounded-3xl p-6 sm:p-7 space-y-5 hover:bg-[#1e1e1e] transition-colors cursor-default"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-4xl sm:text-5xl font-light text-white/15 leading-none">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mt-1 shrink-0">
                      <Icon className="w-4 h-4 text-black/85" strokeWidth={2.1} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-white">{step.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/8">
                    <div className="text-[#00ff88] text-lg font-medium">{step.metric}</div>
                    <div className="text-white/35 text-xs mt-0.5">{step.metricLabel}</div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
