import { personalInfo } from '../data/portfolio';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__copy">© 2026 KHR. All rights reserved.</span>
        <div className="footer__socials">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="footer__social">GitHub</a>
          <a href={personalInfo.blog} target="_blank" rel="noreferrer" className="footer__social">블로그</a>
        </div>
      </div>
    </footer>
  );
}
