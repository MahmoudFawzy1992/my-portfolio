// src/components/Resume/Resume.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { developmentSkills, technicalSkills } from '../../data/skills';
import { experienceItems } from '../../data/experience';
import SectionHeader from '../shared/SectionHeader';
import SkillBar from './SkillBar';
import ExperienceCard from './ExperienceCard';
import './Resume.css';

const TABS = ['Professional Skills', 'Experience'];

const tabContentVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function Resume() {
  const [activeTab, setActiveTab] = useState(0);

  const seniorExp = experienceItems.filter((e) => e.type === 'senior');
  const juniorExp = experienceItems.filter((e) => e.type === 'junior');

  return (
    <section id="resume" className="resume section" aria-labelledby="resume-heading">
      <div className="container">
        <SectionHeader subtitle="Resume" title="My Resume" />

        {/* Tab navigation */}
        <nav className="resume__tabs" role="tablist" aria-label="Resume sections">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              role="tab"
              id={`tab-${i}`}
              aria-selected={activeTab === i}
              aria-controls={`tabpanel-${i}`}
              className={`resume__tab ${activeTab === i ? 'resume__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="skills"
              id="tabpanel-0"
              role="tabpanel"
              aria-labelledby="tab-0"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="resume__panel resume__skills-panel"
            >
              <div className="resume__skills-grid">
                {/* Development */}
                <div className="resume__skill-group">

                  {developmentSkills.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} percent={skill.percent} />
                  ))}
                </div>
                {/* Technical */}
                <div className="resume__skill-group">

                  {technicalSkills.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} percent={skill.percent} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="experience"
              id="tabpanel-1"
              role="tabpanel"
              aria-labelledby="tab-1"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="resume__panel"
            >
              <div className="resume__exp-columns">
                {/* Senior */}
                <div className="resume__exp-group">
                  <h3 className="resume__exp-group-title">
                    <span className="accent">Senior</span> Experience
                  </h3>
                  <div className="resume__timeline">
                    {seniorExp.map((item) => (
                      <ExperienceCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>

                {/* Junior */}
                <div className="resume__exp-group">
                  <h3 className="resume__exp-group-title">
                    <span className="accent">Junior</span> Experience
                  </h3>
                  <div className="resume__timeline">
                    {juniorExp.map((item) => (
                      <ExperienceCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
