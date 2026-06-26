import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xqeoknvl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">

        <div className="contact__left reveal-left">
          <div className="section-label">CONTACT</div>
          <h2 className="contact__heading">
            함께 만들고 싶은<br />
            프로젝트가 있으신가요?
          </h2>
          <p className="contact__desc">
            새로운 기회나 협업 제안을 언제나 환영합니다.<br />
            아래 폼을 통해 편하게 연락해 주세요.
          </p>
          <div className="contact__info">
            <span className="contact__email">gyfo6474@naver.com</span>
          </div>
        </div>

        <div className="contact__right reveal-right">
          <form className="contact__form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label">이름</label>
              <input
                className="form-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름을 입력해 주세요"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">이메일</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력해 주세요"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">메시지</label>
              <textarea
                className="form-input form-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="전달하실 내용을 자유롭게 작성해 주세요"
                required
              />
            </div>

            {status === 'success' && (
              <p className="form-feedback form-feedback--success">
                메시지가 성공적으로 전송되었습니다!
              </p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-feedback--error">
                전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
              </p>
            )}

            <button
              type="submit"
              className={`form-btn ${status === 'sending' ? 'form-btn--sending' : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? '전송 중...' : '메시지 보내기'}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
