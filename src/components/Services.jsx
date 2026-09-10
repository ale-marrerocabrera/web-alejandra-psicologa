import { Reveal } from "@/components/Reveal";
import { Wind, HeartHandshake, Sunrise, Flower2, Sparkles, ArrowRight } from "lucide-react";
import { useContent } from "@/content/ContentProvider";

export default function Services() {
  const { services } = useContent();
  const icons = [Wind, HeartHandshake, Sunrise, Flower2, Sparkles];
  return (
    <section id="servicios" data-testid="services-section" className="py-24 sm:py-32 bg-[#F3EFEA]">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <Reveal className="max-w-2xl">
          <p className="text-xs sm:text-sm tracking-widest uppercase text-[#8A9A86] font-semibold">
            {services.eyebrow}
          </p>
          <h2
            data-testid="services-heading"
            className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2A29] leading-tight"
          >
            {services.titleBefore}<span className="italic text-[#C86D51]">{services.titleAccent}</span>{services.titleAfter}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#524E4A] leading-relaxed">
            {services.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.items.map((service, i) => {
            const Icon = icons[i] ?? Sparkles;
            const num = String(i + 1).padStart(2, "0");
            return (
            <Reveal key={`${num}-${service.title}`} delay={i * 0.08}>
              <article
                data-testid={`service-card-${num}`}
                className="group h-full bg-white/90 backdrop-blur-md border border-[#E5DFD5] rounded-2xl p-8 shadow-[0_10px_30px_rgba(45,64,48,0.04)] hover:shadow-[0_20px_40px_rgba(45,64,48,0.10)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#8A9A86]/15 text-[#2D4030] group-hover:bg-[#C86D51]/15 group-hover:text-[#C86D51] transition-colors duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-serif text-3xl text-[#E5DFD5] group-hover:text-[#C86D51]/40 transition-colors duration-300">
                    {num}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-xl sm:text-2xl font-semibold text-[#2D4030]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#524E4A] leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#contacto"
                  data-testid={`service-cta-${num}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#C86D51] hover:gap-3 transition-all duration-300"
                >
                  {services.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </article>
            </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  );
}
