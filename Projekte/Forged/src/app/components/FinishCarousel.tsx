import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Wheel-specific finish images — no dark filter to clearly distinguish surfaces
const MATTE_IMG = 'https://images.unsplash.com/photo-1673349394429-3f7ebce78c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
const GLOSS_IMG = 'https://images.unsplash.com/photo-1771217811001-13ac2df47f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
const POLISHED_IMG = 'https://images.unsplash.com/photo-1713096528010-e586cc4616fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

interface FinishData {
  id: string;
  name: string;
  nameDE: string;
  tagline: string;
  description: string;
  process: string;
  properties: { label: string; value: string }[];
  tags: string[];
  gradient: string;
  accentColor: string;
  imageUrl: string;
  number: string;
}

const finishes: FinishData[] = [
  {
    id: 'matte',
    name: 'Matt',
    nameDE: 'SATIN MATTE',
    tagline: 'Kein Glanz. Nur Charakter.',
    description:
      'Die Mattoberfläche streut das Licht, anstatt es zu reflektieren — das Ergebnis ist eine samtartige Textur, die auf Zurückhaltung und Raffinesse setzt. Ideal für moderne, sportlich-understatement-orientierte Fahrzeugkonzepte.',
    process:
      'Pulverbeschichtung mit mattierten Körnern oder Mattlack-System, anschließende Wärmeaushärtung bei 180 °C.',
    properties: [
      { label: 'Glanzgrad (GU 60°)', value: '< 10 GU' },
      { label: 'Schichtdicke', value: '60–100 µm' },
      { label: 'Pflegeaufwand', value: 'Niedrig' },
      { label: 'Witterungsbeständigkeit', value: 'Sehr hoch' },
    ],
    tags: ['Pulverbeschichtung', 'Antireflex', 'Robust', 'Modern'],
    gradient: 'linear-gradient(135deg, #3a3a3a 0%, #505050 50%, #3d3d3d 100%)',
    accentColor: '#666',
    imageUrl: MATTE_IMG,
    number: '01',
  },
  {
    id: 'gloss',
    name: 'Hochglanz',
    nameDE: 'HIGH GLOSS',
    tagline: 'Intensiver Glanz. Tiefe Farbwirkung.',
    description:
      'Die Hochglanzlackierung wird in mehreren Schichten aufgebaut und zwischen jedem Gang fein geschliffen. Die Oberfläche wirkt tief und lebendig — ein Statement auf jeder Straße. Optionales Klarlack-Finish erhöht die Beständigkeit erheblich.',
    process:
      'Grundierung → 2–3 Farbschichten → Klarlack-Versiegelung, Trocknung im Durchlaufofen bei 80 °C.',
    properties: [
      { label: 'Glanzgrad (GU 60°)', value: '85–95 GU' },
      { label: 'Schichtdicke', value: '80–120 µm' },
      { label: 'Pflegeaufwand', value: 'Mittel' },
      { label: 'Witterungsbeständigkeit', value: 'Hoch' },
    ],
    tags: ['Lackiert', 'Tiefenwirkung', 'UV-stabil', 'Vielseitig'],
    gradient: 'linear-gradient(135deg, #2a2a2a 0%, #555 25%, #1a1a1a 60%, #444 85%, #111 100%)',
    accentColor: '#888',
    imageUrl: GLOSS_IMG,
    number: '02',
  },
  {
    id: 'polished',
    name: 'Poliert',
    nameDE: 'MIRROR POLISH',
    tagline: 'Maximale Reflexion. Absoluter Glanz.',
    description:
      'Die polierende Bearbeitung wird per Hand durchgeführt — Stufe für Stufe verfeinert, bis die Oberfläche eine nahezu perfekte Spiegelqualität erreicht. Das Ergebnis ist eine klassisch-edle Optik, die Licht aufgreift und die Umgebung widerspiegelt.',
    process:
      'Mechanisches Polieren mit abnehmender Körnung (400 → 1500 → 3000) und abschließender Hochglanzpolitur von Hand.',
    properties: [
      { label: 'Reflexionsgrad', value: '≥ 95 %' },
      { label: 'Schichtdicke', value: 'Keine Beschichtung' },
      { label: 'Pflegeaufwand', value: 'Hoch' },
      { label: 'Witterungsbeständigkeit', value: 'Mittel' },
    ],
    tags: ['Handarbeit', 'Premium', 'Spiegeloptik', 'Zeitlos'],
    gradient: 'linear-gradient(135deg, #f0f0f0 0%, #c0c0c0 30%, #f8f8f8 55%, #b8b8b8 80%, #e8e8e8 100%)',
    accentColor: '#e0e0e0',
    imageUrl: POLISHED_IMG,
    number: '03',
  },
];

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span
        className="text-white/55 text-xs uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.14em' }}
      >
        {label}
      </span>
      <span
        className="text-white/85 text-xs"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em', fontWeight: 600 }}
      >
        {value}
      </span>
    </div>
  );
}

export function FinishCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: '#060606', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Section header */}
      <div className="relative z-10 px-10 lg:px-20 pt-20 pb-12 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-red-600" />
            <span
              className="text-red-500 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.25em' }}
            >
              Oberflächenfinishes
            </span>
          </div>
          <h2
            className="text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            DREI ARTEN<br />
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>VON PERFEKTION</span>
          </h2>
        </div>
        {/* Nav arrows */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 flex items-center justify-center border border-white/15 hover:border-white/40 text-white/40 hover:text-white transition-all"
            style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 flex items-center justify-center border border-white/15 hover:border-white/40 text-white/40 hover:text-white transition-all"
            style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {finishes.map((finish, index) => (
            <div key={finish.id} className="flex-none w-full min-w-0">
              <div className="flex flex-col lg:flex-row min-h-[520px]">

                {/* Left: image + finish swatch */}
                <div className="relative lg:w-1/2 min-h-[320px] lg:min-h-0 overflow-hidden">
                  {/* Image — minimal filter to preserve finish character */}
                  <ImageWithFallback
                    src={finish.imageUrl}
                    alt={finish.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'brightness(0.88) contrast(1.06)' }}
                  />

                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to right, transparent 45%, #060606 100%), linear-gradient(to top, #060606 0%, transparent 35%)',
                    }}
                  />

                  {/* Finish swatch preview */}
                  <div className="absolute bottom-8 left-8 lg:left-10">
                    <div
                      className="w-24 h-24 rounded-sm shadow-2xl mb-3"
                      style={{
                        background: finish.gradient,
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: `0 0 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`,
                      }}
                    />
                    <div
                      className="text-white/55 text-xs uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em' }}
                    >
                      Oberflächenprobe
                    </div>
                  </div>

                  {/* Slide number */}
                  <div
                    className="absolute top-8 left-8 lg:left-10"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '5rem',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: 'rgba(255,255,255,0.06)',
                      letterSpacing: '-0.04em',
                      userSelect: 'none',
                    }}
                  >
                    {finish.number}
                  </div>
                </div>

                {/* Right: content */}
                <div className="relative lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-16" style={{ background: '#060606' }}>

                  {/* Accent line */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-px bg-red-600" />
                    <span
                      className="text-red-500/80 text-xs uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.22em' }}
                    >
                      {finish.nameDE}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-white mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                      fontWeight: 800,
                      lineHeight: 0.9,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {finish.name.toUpperCase()}
                  </h3>

                  {/* Tagline */}
                  <p
                    className="text-white/65 mb-6"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.06em', fontSize: '0.85rem' }}
                  >
                    {finish.tagline}
                  </p>

                  {/* Description */}
                  <p
                    className="text-white/75 mb-8 max-w-md"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.75 }}
                  >
                    {finish.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {finish.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-white/60 text-xs px-3 py-1 border border-white/12"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-white/50 text-xs uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em' }}
                      >
                        Technische Daten
                      </span>
                      <div className="flex-1 h-px bg-white/8" />
                    </div>
                    <div>
                      {finish.properties.map(prop => (
                        <PropertyRow key={prop.label} label={prop.label} value={prop.value} />
                      ))}
                    </div>
                  </div>

                  {/* Process note */}
                  <div
                    className="mt-4 p-4 border border-white/8"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-px bg-red-600 mt-2 flex-shrink-0" />
                      <div>
                        <div
                          className="text-white/50 text-xs uppercase tracking-widest mb-1.5"
                          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.16em' }}
                        >
                          Prozess
                        </div>
                        <p
                          className="text-white/65"
                          style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.65 }}
                        >
                          {finish.process}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-10 lg:px-20 py-10 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-3">
          {finishes.map((f, i) => (
            <button
              key={f.id}
              onClick={() => emblaApi?.scrollTo(i)}
              className="group flex items-center gap-2 transition-all"
            >
              <div
                className="transition-all duration-300"
                style={{
                  width: selectedIndex === i ? '32px' : '8px',
                  height: '2px',
                  background: selectedIndex === i ? '#dc2626' : 'rgba(255,255,255,0.25)',
                  borderRadius: '1px',
                }}
              />
              {selectedIndex === i && (
                <span
                  className="text-white/50 text-xs uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em' }}
                >
                  {f.name}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 flex items-center justify-center border border-white/15 hover:border-white/40 text-white/40 hover:text-white transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 flex items-center justify-center border border-white/15 hover:border-white/40 text-white/40 hover:text-white transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <div
          className="hidden md:block text-white/30 text-xs"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}
        >
          <span className="text-white/60">{String(selectedIndex + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(finishes.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}