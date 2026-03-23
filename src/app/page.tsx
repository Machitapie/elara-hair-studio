"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

/* ────────────────────────────────────────────────
   SCROLL-REVEAL WRAPPER
   ──────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   HEADER
   ──────────────────────────────────────────────── */
const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        <a href="#hero" className="group">
          <span className="font-heading text-3xl font-light tracking-[0.15em] text-cream uppercase">
            Elara
          </span>
          <span className="block text-[10px] tracking-[0.35em] text-gold uppercase font-body font-light">
            Hair Studio
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-cream transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-6 py-2.5 border border-gold text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-dark transition-all duration-300"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-px bg-cream transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-cream transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-cream transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-sm tracking-[0.2em] uppercase text-text-secondary hover:text-cream transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center px-6 py-3 border border-gold text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-dark transition-all"
              >
                Book Now
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ────────────────────────────────────────────────
   HERO — parallax + fade
   ──────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80&auto=format&fit=crop"
          alt="Salon interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6">
            Oslo&apos;s Premier Hair Studio
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-cream leading-[0.9] tracking-wide"
        >
          Elara
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-gold mx-auto mt-6 mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-xl md:text-2xl text-cream-soft font-light italic max-w-lg mx-auto"
        >
          The art of beautiful hair, refined
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block mt-10 px-10 py-4 bg-gold text-dark text-xs tracking-[0.25em] uppercase font-medium hover:bg-gold-light transition-colors duration-300"
        >
          Book Your Visit
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   SERVICES — editorial asymmetric layout
   ──────────────────────────────────────────────── */
const services = [
  {
    name: "Cut & Style",
    desc: "Precision cutting shaped to complement your features, finished with expert styling.",
    price: "890 kr",
    duration: "60 min",
  },
  {
    name: "Colour",
    desc: "Full spectrum colour services — from subtle natural tones to bold creative transformations.",
    price: "1 490 kr",
    duration: "120 min",
  },
  {
    name: "Balayage",
    desc: "Hand-painted highlights for effortless, sun-kissed dimension that grows out beautifully.",
    price: "2 290 kr",
    duration: "150 min",
  },
  {
    name: "Treatment",
    desc: "Deep restorative treatments using Olaplex and Kevin Murphy to revive damaged hair.",
    price: "690 kr",
    duration: "45 min",
  },
  {
    name: "Blowout",
    desc: "A luxurious wash and blowdry for effortlessly polished, voluminous hair.",
    price: "590 kr",
    duration: "45 min",
  },
  {
    name: "Bridal",
    desc: "Full bridal hair consultation, trial, and day-of styling. Your day, perfected.",
    price: "3 500 kr",
    duration: "By appt.",
  },
];

function Services() {
  return (
    <section id="services" className="py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            What We Do
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light">
            Services
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-0 border-t border-border">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(201, 169, 110, 0.05)" }}
                className={`group p-8 md:p-10 border-b border-border transition-colors duration-500 ${
                  i % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl md:text-3xl font-light text-cream group-hover:text-gold transition-colors duration-300">
                      {s.name}
                    </h3>
                    <p className="mt-3 text-text-secondary text-sm leading-relaxed max-w-sm">
                      {s.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-heading text-2xl text-gold">{s.price}</p>
                    <p className="mt-1 text-text-muted text-xs tracking-wider uppercase">
                      {s.duration}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   ABOUT
   ──────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-28 md:py-36 px-6 lg:px-10 bg-dark-card">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal direction="left">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop"
                alt="Stylist at work"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10" />
          </div>
        </Reveal>

        <div>
          <Reveal direction="right">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
              Our Story
            </p>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <h2 className="font-heading text-5xl md:text-6xl font-light leading-tight">
              Where craft
              <br />
              <span className="italic text-gold">meets care</span>
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.2}>
            <p className="mt-8 text-text-secondary leading-[1.8] text-base">
              Founded in 2019 by lead stylist Ingrid Halversen, Elara grew from
              a simple idea: that a visit to the salon should feel like an
              escape, not an errand. Tucked away on a quiet street in Frogner,
              our intimate studio is a space of warmth, expertise, and genuine
              connection.
            </p>
          </Reveal>
          <Reveal direction="right" delay={0.3}>
            <p className="mt-5 text-text-secondary leading-[1.8] text-base">
              Every stylist on our team has trained internationally and shares a
              commitment to sustainable, cruelty-free products. We work
              exclusively with Kevin Murphy and Olaplex — because your hair
              deserves the very best.
            </p>
          </Reveal>
          <Reveal direction="right" delay={0.4}>
            <div className="mt-10 flex items-center gap-6">
              <div>
                <p className="font-heading text-4xl text-gold">6+</p>
                <p className="text-text-muted text-xs tracking-wider uppercase mt-1">
                  Years
                </p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-heading text-4xl text-gold">4</p>
                <p className="text-text-muted text-xs tracking-wider uppercase mt-1">
                  Stylists
                </p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="font-heading text-4xl text-gold">2k+</p>
                <p className="text-text-muted text-xs tracking-wider uppercase mt-1">
                  Happy Clients
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   GALLERY — masonry-style with hover overlays
   ──────────────────────────────────────────────── */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80&auto=format&fit=crop",
    alt: "Blonde balayage styling",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80&auto=format&fit=crop",
    alt: "Hair coloring process",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80&auto=format&fit=crop",
    alt: "Modern salon interior",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80&auto=format&fit=crop",
    alt: "Stylist cutting hair",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80&auto=format&fit=crop",
    alt: "Beautiful hair result",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1522338242992-e1a54571a9f7?w=600&q=80&auto=format&fit=crop",
    alt: "Hair styling detail",
    span: "",
  },
];

function Gallery() {
  return (
    <section id="gallery" className="py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            Our Work
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light mb-16 md:mb-20">
            Gallery
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[280px] gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={i * 0.06} className={img.span}>
              <motion.div
                className="relative w-full h-full overflow-hidden group cursor-pointer"
                whileHover="hover"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  variants={{
                    hover: { scale: 1.05 },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="absolute inset-0 bg-dark/0 flex items-end p-6"
                  variants={{
                    hover: { backgroundColor: "rgba(12, 10, 9, 0.4)" },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p
                    className="text-cream text-sm tracking-wider"
                    initial={{ opacity: 0, y: 10 }}
                    variants={{
                      hover: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {img.alt}
                  </motion.p>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   TESTIMONIALS
   ──────────────────────────────────────────────── */
const testimonials = [
  {
    name: "Maja Solberg",
    text: "I\u2019ve never felt more confident walking out of a salon. Ingrid understood exactly what I wanted and delivered something even better. The atmosphere alone makes it worth every visit.",
    stars: 5,
    since: "Client since 2021",
  },
  {
    name: "Erik Nordahl",
    text: "Finally found a place in Oslo that takes men\u2019s hair seriously. The attention to detail is on another level. I always leave looking and feeling sharp.",
    stars: 5,
    since: "Client since 2022",
  },
  {
    name: "Linnea Strand",
    text: "The balayage they did was absolutely flawless \u2014 natural, dimensional, exactly what I showed on my Pinterest board. Three months later it still looks incredible.",
    stars: 5,
    since: "Client since 2020",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-gold" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-28 md:py-36 px-6 lg:px-10 bg-dark-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <Reveal>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
              Testimonials
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light">
              Kind words
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <div className="bg-dark-elevated border border-border p-8 md:p-10 h-full flex flex-col">
                <Stars count={t.stars} />
                <p className="mt-6 text-text-secondary leading-[1.8] text-sm flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-cream font-medium text-sm">{t.name}</p>
                  <p className="text-text-muted text-xs mt-1">{t.since}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   CONTACT / BOOKING
   ──────────────────────────────────────────────── */
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Form side */}
        <div>
          <Reveal>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
              Book a Visit
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-5xl md:text-6xl font-light leading-tight">
              Let&apos;s create
              <br />
              <span className="italic text-gold">something beautiful</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <form
              className="mt-10 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <p className="font-heading text-3xl text-gold">Thank you</p>
                  <p className="mt-3 text-text-secondary">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      className="w-full px-0 py-4 bg-transparent border-b border-border text-cream placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full px-0 py-4 bg-transparent border-b border-border text-cream placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    className="w-full px-0 py-4 bg-transparent border-b border-border text-cream placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors text-sm"
                  />
                  <textarea
                    placeholder="Tell us about the look you're going for..."
                    rows={4}
                    required
                    className="w-full px-0 py-4 bg-transparent border-b border-border text-cream placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors resize-none text-sm"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 px-10 py-4 bg-gold text-dark text-xs tracking-[0.25em] uppercase font-medium hover:bg-gold-light transition-colors duration-300"
                  >
                    Send Message
                  </motion.button>
                </>
              )}
            </form>
          </Reveal>
        </div>

        {/* Contact info side */}
        <div className="lg:pt-20">
          <Reveal direction="right">
            <div className="space-y-10">
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
                  Visit Us
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Bygd&oslash;y all&eacute; 23
                  <br />
                  0262 Oslo, Norway
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
                  Contact
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  +47 22 44 78 90
                  <br />
                  hei@elarahair.no
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
                  Opening Hours
                </h3>
                <ul className="text-text-secondary space-y-2 text-sm">
                  <li className="flex justify-between max-w-xs">
                    <span>Monday &mdash; Friday</span>
                    <span className="text-cream">09:00 &mdash; 19:00</span>
                  </li>
                  <li className="flex justify-between max-w-xs">
                    <span>Saturday</span>
                    <span className="text-cream">10:00 &mdash; 17:00</span>
                  </li>
                  <li className="flex justify-between max-w-xs">
                    <span>Sunday</span>
                    <span className="text-cream">Closed</span>
                  </li>
                </ul>
              </div>

              {/* Map placeholder card */}
              <div className="aspect-[16/9] bg-dark-elevated border border-border overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80&auto=format&fit=crop"
                  alt="Frogner neighbourhood, Oslo"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   FOOTER
   ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <span className="font-heading text-3xl font-light tracking-[0.15em] text-cream uppercase">
              Elara
            </span>
            <p className="mt-4 text-text-muted text-sm leading-relaxed max-w-xs">
              Premium hair studio in the heart of Frogner, Oslo. Where craft
              meets care.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
              Explore
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-text-secondary text-sm hover:text-cream transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
              Follow Us
            </h4>
            <div className="flex gap-5">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="text-text-secondary hover:text-gold transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="text-text-secondary hover:text-gold transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="#"
                aria-label="TikTok"
                className="text-text-secondary hover:text-gold transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Elara Hair Studio. All rights
            reserved.
          </p>
          <p className="text-text-muted text-xs">
            Bygd&oslash;y all&eacute; 23, 0262 Oslo
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────── */
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
