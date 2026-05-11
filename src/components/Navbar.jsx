import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= docHeight - 100) {
        setActiveSection('mini-projects');
        return;
      }

      const miniEl = document.getElementById('mini-projects');
      if (miniEl) {
        const miniRect = miniEl.getBoundingClientRect();
        if (miniRect.top <= 150) {
          setActiveSection('mini-projects');
          return;
        }
      }

      const sections = ['home', 'about', 'skills', 'main-projects'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: '홈', id: 'home' },
    { href: '#about', label: '소개', id: 'about' },
    { href: '#skills', label: '기술', id: 'skills' },
    { href: '#main-projects', label: '메인 프로젝트', id: 'main-projects' },
    { href: '#mini-projects', label: '미니 프로젝트', id: 'mini-projects' },
  ];

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar ${scrolled ? 'navbar--floating' : ''}`}>
        <a href="#home" className="navbar__logo">{personalInfo.name}</a>
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="navbar__cta">연락하기</a>
      </nav>
    </header>
  );
}
