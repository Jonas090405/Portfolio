import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Zap, Thermometer, Package } from 'lucide-react';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

const icons = [Zap, Thermometer, Package];

export function ProductOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { audience } = useAudience();
  const { productOverview } = audienceContent[audience];

  return (
    <section ref={ref} className="section-page">
      <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-14">

        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`product-header-${audience}`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-4"
          >
            <span className="text-white/40 tracking-widest uppercase text-sm sm:text-xs">
              {productOverview.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
              {productOverview.headline}
            </h2>
            <p className="text-base sm:text-lg text-white/55 leading-relaxed">
              {productOverview.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="wait">
            {productOverview.features.map((feature, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={`${audience}-${feature.label}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#161616] rounded-3xl p-5 sm:p-6 space-y-4 hover:bg-[#1e1e1e] transition-colors cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">{feature.label}</span>
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-black/85" strokeWidth={2.1} />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-medium text-white">{feature.value}</div>
                  <div className="text-white/40 text-base sm:text-sm">{feature.sub}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom info row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`product-bottom-${audience}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-2 border-t border-white/8"
          >
            {productOverview.bottomRow.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="text-white text-base sm:text-sm">{item.label}</div>
                <div className="text-white/45 text-base sm:text-sm">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
