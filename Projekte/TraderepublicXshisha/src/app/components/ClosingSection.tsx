import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import hookahImage from '../../assets/smart-shisha-device.png';
import { ShoppingCart, Info } from 'lucide-react';
import { ShishaInfoModal } from './ShishaInfoModal';

export function ClosingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-10 sm:space-y-14 lg:space-y-16">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-4 sm:space-y-5"
          >
            <span className="text-white/40 tracking-widest uppercase text-xs">Jetzt verfügbar</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium">
              Shisha, neu gedacht.
            </h2>
            <p className="text-base sm:text-lg text-white/55 leading-relaxed">
              Erlebe die Zukunft der Wasserpfeife. Präzise. Sauber. Elektrisch.
            </p>
          </motion.div>

          {/* Hookah image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-[200px] sm:max-w-xs"
          >
            <img
              src={hookahImage}
              alt="Electric Hookah"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Stats row */}
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
                <div className="text-[#00ff88] text-lg sm:text-xl lg:text-2xl font-medium">{stat.value}</div>
                <div className="text-white/40 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-4 px-6 rounded-2xl hover:bg-white/90 transition-all"
            >
              <ShoppingCart className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span>Vorbestellen</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-3 bg-[#1a1a1a] border border-white/10 text-white py-4 px-6 rounded-2xl hover:bg-white/5 transition-all"
            >
              <Info className="w-4 h-4 text-white/50 shrink-0" strokeWidth={1.5} />
              <span>Mehr erfahren</span>
            </motion.button>
          </motion.div>

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
