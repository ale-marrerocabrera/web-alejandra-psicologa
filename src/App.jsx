import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useContentState } from "@/content/ContentProvider";

function ContentUnavailable() {
  return (
    <main className="min-h-screen grid place-items-center bg-[#FAF7F2] px-6 text-center text-[#2D4030]">
      <div>
        <p className="font-serif text-3xl sm:text-4xl">La web no está disponible en estos momentos.</p>
        <p className="mt-4 text-[#524E4A]">Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    </main>
  );
}

function App() {
  const { content, isLoading, isError } = useContentState();
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen grid place-items-center bg-[#FAF7F2] text-[#524E4A]" aria-busy="true">
        Cargando…
      </main>
    );
  }

  if (isError || !content) {
    return <ContentUnavailable />;
  }

  return (
    <div className="bg-[#FAF7F2] text-[#2C2A29] font-sans antialiased overflow-x-clip">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
