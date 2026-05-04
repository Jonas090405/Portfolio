import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Zap, Thermometer, Package } from 'lucide-react';

const features = [
  {
    icon: Zap,
    label: 'Heizzeit',
    value: '30 Sek.',
    sub: 'Sofort bereit',
  },
  {
    icon: Thermometer,
    label: 'Temperatur',
    value: '± 1°C',
    sub: 'Digitale Präzision',
  },
  {
    icon: Package,
    label: 'Wartung',
    value: 'Keine',
    sub: 'Null Aufwand',
  },
];

export function ProductOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-page">
      <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl space-y-4"
        >
          <span className="text-white/40 tracking-widest uppercase text-xs">Technologie</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
            Tradition trifft Technologie
          </h2>
          <p className="text-base sm:text-lg text-white/55 leading-relaxed">
            Wir haben eine Shisha entwickelt, die alles Unnötige entfernt.
            Elektrische Wärme ersetzt Kohle, Asche und ständige Wartung.
          </p>
        </motion.div>

        {/* TR-style feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="bg-[#161616] rounded-3xl p-5 sm:p-6 space-y-4 hover:bg-[#1e1e1e] transition-colors cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm">{feature.label}</span>
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-black/85" strokeWidth={2.1} />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-medium text-white">{feature.value}</div>
                <div className="text-white/40 text-sm">{feature.sub}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom info row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-2 border-t border-white/8"
        >
          {[
            { label: 'Kein Kohle', desc: 'Saubere elektrische Verdampfung' },
            { label: 'Kein Rauch', desc: 'Reduzierte Nebenprodukte' },
            { label: 'App-Steuerung', desc: 'Volle digitale Kontrolle' },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="text-white text-sm">{item.label}</div>
              <div className="text-white/45 text-sm">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
