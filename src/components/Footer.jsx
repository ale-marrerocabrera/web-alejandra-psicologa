import { Flower2, Instagram, Linkedin, Facebook } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="bg-[#2D4030] border-t border-[#FAF7F2]/10">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <a href="#inicio" data-testid="footer-brand-link" className="flex items-center gap-2.5 text-[#FAF7F2]">
              <Flower2 className="w-6 h-6 text-[#D4A359]" strokeWidth={1.5} />
              <span className="font-serif text-xl italic">[Nombre de la psicóloga]</span>
            </a>
            <p className="mt-4 text-sm text-[#FAF7F2]/60 leading-relaxed max-w-xs">
              Psicología con calidez humana y rigor profesional. Un espacio seguro
              para tu bienestar emocional.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8A9A86]">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF7F2]/75">
              <li>[email@placeholder.com]</li>
              <li>[+34 000 000 000]</li>
              <li>[Ciudad] · Online y presencial</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#8A9A86]">Sígueme</h3>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", testid: "footer-social-instagram" },
                { icon: Linkedin, label: "LinkedIn", testid: "footer-social-linkedin" },
                { icon: Facebook, label: "Facebook", testid: "footer-social-facebook" },
              ].map(({ icon: Icon, label, testid }) => (
                <a
                  key={label}
                  href="#inicio"
                  data-testid={testid}
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF7F2]/10 text-[#FAF7F2]/80 hover:bg-[#C86D51] hover:text-[#FAF7F2] transition-colors duration-300"
                >
                  <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#FAF7F2]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#FAF7F2]/50">
            © 2026 [Nombre de la psicóloga] · Todos los derechos reservados
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button
                data-testid="footer-privacy-button"
                className="text-xs text-[#FAF7F2]/60 underline underline-offset-4 hover:text-[#FAF7F2] transition-colors duration-300"
              >
                Aviso de privacidad
              </button>
            </DialogTrigger>
            <DialogContent data-testid="privacy-modal" className="bg-[#FAF7F2] border-[#E5DFD5] max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-[#2D4030]">Aviso de privacidad</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-[#524E4A] leading-relaxed space-y-3">
                <p>
                  Los datos que compartas a través del formulario de contacto
                  (nombre, email, teléfono y mensaje) se utilizarán únicamente para
                  responder a tu consulta.
                </p>
                <p>
                  Nunca se cederán a terceros ni se usarán con fines comerciales.
                  Puedes solicitar en cualquier momento el acceso, rectificación o
                  eliminación de tus datos escribiendo a [email@placeholder.com].
                </p>
                <p>
                  La información compartida en el ámbito terapéutico está protegida
                  por el secreto profesional y el código deontológico del Colegio
                  Oficial de Psicología.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}
