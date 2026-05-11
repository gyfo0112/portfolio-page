import { useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolio';
import './Hero.css';

const orbitItems = [
  { label: 'React', startAngle: 0, radius: 110, speed: 20 },
  { label: 'Node.js', startAngle: 90, radius: 170, speed: 28 },
  { label: 'Next.js', startAngle: 180, radius: 110, speed: 20 },
  { label: 'TypeScript', startAngle: 270, radius: 170, speed: 28 },
  { label: 'MySQL', startAngle: 45, radius: 230, speed: 38 },
  { label: 'Docker', startAngle: 225, radius: 230, speed: 38 },
];

export default function Hero() {
  const orbitRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbitRef.current) return;
      const rect = orbitRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      orbitRef.current.style.transform = `perspective(800px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
    };
    const handleMouseLeave = () => {
      if (!orbitRef.current) return;
      orbitRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };
    const el = orbitRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <div className="hero__left">
          <span className="hero__badge">{personalInfo.title}</span>
          <h1 className="hero__title">
            안녕하세요,<br />
            저는 <span className="hero__name">{personalInfo.name}</span> 입니다.
          </h1>
          <p className="hero__tagline">{personalInfo.tagline}</p>
          <div className="hero__actions">
            <a href="#main-projects" className="btn-primary">프로젝트 보기</a>
            <a href="#contact" className="btn-secondary">연락하기 →</a>
          </div>
        </div>

        <div className="hero__right">
          <div className="orbit-container" ref={orbitRef}>
            <div className="orbit-ring orbit-ring--1" />
            <div className="orbit-ring orbit-ring--2" />
            <div className="orbit-ring orbit-ring--3" />
            <div className="orbit-center"><span>DEV</span></div>
            {orbitItems.map((item, i) => (
              <div
                key={i}
                className="orbit-arm"
                style={{
                  '--start-angle': `${item.startAngle}deg`,
                  '--duration': `${item.speed}s`,
                  '--radius': `${item.radius}px`,
                }}
              >
                <div className="orbit-dot-wrap">
                  <div className="orbit-dot" />
                  <div className="orbit-tag">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
