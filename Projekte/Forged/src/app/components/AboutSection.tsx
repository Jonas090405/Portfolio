import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const values = [
  {
    label: 'Präzision',
    desc: 'Toleranzen im Mikrometer-Bereich. Jedes Bauteil wird auf einer 5-Achs-CNC-Anlage gefräst.',
  },
  {
    label: 'Handwerk',
    desc: 'Jede Felge durchläuft 18 manuelle Qualitätsprüfungen — von der Rohlingsinspektion bis zur Endkontrolle.',
  },
  {
    label: 'Material',
    desc: 'Ausschließlich Luftfahrt-zertifiziertes Aluminium der Güten 6061-T6 und 7075-T6.',
  },
  {
    label: 'Design',
    desc: 'Jedes Modell entsteht in enger Zusammenarbeit mit Fahrzeugdesignern und Renningenieurien.',
  },
];

const stats = [
  { value: '2018', label: 'Gegründet' },
  { value: '1.200+', label: 'Projekte' },
  { value: '18 Std.', label: 'Pro Felge' },
  { value: '100 %', label: 'Handarbeit' },
];

export function AboutSection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full"
      style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="flex flex-col lg:flex-row min-h-[600px]">

        {/* Left: Image */}
        <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-0 overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1594500067378-24336f95870f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Forged Werkstatt"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.5) contrast(1.1) saturate(0.7)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, transparent 55%, #060606 100%), linear-gradient(to top, #060606 0%, transparent 35%)' }}
          />

          {/* Quote overlay */}
          <div className="absolute bottom-10 left-10 lg:left-12 max-w-xs">
            <div className="w-8 h-px bg-red-600 mb-4" />
            <p
              className="text-white/60 italic"
              style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6 }}
            >
              „Wir bauen keine Felgen. Wir bauen Ausdrucksformen."
            </p>
            <div
              className="text-white/25 text-sm mt-3 uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em' }}
            >
              Gründer, Forged GmbH
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:w-1/2 flex flex-col justify-center px-5 sm:px-10 lg:px-16 py-12 sm:py-16">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-red-600" />
            <span
              className="text-red-500 text-sm tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.25em' }}
            >
              Über uns
            </span>
          </div>

          <h2
            className="text-white mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            GEBAUT AUS<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>LEIDENSCHAFT.</span>
          </h2>

          <p
            className="text-white/55 mb-10 max-w-md"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.75 }}
          >
            Forged wurde 2018 mit einer einfachen Überzeugung gegründet: Dass jede Felge
            genauso viel Aufmerksamkeit verdient wie das Fahrzeug, das sie trägt. Wir
            verbinden klassische Schmiedetradition mit modernster CNC-Technologie —
            hergestellt in Deutschland, für Fahrer weltweit.
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <div className="w-1 h-full min-h-[40px] bg-red-600/40 flex-shrink-0 mt-1" style={{ width: '2px' }} />
                <div>
                  <div
                    className="text-white text-sm uppercase tracking-widest mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.15em' }}
                  >
                    {v.label}
                  </div>
                  <p
                    className="text-white/35"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.6 }}
                  >
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {stats.map(s => (
              <div key={s.label} className="flex flex-col gap-1">
                <span
                  className="text-white"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, lineHeight: 1 }}
                >
                  {s.value}
                </span>
                <span
                  className="text-white/30 uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em', fontSize: '0.7rem' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
