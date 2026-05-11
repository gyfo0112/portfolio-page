import { mainProjects, miniProjects } from '../data/portfolio';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div id="main-projects" className="projects__main">
        <div className="projects__header reveal">
          <div>
            <div className="section-label">WORKS</div>
            <h2 className="projects__title">주요 프로젝트</h2>
          </div>
          <a href="#" className="projects__view-all">전체 보기 →</a>
        </div>
        <div className="main-projects__grid">
          {mainProjects.map((project, i) => (
            <div key={project.id} className={`main-card reveal reveal-delay-${i + 1}`}>
              <div className="main-card__image">
                {project.image ? (
                  <img src={project.image} alt={project.name} />
                ) : (
                  <div className="main-card__placeholder">
                    <span>프로젝트 이미지</span>
                  </div>
                )}
              </div>
              <div className="main-card__body">
                <div className="main-card__category">{project.category}</div>
                <h3 className="main-card__name">{project.name}</h3>
                <p className="main-card__desc">{project.description}</p>
                <div className="main-card__tags">
                  {[...project.languages, ...project.frameworks, ...project.tools].map((tag, j) => (
                    <span key={j} className="skill-pill">{tag}</span>
                  ))}
                </div>
                <div className="main-card__links">
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
                <a href={project.github} className="mini-card__arrow" target="_blank" rel="noreferrer">↗</a>
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
