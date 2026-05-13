import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import './Portfolio.css';

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit:    { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

const ProjectCard = forwardRef(({ project }, ref) => {
  const { title, description, url, platform, image } = project;

  return (
    <motion.article
      ref={ref}
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      aria-label={`${title} — ${platform} project`}
    >
      {/* Thumbnail */}
      <div className="project-card__img-wrapper">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          className="project-card__img"
          loading="lazy"
          width="400"
          height="250"
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
        />
        <span className="project-card__platform">{platform}</span>

        {/* Hover overlay */}
        <div className="project-card__overlay" aria-hidden="true">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__view-btn"
            tabIndex={-1}
          >
            <FiExternalLink />
            View Project
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="project-card__info">
        <h3 className="project-card__title">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__title-link"
          >
            {title}
          </a>
        </h3>
        <p className="project-card__desc">{description}</p>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
