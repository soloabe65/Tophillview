"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems, type GalleryItem } from "@/data/gallery";

type Filter = "all" | "image" | "video";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "image", label: "Photos" },
  { key: "video", label: "Videos" },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 drop-shadow-lg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function getFiltered(filter: Filter): GalleryItem[] {
  if (filter === "all") return galleryItems;
  return galleryItems.filter((item) => item.type === filter);
}

function MediaThumbnail({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-charcoal/5 outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {item.type === "video" ? (
        <video
          src={item.src}
          poster={item.poster}
          preload="metadata"
          muted
          playsInline
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          onLoadedData={() => setLoaded(true)}
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          onLoad={() => setLoaded(true)}
        />
      )}

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal/5">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      )}

      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-charcoal backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <PlayIcon />
          </div>
        </div>
      )}
    </motion.button>
  );
}

function Lightbox({ items, initialIndex, onClose }: { items: GalleryItem[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const videoRef = useRef<HTMLVideoElement>(null);
  const item = items[index];

  const goNext = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const goPrev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [item.src]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <CloseIcon />
      </button>

      <div className="flex max-h-full max-w-full items-center gap-4">
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="shrink-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
        )}

        <motion.div
          key={item.src}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-h-[85vh] max-w-[90vw] items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" ? (
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] max-w-full rounded-sm shadow-2xl"
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[85vh] max-w-full rounded-sm object-contain shadow-2xl"
            />
          )}
        </motion.div>

        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="shrink-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = getFiltered(activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="relative min-h-screen bg-cream pt-32 lg:pt-44">
      <div className="mx-auto max-w-7xl px-6 pb-32 lg:px-8 lg:pb-44">
        <div className="text-center">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">
            Visual Journey
          </span>
          <h1 className="mt-6 font-serif text-4xl text-charcoal lg:text-6xl">
            Our
            <br />
            <span className="text-gold-dark">Gallery</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-stone">
            Every space tells a story of light, material, and intention.
          </p>
        </div>

        <div className="mt-16 flex justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`rounded-full px-6 py-2.5 font-sans text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                activeFilter === f.key
                  ? "bg-charcoal text-cream"
                  : "bg-transparent text-stone hover:text-charcoal"
              }`}
            >
              {f.label}
              <span className="ml-1.5 text-[10px] opacity-60">
                ({getFiltered(f.key).length})
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-24 text-center"
            >
              <p className="font-body text-lg text-stone">No videos added yet.</p>
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.15em] text-stone-light">
                Drop your .mp4 files into <code className="text-gold-dark">public/videos/gallery/</code> and add entries to <code className="text-gold-dark">src/data/gallery.ts</code>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {filtered.map((item, i) => (
                <MediaThumbnail
                  key={item.id}
                  item={item}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            items={filtered}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
