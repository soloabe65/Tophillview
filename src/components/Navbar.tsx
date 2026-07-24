"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

const navCta = [
  { label: "Book Now", href: "/booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#" className="relative z-10">
          <span
            className={`font-serif text-xl tracking-[0.3em] transition-colors duration-700 ${
              scrolled ? "text-gold" : "text-white"
            }`}
          >
            TOPHILL
          </span>
          <span
            className={`block text-[10px] tracking-[0.5em] transition-colors duration-700 ${
              scrolled ? "text-stone-light" : "text-white/60"
            }`}
          >
            VIEW
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:text-gold ${
                scrolled ? "text-stone-light" : "text-white/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/booking"
            className={`rounded-full px-6 py-2.5 font-sans text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:bg-gold-dark ${
              scrolled
                ? "bg-gold text-charcoal"
                : "bg-gold text-charcoal"
            }`}
          >
            Book Now
          </a>
          <a
            href="#contact"
            className={`rounded-full border px-6 py-2.5 font-sans text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:bg-gold hover:text-charcoal hover:border-gold ${
              scrolled
                ? "border-gold text-gold"
                : "border-white/40 text-white"
            }`}
          >
            Inquire
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-10 flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              mobileOpen
                ? "rotate-45 translate-y-2 bg-gold"
                : scrolled
                  ? "bg-stone-light"
                  : "bg-white"
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              mobileOpen
                ? "opacity-0"
                : scrolled
                  ? "bg-stone-light"
                  : "bg-white"
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              mobileOpen
                ? "-rotate-45 -translate-y-2 bg-gold"
                : scrolled
                  ? "bg-stone-light"
                  : "bg-white"
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-charcoal/98 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-sm uppercase tracking-[0.2em] text-stone-light transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="inline-block self-start rounded-full bg-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all hover:bg-gold-dark"
              >
                Book Now
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-block self-start rounded-full border border-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.15em] text-gold transition-all hover:bg-gold hover:text-charcoal"
              >
                Inquire
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}