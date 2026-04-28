import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

const colorGroups = [
  {
    group: 'Klassisch',
    colors: [
      { id: 'satin-black', name: 'Satin Schwarz', hex: '#1c1c1c', gradient: 'linear-gradient(135deg, #2e2e2e 0%, #121212 100%)', shimmer: 'rgba(255,255,255,0.12)' },
      { id: 'silver', name: 'Poliersilber', hex: '#b8b8b8', gradient: 'linear-gradient(135deg, #d8d8d8 0%, #909090 60%, #c8c8c8 100%)', shimmer: 'rgba(255,255,255,0.5)' },
      { id: 'white', name: 'Perlweiß', hex: '#f0f0f0', gradient: 'linear-gradient(135deg, #ffffff 0%, #d8d8d8 100%)', shimmer: 'rgba(255,255,255,0.7)' },
    ],
  },
];

const allColors = colorGroups.flatMap(g => g.colors);

export function ColorFinishesSection() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('silver');
  const selected = allColors.find(c => c.id === selectedId) || allColors[0];

  return (
    <section
      className="w-full"
      style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="px-5 sm:px-10 lg:px-20 pt-16 sm:pt-20 pb-16 sm:pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-red-600" />
          <span
            className="text-red-500 text-xs tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.25em' }}
          >
            Lackierungen & Farben
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
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
            3 FARBEN.<br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>ZEITLOSE ELEGANZ.</span>
          </h2>
          <p
            className="text-white/45 max-w-sm"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.7 }}
          >
            Silber, Schwarz und Weiß — die drei klassischen Töne, in denen Perfektion
            keine Kompromisse kennt. Jede Farbe wird in mehreren Schichten aufgetragen
            und mit UV-beständigem Klarlack versiegelt.
          </p>
        </div>

        {/* Main layout: preview + palette */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* Left: Large color preview */}
          <div className="lg:w-80 flex-shrink-0 w-full sm:max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden"
                style={{ aspectRatio: '1', background: selected.gradient, border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {/* Shimmer layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 60% 50% at 30% 30%, ${selected.shimmer} 0%, transparent 70%)`,
                  }}
                />
                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                  <div
                    className="text-white text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.18em' }}
                  >
                    {selected.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-3 h-3 rounded-full border border-white/20" style={{ background: selected.hex }} />
                    <span className="text-white/40 text-xs" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                      {selected.hex.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <button
              onClick={() => navigate('/configure')}
              className="w-full mt-4 py-4 bg-red-600 hover:bg-red-500 text-white text-xs uppercase tracking-widest transition-colors"
              style={{
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.2em',
                fontWeight: 700,
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              Im Konfigurator öffnen
            </button>

            {/* Notes */}
            <div className="mt-5 space-y-2">
              {[
                'Alle Farben RAL/NCS-kompatibel',
                'Individuelle RAL-Farbtöne auf Anfrage',
                'UV-beständige Klarlack-Versiegelung',
              ].map(note => (
                <div key={note} className="flex items-center gap-3">
                  <div className="w-3 h-px bg-red-600 flex-shrink-0" />
                  <span
                    className="text-white/30 text-xs"
                    style={{ fontFamily: 'var(--font-body)', lineHeight: 1.5 }}
                  >
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Color groups */}
          <div className="flex-1">
            {colorGroups.map(group => (
              <div key={group.group} className="mb-8">
                <div
                  className="text-white/25 text-xs uppercase tracking-widest mb-3"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em' }}
                >
                  {group.group}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {group.colors.map(color => (
                    <motion.button
                      key={color.id}
                      onClick={() => setSelectedId(color.id)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      title={color.name}
                      className="group relative overflow-hidden"
                      style={{
                        aspectRatio: '1',
                        background: color.gradient,
                        border: selectedId === color.id
                          ? '2px solid rgba(220,38,38,0.8)'
                          : '1px solid rgba(255,255,255,0.08)',
                        boxShadow: selectedId === color.id ? `0 0 16px ${color.hex}50` : 'none',
                        transition: 'border 0.2s, box-shadow 0.2s',
                      }}
                    >
                      {/* Shimmer */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse 80% 60% at 25% 25%, ${color.shimmer} 0%, transparent 70%)`,
                        }}
                      />
                      {/* Selected check */}
                      {selectedId === color.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-white/80" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}