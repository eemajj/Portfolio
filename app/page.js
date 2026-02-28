'use client';

import { Suspense } from 'react';
import Navbar from '../src/shared/components/NavbarNew';
import Hero from '../src/features/portfolio/components/Hero';
import About from '../src/features/portfolio/components/AboutNew';
import Footer from '../src/shared/components/Footer';
import Education from '../src/features/portfolio/components/Education';
import Experience from '../src/features/portfolio/components/Experience';
import Skills from '../src/features/portfolio/components/Skills';
import Projects from '../src/features/portfolio/components/ProjectsSimple';
import Contact from '../src/features/portfolio/components/Contact';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bangkok-600" />
  </div>
);

export default function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={<LoadingSpinner />}>
          <Education />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
