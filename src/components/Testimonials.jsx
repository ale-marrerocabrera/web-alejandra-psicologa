import { Reveal } from "@/components/Reveal";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    initials: "M.G.",
    tag: "Proceso de ansiedad",
    quote:
      "Llegué sin poder dormir por la ansiedad y hoy tengo herramientas para mi día a día. Me sentí escuchada desde la primera sesión.",
  },
  {
    initials: "A.R.",
    tag: "Terapia de pareja",
    quote:
      "Nos ayudó a hablarnos de otra manera. Recuperamos la confianza que creíamos perdida. Eternamente agradecidos.",
  },
  {
    initials: "C.L.",
    tag: "Duelo",
    quote:
      "Acompañó mi duelo con un respeto y una calidez que no olvidaré. Aprendí a convivir con la pérdida sin que me apagara.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" data-testid="testimonials-section" className="py-24 sm:py-32">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-xs sm:text-sm tracking-widest uppercase text-[#8A9A86] font-semibold">
            Testimonios
          </p>
          <h2
            data-testid="testimonials-heading"
            className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2A29] leading-tight"
          >
            Historias que <span className="italic text-[#C86D51]">florecieron</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#524E4A] leading-relaxed">
            Por confidencialidad, comparto estas palabras con iniciales y con el
            permiso de quienes las escribieron.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.initials} delay={i * 0.12}>
              <figure
                data-testid={`testimonial-card-${i + 1}`}
                className="h-full bg-white/90 backdrop-blur-md border border-[#E5DFD5] rounded-2xl p-8 shadow-[0_10px_30px_rgba(45,64,48,0.04)] hover:shadow-[0_20px_40px_rgba(45,64,48,0.08)] transition-shadow duration-300 flex flex-col"
              >
                <Quote className="w-8 h-8 text-[#C86D51]/40" strokeWidth={1.5} />
                <blockquote className="mt-4 flex-1 font-serif text-lg sm:text-xl text-[#2C2A29] leading-relaxed italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-[#E5DFD5] flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-[#2D4030]">{t.initials}</p>
                    <p className="text-xs text-[#8A9A86] uppercase tracking-wide font-medium mt-0.5">
                      {t.tag}
                    </p>
                  </div>
                  <div className="flex gap-0.5" aria-label="Valoración: 5 de 5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-[#D4A359] text-[#D4A359]" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
