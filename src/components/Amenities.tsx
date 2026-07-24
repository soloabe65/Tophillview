"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const amenities = [
  {
    img: "/images/amenity-bar-sm.webp",
    title: "Bar",
    description: "Step up to our elegantly stocked bar — premium drinks, expert service, and a warm glow that sets the mood for the evening.",
  },
  {
    img: "/images/amenity-lounge-sm.webp",
    title: "Lounge",
    description: "Sink into deep seating bathed in cool blue light. Cocktails in hand, soft conversation in the air — the perfect night in.",
  },
  {
    img: "/images/gallery-5.webp",
    title: "Free WiFi",
    description: "Stay connected with complimentary high-speed internet throughout the property.",
  },
  {
    img: "/images/gallery-6.webp",
    title: "24/7 Power Supply",
    description: "Uninterrupted electricity with round-the-clock backup — comfort you can rely on.",
  },
  {
    img: "/images/gallery-8.webp",
    title: "Clean & Comfortable",
    description: "Immaculately maintained apartments with a commitment to cleanliness and comfort.",
  },
  {
    img: "/images/gallery-9.webp",
    title: "Prime Location",
    description: "Kubwa Estate, Beside The Kubwa General Hospital — perfectly situated for work and leisure.",
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
      className="group relative cursor-default overflow-hidden rounded-sm"
    >
      <img
        src={amenity.img}
        alt={amenity.title}
        className="h-72 w-full object-cover transition-all duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/20" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="font-serif text-xl text-gold-light">{amenity.title}</h3>
        <p className="mt-2 font-body text-base leading-relaxed text-white/80">
          {amenity.description}
        </p>
      </div>
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