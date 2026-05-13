// src/components/Resume/SkillBar.jsx
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function SkillBar({ name, percent }) {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__percent">{percent}%</span>
      </div>
      <div className="skill-bar__track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`${name} proficiency`}>
        <motion.div
          className="skill-bar__fill"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percent}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  );
}
