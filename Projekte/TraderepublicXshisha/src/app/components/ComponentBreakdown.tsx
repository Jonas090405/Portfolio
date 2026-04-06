import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import hookahImage from '../../assets/shisha-exploded-components.png';

const components = [
  {
    name: 'Pod',
    description: 'Aromaeinheit fuer schnellen und sauberen Geschmackwechsel.',
    detail: 'Vorkonfektioniertes Pod-System fuer gleichbleibenden Geschmack ohne klebrigen Tabakaufbau.',
    tag: '01',
  },
  {
    name: 'Durchzugmodul',
    description: 'Steuert den Luftfluss gleichmaessig durch das System.',
    detail: 'Optimiertes Airflow-Design sorgt fuer konstanten Zugwiderstand und ruhiges Rauchverhalten.',
    tag: '02',
  },
  {
    name: 'Abdichtung',
    description: 'Dichtet die Module sauber und luftdicht ab.',
    detail: 'Hitze- und feuchtigkeitsresistente Dichtflaechen verhindern Nebenluft und Leistungsverlust.',
    tag: '03',
  },
  {
    name: 'Bowl',
    description: 'Wasserkammer fuer Kuehlung und ruhigen Durchzug.',
    detail: 'Das abgestimmte Volumen sorgt fuer weicheres Rauchgefuehl ueber die gesamte Session.',
    tag: '04',
  },
  {
    name: 'Keramik-Heizkern',
    description: 'Schnelles Aufheizen mit stabiler Temperatur.',
    detail: 'Thermisch traeges Keramikmaterial gleicht Lastspitzen aus und haelt den Geschmack konstant.',
    tag: '05',
  },
  {
    name: 'Heizkammer',
    description: 'Elektrische Hitzezone statt Kohle.',
    detail: 'Geschlossener Heizbereich mit praeziser Leistungsabgabe fuer reproduzierbaren Dampf.',
    tag: '06',
  },
  {
    name: 'Ladepad mit Steuerungs- und Akkuanzeige',
    description: 'Laden, steuern und Akkustand auf einen Blick.',
    detail: 'Integriertes Interface fuer Sessionkontrolle plus visuelles Feedback zur verbleibenden Akkuleistung.',
    tag: '07',
  },
  {
    name: 'Schlauch aus hochwertigem Gummi',
    description: 'Flexibel, robust und geschmacksneutral im Zug.',
    detail: 'Hochwertiges Material bleibt formstabil und sorgt fuer angenehme Handhabung bei langen Sessions.',
    tag: '08',
  },
  {
    name: 'Edelstahl-Mundstück',
    description: 'Hochwertiges Finish mit kuehler, praeziser Haptik.',
    detail: 'Langlebiger Edelstahl mit sauberem Durchzug und premium Gefuehl bei jedem Zug.',
    tag: '09',
  },
];

export function ComponentBreakdown() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-white/40 tracking-widest uppercase text-xs">Engineering</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-2">
            Komponenten im Detail
          </h2>
        </motion.div>

        {/* Grid: image + component list — side-by-side from md, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image — centered, visible but not oversized on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center order-2 md:order-1"
          >
            <img
              src={hookahImage}
              alt="Component Breakdown"
              className="w-full max-w-[250px] sm:max-w-sm md:max-w-md h-auto object-contain"
            />
          </motion.div>

          {/* Component list */}
          <div className="space-y-2 order-1 md:order-2">
            {components.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-[#161616] hover:bg-[#1c1c1c] transition-colors rounded-2xl px-4 sm:px-5 py-4 cursor-pointer group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center shrink-0">
                    <span className="text-white/40 text-xs">{component.tag}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm">{component.name}</div>
                    <div className="text-white/40 text-xs mt-0.5 truncate">{component.description}</div>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/20 group-hover:text-white/40 transition-colors text-lg shrink-0"
                  >
                    ›
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pl-11 sm:pl-12 text-white/50 text-xs leading-relaxed">
                        {component.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
