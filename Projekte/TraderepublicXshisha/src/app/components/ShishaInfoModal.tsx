import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Thermometer, Wind, Battery, Smartphone, Droplets, Shield, Package } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const specs = [
  { icon: Zap,         label: 'Heizzeit',        value: '30 Sek.',    sub: 'Sofortbereitschaft' },
  { icon: Thermometer, label: 'Temperatur',       value: '± 1 °C',     sub: 'Digitale Präzision' },
  { icon: Battery,     label: 'Akkulaufzeit',     value: '6+ Std.',    sub: 'Pro Ladung' },
  { icon: Wind,        label: 'Session-Dauer',    value: '45–60 Min.', sub: 'Pro Pod' },
  { icon: Smartphone,  label: 'App-Steuerung',    value: 'iOS & Android', sub: 'Bluetooth 5.0' },
  { icon: Droplets,    label: 'Wasservolumen',    value: '350 ml',     sub: 'Optimale Kühlung' },
];

const highlights = [
  {
    tag: 'Technologie',
    title: 'Elektrischer Heizkern',
    body: 'Unser proprietärer Keramik-Heizkern erreicht die Zieltemperatur in unter 30 Sekunden und hält sie auf ±1 °C genau — ohne Kohle, ohne Aufwand.',
  },
  {
    tag: 'Kosten',
    title: 'Ab € 0,80 pro Session',
    body: 'Ein Flavor Pod reicht für 45–60 Minuten. Gegenüber traditionellem Setup mit Kohle und Tabak sparst du bis zu 40 % der laufenden Kosten.',
  },
  {
    tag: 'Design',
    title: 'Modulares System',
    body: 'Jede Komponente ist einzeln austauschbar — Mundstück, Pod, Akkumodul. Keine Werkzeuge nötig. Kein proprietärer Lock-in.',
  },
  {
    tag: 'Nachhaltigkeit',
    title: 'Keine Verbrennungsrückstände',
    body: 'Elektrische Verdampfung erzeugt keinen Rauch und keine Asche. Deutlich reduzierter Geruch und sauberere Luft gegenüber klassischem Betrieb.',
  },
];

export function ShishaInfoModal({ open, onClose }: Props) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
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
            <div className="z-10 bg-[#111] border-b border-white/6 px-6 sm:px-8 py-5 flex items-center justify-between rounded-t-3xl sm:rounded-t-3xl">
              <div>
                <p className="text-white/40 text-xs tracking-widest uppercase">Electric Hookah</p>
                <h2 className="text-white mt-0.5">Alle Details</h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/14 transition-colors flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4 text-white/60" strokeWidth={1.5} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-10 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25 [&::-webkit-scrollbar-thumb:hover]:bg-white/35">

              {/* Specs grid */}
              <div>
                <p className="text-white/35 text-xs tracking-widest uppercase mb-4">Technische Daten</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {specs.map((spec) => {
                    const Icon = spec.icon;
                    return (
                      <div
                        key={spec.label}
                        className="bg-white/4 hover:bg-white/7 transition-colors rounded-2xl p-4 space-y-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-white/50" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-[#00ff88] text-lg font-light leading-tight">{spec.value}</div>
                          <div className="text-white/55 text-xs mt-0.5">{spec.label}</div>
                          <div className="text-white/25 text-xs">{spec.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <p className="text-white/35 text-xs tracking-widest uppercase mb-4">Im Detail</p>
                <div className="space-y-3">
                  {highlights.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-start gap-3 bg-white/4 rounded-2xl p-5"
                    >
                      <div>
                        <span className="text-[10px] text-white/30 tracking-wider uppercase border border-white/10 rounded-full px-2 py-0.5">
                          {item.tag}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-white text-sm">{item.title}</div>
                        <p className="text-white/45 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* What's in the box */}
              <div>
                <p className="text-white/35 text-xs tracking-widest uppercase mb-4">Lieferumfang</p>
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

              {/* Warranty */}
              <div className="flex items-start gap-3 bg-white/4 rounded-2xl p-5">
                <Shield className="w-4 h-4 text-[#00ff88] mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <div className="text-white text-sm">2 Jahre Garantie</div>
                  <p className="text-white/40 text-xs mt-1 leading-relaxed">
                    Vollständige Herstellergarantie auf alle Komponenten. Kostenloser Ersatzversand innerhalb der EU.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black py-4 rounded-2xl hover:bg-white/90 transition-all"
              >
                Jetzt vorbestellen — € 249
              </motion.button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
