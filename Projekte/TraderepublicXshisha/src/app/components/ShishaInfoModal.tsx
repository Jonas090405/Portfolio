import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Thermometer, Wind, Battery, Smartphone, Droplets, Shield, Package } from 'lucide-react';
import { useEffect } from 'react';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SPEC_ICONS = [Zap, Thermometer, Battery, Wind, Smartphone, Droplets] as const;

export function ShishaInfoModal({ open, onClose }: Props) {
  const { audience } = useAudience();
  const { modal } = audienceContent[audience];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32, mass: 0.7 }}
            className="fixed inset-x-4 bottom-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[61] w-auto sm:w-full sm:max-w-2xl max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl bg-[#111] border border-white/8 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="z-10 bg-[#111] border-b border-white/6 px-6 sm:px-8 py-5 flex items-center justify-between rounded-t-3xl">
              <div>
                <p className="text-white/40 text-xs tracking-widest uppercase">{modal.eyebrow}</p>
                <h2 className="text-white mt-0.5 font-medium">{modal.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/14 transition-colors flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4 text-white/60" strokeWidth={1.5} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-10 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25">

              {/* Specs grid — same for all audiences (technical facts) */}
              <div>
                <p className="text-white/35 text-xs tracking-widest uppercase mb-4">{modal.specsSectionLabel}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {modal.specs.map((spec, i) => {
                    const Icon = SPEC_ICONS[i];
                    return (
                      <div key={spec.label} className="bg-white/4 hover:bg-white/7 transition-colors rounded-2xl p-4 space-y-3">
                        <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-white/50" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-[#00ff88] text-lg font-medium leading-tight">{spec.value}</div>
                          <div className="text-white/55 text-xs mt-0.5">{spec.label}</div>
                          <div className="text-white/25 text-xs">{spec.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Highlights — audience-specific */}
              <div>
                <p className="text-white/35 text-xs tracking-widest uppercase mb-4">{modal.highlightsSectionLabel}</p>
                <div className="space-y-3">
                  {modal.highlights.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-start gap-3 bg-white/4 rounded-2xl p-5"
                    >
                      <span className="text-[10px] text-white/30 tracking-wider uppercase border border-white/10 rounded-full px-2 py-0.5">
                        {item.tag}
                      </span>
                      <div className="space-y-1.5">
                        <div className="text-white text-sm font-medium">{item.title}</div>
                        <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Lieferumfang */}
              <div>
                <p className="text-white/35 text-xs tracking-widest uppercase mb-4">{modal.deliverySectionLabel}</p>
                <div className="space-y-0 divide-y divide-white/6">
                  {[
                    ['Electric Hookah Base', '1×'],
                    ['Keramik-Heizkern', '1×'],
                    ['Flavor Pods (Starter-Set)', '3×'],
                    ['USB-C Ladekabel', '1×'],
                    ['Mundstück (Silikon)', '2×'],
                    ['Kurzanleitung', '1×'],
                  ].map(([name, qty]) => (
                    <div key={name} className="flex items-center justify-between py-3.5">
                      <div className="flex items-center gap-3">
                        <Package className="w-3.5 h-3.5 text-white/20" strokeWidth={1.5} />
                        <span className="text-white/70 text-sm">{name}</span>
                      </div>
                      <span className="text-white/30 text-sm">{qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garantie */}
              <div className="flex items-start gap-3 bg-white/4 rounded-2xl p-5">
                <Shield className="w-4 h-4 text-[#00ff88] mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="text-white text-sm font-medium">{modal.warranty.title}</div>
                  <p className="text-white/40 text-xs mt-1 leading-relaxed">
                    {modal.warranty.body}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black py-4 rounded-2xl hover:bg-white/90 transition-all font-medium"
              >
                {modal.ctaButton}
              </motion.button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
