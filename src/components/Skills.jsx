import { skills } from '../data/portfolio';
import './Skills.css';

const skillCategories = [
  { key: 'languages', label: 'LANGUAGES', title: '언어', color: '#4f8ef7' },
  { key: 'frontend', label: 'FRONT-END', title: '프론트엔드', color: '#6366f1' },
  { key: 'backend', label: 'BACK-END', title: '백엔드', color: '#0ea5e9' },
  { key: 'tools', label: 'TOOLS', title: '툴', color: '#14b8a6' },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills__inner">
        <div className="skills__header reveal">
          <div className="section-label center">SKILLS</div>
          <h2 className="skills__title">기술 스택</h2>
        </div>
        <div className="skills__grid">
          {skillCategories.map((cat, i) => (
            <div key={cat.key} className={`skill-card reveal reveal-delay-${i + 1}`}>
              <div className="skill-card__label" style={{ color: cat.color }}>
                <span className="skill-card__dot" style={{ background: cat.color }} />
                {cat.label}
              </div>
              <h3 className="skill-card__title">{cat.title}</h3>
              <div className="skill-card__pills">
                {skills[cat.key].map((skill, j) => (
                  <span key={j} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
