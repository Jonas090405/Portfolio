import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudience } from '../context/AudienceContext';
import { audienceContent } from '../data/audienceContent';

/* Dynamically import all influencer images from assets. */
const imageModules = import.meta.glob('../../assets/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/* Dynamically import all influencer videos from assets. */
const videoModules = import.meta.glob('../../assets/*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function resolveImage(filename?: string): string | undefined {
  if (!filename) return undefined;
  return imageModules[`../../assets/${filename}`];
}

function resolveVideo(filename?: string): string | undefined {
  if (!filename) return undefined;
  return videoModules[`../../assets/${filename}`];
}

export function InfluencerSection() {
  const { audience } = useAudience();
  const { influencer, id } = audienceContent[audience];
  const videoUrl = resolveVideo(influencer.videoSrc);
  const imgUrl = resolveImage(influencer.imageSrc);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Audience 3 has no celebrity — render a different expert-quote card */
  const isExpert = id === 3;

  /* Ensure video always plays — recover from unexpected pauses */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
    const onPause = () => el.play().catch(() => {});
    el.addEventListener('pause', onPause);
    return () => el.removeEventListener('pause', onPause);
  }, [audience]);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={`influencer-${audience}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55 }}
        className="relative w-full overflow-hidden"
        style={{ height: isExpert ? 'auto' : '85vh' }}
      >
        {/* ── Expert variant (audience 3) ── */}
        {isExpert ? (
          <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#161616] rounded-3xl px-8 py-10 sm:px-12 sm:py-14 border border-white/8 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                  <span className="text-[#00ff88] text-xs tracking-widest uppercase font-medium">
                    Verified Expert Review
                  </span>
                </div>
                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug text-white">
                  "{influencer.quote}"
                </blockquote>
                <div className="pt-2 border-t border-white/8">
                  <div className="text-white/70 text-sm font-medium">{influencer.name}</div>
                  <div className="text-white/35 text-xs mt-0.5">{influencer.role}</div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* ── Celebrity variant (audience 1 & 2) ── */
          <>
            {/* Video — fills section, no controls, no interaction */}
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                style={{ objectPosition: 'center 35%' }}
              />
            ) : imgUrl ? (
              <img
                src={imgUrl}
                alt={influencer.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'center 25%' }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#000]" />
            )}

            {/* Top fade — thin blend into hero above */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

            {/* Bottom fade — merges into next section */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

            {/* Left vignette — readability behind quote text */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

            {/* Quote overlay — sits over the bottom area of the video */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-6 lg:px-10 xl:px-20 pb-10 sm:pb-14 lg:pb-16">
              <div className="max-w-2xl space-y-4">
                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight tracking-tight"
                >
                  "{influencer.quote}"
                </motion.blockquote>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-[1px] bg-white/30" />
                  <div>
                    <div className="text-white text-sm font-medium">{influencer.name}</div>
                    <div className="text-white/45 text-xs mt-0.5">{influencer.role}</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </motion.section>
    </AnimatePresence>
  );
}
