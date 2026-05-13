// src/components/Portfolio/Portfolio.jsx
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, filterTabs, INITIAL_COUNT, BATCH_SIZE } from '../../data/projects';
import SectionHeader from '../shared/SectionHeader';
import ProjectCard from './ProjectCard';
import './Portfolio.css';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount]  = useState(INITIAL_COUNT);

  // Filter projects — React tab shows empty (placeholder for future)
  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.platform === activeFilter);
  }, [activeFilter]);

  // Slice to currently visible count
  const visible    = filtered.slice(0, visibleCount);
  const hasMore    = visibleCount < filtered.length;
  const remaining  = filtered.length - visibleCount;

  // Reset pagination when filter changes
  const handleFilter = (tab) => {
    setActiveFilter(tab);
    setVisibleCount(INITIAL_COUNT);
  };

  const loadMore = () =>
    setVisibleCount((c) => Math.min(c + BATCH_SIZE, filtered.length));

  return (
    <section id="portfolio" className="portfolio section" aria-labelledby="portfolio-heading">
      <div className="container">
        <SectionHeader subtitle="Portfolio" title="My Projects" />

        {/* Filter tabs */}
        <nav className="portfolio__filters" aria-label="Project filters" role="tablist">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeFilter === tab}
              className={`portfolio__filter-btn ${activeFilter === tab ? 'portfolio__filter-btn--active' : ''}`}
              onClick={() => handleFilter(tab)}
            >
              {tab}
              {tab !== 'All' && (
                <span className="portfolio__filter-count">
                  {tab === activeFilter
                    ? filtered.length
                    : projects.filter((p) => p.platform === tab).length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Empty state for React tab */}
        {activeFilter === 'React' && filtered.length === 0 && (
          <div className="portfolio__empty" role="status">
            <p>🚀 React projects coming soon!</p>
          </div>
        )}

        {/* Grid */}
        <motion.div
          className="portfolio__grid"
          layout
          role="tabpanel"
          aria-live="polite"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {hasMore && (
          <div className="portfolio__load-more-wrapper">
            <motion.button
              className="portfolio__load-more"
              onClick={loadMore}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label={`Load ${Math.min(BATCH_SIZE, remaining)} more projects`}
            >
              Load More
              <span className="portfolio__load-more-count">
                +{Math.min(BATCH_SIZE, remaining)} of {remaining} remaining
              </span>
            </motion.button>
          </div>
        )}

        {/* All loaded indicator */}
        {!hasMore && filtered.length > INITIAL_COUNT && (
          <p className="portfolio__all-loaded" aria-live="polite">
            All {filtered.length} projects displayed
          </p>
        )}
      </div>
    </section>
  );
}
