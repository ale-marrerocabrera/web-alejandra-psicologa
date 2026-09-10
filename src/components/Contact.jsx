import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useContent } from "@/content/ContentProvider";

const API = `${import.meta.env.VITE_API_URL ?? ""}/api`;

const initialForm = {
  nombre: "",
  email: "",
  telefono: "",
  motivo: "",
  mensaje: "",
  consentimiento: false,
};

const inputClass =
  "w-full rounded-xl border border-[#E5DFD5] bg-white px-4 py-3 text-[#2C2A29] placeholder:text-[#A8A29B] focus:outline-none focus:ring-2 focus:ring-[#8A9A86]/50 focus:border-[#8A9A86] transition-shadow duration-300";

export default function Contact() {
  const { contact } = useContent();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consentimiento) {
      toast.error("Necesito tu consentimiento para poder responderte.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono || null,
        motivo: form.motivo || null,
        mensaje: form.mensaje,
        consentimiento: form.consentimiento,
      });
      toast.success("Mensaje enviado. Te responderé muy pronto, con calma y cuidado.");
      setForm(initialForm);
    } catch (err) {
      toast.error("No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" data-testid="contact-section" className="py-24 sm:py-32 bg-[#2D4030]">
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="text-xs sm:text-sm tracking-widest uppercase text-[#8A9A86] font-semibold">
            {contact.eyebrow}
          </p>
          <h2
            data-testid="contact-heading"
            className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] leading-tight"
          >
            {contact.titleBefore}<span className="italic text-[#D4A359]">{contact.titleAccent}</span>{contact.titleAfter}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#FAF7F2]/75 leading-relaxed">
            {contact.intro}
          </p>

          <div className="mt-10 space-y-5" data-testid="contact-info-list">
            <div className="flex items-center gap-4 text-[#FAF7F2]/85">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF7F2]/10">
                <Mail className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <span className="text-sm sm:text-base">{contact.email}</span>
            </div>
            <div className="flex items-center gap-4 text-[#FAF7F2]/85">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF7F2]/10">
                <Phone className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <span className="text-sm sm:text-base">{contact.phone}</span>
            </div>
            <div className="flex items-center gap-4 text-[#FAF7F2]/85">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FAF7F2]/10">
                <MapPin className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <span className="text-sm sm:text-base">{contact.location}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            data-testid="contact-form"
            className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
            noValidate={false}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-[#2C2A29] mb-2">
                  Nombre *
                </label>
                <input
                  id="nombre"
                  data-testid="contact-name-input"
                  type="text"
                  required
                  minLength={2}
                  value={form.nombre}
                  onChange={(e) => update("nombre", e.target.value)}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2C2A29] mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  data-testid="contact-email-input"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-[#2C2A29] mb-2">
                  Teléfono <span className="text-[#6E6963] font-normal">(opcional)</span>
                </label>
                <input
                  id="telefono"
                  data-testid="contact-phone-input"
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => update("telefono", e.target.value)}
                  placeholder="+34 600 000 000"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="motivo" className="block text-sm font-medium text-[#2C2A29] mb-2">
                  Motivo de consulta
                </label>
                <select
                  id="motivo"
                  data-testid="contact-reason-select"
                  value={form.motivo}
                  onChange={(e) => update("motivo", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Ansiedad y estrés">Ansiedad y estrés</option>
                  <option value="Terapia de pareja">Terapia de pareja</option>
                  <option value="Duelo y pérdida">Duelo y pérdida</option>
                  <option value="Autoestima">Autoestima</option>
                  <option value="Crecimiento personal">Crecimiento personal</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="mensaje" className="block text-sm font-medium text-[#2C2A29] mb-2">
                Cuéntame brevemente qué te trae aquí *
              </label>
              <textarea
                id="mensaje"
                data-testid="contact-message-textarea"
                required
                minLength={10}
                rows={5}
                value={form.mensaje}
                onChange={(e) => update("mensaje", e.target.value)}
                placeholder="No hace falta que sea perfecto. Escríbelo como te salga."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Checkbox
                id="consentimiento"
                data-testid="contact-consent-checkbox"
                checked={form.consentimiento}
                onCheckedChange={(checked) => update("consentimiento", checked === true)}
                className="mt-0.5 border-[#8A9A86] data-[state=checked]:bg-[#2D4030] data-[state=checked]:border-[#2D4030]"
              />
              <label htmlFor="consentimiento" className="text-sm text-[#524E4A] leading-relaxed cursor-pointer">
                He leído y acepto el aviso de privacidad. Mis datos se usarán
                únicamente para responder a mi consulta y nunca se compartirán con
                terceros. *
              </label>
            </div>

            <button
              type="submit"
              data-testid="contact-submit-button"
              disabled={loading}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#C86D51] text-[#FAF7F2] font-medium hover:bg-[#B25C42] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-[0_10px_30px_rgba(200,109,81,0.30)]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar mensaje
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs text-[#6E6963]">
              Respondo personalmente en un plazo de 24-48 h laborables.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
