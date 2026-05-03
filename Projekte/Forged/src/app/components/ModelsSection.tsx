import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import wheel1Img from 'figma:asset/8ca5e4ae60b9bcd3aa445793c4ce3d717e8eecc4.png';
import wheel2Img from 'figma:asset/53050a87cc813c0e5002ad63c20fae5cc58a7a54.png';
import wheel3Img from 'figma:asset/8714368a00845f423eaf512444b5c30bf00920e8.png';

const models = [
  {
    id: 1,
    name: 'Mesh RS',
    subtitle: '14-Speichen Matrix',
    category: 'Performance',
    desc: 'Ultraleichtes Multi-Speichen-Geflecht für maximale Kühlung und unverkennbare Optik auf der Rennstrecke und Straße.',
    sizes: '18" – 22"',
    weight: 'ab 8,2 kg',
    image: wheel1Img,
  },
  {
    id: 2,
    name: 'Classic 5',
    subtitle: '5-Speichen Touring',
    category: 'Klassik',
    desc: 'Zeitlose Eleganz trifft auf moderne Schmiedetechnik. Der Klassiker für Gran Touring und Luxuslimousinen.',
    sizes: '18" – 22"',
    weight: 'ab 7,8 kg',
    image: wheel2Img,
  },
  {
    id: 3,
    name: 'Twin 5 Sport',
    subtitle: 'Geteilte 5-Speichen',
    category: 'Sport',
    desc: 'Doppel-Speichenarchitektur für maximale Steifigkeit bei minimalem Gewicht — entwickelt für Hochleistungs-Sportwagen.',
    sizes: '18" – 22"',
    weight: 'ab 7,4 kg',
    image: wheel3Img,
  },
];

const categoryColor: Record<string, string> = {
  Performance: '#dc2626',
  Klassik: '#b0a090',
  Sport: '#dc2626',
};

export function ModelsSection() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      className="w-full"
      style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Header */}
      <div className="px-5 sm:px-10 lg:px-20 pt-16 sm:pt-20 pb-10 sm:pb-14">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-red-600" />
          <span
            className="text-red-500 text-sm tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.25em' }}
          >
            Felgenmodelle
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
          <h2
            className="text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            DREI DESIGNS.<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>EINE PHILOSOPHIE.</span>
          </h2>
          <p
            className="text-white/45 max-w-sm"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7 }}
          >
            Jedes Modell wurde für einen spezifischen Fahrzeugcharakter entwickelt —
            präzise in der Funktion, kompromisslos in der Optik.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="px-5 sm:px-10 lg:px-20 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {models.map((model, idx) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onHoverStart={() => setHoveredId(model.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative group cursor-pointer overflow-hidden"
              style={{
                background: hoveredId === model.id ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                border: hoveredId === model.id ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
                transition: 'background 0.3s ease, border 0.3s ease',
              }}
              onClick={() => navigate(`/configure?design=${model.id}`)}
            >
              {/* Category badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: categoryColor[model.category] || '#dc2626' }}
                />
                <span
                  className="text-white/40 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em', fontSize: '0.72rem' }}
                >
                  {model.category}
                </span>
              </div>

              {/* Number */}
              <div
                className="absolute top-3 right-4 z-10"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: 'rgba(255,255,255,0.04)',
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                }}
              >
                {String(model.id).padStart(2, '0')}
              </div>

              {/* Wheel preview */}
              <div
                className="relative w-full aspect-square flex items-center justify-center overflow-hidden"
                style={{ background: '#000000' }}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-contain transition-all duration-500 p-4"
                  style={{
                    transform: hoveredId === model.id ? 'scale(1.04)' : 'scale(1)',
                    filter: hoveredId === model.id ? 'brightness(1.05) contrast(1.08)' : 'brightness(0.9) contrast(1.0)',
                    mixBlendMode: 'normal',
                  }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  style={{ opacity: hoveredId === model.id ? 1 : 0, background: 'rgba(0,0,0,0.25)' }}
                >
                  <div
                    className="px-6 py-3 bg-red-600 text-white text-sm uppercase tracking-widest"
                    style={{
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.2em',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    }}
                  >
                    Konfigurieren
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div
                      className="text-white"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.06em' }}
                    >
                      {model.name}
                    </div>
                    <div
                      className="text-white/35 mt-0.5"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.04em' }}
                    >
                      {model.subtitle}
                    </div>
                  </div>
                  <div
                    className="text-red-500/70 text-sm"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    {model.sizes}
                  </div>
                </div>

                <p
                  className="text-white/40 mt-3"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.65 }}
                >
                  {model.desc}
                </p>

                {/* Specs */}
                <div
                  className="flex items-center gap-4 mt-4 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {[
                    { label: 'Material', val: 'Forged AL' },
                    { label: 'Gewicht', val: model.weight },
                  ].map(s => (
                    <div key={s.label}>
                      <div
                        className="text-white/20 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.14em', fontSize: '0.7rem' }}
                      >
                        {s.label}
                      </div>
                      <div
                        className="text-white/60 text-sm mt-0.5"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.06em' }}
                      >
                        {s.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
