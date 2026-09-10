import { Reveal } from "@/components/Reveal";
import { GraduationCap, Heart, Lock } from "lucide-react";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1734365294861-3f6df6a6af89?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxmZW1hbGUlMjB0aGVyYXBpc3QlMjB3YXJtJTIwcG9ydHJhaXQlMjBsaWdodHxlbnwwfHx8fDE3ODg5ODgwODV8MA&ixlib=rb-4.1.0&q=85";

const keywords = ["Terapia centrada en la persona", "Enfoque cognitivo-conductual", "Espacio confidencial"];

export default function About() {
  return (
    <section id="sobre-mi" data-testid="about-section" className="py-24 sm:py-32">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:col-span-5 relative">
          <div className="overflow-hidden rounded-[2.5rem] rounded-bl-[7rem] border border-[#E5DFD5] shadow-[0_20px_50px_rgba(45,64,48,0.10)]">
            <img
              src={ABOUT_IMAGE}
              alt="La psicóloga en su consulta, un espacio cálido con luz natural"
              data-testid="about-image"
              loading="lazy"
              className="w-full h-[24rem] sm:h-[30rem] object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 rounded-full bg-[#C86D51]/15"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs sm:text-sm tracking-widest uppercase text-[#8A9A86] font-semibold">
              Sobre mí
            </p>
            <h2
              data-testid="about-heading"
              className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C2A29] leading-tight"
            >
              Hola, soy <span className="italic text-[#C86D51]">[Nombre de la psicóloga]</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-base sm:text-lg text-[#524E4A] leading-relaxed" data-testid="about-bio-1">
              Psicóloga sanitaria con más de 10 años de experiencia acompañando a
              personas en momentos de ansiedad, duelo, crisis vitales y búsqueda de
              sí mismas. Me formé en [Universidad / formación placeholder] y desde
              entonces he dedicado mi práctica a crear espacios donde cada persona
              se sienta escuchada de verdad.
            </p>
            <p className="mt-4 text-base sm:text-lg text-[#524E4A] leading-relaxed" data-testid="about-bio-2">
              Creo que la terapia no es solo resolver problemas: es aprender a
              habitarte con más amabilidad. Mi trabajo combina el rigor de la
              psicología basada en evidencia con una cercanía genuina, porque sé que
              detrás de cada consulta hay una historia que merece cuidado.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3" data-testid="about-keywords">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8A9A86]/15 text-[#2D4030] text-sm font-medium border border-[#8A9A86]/30"
              >
                {kw}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.3} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6" data-testid="about-stats">
            {[
              { icon: GraduationCap, value: "+10 años", label: "de experiencia" },
              { icon: Heart, value: "+300", label: "procesos acompañados" },
              { icon: Lock, value: "100%", label: "confidencial" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#C86D51]/10 text-[#C86D51]">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-serif text-xl text-[#2D4030]">{value}</p>
                  <p className="text-xs text-[#6E6963] uppercase tracking-wide">{label}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
