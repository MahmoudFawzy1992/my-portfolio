// src/components/shared/SectionHeader.jsx
import './SectionHeader.css';

export default function SectionHeader({ subtitle, title }) {
  return (
    <div className="section-header">
      {subtitle && (
        <p className="section-header__subtitle">{subtitle}</p>
      )}
      <h2 className="section-header__title">{title}</h2>
      <span className="section-header__line" aria-hidden="true" />
    </div>
  );
}
