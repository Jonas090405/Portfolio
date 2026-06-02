import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import hookahImage from '../../assets/smart-shisha-device.png';
import { Info, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { ShishaInfoModal } from './ShishaInfoModal';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const { audience } = useAudience();
  const { hero } = audienceContent[audience];

  return (
    <section className="min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-10 xl:px-20 relative overflow-hidden pt-12 pb-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-center">

        {/* Left: Text */}
        <div className="space-y-8 order-2 xl:order-1">
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={`eyebrow-${audience}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-white/40 tracking-widest uppercase text-xs sm:text-sm block"
              >
                {hero.eyebrow}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${audience}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-none"
              >
                {hero.headline[0]}<br />
                <span className="text-white/30">{hero.headline[1]}</span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={`subline-${audience}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-white/55 max-w-lg leading-relaxed"
            >
              {hero.subline}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${audience}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 bg-white text-black rounded-2xl hover:bg-white/90 transition-all font-medium text-sm sm:text-base"
              >
                <ShoppingCart className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span className="whitespace-nowrap">{hero.ctaPrimary}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 bg-[#1a1a1a] border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-white text-sm sm:text-base"
              >
                <Info className="w-4 h-4 text-white/50 shrink-0" strokeWidth={1.5} />
                <span className="whitespace-nowrap">{hero.ctaSecondary}</span>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Hookah image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center order-1 xl:order-2"
        >
          <img
            src={hookahImage}
            alt="Electric Hookah Breakdown"
            className="w-full max-w-[280px] sm:max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain"
          />
        </motion.div>
      </div>
      <ShishaInfoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
