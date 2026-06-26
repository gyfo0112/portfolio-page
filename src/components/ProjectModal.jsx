import { useEffect } from 'react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="modal__image">
          {project.image && <img src={project.image} alt={project.name} />}
        </div>
        <div className="modal__body">
          <div className="modal__category">{project.category}</div>
          <h2 className="modal__title">{project.name}</h2>
          <p className="modal__desc">{project.description}</p>
          {project.detail && (
            <div className="modal__detail">
              {project.detail.overview && (
                <div className="modal__section">
                  <h4 className="modal__section-title">프로젝트 개요</h4>
                  <p>{project.detail.overview}</p>
                </div>
              )}
              {project.detail.features && (
                <div className="modal__section">
                  <h4 className="modal__section-title">주요 기능</h4>
                  <ul className="modal__list">
                    {project.detail.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.detail.role && (
                <div className="modal__section">
                  <h4 className="modal__section-title">담당 역할</h4>
                  <p>{project.detail.role}</p>
                </div>
              )}
              {project.detail.review && (
                <div className="modal__section">
                  <h4 className="modal__section-title">회고</h4>
                  <p>{project.detail.review}</p>
                </div>
              )}
            </div>
          )}
          <div className="modal__tags">
            {[...project.languages, ...project.frameworks, ...project.tools].map((tag, i) => (
              <span key={i} className="skill-pill">{tag}</span>
            ))}
          </div>
          <div className="modal__links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="modal__btn modal__btn--ghost">GitHub →</a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="modal__btn modal__btn--primary">라이브 보기 →</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
