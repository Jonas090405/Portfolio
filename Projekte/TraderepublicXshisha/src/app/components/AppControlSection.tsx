import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Timer, Cloud, Lightbulb, Gauge, Activity } from 'lucide-react';
import appMockup from '../../assets/mockup.png';
import appMockupMobile from '../../assets/mockup_mobile.png';

const controls = [
  {
    icon: Activity,
    title: 'Züge verfolgen',
    subtext: 'Live-Tracking jedes Zuges ueber die komplette Session.',
  },
  {
    icon: Timer,
    title: 'Sessiontimer',
    subtext: 'Sekundengenaue Laufzeit fuer perfekte Session-Kontrolle.',
  },
  {
    icon: Cloud,
    title: 'Rauchentwicklung',
    subtext: 'Intensitaet beobachten und direkt in der App anpassen.',
  },
  {
    icon: Lightbulb,
    title: 'LED-Effekte',
    subtext: 'Farben, Modi und Helligkeit flexibel konfigurieren.',
  },
  {
    icon: Gauge,
    title: 'Luftzug (Widerstand)',
    subtext: 'Widerstand feinjustieren fuer deinen idealen Draw.',
  },
];

export function AppControlSection() {
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
          <span className="text-white/40 tracking-widest uppercase text-xs">Appsteuerung</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-2">
            Alles in einer App im Griff
          </h2>
          <p className="text-white/50 text-sm sm:text-base mt-4 leading-relaxed">
            Vom ersten Zug bis zum Session-Ende steuerst und ueberwachst du alle wichtigen Funktionen direkt auf dem Smartphone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 sm:gap-7 lg:gap-10 items-start lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="order-1 lg:hidden flex items-center justify-center"
          >
            <img
              src={appMockupMobile}
              alt="Mobiles App-Mockup"
              className="w-full max-w-[180px] sm:max-w-[210px] h-auto object-contain drop-shadow-[0_18px_38px_rgba(0,0,0,0.45)]"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 hidden lg:flex p-2 sm:p-4 lg:p-6 items-center justify-center lg:justify-end overflow-hidden"
          >
            <div className="relative w-full flex items-center justify-center">
              <div className="absolute inset-x-10 bottom-8 h-16 bg-[#1DB954]/15 blur-2xl rounded-full pointer-events-none" />
              <div className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[430px] lg:max-w-[520px] lg:translate-x-8 xl:translate-x-20">
                <img
                  src={appMockup}
                  alt="App-Mockup mit Hand und iPhone"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
                  loading="lazy"
                />
                <div className="absolute -left-24 sm:-left-32 lg:-left-40 xl:-left-52 right-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/75 to-transparent z-20 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 sm:gap-7 content-start max-w-4xl">
            {controls.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.16 + index * 0.09 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white mx-auto flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-black/85" strokeWidth={2.1} />
                  </div>
                  <h3 className="text-white text-sm sm:text-xl leading-tight">{item.title}</h3>
                  <p className="text-white/45 text-xs sm:text-sm leading-relaxed mt-2 max-w-[28ch] mx-auto">{item.subtext}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
