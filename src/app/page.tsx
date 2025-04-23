import { Suspense } from "react";
import dynamic from "next/dynamic";

import Hero from "@/app/components/Hero";
import BackToTopButton from "@/app/components/BackTopTopButton";

// Lazy load below-the-fold components
const About = dynamic(() => import("@/app/components/About"), { ssr: true });
const Skills = dynamic(() => import("@/app/components/Skills"), { ssr: true });
const Projects = dynamic(() => import("@/app/components/Projects"), {
  ssr: true,
});
const Contact = dynamic(() => import("@/app/components/Contact"), {
  ssr: true,
});

// Simple loading component
const SectionLoading = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md"
      >
        Skip to content
      </a>

      <div id="main-content" className="scroll-smooth">
        {/* Hero is loaded immediately */}
        <section id="hero">
          <Hero />
        </section>

        {/* Load other sections with suspense boundaries */}
        <Suspense fallback={<SectionLoading />}>
          <section id="about">
            <About />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoading />}>
          <section id="skills">
            <Skills />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoading />}>
          <section id="projects">
            <Projects />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoading />}>
          <section id="contact">
            <Contact />
          </section>
        </Suspense>
      </div>

      {/* Back to top button as a client component */}
      <BackToTopButton />
    </main>
  );
}
