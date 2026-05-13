// src/components/Resume/ExperienceCard.jsx
import { FiMapPin, FiCalendar, FiBriefcase } from 'react-icons/fi';

export default function ExperienceCard({ item }) {
  const { title, company, period, location, bullets } = item;

  return (
    <article className="exp-card">
      <div className="exp-card__dot" aria-hidden="true" />
      <div className="exp-card__content">
        <h4 className="exp-card__title">{title}</h4>
        <p className="exp-card__company">
          <FiBriefcase aria-hidden="true" />
          {company}
        </p>
        <div className="exp-card__meta">
          <span className="exp-card__meta-item">
            <FiCalendar aria-hidden="true" />
            {period}
          </span>
          {location && (
            <span className="exp-card__meta-item">
              <FiMapPin aria-hidden="true" />
              {location}
            </span>
          )}
        </div>
        {bullets.length > 0 && (
          <ul className="exp-card__bullets">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
