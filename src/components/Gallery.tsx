"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const images = [
  { src: "/images/gallery-1.jpg", alt: "Lobby with marble finishes", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/gallery-2.jpg", alt: "Infinity pool at sunset", span: "" },
  { src: "/images/gallery-3.jpg", alt: "Living room interior", span: "" },
  { src: "/images/gallery-4.jpg", alt: "Rooftop garden", span: "lg:col-span-2" },
  { src: "/images/gallery-5.jpg", alt: "Master bedroom suite", span: "" },
  { src: "/images/gallery-6.jpg", alt: "Private dining room", span: "" },
  { src: "/images/gallery-7.jpg", alt: "Sunset skyline view", span: "lg:col-span-2 lg:row-span-2" },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" ref={ref} className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-44">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">
            Visual Journey
          </span>
          <h2 className="mt-6 font-serif text-4xl text-charcoal lg:text-6xl">
            A Glimpse Inside
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-stone">
            Every space tells a story of light, material, and intention.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3">
          {images.map((img, i) => (
            <motion.button
              key={img.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(i)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-sm ${img.span}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-white">
                  {img.alt}
                </p>
              </div>
              <div className="flex h-full w-full items-center justify-center bg-cream-dark text-stone-light">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-12 w-12">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="sr-only">{img.alt}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] max-w-4xl"
            >
              <div className="flex aspect-[4/3] w-full max-w-3xl items-center justify-center bg-charcoal-light">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-20 w-20 text-stone">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-white/60 transition-colors hover:text-white"
                aria-label="Close gallery"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}