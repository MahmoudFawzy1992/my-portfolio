// src/components/Footer/Footer.jsx
import { Link } from 'react-scroll';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Home',         to: 'home' },
  { label: 'My Expertise', to: 'expertise' },
  { label: 'Projects',     to: 'portfolio' },
  { label: 'Resume',       to: 'resume' },
  { label: 'Contacts',     to: 'contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        {/* Nav links */}
        <nav className="footer__nav" aria-label="Footer navigation">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              smooth
              duration={600}
              offset={-80}
              className="footer__nav-link"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social links */}
        <div className="footer__socials">
          <a
            href="https://www.linkedin.com/in/mahmoud-fawzy-a84215158/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href="https://github.com/MahmoudFawzy1992"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
        </div>

        {/* Copyright */}
        <p className="footer__copy">
          &copy; {year}. All rights reserved by{' '}
          <Link to="home" smooth duration={500} className="footer__copy-link">
            Mahmoud Fawzy
          </Link>
        </p>
      </div>
    </footer>
  );
}
