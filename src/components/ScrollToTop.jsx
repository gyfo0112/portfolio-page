import { useState, useEffect, useRef } from 'react';
import './ScrollToTop.css';

const SIZE = 48;
const STROKE = 3;
const RADIUS = SIZE / 2 - STROKE;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // visible은 React state (자주 바뀌지 않음)
      setVisible(scrollTop > 400);

      // progress는 React 재렌더링 없이 DOM 직접 업데이트 → 완전 실시간
      if (progressRef.current) {
        const dashOffset = CIRCUMFERENCE - (Math.min(pct, 100) / 100) * CIRCUMFERENCE;
        progressRef.current.style.strokeDashoffset = dashOffset;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="맨 위로"
    >
      <svg
        className="scroll-to-top__ring"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sttGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f8ef7" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {/* 트랙 배경 원 */}
        <circle
          className="scroll-to-top__track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
        />
        {/* 진행 원 — ref로 직접 DOM 제어 */}
        <circle
          ref={progressRef}
          className="scroll-to-top__progress"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#sttGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <span className="scroll-to-top__arrow">↑</span>
    </button>
  );
}
