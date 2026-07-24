"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const images = [
  { src: "/images/gallery-1.webp", alt: "Room with big bed in peach color" },
  { src: "/images/gallery-2.webp", alt: "Top terrace view with blue glass" },
  { src: "/images/gallery-3.webp", alt: "Living room with white table and TV" },
  { src: "/images/gallery-4.webp", alt: "Living room with peach chairs" },
  { src: "/images/gallery-5.webp", alt: "Living room with brown settings" },
  { src: "/images/gallery-6.webp", alt: "Living room with brown settings and TV" },
  { src: "/images/gallery-7.webp", alt: "Living room with brown settings and TV left side view" },
  { src: "/images/gallery-8.webp", alt: "Living room with bright lights" },
  { src: "/images/gallery-9.webp", alt: "Living room with brown curtains" },
  { src: "/images/gallery-10.webp", alt: "Apartment interior view" },
  { src: "/images/gallery-11.webp", alt: "Apartment living space" },
  { src: "/images/gallery-12.webp", alt: "Modern apartment design" },
  { src: "/images/gallery-13.webp", alt: "Apartment room interior" },
  { src: "/images/gallery-14.webp", alt: "Luxury apartment feature" },
  { src: "/images/gallery-15.webp", alt: "Apartment ambiance" },
  { src: "/images/gallery-16.webp", alt: "Apartment detail view" },
  { src: "/images/gallery-17.webp", alt: "Apartment living area" },
  { src: "/images/gallery-18.webp", alt: "Apartment interior showcase" },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!inView) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [inView]);

  function goTo(i: number) {
    clearInterval(intervalRef.current);
    setActive(i);
  }

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

        <div className="relative mx-auto mt-16 aspect-[16/9] max-h-[70vh] w-full">
          {images.map((img, i) => {
            const stackIndex = (i - active + images.length) % images.length;
            const isTop = stackIndex === 0;

            const anim = {
              x: isTop ? 0 : 8 + stackIndex * 6,
              y: isTop ? 0 : 8 + stackIndex * 6,
              scale: isTop ? 1 : 1 - stackIndex * 0.015,
              opacity: isTop ? 1 : Math.max(0.1, 0.35 - stackIndex * 0.025),
              zIndex: images.length - stackIndex,
            };
            const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

            const content = (
              <>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {!isTop && (
                  <div className="absolute inset-0 bg-charcoal/60" />
                )}
                {isTop && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent p-8">
                    <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/80">
                      {img.alt}
                    </p>
                  </div>
                )}
              </>
            );

            return isTop ? (
              <motion.button
                key={img.alt}
                onClick={() => goTo(i)}
                animate={anim}
                transition={transition}
                className="absolute inset-0 overflow-hidden rounded-sm"
              >
                {content}
              </motion.button>
            ) : (
              <motion.div
                key={img.alt}
                aria-hidden="true"
                animate={anim}
                transition={transition}
                className="absolute inset-0 overflow-hidden rounded-sm"
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}