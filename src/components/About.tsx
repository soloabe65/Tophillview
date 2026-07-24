"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function FadeInSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    number: "01",
    title: "Comfort First",
    description: "Every apartment is designed for your comfort. Relax in well-appointed spaces that feel like home from the moment you arrive.",
  },
  {
    number: "02",
    title: "Great Value",
    description: "Premium living at the right price. We believe luxury should be accessible without compromise.",
  },
  {
    number: "03",
    title: "Prime Location",
    description: "Situated at Kubwa Estate, Beside The Kubwa General Hospital — close to everything you need.",
  },
];

export default function About() {
  return (
    <section id="residences" className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-32 lg:px-8 lg:pb-16 lg:pt-44">
        <FadeInSection>
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">
            Welcome
          </span>
        </FadeInSection>

        <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeInSection>
            <h2 className="font-serif text-4xl leading-tight text-charcoal lg:text-6xl">
              Experience the
              <br />
              <span className="text-gold-dark">Epitome of Luxury</span>
            </h2>
          </FadeInSection>

          <FadeInSection>
            <p className="font-body text-lg leading-relaxed text-stone lg:text-xl">
              At TOPHILLVIEW LUXURY APARTMENTS, we redefine what it means to live well.
              Indulge in the most beautiful amenities — from a standard gym and free WiFi
              to 24/7 electric power supply and sophisticated bars. Every moment here
              is an opportunity for comfort and discovery.
            </p>
          </FadeInSection>
        </div>

        <FadeInSection>
          <div className="mt-24 overflow-hidden rounded-sm">
            <img
              src="/images/about-hero-r800.webp"
              alt="TOPHILLVIEW building exterior"
              className="h-full w-full object-cover" loading="lazy"
            />
          </div>
        </FadeInSection>

        <div className="mt-24 grid gap-16 md:grid-cols-3 md:gap-12">
          {features.map((feature, i) => (
            <FadeInSection key={feature.number}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{}}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <span className="font-serif text-7xl font-light text-cream-dark">
                  {feature.number}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-charcoal">
                  {feature.title}
                </h3>
                <div className="mt-2 h-px w-12 bg-gold transition-all duration-500 group-hover:w-24" />
                <p className="mt-4 font-body text-base leading-relaxed text-stone">
                  {feature.description}
                </p>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}