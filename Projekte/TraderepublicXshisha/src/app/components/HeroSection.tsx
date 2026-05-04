import { motion } from 'motion/react';
import hookahImage from '../../assets/smart-shisha-device.png';
import { Info, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { ShishaInfoModal } from './ShishaInfoModal';

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-10 xl:px-20 relative overflow-hidden pt-12 pb-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text + TR-style metric card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 order-2 lg:order-1"
        >
          <div className="space-y-3">
            <span className="text-white/40 tracking-widest uppercase text-xs sm:text-sm">
              Electric Hookah
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-none">
              Shisha.<br />
              <span className="text-white/30">Simplified.</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-white/55 max-w-lg leading-relaxed">
            Elektrische Wärme. Kein Kohle. Keine Komplexität.
            Nur präzise Kontrolle und ein saubereres Erlebnis.
          </p>

          {/* TR-style pill buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black rounded-2xl hover:bg-white/90 transition-all"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
              Vorbestellen
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1a1a1a] border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-white"
            >
              <Info className="w-4 h-4 text-white/50" strokeWidth={1.5} />
              Mehr erfahren
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Hookah image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center order-1 lg:order-2"
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