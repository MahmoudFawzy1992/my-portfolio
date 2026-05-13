// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-scroll';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { useActiveSection } from '../../hooks/useActiveSection';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',         to: 'home' },
  { label: 'My Expertise', to: 'expertise' },
  { label: 'Projects',     to: 'portfolio' },
  { label: 'Resume',       to: 'resume' },
  { label: 'Contacts',     to: 'contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.to);

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const activeSection             = useActiveSection(SECTION_IDS);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close menu on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">
        {/* Logo */}
        <Link
          to="home"
          smooth
          duration={500}
          className="navbar__logo"
          aria-label="Mahmoud Fawzy — back to top"
        >
          <img src="/assets/images/my-logo.png" alt="MF Logo" className="navbar__logo-img" />
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                smooth
                duration={600}
                offset={-80}
                className={`navbar__link ${activeSection === to ? 'navbar__link--active' : ''}`}
                aria-current={activeSection === to ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CV download (desktop) */}
        <a
          className="navbar__cv-btn"
          href="/mahmoud-fawzy-cv.pdf"
          download="Mahmoud-Fawzy-CV.pdf"
          aria-label="Download Mahmoud Fawzy's CV"
        >
          <FiDownload aria-hidden="true" />
          Download My CV
        </a>

        {/* Hamburger toggle */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                smooth
                duration={600}
                offset={-80}
                className={`navbar__mobile-link ${activeSection === to ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              className="navbar__mobile-cv"
              href="/mahmoud-fawzy-cv.pdf"
              download="Mahmoud-Fawzy-CV.pdf"
              onClick={() => setMenuOpen(false)}
            >
              <FiDownload aria-hidden="true" />
              Download My CV
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
