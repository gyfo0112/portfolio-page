import { useState, useEffect, useRef } from 'react';
import { setNavigating } from '../hooks/useScrollAnimation';
import './ScrollToTop.css';

// 버튼(48px) 기준으로 링은 바깥에서 감싸는 구조
const BTN  = 48;   // 버튼 실제 크기
const RING = 64;   // 링 SVG 크기 (버튼보다 크게 → 8px씩 바깥)
const STROKE = 2.5;
const RADIUS = RING / 2 - STROKE / 2 - 0.5;   // 링 반지름 (경계 안쪽에 딱 맞게)
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setVisible(scrollTop > 400);

      if (progressRef.current) {
        const dashOffset = CIRCUMFERENCE - (Math.min(pct, 100) / 100) * CIRCUMFERENCE;
        progressRef.current.style.strokeDashoffset = dashOffset;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기값 즉시 반영
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    setNavigating(true);
    const startY = window.scrollY;
    const duration = Math.min(startY * 0.4, 800);
    const startTime = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY * (1 - easeOut(progress)));
      if (progress < 1) requestAnimationFrame(step);
      else setNavigating(false);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className={`scroll-to-top-wrap ${visible ? 'visible' : ''}`}>
      {/* 링 SVG: 버튼보다 크게, 중앙 정렬로 감쌈 */}
      <svg
        className="scroll-to-top__ring"
        width={RING}
        height={RING}
        viewBox={`0 0 ${RING} ${RING}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sttGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f8ef7" />
          </linearGradient>
        </defs>
        <circle
          className="scroll-to-top__track"
          cx={RING / 2}
          cy={RING / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
        />
        <circle
          ref={progressRef}
          className="scroll-to-top__progress"
          cx={RING / 2}
          cy={RING / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#sttGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
        />
      </svg>

      {/* 버튼: 클릭 가능한 원형 */}
      <button
        className="scroll-to-top__btn"
        onClick={scrollToTop}
        aria-label="맨 위로"
      >
        {/* SVG 화살표: 브라우저/OS 관계없이 동일하게 렌더 */}
        <svg
          className="scroll-to-top__arrow"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 20V4M4 12l8-8 8 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
