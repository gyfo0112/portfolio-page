import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';
import { setNavigating } from '../hooks/useScrollAnimation';
import './Navbar.css';

// 커스텀 이징 스크롤 - ease-out: 클릭 즉시 최대 속도로 출발, 자연스럽게 감속
// (ease-in-out은 시작이 느려서 "반응 없다가 툭" 하는 느낌을 줌)
function smoothScrollTo(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  const navbarH = 72;
  const targetY = el.getBoundingClientRect().top + window.scrollY - navbarH;
  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) return; // 이미 목적지면 스킵

  // 거리에 비례한 지속 시간 (최소 300ms, 최대 800ms)
  const duration = Math.min(Math.max(Math.abs(distance) * 0.35, 300), 800);
  const startTime = performance.now();

  // cubic ease-out: 즉시 반응 후 부드럽게 감속
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeOut(progress));
    if (progress < 1) requestAnimationFrame(step);
    else setNavigating(false);
  }

  setNavigating(true);
  requestAnimationFrame(step);
}


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // 모든 섹션을 아래→위 순서로 체크 (먼저 매칭된 섹션이 현재 위치)
      const allSections = ['contact', 'mini-projects', 'main-projects', 'skills', 'about', 'home'];

      for (const id of allSections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 130) {
          // contact 섹션은 nav 링크 없음 → 아무것도 활성화 안 함
          setActiveSection(id === 'contact' ? '' : id);
          return;
        }
      }

      setActiveSection('home');
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤하면 모바일 메뉴 닫기
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { once: true });
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  // 메뉴 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: '#home', label: '홈', id: 'home' },
    { href: '#about', label: '소개', id: 'about' },
    { href: '#skills', label: '기술', id: 'skills' },
    { href: '#main-projects', label: '메인 프로젝트', id: 'main-projects' },
    { href: '#mini-projects', label: '미니 프로젝트', id: 'mini-projects' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar ${scrolled ? 'navbar--floating' : ''}`}>
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          {personalInfo.name}
        </a>

        {/* 데스크탑 링크 */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="navbar__cta"
          onClick={(e) => handleNavClick(e, 'contact')}
        >
          연락하기
        </a>

        {/* 햄버거 버튼 (모바일) */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={`navbar__mobile-link ${activeSection === link.id ? 'active' : ''}`}
            onClick={(e) => { handleNavClick(e, link.id); setMenuOpen(false); }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="navbar__mobile-cta"
          onClick={(e) => { handleNavClick(e, 'contact'); setMenuOpen(false); }}
        >
          연락하기
        </a>
      </div>
    </header>
  );
}
