"use client";

import { useState, useEffect } from "react";

/* ─── NAV ─── */
const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="font-heading text-2xl font-semibold tracking-wide text-cream"
          style={{ textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.4)" }}
        >
          <span className={scrolled ? "text-charcoal" : "text-cream"}>Elara</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-charcoal-light hover:text-gold"
                  : "text-cream/90 hover:text-cream"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2 bg-gold text-cream text-sm font-medium rounded-full hover:bg-gold-light transition-colors"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 transition-transform ${
              scrolled ? "bg-charcoal" : "bg-cream"
            } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-opacity ${
              scrolled ? "bg-charcoal" : "bg-cream"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-transform ${
              scrolled ? "bg-charcoal" : "bg-cream"
            } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-cream/95 backdrop-blur px-6 pb-6 pt-2 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-charcoal-light hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-center px-5 py-2 bg-charcoal text-cream text-sm font-medium rounded-full hover:bg-gold transition-colors"
          >
            Book Now
          </a>
        </nav>
      )}
    </header>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-6"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://picsum.photos/seed/salon-hero/1920/1080')",
        }}
      >
        <div className="absolute inset-0 bg-charcoal/50" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <h1 className="font-heading text-5xl md:text-7xl font-semibold text-cream leading-tight">
          Elara Hair Studio
        </h1>
        <p className="mt-4 text-lg md:text-xl text-cream/80 font-light max-w-xl mx-auto">
          Where artistry meets elegance. Discover your most beautiful self.
        </p>
        <a
          href="#contact"
          className="inline-block mt-8 px-8 py-3 bg-gold text-cream text-base font-medium rounded-full hover:bg-gold-light transition-colors"
        >
          Book Appointment
        </a>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
const services = [
  {
    name: "Haircut & Style",
    desc: "Precision cuts tailored to your face shape and lifestyle.",
    price: "$65+",
  },
  {
    name: "Full Color",
    desc: "Rich, dimensional color using premium, ammonia-free formulas.",
    price: "$120+",
  },
  {
    name: "Highlights",
    desc: "Hand-painted balayage or classic foils for sun-kissed dimension.",
    price: "$150+",
  },
  {
    name: "Deep Treatment",
    desc: "Intensive repair and hydration for damaged or dry hair.",
    price: "$45+",
  },
  {
    name: "Blowout",
    desc: "A smooth, voluminous blowout that lasts for days.",
    price: "$50+",
  },
  {
    name: "Bridal Styling",
    desc: "Elegant updos and styling for your special day.",
    price: "$200+",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl text-center font-semibold">
          Our Services
        </h2>
        <p className="mt-3 text-center text-charcoal-light max-w-xl mx-auto">
          Premium treatments crafted with care, using only the finest products.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-heading text-xl font-semibold">{s.name}</h3>
              <p className="mt-2 text-charcoal-light text-sm leading-relaxed">
                {s.desc}
              </p>
              <p className="mt-4 text-gold font-semibold text-lg">{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" className="py-24 px-6 bg-beige/40">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/salon-about/800/600"
            alt="Inside Elara Hair Studio"
            className="w-full h-80 md:h-[28rem] object-cover"
          />
        </div>
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">
            About Elara
          </h2>
          <p className="mt-6 text-charcoal-light leading-relaxed">
            Nestled in the heart of downtown, Elara Hair Studio was born from a
            passion for making people feel truly beautiful. Founded in 2018 by
            lead stylist Sofia Reyes, our intimate studio blends modern
            techniques with timeless elegance.
          </p>
          <p className="mt-4 text-charcoal-light leading-relaxed">
            Every visit is a personalised experience — from a calming scalp
            massage to a perfectly crafted cut. We use only sustainable,
            cruelty-free products because beauty should never come at a cost to
            the world around us.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ─── */
const galleryImages = [
  { seed: "salon-g1", alt: "Styled hair look 1" },
  { seed: "salon-g2", alt: "Styled hair look 2" },
  { seed: "salon-g3", alt: "Salon interior" },
  { seed: "salon-g4", alt: "Styled hair look 3" },
  { seed: "salon-g5", alt: "Stylist at work" },
  { seed: "salon-g6", alt: "Hair coloring result" },
];

function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl text-center font-semibold">
          Gallery
        </h2>
        <p className="mt-3 text-center text-charcoal-light max-w-xl mx-auto">
          A glimpse into the Elara experience.
        </p>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.seed}
              className="rounded-xl overflow-hidden aspect-square"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${img.seed}/600/600`}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
const testimonials = [
  {
    name: "Amara Jenkins",
    text: "Elara completely transformed my hair. I walked out feeling like a new person. Sofia truly listens and delivers every single time.",
    stars: 5,
  },
  {
    name: "Liam O\u2019Brien",
    text: "Best barbershop-meets-salon experience in the city. The attention to detail is unmatched and the atmosphere is so relaxing.",
    stars: 5,
  },
  {
    name: "Priya Patel",
    text: "I\u2019ve been going to Elara for two years and my hair has never been healthier. Their treatments are absolutely worth every penny.",
    stars: 4,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < count ? "fill-gold" : "fill-warm"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-beige/40">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl text-center font-semibold">
          What Our Clients Say
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm">
              <Stars count={t.stars} />
              <p className="mt-4 text-charcoal-light leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-6 font-semibold text-charcoal">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT / BOOKING ─── */
function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
        {/* Form */}
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold">
            Get in Touch
          </h2>
          <p className="mt-3 text-charcoal-light">
            Ready for a new look? Send us a message or call to book your
            appointment.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! We\u2019ll be in touch soon.");
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-5 py-3 rounded-xl bg-white border border-warm/50 focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-5 py-3 rounded-xl bg-white border border-warm/50 focus:outline-none focus:border-gold transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              required
              className="w-full px-5 py-3 rounded-xl bg-white border border-warm/50 focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-charcoal text-cream font-medium rounded-full hover:bg-gold transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-8 md:pt-16">
          <div>
            <h3 className="font-heading text-xl font-semibold">Address</h3>
            <p className="mt-2 text-charcoal-light">
              142 Bloom Street, Suite 3<br />
              Brooklyn, NY 11201
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold">Phone</h3>
            <p className="mt-2 text-charcoal-light">(718) 555-0192</p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold">Hours</h3>
            <ul className="mt-2 text-charcoal-light space-y-1">
              <li>Mon &mdash; Fri: 9:00 AM &mdash; 7:00 PM</li>
              <li>Saturday: 9:00 AM &mdash; 5:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70 py-14 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <span className="font-heading text-2xl font-semibold text-cream">
            Elara
          </span>
          <p className="mt-2 text-sm">
            &copy; {new Date().getFullYear()} Elara Hair Studio. All rights
            reserved.
          </p>
        </div>

        <nav className="flex gap-6 text-sm">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-gold-light transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex gap-4">
          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-gold-light transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-gold-light transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          {/* TikTok */}
          <a
            href="#"
            aria-label="TikTok"
            className="hover:text-gold-light transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
