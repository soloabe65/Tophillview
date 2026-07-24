"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-44">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">
            Inquire
          </span>
          <h2 className="mt-6 font-serif text-4xl text-charcoal lg:text-6xl">
            Begin Your Journey
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-stone">
            Schedule a private viewing or request a brochure to discover
            the unparalleled lifestyle that awaits at TopHill View.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <a
              href="tel:+2347053232314"
              className="font-body text-lg text-gold-dark transition-colors hover:text-gold"
            >
              2347053232314
            </a>
            <span className="hidden text-stone sm:inline">|</span>
            <a
              href="tel:+2349039919900"
              className="font-body text-lg text-gold-dark transition-colors hover:text-gold"
            >
              2349039919900
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-16 max-w-xl space-y-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className="w-full border-b border-charcoal/20 bg-transparent pb-3 font-body text-lg text-charcoal placeholder:text-stone-light outline-none transition-colors duration-300 focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full border-b border-charcoal/20 bg-transparent pb-3 font-body text-lg text-charcoal placeholder:text-stone-light outline-none transition-colors duration-300 focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full border-b border-charcoal/20 bg-transparent pb-3 font-body text-lg text-charcoal placeholder:text-stone-light outline-none transition-colors duration-300 focus:border-gold"
            />
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Your Message</label>
            <textarea
              id="message"
              rows={4}
              placeholder="Your Message"
              className="w-full resize-none border-b border-charcoal/20 bg-transparent pb-3 font-body text-lg text-charcoal placeholder:text-stone-light outline-none transition-colors duration-300 focus:border-gold"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-full bg-charcoal px-10 py-4 font-sans text-xs uppercase tracking-[0.15em] text-cream transition-all duration-300 hover:bg-gold hover:text-charcoal"
            >
              Send Inquiry
            </button>
          </div>

          <p className="text-center font-sans text-xs tracking-[0.05em] text-stone">
            We will respond within 24 hours. Your privacy is paramount.
          </p>
        </motion.form>
      </div>
    </section>
  );
}