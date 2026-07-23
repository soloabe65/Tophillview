"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-fallback.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/80" />

      <div className="absolute inset-0 bg-gradient-to-t from-cream/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.15)_0%,_transparent_70%)]"
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-gold-light">
            Where Elegance Meets Comfort in Kubwa, Abuja
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl leading-tight tracking-[0.05em] text-white md:text-8xl lg:text-9xl"
        >
          TOPHILL
          <br />
          <span className="text-gold">VIEW</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/70 md:text-xl"
        >
          14 Okpebholo Akhere Ave, Kubwa, Abuja — where elegance and
          sophistication meet unparalleled comfort.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex gap-6"
        >
          <a
            href="#residences"
            className="rounded-full border border-gold bg-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:bg-gold-dark hover:border-gold-dark"
          >
            Explore Apartments
          </a>
          <a
            href="#gallery"
            className="rounded-full border border-white/40 px-10 py-4 font-sans text-xs uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            View Gallery
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50">
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-white/40"
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <motion.circle
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              cx="8"
              cy="7"
              r="2.5"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}