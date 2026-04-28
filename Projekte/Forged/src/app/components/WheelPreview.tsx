import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wheel1Img from 'figma:asset/8ca5e4ae60b9bcd3aa445793c4ce3d717e8eecc4.png';
import wheel2Img from 'figma:asset/53050a87cc813c0e5002ad63c20fae5cc58a7a54.png';
import wheel3Img from 'figma:asset/8714368a00845f423eaf512444b5c30bf00920e8.png';

type Finish = 'polished' | 'gloss' | 'matte';

interface WheelConfig {
  designId: number;
  finish: Finish;
  size: string;
  engraving: string;
  capColor: string;
  capDesign: string;
}

interface WheelPreviewProps {
  config: WheelConfig;
  onZoneClick?: (zone: 'rim' | 'spoke' | 'cap') => void;
}

const finishFilters: Record<Finish, string> = {
  polished: 'brightness(1.05) contrast(1.05)',
  gloss: 'brightness(1.18) contrast(1.1) saturate(1.05)',
  matte: 'brightness(0.68) saturate(0.25) contrast(0.85)',
};

const finishLabel: Record<Finish, string> = {
  polished: 'Poliert Silber',
  gloss: 'Hochglanz Chrom',
  matte: 'Matt Graphit',
};

const sizeScale: Record<string, number> = {
  '18': 0.80,
  '19': 0.88,
  '20': 1.00,
  '21': 1.08,
  '22': 1.14,
};

const wheelDesigns = [
  { id: 1, name: 'Mesh RS', image: wheel1Img },
  { id: 2, name: 'Classic 5', image: wheel2Img },
  { id: 3, name: 'Twin 5 Sport', image: wheel3Img },
];

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '192, 192, 192';
}

export function WheelPreview({ config }: WheelPreviewProps) {
  const design = wheelDesigns.find(d => d.id === config.designId) || wheelDesigns[0];
  const capRgb = hexToRgb(config.capColor);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full select-none">
      {/* Ambient glow behind wheel */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '55%',
          paddingBottom: '55%',
          background: `radial-gradient(circle, rgba(${capRgb}, 0.08) 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Wheel container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={config.designId}
          initial={{ opacity: 0, scale: 0.96, rotate: -3 }}
          animate={{ opacity: 1, scale: sizeScale[config.size] ?? 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.96, rotate: 3 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
          style={{ width: 'min(560px, max(160px, calc(100vw - 520px)))', height: 'min(560px, max(160px, calc(100vw - 520px)))' }}
        >
          <div className="absolute inset-0">
            <img
              src={design.image}
              alt={design.name}
              className="w-full h-full object-contain"
              style={{
                filter: finishFilters[config.finish],
                transition: 'filter 0.6s ease',
              }}
            />
            {/* Cap colour overlay */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              animate={{ backgroundColor: config.capColor }}
              transition={{ duration: 0.4 }}
              style={{
                width: '8%',
                height: '8%',
                top: '46%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                mixBlendMode: 'color',
                opacity: 0.55,
              }}
            />

            {/* Engraving overlay */}
            {config.engraving && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ paddingBottom: '2%' }}
              >
                <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                  <defs>
                    <path
                      id="engravingPath"
                      d="M 200,200 m -118,0 a 118,118 0 1,1 236,0 a 118,118 0 1,1 -236,0"
                    />
                  </defs>
                  <text
                    style={{
                      fontSize: '11px',
                      fill: 'rgba(0,0,0,0.55)',
                      letterSpacing: '0.35em',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                    }}
                  >
                    <textPath href="#engravingPath" startOffset="50%" textAnchor="middle">
                      {config.engraving.toUpperCase()}
                    </textPath>
                  </text>
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute bottom-3 right-3 flex flex-col items-end gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ padding: '6px 10px' }}
      >
        <span
          className="text-white/60 text-xs tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.18em' }}
        >
          {design.name}
        </span>
        <span
          className="text-white/35 text-xs tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '0.15em' }}
        >
          {config.size}" · {finishLabel[config.finish]}
        </span>
      </motion.div>
    </div>
  );
}