export default function Footer() {
  return (
    <footer className="relative bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 text-center lg:grid-cols-3 lg:text-left">
          <div>
            <span className="font-serif text-2xl tracking-[0.3em] text-gold">
              TOPHILL
            </span>
            <span className="block text-xs tracking-[0.5em] text-stone-light">
              VIEW
            </span>
            <p className="mt-6 font-body text-base leading-relaxed text-stone-light">
              Luxury Apartments in Kubwa, Abuja — where elegance and
              sophistication meet unparalleled comfort.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-gold">
              Contact
            </h4>
            <address className="mt-6 space-y-3 not-italic">
              <p className="font-body text-base text-stone-light">
                14 Okpebholo Akhere Ave
              </p>
              <p className="font-body text-base text-stone-light">
                Kubwa, Abuja 901101, FCT
              </p>
              <p className="font-body text-base text-stone-light">
                +234 800 TOPHILLVIEW
              </p>
              <p className="font-body text-base text-stone-light">
                info@tophillview.com
              </p>
            </address>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.25em] text-gold">
              Sales Gallery
            </h4>
            <p className="mt-6 font-body text-base leading-relaxed text-stone-light">
              Open daily by appointment
            </p>
            <p className="mt-2 font-body text-base text-stone-light">
              Mon — Sat: 10 AM — 7 PM
            </p>
            <p className="font-body text-base text-stone-light">
              Sunday: 12 PM — 5 PM
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10 text-center">
          <p className="font-sans text-xs tracking-[0.05em] text-stone">
            &copy; {new Date().getFullYear()} TOPHILLVIEW Luxury Apartments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}