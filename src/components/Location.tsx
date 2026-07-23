"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  { label: "Kubwa Town Centre", value: "5 min" },
  { label: "Abuja City Centre", value: "30 min" },
  { label: "Nnamdi Azikiwe Airport", value: "45 min" },
  { label: "Local Markets", value: "2 min" },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="location" ref={ref} className="relative bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-44">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-16 lg:grid-cols-2 lg:gap-24"
        >
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">
              Prime Location
            </span>
            <h2 className="mt-6 font-serif text-4xl text-white lg:text-6xl">
              At the Pinnacle
              <br />
              <span className="text-gold">of the City</span>
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-stone-light">
              Conveniently located at 14 Okpebholo Akhere Ave in Kubwa, Abuja,
              TOPHILLVIEW LUXURY APARTMENTS puts you close to everything that
              matters — markets, dining, and transport links — while offering
              a peaceful retreat to call home.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8">
              {highlights.map((h) => (
                <div key={h.label}>
                  <p className="font-serif text-3xl text-gold">{h.value}</p>
                  <p className="mt-1 font-sans text-xs uppercase tracking-[0.15em] text-stone">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex h-full min-h-[300px] w-full items-center justify-center rounded-sm border border-white/10 bg-charcoal-light">
              <div className="text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto h-12 w-12 text-stone">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="mt-4 font-sans text-xs uppercase tracking-[0.15em] text-stone">
                  Interactive Map
                </p>
                <p className="mt-2 font-body text-sm text-stone-light">
                  14 Okpebholo Akhere Ave, Kubwa, Abuja
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}