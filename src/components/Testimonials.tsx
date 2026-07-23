"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Nice place to get what you need in comfort. And very good in price. Make yourself comfortable.",
    author: "Idris Gson",
    role: "Google Reviewer \u2022 5 reviews",
  },
  {
    quote:
      "Very nice and clean apartment.",
    author: "OGBLEADS Services llc",
    role: "Google Reviewer",
  },
  {
    quote:
      "Nice place. Good environment and well maintained.",
    author: "Idrissumudachi Oshomahontop",
    role: "Local Guide \u2022 6 reviews",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-cream-dark/50">
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-44">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">
Google Reviews
          </span>
          <h2 className="mt-6 font-serif text-4xl text-charcoal lg:text-6xl">
            What
            <br />
            <span className="text-gold-dark">Guests Say</span>
          </h2>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-charcoal/5 bg-white/60 p-10 backdrop-blur-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mb-6 h-8 w-8 text-gold/30"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.154 11 15c0 2.21-1.718 4-4 4-1.11 0-2.07-.504-2.708-1.291zm9.584 0C13.137 16.227 12.584 15 12.584 13.011c0-3.5 2.457-6.637 6.03-8.188l.894 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.93-.311C19.175 11.69 20.584 13.154 20.584 15c0 2.21-1.718 4-4 4-1.11 0-2.07-.504-2.708-1.291z" />
              </svg>
              <blockquote className="font-body text-lg leading-relaxed text-stone">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-8 border-t border-charcoal/10 pt-6">
                <p className="font-serif text-base text-charcoal">{t.author}</p>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.15em] text-stone">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}