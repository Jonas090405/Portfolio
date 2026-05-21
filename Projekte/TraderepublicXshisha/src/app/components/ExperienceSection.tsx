import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, GlassWater, Music4, Users, Clock3, Compass } from 'lucide-react';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

const icons = [Sparkles, GlassWater, Music4, Users, Clock3, Compass];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { audience } = useAudience();
  const { experience } = audienceContent[audience];

  return (
    <section ref={ref} className="section-page">
      <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-14">

        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`exp-header-${audience}`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-white/40 tracking-widest uppercase text-xs">
              {experience.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">
              {experience.headline}
            </h2>
            <p className="text-white/50 text-sm sm:text-base mt-4 leading-relaxed">
              {experience.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <AnimatePresence mode="wait">
            {experience.items.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.article
                  key={`${audience}-exp-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-[#161616] rounded-3xl px-5 sm:px-6 py-5 sm:py-6 border border-white/8 hover:bg-[#1d1d1d] transition-colors"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-black/85" strokeWidth={2.1} />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base sm:text-lg text-white font-medium leading-tight">
                          {item.title}
                        </h3>
                        <span className="text-[10px] tracking-wider uppercase text-white/40 border border-white/15 rounded-full px-2 py-0.5 shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-white/48 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
