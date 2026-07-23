"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "4.2", suffix: "", label: "Google Rating" },
  { value: "5790", suffix: "+", label: "Reviews" },
  { value: "24", suffix: "/7", label: "Power Supply" },
  { value: "100", suffix: "%", label: "Comfort" },
];

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="font-serif text-6xl text-gold lg:text-7xl">
      {inView ? value : "0"}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative border-y border-charcoal/5 bg-cream">
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
      >
        <div className="grid gap-12 text-center md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-stone">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}