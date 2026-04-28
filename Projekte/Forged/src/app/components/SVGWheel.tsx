import React from 'react';

type Finish = 'polished' | 'gloss' | 'matte' | 'brushed';

interface SVGWheelProps {
  design: 4 | 5;
  finish: Finish;
  capColor: string;
  engraving?: string;
  size?: number;
}

const finishColors: Record<Finish, { spoke: string; rim: string; gradient: boolean }> = {
  polished: { spoke: '#C8CDD4', rim: '#D8DDE4', gradient: true },
  gloss: { spoke: '#D5DADF', rim: '#E5EAF0', gradient: true },
  matte: { spoke: '#7A7E82', rim: '#8A8E92', gradient: false },
  brushed: { spoke: '#A8A49C', rim: '#B8B4AC', gradient: true },
};

function AeroWheel({ finish, capColor }: { finish: Finish; capColor: string }) {
  const cx = 200;
  const cy = 200;
  const hubR = 28;
  const outerR = 162;
  const innerSpokeR = 30;
  const spokeCount = 5;
  const colors = finishColors[finish];

  const spokes = Array.from({ length: spokeCount }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const innerHalf = 0.26;
    const outerHalf = 0.38;

    const ix1 = cx + innerSpokeR * Math.cos(angle - innerHalf);
    const iy1 = cy + innerSpokeR * Math.sin(angle - innerHalf);
    const ox1 = cx + outerR * Math.cos(angle - outerHalf);
    const oy1 = cy + outerR * Math.sin(angle - outerHalf);
    const ox2 = cx + outerR * Math.cos(angle + outerHalf);
    const oy2 = cy + outerR * Math.sin(angle + outerHalf);
    const ix2 = cx + innerSpokeR * Math.cos(angle + innerHalf);
    const iy2 = cy + innerSpokeR * Math.sin(angle + innerHalf);

    const midAngle = angle;
    const midR = (innerSpokeR + outerR) / 2;
    const cpR = midR + 18;
    const cpx = cx + cpR * Math.cos(midAngle);
    const cpy = cy + cpR * Math.sin(midAngle);

    return (
      <path
        key={i}
        d={`M ${ix1} ${iy1} Q ${cpx} ${cpy} ${ox1} ${oy1} L ${ox2} ${oy2} Q ${cpx} ${cpy} ${ix2} ${iy2} Z`}
        fill={`url(#aeroSpoke${finish})`}
        stroke={colors.spoke}
        strokeWidth="0.5"
      />
    );
  });

  const lugNuts = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const r = 52;
    return (
      <circle
        key={i}
        cx={cx + r * Math.cos(angle)}
        cy={cy + r * Math.sin(angle)}
        r="5.5"
        fill="#2a2a2a"
        stroke="#444"
        strokeWidth="1"
      />
    );
  });

  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`aeroTire`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <radialGradient id={`aeroSpoke${finish}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={colors.rim} />
          <stop offset="60%" stopColor={colors.spoke} />
          <stop offset="100%" stopColor="#6a6a6a" />
        </radialGradient>
        <radialGradient id={`aeroRim${finish}`} cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor={colors.rim} />
          <stop offset="100%" stopColor={colors.spoke} />
        </radialGradient>
        <radialGradient id={`aeroCap`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={lightenColor(capColor, 60)} />
          <stop offset="100%" stopColor={capColor} />
        </radialGradient>
        <filter id="wheelShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Tire */}
      <circle cx={cx} cy={cy} r="196" fill="#0a0a0a" />
      <circle cx={cx} cy={cy} r="195" fill="none" stroke="#222" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="185" fill="#111" />
      {/* Tire tread marks */}
      {Array.from({ length: 36 }, (_, i) => {
        const a = (i * 10) * Math.PI / 180;
        const r1 = 185;
        const r2 = 196;
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)} y2={cy + r2 * Math.sin(a)}
            stroke="#1a1a1a" strokeWidth="3"
          />
        );
      })}

      {/* Rim barrel */}
      <circle cx={cx} cy={cy} r="175" fill={`url(#aeroRim${finish})`} />
      <circle cx={cx} cy={cy} r="165" fill="#080808" />

      {/* Spokes */}
      {spokes}

      {/* Hub ring */}
      <circle cx={cx} cy={cy} r={hubR + 8} fill={`url(#aeroRim${finish})`} />
      <circle cx={cx} cy={cy} r={hubR + 4} fill="#111" />

      {/* Lug nuts */}
      {lugNuts}

      {/* Center cap */}
      <circle cx={cx} cy={cy} r={hubR - 6} fill={`url(#aeroCap)`} />
      <circle cx={cx} cy={cy} r={hubR - 14} fill={lightenColor(capColor, 40)} opacity="0.5" />
    </svg>
  );
}

function StarWheel({ finish, capColor }: { finish: Finish; capColor: string }) {
  const cx = 200;
  const cy = 200;
  const outerR = 162;
  const innerSpokeR = 32;
  const spokeCount = 10;
  const colors = finishColors[finish];

  const spokes = Array.from({ length: spokeCount }, (_, i) => {
    const angle = (i * 36 - 90) * (Math.PI / 180);
    const innerHalf = 0.12;
    const outerHalf = 0.16;

    const ix1 = cx + innerSpokeR * Math.cos(angle - innerHalf);
    const iy1 = cy + innerSpokeR * Math.sin(angle - innerHalf);
    const ox1 = cx + outerR * Math.cos(angle - outerHalf);
    const oy1 = cy + outerR * Math.sin(angle - outerHalf);
    const ox2 = cx + outerR * Math.cos(angle + outerHalf);
    const oy2 = cy + outerR * Math.sin(angle + outerHalf);
    const ix2 = cx + innerSpokeR * Math.cos(angle + innerHalf);
    const iy2 = cy + innerSpokeR * Math.sin(angle + innerHalf);

    return (
      <polygon
        key={i}
        points={`${ix1},${iy1} ${ox1},${oy1} ${ox2},${oy2} ${ix2},${iy2}`}
        fill={`url(#starSpoke${finish})`}
        stroke={colors.rim}
        strokeWidth="0.5"
      />
    );
  });

  const lugNuts = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const r = 50;
    return (
      <circle
        key={i}
        cx={cx + r * Math.cos(angle)}
        cy={cy + r * Math.sin(angle)}
        r="5.5"
        fill="#2a2a2a"
        stroke="#555"
        strokeWidth="1"
      />
    );
  });

  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`starSpoke${finish}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={colors.rim} />
          <stop offset="70%" stopColor={colors.spoke} />
          <stop offset="100%" stopColor="#555" />
        </radialGradient>
        <radialGradient id={`starRim${finish}`} cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor={colors.rim} />
          <stop offset="100%" stopColor={colors.spoke} />
        </radialGradient>
        <radialGradient id={`starCap`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={lightenColor(capColor, 60)} />
          <stop offset="100%" stopColor={capColor} />
        </radialGradient>
      </defs>

      {/* Tire */}
      <circle cx={cx} cy={cy} r="196" fill="#0a0a0a" />
      <circle cx={cx} cy={cy} r="185" fill="#111" />
      {Array.from({ length: 36 }, (_, i) => {
        const a = (i * 10) * Math.PI / 180;
        return (
          <line
            key={i}
            x1={cx + 185 * Math.cos(a)} y1={cy + 185 * Math.sin(a)}
            x2={cx + 196 * Math.cos(a)} y2={cy + 196 * Math.sin(a)}
            stroke="#1a1a1a" strokeWidth="3"
          />
        );
      })}

      {/* Rim barrel */}
      <circle cx={cx} cy={cy} r="175" fill={`url(#starRim${finish})`} />
      <circle cx={cx} cy={cy} r="165" fill="#080808" />

      {/* Cross braces between spokes */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle1 = (i * 36 - 90) * Math.PI / 180;
        const angle2 = ((i + 5) * 36 - 90) * Math.PI / 180;
        const r = 110;
        return (
          <line
            key={i}
            x1={cx + r * Math.cos(angle1)} y1={cy + r * Math.sin(angle1)}
            x2={cx + r * Math.cos(angle2)} y2={cy + r * Math.sin(angle2)}
            stroke={colors.spoke} strokeWidth="6" strokeOpacity="0.3"
          />
        );
      })}

      {/* Spokes */}
      {spokes}

      {/* Hub ring */}
      <circle cx={cx} cy={cy} r="40" fill={`url(#starRim${finish})`} />
      <circle cx={cx} cy={cy} r="36" fill="#111" />

      {/* Lug nuts */}
      {lugNuts}

      {/* Center cap */}
      <circle cx={cx} cy={cy} r="24" fill={`url(#starCap)`} />
      <circle cx={cx} cy={cy} r="12" fill={lightenColor(capColor, 50)} opacity="0.6" />
    </svg>
  );
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export function SVGWheel({ design, finish, capColor }: SVGWheelProps) {
  if (design === 4) return <AeroWheel finish={finish} capColor={capColor} />;
  return <StarWheel finish={finish} capColor={capColor} />;
}
