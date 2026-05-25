import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import hookahImage from '../../assets/smart-shisha-device.png';
import { ShoppingCart, Info, Package } from 'lucide-react';
import { ShishaInfoModal } from './ShishaInfoModal';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

export function ClosingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [modalOpen, setModalOpen] = useState(false);
  const { audience } = useAudience();
  const { closing } = audienceContent[audience];

  return (
    <section ref={ref} className="section-page">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center space-y-10 sm:space-y-14 lg:space-y-16">

          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`closing-text-${audience}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl space-y-4 sm:space-y-5"
            >
              <span className="text-white/40 tracking-widest uppercase text-xs">
                {closing.eyebrow}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium">
                {closing.headline}
              </h2>
              <p className="text-base sm:text-lg text-white/55 leading-relaxed">
                {closing.subline}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Hookah image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-[200px] sm:max-w-xs"
          >
            <img src={hookahImage} alt="Electric Hookah" className="w-full h-auto object-contain" />
          </motion.div>

          {/* Lieferumfang */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="w-full max-w-sm sm:max-w-md text-left"
          >
            <p className="text-white/35 text-xs tracking-widest uppercase mb-3">Lieferumfang</p>
            <div className="border-y border-white/8 divide-y divide-white/8">
              {[
                ['Electric Hookah Base', '1×'],
                ['Keramik-Heizkern', '1×'],
                ['Flavor Pods (Starter-Set)', '3×'],
                ['USB-C Ladekabel', '1×'],
                ['Mundstück (Silikon)', '2×'],
              ].map(([name, qty]) => (
                <div key={name} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Package className="w-3.5 h-3.5 text-white/25 shrink-0" strokeWidth={1.5} />
                    <span className="text-white/70 text-sm leading-snug">{name}</span>
                  </div>
                  <span className="text-white/35 text-sm shrink-0">{qty}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 border-t border-white/8 pt-8 sm:pt-10 w-full max-w-sm sm:max-w-md"
          >
            {[
              { value: '€ 249', label: 'Startpreis' },
              { value: '€ 0,80', label: 'Pro Session' },
              { value: '-40%', label: 'Ersparnis' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-[#00ff88] text-lg sm:text-xl lg:text-2xl font-medium">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`closing-cta-${audience}`}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-xl"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2.5 bg-white text-black py-4 px-5 sm:px-6 rounded-2xl hover:bg-white/90 transition-all font-medium text-sm sm:text-base"
              >
                <ShoppingCart className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span className="whitespace-nowrap">{closing.ctaPrimary}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2.5 bg-[#1a1a1a] border border-white/10 text-white py-4 px-5 sm:px-6 rounded-2xl hover:bg-white/5 transition-all text-sm sm:text-base"
              >
                <Info className="w-4 h-4 text-white/50 shrink-0" strokeWidth={1.5} />
                <span className="whitespace-nowrap">{closing.ctaSecondary}</span>
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-white/20 text-xs pb-2"
          >
            Trade Republic GmbH © 2026
          </motion.div>
        </div>
      </div>

      <ShishaInfoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
