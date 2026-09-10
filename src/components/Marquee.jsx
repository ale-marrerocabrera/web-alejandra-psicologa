import { Flower2 } from "lucide-react";

const phrases = [
  "Escucha sin juicio",
  "A tu ritmo",
  "Terapia online y presencial",
  "Espacio confidencial",
  "Acompañamiento cálido",
  "Primera sesión de orientación",
];

export default function Marquee() {
  const items = [...phrases, ...phrases];
  return (
    <div
      data-testid="editorial-marquee"
      className="bg-[#8A9A86]/10 py-5 border-y border-[#E5DFD5] overflow-hidden"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center gap-10 pr-10">
        {[...items, ...items].map((phrase, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-serif text-lg sm:text-xl italic text-[#2D4030] whitespace-nowrap">
              {phrase}
            </span>
            <Flower2 className="w-4 h-4 text-[#C86D51] shrink-0" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}
