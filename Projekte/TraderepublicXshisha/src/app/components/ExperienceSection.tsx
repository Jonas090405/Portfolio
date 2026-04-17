import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, GlassWater, Music4, Users, Clock3, Compass } from 'lucide-react';

const experiences = [
  {
    icon: Sparkles,
    title: 'Mood in Sekunden',
    detail: 'Kein Anfeuern, kein Warten. Ein Knopfdruck und der Moment wird sofort entspannt.',
    tag: 'Instant Vibe',
  },
  {
    icon: GlassWater,
    title: 'Geschmack, der bleibt',
    detail: 'Saubere Hitze bringt das Aroma klar raus. Jeder Zug schmeckt weich und intensiv.',
    tag: 'Pure Flavor',
  },
  {
    icon: Music4,
    title: 'Lounge-Feeling zuhause',
    detail: 'Licht runter, Beat an, Session läuft. Die Shisha wird zum Mittelpunkt vom Abend.',
    tag: 'Home Lounge',
  },
  {
    icon: Users,
    title: 'Mehr Zeit mit Leuten',
    detail: 'Weniger Setup, weniger Unterbrechungen. Mehr Gespräche, mehr Lachen, mehr Flow.',
    tag: 'Social Flow',
  },
  {
    icon: Clock3,
    title: 'Session ohne Stress',
    detail: 'Konstante Performance ohne Kohle-Wechsel. Du bleibst im Genuss, nicht im Aufwand.',
    tag: 'Zero Hassle',
  },
  {
    icon: Compass,
    title: 'Mehr Comfort, überall',
    detail: 'Ob Balkon, Wohnzimmer oder unterwegs bei Freunden: Du kannst deine Shisha flexibel überall nutzen.',
    tag: 'Anywhere Comfort',
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="text-white/40 tracking-widest uppercase text-xs">Experience</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">
            Warum sich jede Session besser anfühlt
          </h2>
          <p className="text-white/50 text-sm sm:text-base mt-4 leading-relaxed">
            Nicht nur praktisch, sondern purer Genuss: Diese Shisha macht aus einer Gewohnheit ein Ritual.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {experiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="bg-[#161616] rounded-3xl px-5 sm:px-6 py-5 sm:py-6 border border-white/8 hover:bg-[#1d1d1d] transition-colors"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-black/85" strokeWidth={2.1} />
                  </div>

                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base sm:text-lg text-white font-medium leading-tight">{item.title}</h3>
                      <span className="text-[10px] tracking-wider uppercase text-white/40 border border-white/15 rounded-full px-2 py-0.5">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-white/48 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
