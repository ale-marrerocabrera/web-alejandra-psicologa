import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flower2 } from "lucide-react";
import { useContent } from "@/content/ContentProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { brand, navigation } = useContent();
  const links = navigation.links.map((link) => ({ ...link, testid: `nav-link-${link.href.slice(1)}` }));

  return (
    <header
      data-testid="main-navbar"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#FAF7F2]/80 border-b border-[#E5DFD5]"
    >
      <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#inicio"
          data-testid="nav-brand-link"
          className="flex items-center gap-2.5 text-[#2D4030]"
        >
          <Flower2 className="w-6 h-6 text-[#C86D51]" strokeWidth={1.5} />
          <span className="font-serif text-lg sm:text-xl font-medium italic">
            {brand.name}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={link.testid}
              className="text-sm font-medium text-[#524E4A] hover:text-[#2D4030] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            data-testid="nav-cta-button"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#2D4030] text-[#FAF7F2] text-sm font-medium hover:bg-[#C86D51] hover:-translate-y-0.5 transition-all duration-300"
          >
            {navigation.cta}
          </a>
        </nav>

        <button
          data-testid="nav-mobile-menu-button"
          className="md:hidden p-2 text-[#2D4030]"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E5DFD5]"
            aria-label="Navegación móvil"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-testid={`${link.testid}-mobile`}
                  onClick={() => setOpen(false)}
                  className="font-serif text-2xl text-[#2D4030]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                data-testid="nav-cta-button-mobile"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center px-5 py-3 rounded-full bg-[#2D4030] text-[#FAF7F2] text-sm font-medium"
              >
                {navigation.cta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
