// src/components/Expertise/Expertise.jsx
import { motion } from 'framer-motion';
import {
  FiCpu, FiGitMerge, FiZap, FiTerminal, FiShoppingBag, FiTarget,
} from 'react-icons/fi';
import { expertiseItems } from '../../data/expertise';
import SectionHeader from '../shared/SectionHeader';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Expertise.css';

const ICON_MAP = {
  'ai-engineering': <FiCpu />,
  'automations':    <FiGitMerge />,
  'headless':       <FiZap />,
  'ai-integration': <FiTerminal />,
  'ecommerce':      <FiShoppingBag />,
  'seo':            <FiTarget />,
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 },
  }),
};

export default function Expertise() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="expertise" className="expertise section" aria-labelledby="expertise-heading">
      <div className="container">
        <SectionHeader subtitle="Features" title="What I Do" />

        <div className="expertise__grid" ref={ref} role="list">
          {expertiseItems.map((item, i) => (
            <motion.article
              key={item.id}
              className="expertise__card"
              role="listitem"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
            >
              <div className="expertise__icon" aria-hidden="true">
                {ICON_MAP[item.icon]}
              </div>
              <h3 className="expertise__title">{item.title}</h3>
              <p className="expertise__desc">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
