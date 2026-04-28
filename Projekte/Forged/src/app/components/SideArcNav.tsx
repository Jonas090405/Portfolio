import React, { useEffect, useState } from 'react';

const RADIUS = 155;
const ANGLE_STEP_DEG = 27;

interface NavSection {
  id: string;
  label: string;
}

interface Props {
  sections: NavSection[];
  activeIndex: number;
  isScrolling: boolean;
  onNavigate: (index: number) => void;
}

export function SideArcNav({ sections, activeIndex, isScrolling, onNavigate }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsHovered(e.clientX < 250);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isVisible = (isScrolling || isHovered) && isMd;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: '50vh',
        width: 0,
        height: 0,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      {sections.map((section, i) => {
        const relIndex = i - activeIndex;
        const angle = relIndex * ANGLE_STEP_DEG * (Math.PI / 180);
        const x = RADIUS * Math.cos(angle);
        const y = RADIUS * Math.sin(angle);
        const absRel = Math.abs(relIndex);
        const scale = Math.max(0.58, 1 - absRel * 0.13);
        const labelOpacity = Math.max(0, 1 - absRel * 0.35);
        const itemOpacity = isVisible ? Math.max(0.1, 1 - absRel * 0.2) : 0;
        const isActive = relIndex === 0;

        return (
          <button
            key={section.id}
            onClick={() => onNavigate(i)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate(${x}px, calc(-50% + ${y}px)) scale(${scale})`,
              opacity: itemOpacity,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease',
              transformOrigin: 'left center',
              pointerEvents: isVisible ? 'auto' : 'none',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '5px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              whiteSpace: 'nowrap',
            }}
          >
            {/* Accent indicator */}
            <div
              style={{
                flexShrink: 0,
                width: isActive ? '22px' : '5px',
                height: '2px',
                background: isActive ? '#dc2626' : 'rgba(255,255,255,0.3)',
                borderRadius: '1px',
                transition: 'width 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.3s ease',
              }}
            />
            {/* Label */}
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isActive ? '0.77rem' : '0.66rem',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase' as const,
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.42)',
                opacity: labelOpacity,
                transition: 'color 0.35s ease, opacity 0.35s ease',
              }}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
