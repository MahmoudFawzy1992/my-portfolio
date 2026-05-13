// src/App.jsx
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Expertise from './components/Expertise/Expertise';
import Portfolio from './components/Portfolio/Portfolio';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/shared/ScrollToTop';

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
      </Helmet>

      {/* Skip to main content — accessibility */}
      <a href="#home" className="sr-only">Skip to main content</a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <Expertise />
        <Portfolio />
        <Resume />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </HelmetProvider>
  );
}
