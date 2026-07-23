"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const amenities = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M6.5 6.5 17.5 17.5" />
        <path d="M17.5 6.5 6.5 17.5" />
      </svg>
    ),
    title: "Standard Gym",
    description: "Stay fit and healthy in our well-equipped fitness center open to all residents.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" />
      </svg>
    ),
    title: "Free WiFi",
    description: "Stay connected with complimentary high-speed internet throughout the property.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M12 2v20" />
        <path d="M2 12h20" />
        <path d="M12 2a10 10 0 0 1 7 17.32" />
        <path d="M12 2a10 10 0 0 0-7 17.32" />
      </svg>
    ),
    title: "24/7 Power Supply",
    description: "Uninterrupted electricity with round-the-clock backup — comfort you can rely on.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Sophisticated Bars",
    description: "Unwind and socialize at our elegant bar spaces — where every evening feels special.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
    title: "Clean & Comfortable",
    description: "Immaculately maintained apartments with a commitment to cleanliness and comfort.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Prime Location",
    description: "14 Okpebholo Akhere Ave, Kubwa, Abuja — perfectly situated for work and leisure.",
  },
];

function AmenityCard({ amenity, index }: { amenity: typeof amenities[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-default border border-charcoal/5 bg-white/50 p-8 backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-gold/5"
    >
      <div className="mb-6 text-gold-dark transition-colors duration-500 group-hover:text-gold">
        {amenity.icon}
      </div>
      <h3 className="font-serif text-xl text-charcoal">{amenity.title}</h3>
      <p className="mt-3 font-body text-base leading-relaxed text-stone">
        {amenity.description}
      </p>
    </motion.div>
  );
}

export default function Amenities() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="amenities" className="relative bg-charcoal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-44">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">
            Unrivaled Amenities
          </span>
          <h2 className="mt-6 font-serif text-4xl text-white lg:text-6xl">
            Everything You
            <br />
            <span className="text-gold">Need</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-stone-light">
            From fitness to connectivity, from power to ambiance — every amenity
            is thoughtfully provided to make your stay exceptional.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity, i) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}