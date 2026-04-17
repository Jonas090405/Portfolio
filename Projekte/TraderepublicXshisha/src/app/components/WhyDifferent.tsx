import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const principles = [
  {
    number: '01',
    title: 'Transparenz',
    description: 'Keine versteckten Kosten, keine irreführenden Versprechen. Wir zeigen dir genau, was du bekommst und was es kostet.',
  },
  {
    number: '02',
    title: 'Nachhaltigkeit',
    description: 'Elektrisch statt Kohle. Langlebige Komponenten statt Wegwerfprodukte. Verantwortung für Umwelt und Gesundheit.',
  },
  {
    number: '03',
    title: 'Innovation',
    description: 'Wir hinterfragen Traditionen und setzen auf Technologie, die das Erlebnis verbessert – nicht verkompliziert.',
  },
  {
    number: '04',
    title: 'Einfachheit',
    description: 'Komplexität ist der Feind guter Erfahrungen. Unser Ziel: intuitive Bedienung, minimales Setup, maximaler Genuss.',
  },
];

export function WhyDifferent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <span className="text-white/40 tracking-widest uppercase text-xs">Unsere Prinzipien</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">
            Wofür wir stehen
          </h2>
        </motion.div>

        {/* Principles */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.15 }}
              className="flex gap-6 sm:gap-8 lg:gap-12"
            >
              {/* Number */}
              <div className="shrink-0">
                <span className="text-white/40 text-xl sm:text-2xl font-light">
                  {principle.number}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
                  {principle.title}
                </h3>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}