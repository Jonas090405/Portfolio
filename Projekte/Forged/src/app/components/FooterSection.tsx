import React from 'react';
import { useNavigate } from 'react-router';

const navCols = [
  {
    title: 'Produkte',
    links: ['Mesh RS', 'Classic 5', 'Twin 5 Sport'],
  },
  {
    title: 'Oberflächen',
    links: ['Poliert', 'Hochglanz', 'Matt', 'Gebürstet', 'Farbfinishes'],
  },
  {
    title: 'Service',
    links: ['Konfigurator', 'Angebot anfragen', 'Lieferinformation', 'Zertifikate', 'Über uns'],
  },
];

export function FooterSection() {
  const navigate = useNavigate();

  return (
    <footer
      className="w-full"
      style={{ background: '#040404', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="px-5 sm:px-10 lg:px-20 pt-12 sm:pt-16 pb-8 sm:pb-10">
        {/* Top row: Logo + Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">

          {/* Brand col */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 mb-6 group"
            >
              <svg width="32" height="38" viewBox="0 0 50 60" fill="none">
                <circle cx="25" cy="20" r="18" stroke="#dc2626" strokeWidth="1.5" fill="none" />
                <circle cx="25" cy="20" r="4" fill="#dc2626" />
                {[0, 72, 144, 216, 288].map((deg, i) => {
                  const rad = (deg - 90) * Math.PI / 180;
                  const x1 = 25 + 4 * Math.cos(rad);
                  const y1 = 20 + 4 * Math.sin(rad);
                  const x2 = 25 + 16 * Math.cos(rad);
                  const y2 = 20 + 16 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2" strokeLinecap="round" />;
                })}
                <text x="25" y="52" fill="white" textAnchor="middle" style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em' }}>FORGED</text>
              </svg>
            </button>

            <p
              className="text-white/30 mb-6"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '220px' }}
            >
              Präzisions-Schmiedefelgen aus Deutschland.
              Hergestellt für Perfektionisten.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {['IG', 'TW', 'YT', 'LI'].map(s => (
                <button
                  key={s}
                  className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-white/30 text-white/30 hover:text-white/60 transition-all text-xs"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em', fontWeight: 700 }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map(col => (
            <div key={col.title} className="col-span-1">
              <div
                className="text-white/25 uppercase tracking-widest mb-5"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.2em', fontSize: '0.72rem' }}
              >
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link}>
                    <button
                      className="text-white/40 hover:text-white/70 transition-colors text-sm"
                      style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.02em', fontSize: '0.875rem' }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div
            className="text-white/20 text-xs"
            style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}
          >
            © 2024 Forged GmbH · Alle Rechte vorbehalten · Made in Germany
          </div>
          <div className="flex items-center gap-6">
            {['Impressum', 'Datenschutz', 'AGB'].map(link => (
              <button
                key={link}
                className="text-white/20 hover:text-white/40 transition-colors text-xs"
                style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}