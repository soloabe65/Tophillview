"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function DiscountBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-charcoal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-4xl px-6 py-20 text-center lg:py-28"
      >
        <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">
          Save on Longer Stays
        </span>
        <h2 className="mt-6 font-serif text-3xl text-white lg:text-5xl">
          Stay Longer,{" "}
          <span className="text-gold">Pay Less</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-stone-light">
          Enjoy exclusive discounts when you book directly with us:
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-sm border border-gold/30 bg-gold/5 p-8">
            <p className="font-serif text-4xl text-gold">5%</p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-stone-light">
              OFF
            </p>
            <p className="mt-3 font-body text-base text-white">
              7&ndash;13 Nights
            </p>
          </div>
          <div className="rounded-sm border border-gold/30 bg-gold/5 p-8">
            <p className="font-serif text-4xl text-gold">10%</p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-stone-light">
              OFF
            </p>
            <p className="mt-3 font-body text-base text-white">
              14+ Nights
            </p>
          </div>
        </div>
        <a
          href="/booking"
          className="mt-10 inline-block rounded-full border border-gold bg-gold px-10 py-4 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:bg-gold-dark hover:border-gold-dark"
        >
          Book Now &mdash; Only on Our Website
        </a>
      </motion.div>
    </section>
  );
}
