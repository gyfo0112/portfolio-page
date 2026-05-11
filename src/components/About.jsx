import { personalInfo } from '../data/portfolio';
import './About.css';
import MailIcon from '../assets/Mail.svg';
import PhoneIcon from '../assets/Phone.svg';
import GithubIcon from '../assets/Github.svg';
import LinkIcon from '../assets/Link.svg';

export default function About() {
  const contactItems = [
    { icon: MailIcon, label: '이메일', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: PhoneIcon, label: '전화번호', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: GithubIcon, label: 'GitHub', value: 'github.com/gyfo0112', href: personalInfo.github },
    { icon: LinkIcon, label: '노션', value: 'notion 바로가기', href: 'https://www.notion.so/32f7290dbe06808da5a1cd775d2b6852?source=copy_link' },
  ];

  const infoItems = [
    { label: '위치', value: personalInfo.location },
    { label: '연락 가능', value: personalInfo.available },
    { label: '학력', value: personalInfo.education },
  ];

  return (
    <section id="about" className="about">
      <div className="about__inner">
        <div className="about__left reveal-left">
          <div className="section-label">ABOUT</div>
          <h2 className="about__heading">
            로직을 설계하고,<br />
            미학을 코딩합니다.
          </h2>
          <p className="about__bio">{personalInfo.bio}</p>
          <div className="about__status">
            <span className="status-dot" />
            {personalInfo.status}
          </div>
          <div className="about__info">
            {infoItems.map((item, i) => (
              <div key={i} className="info-row">
                <span className="info-label">{item.label}</span>
                <span className="info-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about__right reveal-right">
          <h3 className="about__contact-title">연락처</h3>
          <div className="about__contact-list">
            {contactItems.map((item, i) => (
              <a key={i} href={item.href} className="contact-card" target="_blank" rel="noreferrer">
                <div className="contact-card__icon-box">
                  <img src={item.icon} alt="" className="contact-card__svg" />
                </div>
                <div className="contact-card__info">
                  <span className="contact-card__label">{item.label}</span>
                  <span className="contact-card__value">{item.value}</span>
                </div>
                <span className="contact-card__arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
