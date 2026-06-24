import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  /** Delay before counting starts (ms) — useful to sync with fade-in animations */
  delay?: number;
  suffix?: string;
  prefix?: string;
  /** German thousands separator: 1200 → "1.200" */
  formatDE?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  to,
  from = 0,
  duration = 900,
  delay = 0,
  suffix = '',
  prefix = '',
  formatDE = false,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [val, setVal] = useState(from);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const run = () => {
      const t0 = performance.now();
      const range = to - from;
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        // ease-out cubic — fast start, smooth deceleration into final value
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(from + range * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (delay > 0) {
      const id = setTimeout(run, delay);
      return () => clearTimeout(id);
    } else {
      run();
    }
  }, [isInView, to, from, duration, delay]);

  const formatted = formatDE ? val.toLocaleString('de-DE') : String(val);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
