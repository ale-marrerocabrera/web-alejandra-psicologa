import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, ShieldCheck } from "lucide-react";
import { useContent } from "@/content/ContentProvider";

export default function Hero() {
  const ref = useRef(null);
  const { hero } = useContent();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="inicio"
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-40 w-[38rem] h-[38rem] rounded-full bg-[#8A9A86]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-48 w-[30rem] h-[30rem] rounded-full bg-[#C86D51]/10 blur-3xl"
      />

      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative">
        <motion.div style={{ y: textY }} className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8A9A86]/15 text-[#2D4030] text-xs sm:text-sm font-medium border border-[#8A9A86]/30"
            data-testid="hero-badge"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
            {hero.badge}
          </motion.div>

          <h1
            data-testid="hero-heading"
            className="mt-7 font-serif font-normal tracking-tight text-[#2D4030] text-4xl sm:text-5xl lg:text-7xl leading-[1.08]"
          >
            {hero.titleLines.map((text, i) => (
              <span key={text} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === hero.titleLines.length - 1 ? "italic text-[#C86D51]" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.14, ease: [0.215, 0.61, 0.355, 1.0] }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-[#524E4A] leading-relaxed"
            data-testid="hero-subtitle"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contacto"
              data-testid="hero-cta-button"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C86D51] text-[#FAF7F2] font-medium hover:bg-[#B25C42] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_10px_30px_rgba(200,109,81,0.25)]"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#sobre-mi"
              data-testid="hero-secondary-button"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#2D4030]/25 text-[#2D4030] font-medium hover:bg-[#2D4030] hover:text-[#FAF7F2] hover:-translate-y-0.5 transition-all duration-300"
            >
              {hero.secondaryCta}
              <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="mt-8 flex items-center gap-2 text-sm text-[#6E6963]"
            data-testid="hero-trust-note"
          >
            <ShieldCheck className="w-4 h-4 text-[#8A9A86]" />
            {hero.trustNote}
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2.5rem] rounded-tr-[8rem] border border-[#E5DFD5] shadow-[0_30px_60px_rgba(45,64,48,0.12)]">
              <motion.img
                src={hero.imageUrl}
                alt={hero.imageAlt}
                data-testid="hero-image"
                style={{ y: imgY }}
                className="w-full h-[26rem] sm:h-[32rem] object-cover scale-110"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/90 backdrop-blur-md border border-[#E5DFD5] rounded-2xl px-5 py-4 shadow-[0_10px_30px_rgba(45,64,48,0.08)]"
              data-testid="hero-floating-card"
            >
              <p className="font-serif text-2xl text-[#2D4030]">{hero.experience}</p>
              <p className="text-xs text-[#6E6963] tracking-wide uppercase font-medium">
                {hero.experienceLabel}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
