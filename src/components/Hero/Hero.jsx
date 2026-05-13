// src/components/Hero/Hero.jsx
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiZap } from 'react-icons/fi';
import { FaReact, FaWordpress } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
const heroImg = '/assets/images/hero-profile.webp';
import './Hero.css';

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } },
};
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
});

export default function Hero() {
  return (
    <section id="home" className="hero section" aria-label="Introduction">
      <div className="container hero__inner">
        {/* Text side */}
        <motion.div
          className="hero__content"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero__greeting" variants={fadeUp(0.1)} initial="hidden" animate="visible">
            Welcome to my world
          </motion.span>

          <motion.h1 className="hero__name" variants={fadeUp(0.2)} initial="hidden" animate="visible">
            Hi, I&rsquo;m <span className="accent">Mahmoud Fawzy</span>
          </motion.h1>

          <motion.div className="hero__typed-wrapper" variants={fadeUp(0.3)} initial="hidden" animate="visible">
            <span className="hero__typed-prefix">a </span>
            <TypeAnimation
              sequence={[
                'Programmer.', 2000,
                'Full-Stack Developer.', 2000,
                'AI & Automation Expert.', 2000,
              ]}
              wrapper="span"
              cursor
              repeat={Infinity}
              className="hero__typed"
              aria-label="Programmer, Full-Stack Developer, AI & Automation Expert"
            />
          </motion.div>

          <motion.p className="hero__bio" variants={fadeUp(0.4)} initial="hidden" animate="visible">
            Senior Web Developer and Automation Consultant specializing in AI-assisted full-stack development,
            complex business automations, and Headless CMS architectures. I leverage advanced AI coding agents
            and LLMs to rapidly architect, debug, and deploy high-performance web applications and automated workflows.
            Proven ability to translate complex business needs into efficient digital systems that save hours of
            manual labor and drive growth.
          </motion.p>

          <motion.div className="hero__footer" variants={fadeUp(0.5)} initial="hidden" animate="visible">
            {/* Socials */}
            <div className="hero__socials-group">
              <span className="hero__footer-title">Find me in</span>
              <div className="hero__socials">
                <a
                  href="https://www.linkedin.com/in/mahmoud-fawzy-a84215158/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-link"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a
                  href="https://github.com/MahmoudFawzy1992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-link"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
              </div>
            </div>

            {/* Best Skills */}
            <div className="hero__socials-group">
              <span className="hero__footer-title">Best skill on</span>
              <div className="hero__socials">
                <div className="hero__social-link" title="React"><FaReact /></div>
                <div className="hero__social-link" title="WordPress"><FaWordpress /></div>
                <div className="hero__social-link" title="n8n"><FiZap /></div>
                <div className="hero__social-link" title="JavaScript"><SiJavascript /></div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image side */}
        <motion.div
          className="hero__image-wrapper"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >
          <img
            src={heroImg}
            alt="Mahmoud Fawzy"
            className="hero__image"
            width="500"
            height="600"
            fetchpriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
