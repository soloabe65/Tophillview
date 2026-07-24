"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  { label: "Kubwa Town Centre", value: "5 min" },
  { label: "Abuja City Centre", value: "30 min" },
  { label: "Nnamdi Azikiwe Airport", value: "45 min" },
  { label: "Local Markets", value: "2 min" },
];

const rateCards = [
  {
    img: "/images/gallery-1.webp",
    title: "2 Bedroom Well Furnished Apartment",
    price: "N100,000",
    period: "/night",
    caution: "Caution Fee: N30,000",
  },
  {
    img: "/images/gallery-4.webp",
    title: "Birthday Party Package",
    price: "N150,000",
    period: "",
    caution: "Caution Fee: N50,000",
  },
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
              Conveniently located at Kubwa Estate, Beside The Kubwa General
              Hospital, TOPHILLVIEW LUXURY APARTMENTS puts you close to everything
              that matters — markets, dining, and transport links — while offering
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

            <div className="mt-12 space-y-2">
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold-dark">
                Call Us
              </p>
              <a
                href="tel:+2347053232314"
                className="block font-body text-xl text-white transition-colors hover:text-gold-light"
              >
                2347053232314
              </a>
              <a
                href="tel:+2349039919900"
                className="block font-body text-xl text-white transition-colors hover:text-gold-light"
              >
                2349039919900
              </a>
            </div>
          </div>

          <div className="space-y-8">
            {rateCards.map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-sm"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-64 w-full object-cover lg:h-72"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-serif text-xl text-white">{card.title}</p>
                  <p className="mt-2 font-body text-4xl text-gold-light">
                    {card.price}
                    {card.period && (
                      <span className="text-base text-stone">{card.period}</span>
                    )}
                  </p>
                  <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-stone">
                    {card.caution}
                  </p>
                </div>
              </motion.div>
            ))}

            <div className="h-80 w-full overflow-hidden rounded-sm">
              <iframe
                src="https://maps.google.com/maps?q=9.1574,7.3405&t=k&z=16&output=embed"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
                title="TOPHILLVIEW Location on Google Maps"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}