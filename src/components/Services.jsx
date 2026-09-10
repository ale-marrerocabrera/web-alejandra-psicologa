import { Reveal } from "@/components/Reveal";
import { Wind, HeartHandshake, Sunrise, Flower2, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    num: "01",
    icon: Wind,
    title: "Ansiedad y estrés",
    description:
      "Aprende a calmar tu mente y a recuperar la sensación de control en tu día a día, con herramientas que te acompañarán siempre.",
  },
  {
    num: "02",
    icon: HeartHandshake,
    title: "Terapia de pareja",
    description:
      "Vuelvan a encontrarse: mejoren su comunicación, reconstruyan la confianza y decidan juntos hacia dónde quieren caminar.",
  },
  {
    num: "03",
    icon: Sunrise,
    title: "Duelo y pérdida",
    description:
      "Atraviesa la pérdida con un acompañamiento respetuoso, dándole sentido a tu historia y recuperando las ganas de mirar adelante.",
  },
  {
    num: "04",
    icon: Flower2,
    title: "Autoestima",
    description:
      "Construye una relación más amable contigo: silencia la crítica interna y aprende a ocupar tu lugar con seguridad.",
  },
  {
    num: "05",
    icon: Sparkles,
    title: "Crecimiento personal",
    description:
      "Conócete en profundidad, clarifica lo que quieres y diseña una vida más alineada con quien realmente eres.",
  },
];

export default function Services() {
  return (
    <section id="servicios" data-testid="services-section" className="py-24 sm:py-32 bg-[#F3EFEA]">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <Reveal className="max-w-2xl">
          <p className="text-xs sm:text-sm tracking-widest uppercase text-[#8A9A86] font-semibold">
            Servicios
          </p>
          <h2
            data-testid="services-heading"
            className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2A29] leading-tight"
          >
            ¿En qué puedo <span className="italic text-[#C86D51]">acompañarte</span>?
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#524E4A] leading-relaxed">
            Cada proceso es único. Estas son las áreas en las que trabajo, siempre
            con un objetivo: que salgas de terapia con más recursos de los que
            trajiste.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 0.08}>
              <article
                data-testid={`service-card-${service.num}`}
                className="group h-full bg-white/90 backdrop-blur-md border border-[#E5DFD5] rounded-2xl p-8 shadow-[0_10px_30px_rgba(45,64,48,0.04)] hover:shadow-[0_20px_40px_rgba(45,64,48,0.10)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#8A9A86]/15 text-[#2D4030] group-hover:bg-[#C86D51]/15 group-hover:text-[#C86D51] transition-colors duration-300">
                    <service.icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-serif text-3xl text-[#E5DFD5] group-hover:text-[#C86D51]/40 transition-colors duration-300">
                    {service.num}
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
                  data-testid={`service-cta-${service.num}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#C86D51] hover:gap-3 transition-all duration-300"
                >
                  Pedir información
                  <ArrowRight className="w-4 h-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
