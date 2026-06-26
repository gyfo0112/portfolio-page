import { useState } from 'react';
import { mainProjects, miniProjects } from '../data/portfolio';
import ProjectModal from './ProjectModal';
import './Projects.css';

/* ── 브라우저 목업 ── */
function BrowserMockup({ project }) {
  return (
    <div className="mockup mockup--browser">
      <div className="mockup__bar">
        <div className="mockup__dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="mockup__url" />
      </div>
      <div className="mockup__screen mockup__screen--browser">
        {project.image
          ? <img src={project.image} alt={project.name} />
          : <div className="mockup__placeholder"><span>{project.name}</span></div>
        }
      </div>
      <div className="card-hint">자세히 보기 →</div>
    </div>
  );
}

/* ── 폰 목업 ── */
function PhoneMockup({ project }) {
  return (
    <div className="mockup mockup--phone">
      <div className="mockup__phone-shell">
        <div className="mockup__notch" />
        <div className="mockup__screen mockup__screen--phone">
          {project.image
            ? <img src={project.image} alt={project.name} />
            : <div className="mockup__placeholder"><span>{project.name}</span></div>
          }
        </div>
        <div className="mockup__home-bar" />
      </div>
      <div className="card-hint">자세히 보기 →</div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects">
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <div id="main-projects" className="projects__main">
        <div className="projects__header reveal">
          <div>
            <div className="section-label">WORKS</div>
            <h2 className="projects__title">주요 프로젝트</h2>
          </div>
        </div>
        <div className="main-projects__grid">
          {mainProjects.map((project, i) => (
            <div
              key={project.id}
              className={`main-card reveal reveal-delay-${i + 1}`}
              onClick={() => setSelectedProject(project)}
              style={{ cursor: 'pointer' }}
            >
              {/* 목업 타입 자동 선택 */}
              {project.mockup === 'phone'
                ? <PhoneMockup project={project} />
                : <BrowserMockup project={project} />
              }

              <div className="main-card__body">
                <div className="main-card__category">{project.category}</div>
                <h3 className="main-card__name">{project.name}</h3>
                <p className="main-card__desc">{project.description}</p>
                <div className="main-card__tags">
                  {[...project.languages, ...project.frameworks, ...project.tools].map((tag, j) => (
                    <span key={j} className="skill-pill">{tag}</span>
                  ))}
                </div>
                <div className="main-card__spacer" />
                <div className="main-card__links" onClick={(e) => e.stopPropagation()}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="card-link">GitHub →</a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="card-link card-link--live">라이브 보기 →</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="mini-projects" className="projects__mini">
        <div className="projects__header reveal">
          <div>
            <div className="section-label">ARCHIVE</div>
            <h2 className="projects__title">미니 프로젝트</h2>
          </div>
        </div>
        <div className="mini-projects__grid">
          {miniProjects.map((project, i) => (
            <div key={project.id} className={`mini-card reveal reveal-delay-${i + 1}`}>
              <div className="mini-card__top">
                <h4 className="mini-card__name">{project.name}</h4>
                <a href={project.live} className="mini-card__arrow" target="_blank" rel="noreferrer">↗</a>
              </div>
              <p className="mini-card__desc">{project.description}</p>
              <div className="mini-card__tags">
                {project.tags.map((tag, j) => (
                  <span key={j} className="skill-pill skill-pill--sm">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
