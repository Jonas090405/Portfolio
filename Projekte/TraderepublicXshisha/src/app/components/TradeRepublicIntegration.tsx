import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', electric: 24, traditional: 39 },
  { month: 'Feb', electric: 24, traditional: 40 },
  { month: 'Mär', electric: 22, traditional: 38 },
  { month: 'Apr', electric: 25, traditional: 42 },
  { month: 'Mai', electric: 23, traditional: 39 },
  { month: 'Jun', electric: 24, traditional: 41 },
  { month: 'Jul', electric: 22, traditional: 39 },
  { month: 'Aug', electric: 25, traditional: 43 },
  { month: 'Sep', electric: 23, traditional: 40 },
  { month: 'Okt', electric: 24, traditional: 38 },
  { month: 'Nov', electric: 22, traditional: 41 },
  { month: 'Dez', electric: 24, traditional: 39 },
];

const investmentItems = [
  { label: 'Ersparnis Kohle', sub: 'vs. traditionell', value: '▲ € 180,00', positive: true },
  { label: 'Kein Setup-Aufwand', sub: '0 Minuten Setup-Zeit', value: '▲ 100%', positive: true },
  { label: 'Investition Hardware', sub: 'Einmalige Anschaffung', value: '– € 249,00', positive: false },
  { label: 'Break-Even', sub: 'nach ca. 415 Sessions', value: '~ 14 Monate', positive: null },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#222] border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
        <p className="text-white/40 text-xs mb-1.5">{label}</p>
        <p className="text-[#00ff88] text-sm">Elektrisch: € {payload[0]?.value}</p>
        <p className="text-white/50 text-sm">Traditionell: € {payload[1]?.value}</p>
      </div>
    );
  }
  return null;
};

export function TradeRepublicIntegration() {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isChartInView = useInView(chartRef, { once: true, amount: 0.35 });

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
          {/* Chart card — wider */}
          <motion.div
            ref={chartRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isChartInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 bg-[#161616] rounded-3xl p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="text-white/40 text-xs tracking-wider uppercase">Monatliche Kosten</div>
                <div className="text-3xl sm:text-4xl font-light text-white">€ 24,00</div>
                <div className="flex items-center gap-1.5 text-[#00ff88] text-sm">
                  <span>▲</span>
                  <span>€ 15 günstiger / Monat</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/35">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]" />
                  Elektrisch
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  Traditionell
                </div>
              </div>
            </div>

            <div className="w-full" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="electricGradTR" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="tradGradTR" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)' }} />
                  <Area
                    type="monotone"
                    dataKey="traditional"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth={1.5}
                    fill="url(#tradGradTR)"
                    dot={false}
                    isAnimationActive={true}
                    animationBegin={220}
                    animationDuration={1100}
                    animationEasing="ease-out"
                    activeDot={{ r: 3, fill: '#fff', stroke: '#000', strokeWidth: 2 }}
                    strokeDasharray="4 3"
                  />
                  <Area
                    type="monotone"
                    dataKey="electric"
                    stroke="#00ff88"
                    strokeWidth={2}
                    fill="url(#electricGradTR)"
                    dot={false}
                    isAnimationActive={true}
                    animationBegin={320}
                    animationDuration={1200}
                    animationEasing="ease-out"
                    activeDot={{ r: 4, fill: '#00ff88', stroke: '#000', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Investment-list card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-2 bg-[#161616] rounded-3xl p-6 sm:p-7 flex flex-col"
          >
            <div className="text-white/40 text-xs tracking-wider uppercase mb-5">Investments</div>
            <div className="space-y-0 flex-1">
              {investmentItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-4 ${
                    i < investmentItems.length - 1 ? 'border-b border-white/6' : ''
                  }`}
                >
                  <div>
                    <div className="text-white text-sm">{item.label}</div>
                    <div className="text-white/35 text-xs mt-0.5">{item.sub}</div>
                  </div>
                  <div
                    className={`text-sm shrink-0 ml-4 ${
                      item.positive === true
                        ? 'text-[#00ff88]'
                        : item.positive === false
                        ? 'text-red-400'
                        : 'text-white/50'
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/25 text-xs mt-4 leading-relaxed">
              Erfahre mehr über <span className="text-white/50">Multi-Portfolios.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}