import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ReferenceLine,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import smokeImage from '../../assets/shisha-smoke-trail.jpeg';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

const rawData = [
  { min: '0',  trShisha: 88, herkoemlich: 62 },
  { min: '5',  trShisha: 94, herkoemlich: 82 },
  { min: '10', trShisha: 97, herkoemlich: 90 },
  { min: '15', trShisha: 96, herkoemlich: 87 },
  { min: '20', trShisha: 95, herkoemlich: 81 },
  { min: '25', trShisha: 97, herkoemlich: 74 },
  { min: '30', trShisha: 96, herkoemlich: 65 },
  { min: '35', trShisha: 95, herkoemlich: 56 },
  { min: '40', trShisha: 96, herkoemlich: 47 },
  { min: '45', trShisha: 97, herkoemlich: 38 },
  { min: '50', trShisha: 95, herkoemlich: 28 },
  { min: '55', trShisha: 96, herkoemlich: 18 },
  { min: '60', trShisha: 95, herkoemlich: 10 },
];

const STATS = [
  { label: 'Peak-Dampf', value: '97%', sub: 'Max. Intensität' },
  { label: 'Konstant', value: '±2%', sub: 'Schwankung 60 min' },
  { label: 'Session', value: '60 min', sub: 'Volle Leistung' },
  { label: 'Aufheizzeit', value: '8 sek', sub: 'Unter 10 Sekunden' },
  { label: 'Temperatur', value: '210°C', sub: 'Präzise geregelt' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161616] border border-white/10 rounded-2xl px-4 py-3 shadow-2xl space-y-1.5 min-w-[150px]">
        <p className="text-white/40 text-xs mb-2">{label} min</p>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: entry.color }} />
            <span className="text-white/60 text-xs flex-1">
              {entry.dataKey === 'trShisha' ? 'TR Shisha' : 'Herkömmlich'}
            </span>
            <span className="text-sm font-light ml-2" style={{ color: entry.color }}>
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function SmokePerformance() {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isChartInView = useInView(chartRef, { once: true, amount: 0.35 });
  const { audience } = useAudience();
  const { smokePerformance } = audienceContent[audience];

  return (
    <section ref={ref} className="section-page overflow-hidden">
      {/* Background smoke image */}
      <div
        className="absolute inset-x-0 -top-20 -bottom-20 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${smokeImage})` }}
      />
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-48 pointer-events-none bg-gradient-to-b from-black via-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-10 sm:space-y-12 lg:space-y-16">

        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`smoke-header-${audience}`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/40 tracking-widest uppercase text-sm sm:text-xs">
              {smokePerformance.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">
              {smokePerformance.headline}
            </h2>
            <p className="text-white/40 mt-3 max-w-lg text-base sm:text-sm leading-relaxed">
              {smokePerformance.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Chart + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 lg:gap-8 items-stretch">

          {/* Chart card */}
          <motion.div
            ref={chartRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isChartInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/50 backdrop-blur-md border border-white/[0.08] rounded-3xl p-4 sm:p-6 lg:p-8 h-full"
          >
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-5 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-[2px] rounded-full bg-[#1DB954]" />
                <span className="text-white/50 text-sm sm:text-xs">TR Shisha</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-[2px] rounded-full bg-white/30" />
                <span className="text-white/50 text-sm sm:text-xs">Herkömmliche Shisha</span>
              </div>
              <div className="ml-auto hidden sm:block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`badge-${audience}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#1DB954]/10 text-[#1DB954] text-xs px-3 py-1 rounded-full border border-[#1DB954]/20"
                  >
                    {smokePerformance.badge}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div style={{ height: 240 }}>
              {isChartInView ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rawData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="min"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }}
                      tickFormatter={(v) => `${v}'`}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }}
                      domain={[0, 100]}
                      tickFormatter={(v) => `${v}%`}
                      width={38}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
                    <ReferenceLine y={80} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                    <Line type="monotone" dataKey="herkoemlich" stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} dot={false}
                      isAnimationActive animationBegin={250} animationDuration={1400} animationEasing="ease-out"
                      activeDot={{ r: 3, fill: 'rgba(255,255,255,0.5)', stroke: 'none' }} />
                    <Line type="monotone" dataKey="trShisha" stroke="#1DB954" strokeWidth={2} dot={false}
                      isAnimationActive animationBegin={350} animationDuration={1200} animationEasing="ease-out"
                      activeDot={{ r: 4, fill: '#1DB954', stroke: '#000', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : <div className="w-full h-full" />}
            </div>

            <p className="text-white/20 text-sm sm:text-xs mt-4 text-center">
              Dampfintensität in % · Sessiondauer in Minuten
            </p>
          </motion.div>

          {/* Stats sidebar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-5 gap-3 lg:gap-4 h-full">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.09 }}
                className="bg-black/50 backdrop-blur-md border border-white/[0.08] rounded-2xl px-4 py-3.5 lg:px-5 lg:py-3 h-full flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-white/40 text-sm sm:text-xs">{stat.label}</div>
                  <div className="text-white/30 text-xs sm:text-[11px] mt-0.5 leading-snug">{stat.sub}</div>
                </div>
                <div className="text-[#1DB954] text-xl lg:text-lg font-medium shrink-0 mt-1 lg:mt-0">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom pills */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`smoke-pills-${audience}`}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3"
          >
            {smokePerformance.bottomPills.map((pill) => (
              <span
                key={pill}
                className="bg-black/40 backdrop-blur-sm border border-white/[0.10] text-white/50 text-sm sm:text-xs px-3 sm:px-4 py-2 rounded-full text-center"
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
