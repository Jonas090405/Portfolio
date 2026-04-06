import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Zap, Droplets, Wind } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Zap,
    title: 'Aktivieren',
    description: 'Einschalten. Elektrische Heizung erreicht optimale Temperatur in 30 Sekunden.',
    metric: '30 Sek.',
    metricLabel: 'bis bereit',
  },
  {
    number: '02',
    icon: Droplets,
    title: 'Pod einsetzen',
    description: 'Aroma-Pod in die Kammer einlegen. Das System kalibriert automatisch.',
    metric: '1 Klick',
    metricLabel: 'Einrichtung',
  },
  {
    number: '03',
    icon: Wind,
    title: 'Genießen',
    description: 'Gleichmäßige Dampfproduktion. Präzise Temperaturkontrolle während der gesamten Session.',
    metric: '45–60 Min.',
    metricLabel: 'Session-Dauer',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-white/40 tracking-widest uppercase text-xs">Anleitung</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-2">
            So funktioniert's
          </h2>
        </motion.div>

        {/* Step cards — single col on mobile, 2-col on sm, 3-col on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-[#161616] rounded-3xl p-6 sm:p-7 space-y-5 hover:bg-[#1e1e1e] transition-colors cursor-default"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className="text-4xl sm:text-5xl font-light text-white/15 leading-none">
                    {step.number}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mt-1 shrink-0">
                    <Icon className="w-4 h-4 text-black/85" strokeWidth={2.1} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-white">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Metric */}
                <div className="pt-2 border-t border-white/8">
                  <div className="text-[#00ff88] text-lg font-light">{step.metric}</div>
                  <div className="text-white/35 text-xs mt-0.5">{step.metricLabel}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
