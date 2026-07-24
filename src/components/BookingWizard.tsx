"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rooms = [
  {
    id: "2br",
    img: "/images/gallery-1.webp",
    name: "2 Bedroom Well Furnished Apartment",
    price: 100000,
    period: "/night",
    capacity: 6,
    caution: "Caution Fee: N30,000",
    cautionFee: 30000,
    highlights: ["2 Bedrooms", "Fully Furnished", "Free WiFi", "24/7 Power", "Bar Access"],
  },
  {
    id: "birthday",
    img: "/images/gallery-4.webp",
    name: "Birthday Party Package",
    price: 150000,
    period: "/night",
    capacity: 20,
    caution: "Caution Fee: N50,000",
    cautionFee: 50000,
    highlights: ["Event Space", "Seating for 20", "Bar Service", "Sound System", "Decor Included"],
  },
];

const WHATSAPP_NUMBER = "2349039919900";

function formatPrice(n: number) {
  return "N" + n.toLocaleString("en-US");
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(a: string, b: string) {
  const da = new Date(a);
  const db = new Date(b);
  return Math.round((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
}

function addDay(date: string) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", specialRequests: "" });
  const [stepError, setStepError] = useState("");
  const [booked, setBooked] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, booked]);

  const minCheckOut = checkIn ? addDay(checkIn) : today();
  const nights = checkIn && checkOut && checkOut > checkIn ? daysBetween(checkIn, checkOut) : 0;
  let roomTotal = 0;
  let cautionFee = 0;
  let discount = 0;
  if (selectedRoom !== null && nights > 0) {
    const room = rooms[selectedRoom];
    roomTotal = room.price * (room.period === "/night" ? nights : 1);
    cautionFee = room.cautionFee;
    if (nights >= 7) discount = 0.05;
  }
  const discountAmount = roomTotal * discount;
  const finalTotal = roomTotal - discountAmount + cautionFee;

  const step1Valid = checkIn && checkOut && checkOut > checkIn && selectedRoom !== null;

  function handleNext1() {
    if (!step1Valid) {
      setStepError("Please select check-in, check-out, and a room to continue.");
      return;
    }
    setStepError("");
    setStep(2);
  }

  function handleNext2() {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setStepError("Please fill in all required fields.");
      return;
    }
    setStepError("");
    setStep(3);
  }

  function buildBookingMessage() {
    const room = rooms[selectedRoom!];
    const lines = [
      "*New Booking Request — TOPHILLVIEW*",
      "",
      "*Guest Details*",
      "Name: " + form.name,
      "Email: " + form.email,
      "Phone: " + form.phone,
      "",
      "*Booking Details*",
      "Room: " + room.name,
      "Check-in: " + checkIn,
      "Check-out: " + checkOut,
      "Nights: " + nights,
      "Guests: " + guests,
      "",
      "*Pricing*",
      room.period === "/night"
        ? formatPrice(room.price) + " x " + nights + " nights = " + formatPrice(room.price * nights)
        : formatPrice(room.price) + " (flat rate)",
      "Caution fee: " + formatPrice(room.cautionFee),
      discount > 0 ? "Discount (5%): -" + formatPrice(discountAmount) : "",
      "Total: " + formatPrice(finalTotal),
      "",
      form.specialRequests.trim() ? "*Special Requests*\n" + form.specialRequests.trim() : "",
      "",
      "Submitted: " + new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" }),
    ].filter(Boolean).join("\n");
    return encodeURIComponent(lines);
  }

  function buildPaymentMessage() {
    const lines = [
      "*Payment Receipt — TOPHILLVIEW*",
      "",
      "Guest: " + form.name,
      "Room: " + rooms[selectedRoom!].name,
      "Amount Paid: " + formatPrice(finalTotal),
      "",
      "Please find my payment receipt attached.",
      "",
      "Kindly confirm receipt and update my booking status.",
    ].join("\n");
    return encodeURIComponent(lines);
  }

  function handleConfirm() {
    const msg = buildBookingMessage();
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg, "_blank");
    setBooked(true);
  }

  function handleResend() {
    const msg = buildBookingMessage();
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg, "_blank");
  }

  function handleSendReceipt() {
    const msg = buildPaymentMessage();
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg, "_blank");
  }

  if (booked) {
    return (
      <section className="bg-cream py-32 lg:py-44">
        <div ref={topRef} />
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-gold">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-8 w-8">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-serif text-4xl text-charcoal lg:text-5xl">Booking Request Received</h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-stone">
            Thank you, <span className="text-charcoal">{form.name}</span>! Your booking request has been sent.
            We will confirm your reservation within 24 hours at{" "}
            <span className="text-charcoal">{form.email}</span>.
          </p>
          <p className="mt-2 font-body text-stone">
            Please await our confirmation before making any payment.
          </p>

          <div className="mt-10 rounded-sm border border-gold/20 bg-white p-8 text-left">
            <h3 className="font-serif text-xl text-gold-dark">Payment Details</h3>
            <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-stone">
              * Placeholder — you will be given the correct details upon confirmation
            </p>
            <div className="mt-6 space-y-3 font-body text-base text-charcoal">
              <p><span className="text-stone">Bank:</span> GTBank</p>
              <p><span className="text-stone">Account Name:</span> TOPHILLVIEW LUXURY APARTMENTS</p>
              <p><span className="text-stone">Account Number:</span> 0123 456 7890</p>
              <p><span className="text-stone">Amount Due:</span> {formatPrice(finalTotal)}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={handleSendReceipt}
              className="rounded-full border border-gold bg-gold px-8 py-3 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all hover:bg-gold-dark"
            >
              Send Payment Receipt via WhatsApp
            </button>
            <button
              onClick={handleResend}
              className="rounded-full border border-charcoal/30 px-8 py-3 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all hover:border-charcoal"
            >
              Resend Booking to WhatsApp
            </button>
          </div>

          <a
            href="/"
            className="mt-6 inline-block font-body text-sm text-stone underline transition-colors hover:text-charcoal"
          >
            Back to Homepage
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream py-32 lg:py-44">
      <div ref={topRef} />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold-dark">Book Your Stay</span>
          <h2 className="mt-4 font-serif text-4xl text-charcoal lg:text-5xl">Reserve Your Apartment</h2>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-center gap-0">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-sans text-sm font-medium transition-all ${
                    s < step
                      ? "bg-gold text-charcoal"
                      : s === step
                        ? "bg-charcoal text-cream"
                        : "bg-cream-dark text-stone"
                  }`}
                >
                  {s < step ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
                <span
                  className={`ml-3 hidden font-sans text-xs uppercase tracking-[0.15em] sm:inline ${
                    s <= step ? "text-charcoal" : "text-stone"
                  }`}
                >
                  {s === 1 ? "Your Stay" : s === 2 ? "Your Details" : "Review & Book"}
                </span>
                {s < 3 && <div className={`mx-4 h-px w-12 sm:w-20 ${s < step ? "bg-gold" : "bg-cream-dark"}`} />}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <h3 className="font-serif text-2xl text-charcoal">Your Stay</h3>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="font-sans text-xs uppercase tracking-[0.15em] text-stone">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    min={today()}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCheckIn(val);
                      if (checkOut && val && checkOut <= val) setCheckOut("");
                    }}
                    className="mt-2 block w-full rounded-sm border border-charcoal/20 bg-white px-4 py-3 font-body text-base text-charcoal outline-none transition-colors focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs uppercase tracking-[0.15em] text-stone">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    min={minCheckOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="mt-2 block w-full rounded-sm border border-charcoal/20 bg-white px-4 py-3 font-body text-base text-charcoal outline-none transition-colors focus:border-gold"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <div>
                  <label className="font-sans text-xs uppercase tracking-[0.15em] text-stone">Number of Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="mt-2 block w-32 rounded-sm border border-charcoal/20 bg-white px-4 py-3 font-body text-base text-charcoal outline-none transition-colors focus:border-gold"
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                {nights > 0 && (
                  <div className="rounded-sm bg-cream-dark px-6 py-3">
                    <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone">Nights</p>
                    <p className="font-serif text-2xl text-charcoal">{nights}</p>
                  </div>
                )}
              </div>

              <div className="mt-12">
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone">Select Room</p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  {rooms.map((room, i) => {
                    const selected = selectedRoom === i;
                    return (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(i)}
                        className={`group relative overflow-hidden rounded-sm border-2 text-left transition-all ${
                          selected
                            ? "border-gold"
                            : "border-transparent hover:border-gold/40"
                        }`}
                      >
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={room.img}
                            alt={room.name}
                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                            <span
                              className={`inline-block rounded-full px-3 py-1 font-sans text-[10px] uppercase tracking-[0.1em] ${
                                selected
                                  ? "bg-gold text-charcoal"
                                  : "bg-green-600 text-white"
                              }`}
                            >
                              {selected ? "Selected" : "Available"}
                            </span>
                            <span className="inline-block rounded-full bg-amber-500 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.1em] text-charcoal">
                              5% off 7+ nights
                            </span>
                          </div>
                        </div>
                        <div className="bg-white p-6">
                          <h4 className="font-serif text-lg text-charcoal">{room.name}</h4>
                          <p className="mt-1 font-body text-2xl text-gold-dark">
                            {formatPrice(room.price)}
                            {room.period === "/night" && (
                              <span className="text-sm text-stone"> /night</span>
                            )}
                          </p>
                          <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.1em] text-stone">
                            Up to {room.capacity} guests &middot; {room.caution}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                            {room.highlights.map((h) => (
                              <span key={h} className="font-sans text-[10px] uppercase tracking-[0.1em] text-stone">
                                &bull; {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {roomTotal > 0 && (
                <div className="mt-8 rounded-sm bg-charcoal p-6 text-center">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone-light">Total</p>
                  <p className="mt-3 font-body text-base text-stone">
                    {rooms[selectedRoom!].period === "/night"
                      ? formatPrice(rooms[selectedRoom!].price) + " x " + nights + " night" + (nights > 1 ? "s" : "")
                      : formatPrice(rooms[selectedRoom!].price)}
                  </p>
                  <p className="font-body text-base text-stone">
                    + {formatPrice(cautionFee)} caution fee
                  </p>
                  {discount > 0 && (
                    <>
                      <p className="mt-1 font-body text-2xl text-stone-light line-through">{formatPrice(roomTotal + cautionFee)}</p>
                      <p className="font-body text-base text-green-400">
                        5% Long Stay Discount: &minus;{formatPrice(discountAmount)}
                      </p>
                    </>
                  )}
                  <p className="mt-2 font-serif text-4xl text-gold-light">{formatPrice(finalTotal)}</p>
                </div>
              )}

              {stepError && (
                <p className="mt-4 text-center font-sans text-xs uppercase tracking-[0.15em] text-red-500">{stepError}</p>
              )}

              <div className="mt-8 text-center">
                <button
                  onClick={handleNext1}
                  className={`rounded-full px-12 py-4 font-sans text-xs uppercase tracking-[0.15em] transition-all ${
                    step1Valid
                      ? "bg-gold text-charcoal hover:bg-gold-dark"
                      : "cursor-not-allowed bg-cream-dark text-stone"
                  }`}
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <h3 className="font-serif text-2xl text-charcoal">Your Details</h3>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="font-sans text-xs uppercase tracking-[0.15em] text-stone">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-2 block w-full rounded-sm border border-charcoal/20 bg-white px-4 py-3 font-body text-base text-charcoal placeholder:text-stone-light outline-none transition-colors focus:border-gold"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="font-sans text-xs uppercase tracking-[0.15em] text-stone">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="mt-2 block w-full rounded-sm border border-charcoal/20 bg-white px-4 py-3 font-body text-base text-charcoal placeholder:text-stone-light outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs uppercase tracking-[0.15em] text-stone">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="2348123456789"
                      className="mt-2 block w-full rounded-sm border border-charcoal/20 bg-white px-4 py-3 font-body text-base text-charcoal placeholder:text-stone-light outline-none transition-colors focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs uppercase tracking-[0.15em] text-stone">Special Requests</label>
                  <textarea
                    rows={4}
                    value={form.specialRequests}
                    onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                    placeholder="Any special requests or preferences..."
                    className="mt-2 block w-full resize-none rounded-sm border border-charcoal/20 bg-white px-4 py-3 font-body text-base text-charcoal placeholder:text-stone-light outline-none transition-colors focus:border-gold"
                  />
                </div>
              </div>

              {stepError && (
                <p className="mt-6 text-center font-sans text-xs uppercase tracking-[0.15em] text-red-500">{stepError}</p>
              )}

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => { setStep(1); setStepError(""); }}
                  className="rounded-full border border-charcoal/30 px-10 py-4 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all hover:border-charcoal"
                >
                  Back
                </button>
                <button
                  onClick={handleNext2}
                  className="rounded-full bg-gold px-12 py-4 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all hover:bg-gold-dark"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <h3 className="font-serif text-2xl text-charcoal">Review & Book</h3>

              <div className="mt-8 space-y-6">
                <div className="overflow-hidden rounded-sm border border-charcoal/10 bg-white">
                  <div className="flex gap-6 p-6">
                    <img
                      src={rooms[selectedRoom!].img}
                      alt={rooms[selectedRoom!].name}
                      className="h-24 w-36 rounded-sm object-cover"
                    />
                    <div>
                      <h4 className="font-serif text-lg text-charcoal">{rooms[selectedRoom!].name}</h4>
                      <p className="mt-1 font-body text-xl text-gold-dark">
                        {formatPrice(rooms[selectedRoom!].price)}
                        {rooms[selectedRoom!].period === "/night" && <span className="text-sm text-stone"> /night</span>}
                      </p>
                      <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.1em] text-stone">{rooms[selectedRoom!].caution}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-sm bg-white p-6">
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-stone">Check-in</p>
                    <p className="mt-1 font-body text-lg text-charcoal">{checkIn}</p>
                  </div>
                  <div className="rounded-sm bg-white p-6">
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-stone">Check-out</p>
                    <p className="mt-1 font-body text-lg text-charcoal">{checkOut}</p>
                  </div>
                  <div className="rounded-sm bg-white p-6">
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-stone">Nights</p>
                    <p className="mt-1 font-body text-lg text-charcoal">{nights}</p>
                  </div>
                  <div className="rounded-sm bg-white p-6">
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-stone">Guests</p>
                    <p className="mt-1 font-body text-lg text-charcoal">{guests}</p>
                  </div>
                </div>

                <div className="rounded-sm bg-white p-6">
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-stone">Contact Details</p>
                  <p className="mt-2 font-body text-base text-charcoal">{form.name}</p>
                  <p className="font-body text-base text-stone">{form.email}</p>
                  <p className="font-body text-base text-stone">{form.phone}</p>
                  {form.specialRequests.trim() && (
                    <>
                      <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.15em] text-stone">Special Requests</p>
                      <p className="mt-1 font-body text-base text-stone">{form.specialRequests.trim()}</p>
                    </>
                  )}
                </div>

                <div className="rounded-sm bg-charcoal p-6 text-center">
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone-light">Total</p>
                  <p className="mt-3 font-body text-base text-stone">
                    {rooms[selectedRoom!].period === "/night"
                      ? formatPrice(rooms[selectedRoom!].price) + " x " + nights + " night" + (nights > 1 ? "s" : "")
                      : formatPrice(rooms[selectedRoom!].price)}
                  </p>
                  <p className="font-body text-base text-stone">
                    + {formatPrice(cautionFee)} caution fee
                  </p>
                  {discount > 0 && (
                    <>
                      <p className="mt-1 font-body text-2xl text-stone-light line-through">{formatPrice(roomTotal + cautionFee)}</p>
                      <p className="font-body text-base text-green-400">
                        5% Long Stay Discount: &minus;{formatPrice(discountAmount)}
                      </p>
                    </>
                  )}
                  <p className="mt-2 font-serif text-4xl text-gold-light">{formatPrice(finalTotal)}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => { setStep(2); setStepError(""); }}
                  className="rounded-full border border-charcoal/30 px-10 py-4 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all hover:border-charcoal"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="rounded-full bg-gold px-12 py-4 font-sans text-xs uppercase tracking-[0.15em] text-charcoal transition-all hover:bg-gold-dark"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
