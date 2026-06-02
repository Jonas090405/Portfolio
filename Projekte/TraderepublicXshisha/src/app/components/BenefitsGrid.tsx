import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

const comparisonData = [
  { month: 'Jan', traditionell: 28, elektrisch: 8 },
  { month: 'Feb', traditionell: 56, elektrisch: 16 },
  { month: 'Mär', traditionell: 84, elektrisch: 24 },
  { month: 'Apr', traditionell: 112, elektrisch: 32 },
  { month: 'Mai', traditionell: 140, elektrisch: 40 },
  { month: 'Jun', traditionell: 168, elektrisch: 48 },
  { month: 'Jul', traditionell: 196, elektrisch: 56 },
  { month: 'Aug', traditionell: 224, elektrisch: 64 },
  { month: 'Sep', traditionell: 252, elektrisch: 72 },
  { month: 'Okt', traditionell: 280, elektrisch: 80 },
  { month: 'Nov', traditionell: 308, elektrisch: 88 },
  { month: 'Dez', traditionell: 336, elektrisch: 96 },
];

const ComparisonTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl px-4 py-3 shadow-xl space-y-1.5">
        <p className="text-white/50 text-xs mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-white/60 text-xs">
              {entry.dataKey === 'elektrisch' ? 'Elektrisch' : 'Traditionell'}
            </span>
            <span className="text-sm ml-auto pl-3" style={{ color: entry.color }}>
              € {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function BenefitsGrid() {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isChartInView = useInView(chartRef, { once: true, amount: 0.35 });
  const { audience } = useAudience();
  const { benefits } = audienceContent[audience];

  return (
    <section ref={ref} className="section-page">
      <div className="max-w-7xl mx-auto w-full space-y-10 sm:space-y-14">

        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`benefits-header-${audience}`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/40 tracking-widest uppercase text-sm sm:text-xs">
              {benefits.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-2">
              {benefits.headline}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence mode="wait">
            {benefits.metrics.map((benefit, index) => (
              <motion.div
                key={`${audience}-${benefit.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-[#161616] rounded-3xl p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3 hover:bg-[#1e1e1e] transition-colors cursor-default"
              >
                <div className="text-white/50 text-base sm:text-sm">{benefit.title}</div>
                {benefit.metric && (
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#00ff88]">
                    {benefit.metric}
                  </div>
                )}
                <p className="text-white/45 text-sm sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Comparison chart */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isChartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#161616] rounded-3xl p-5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="space-y-1">
              <div className="text-white/45 text-sm sm:text-xs tracking-wider uppercase">Kostenvergleich</div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white">
                Traditionell vs. Elektrisch
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`savings-${audience}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-1.5 text-[#00ff88] text-sm"
                >
                  <span>▲</span>
                  <span>{benefits.chartSavings}</span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-0.5 rounded-full bg-white/35" />
                <span className="text-white/40 text-xs sm:text-sm">Traditionell</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-0.5 rounded-full bg-[#00ff88]" />
                <span className="text-[#00ff88] text-xs sm:text-sm">Elektrisch</span>
              </div>
            </div>
          </div>

          <div style={{ height: 200 }}>
            {isChartInView ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparisonData} margin={{ top: 8, right: 4, bottom: 0, left: -8 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} interval="preserveStartEnd" />
                  <YAxis axisLine={false} tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                    tickFormatter={(v) => `€${v}`} width={36} />
                  <Tooltip content={<ComparisonTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)' }} />
                  <Line type="monotone" dataKey="traditionell" stroke="rgba(255,255,255,0.35)"
                    strokeWidth={2} dot={false} isAnimationActive animationDuration={1200} animationBegin={240}
                    activeDot={{ r: 4, fill: '#888', stroke: '#000', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="elektrisch" stroke="#00ff88"
                    strokeWidth={2} dot={false} isAnimationActive animationDuration={1200} animationBegin={360}
                    activeDot={{ r: 4, fill: '#00ff88', stroke: '#000', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : <div className="w-full h-full" />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
