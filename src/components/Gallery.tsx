"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (!inView) return;
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [inView]);

  function goTo(i: number) {
    clearInterval(intervalRef.current);
    setDirection(i > active ? 1 : -1);
    setActive(i);
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

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

        <div className="relative mt-16 overflow-hidden rounded-sm bg-charcoal/5">
          <div className="relative mx-auto aspect-[16/9] max-h-[65vh] w-full lg:max-h-[75vh]">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.img
                key={active}
                src={images[active].src}
                alt={images[active].alt}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent p-8">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/80">
                {images[active].alt}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-6 gap-2 md:grid-cols-9">
          {images.map((img, i) => (
            <motion.button
              key={img.alt}
              onClick={() => goTo(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xs"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  i === active
                    ? "bg-transparent ring-2 ring-gold"
                    : "bg-charcoal/50 group-hover:bg-charcoal/30"
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}