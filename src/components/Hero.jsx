import { useEffect, useRef, useCallback, useState } from 'react';
import { personalInfo } from '../data/portfolio';
import './Hero.css';

const NUM          = 450;
const R            = 200;
const φ            = (1 + Math.sqrt(5)) / 2;
const BASE_SPEED   = 0.004;
const MIN_SPEED    = 0.001;
const ACCEL_STEP   = 0.001;    // gather 후 재가속: MIN→BASE in 3 frames
const PROXIMITY_R  = 70;
const PROXIMITY_R2 = PROXIMITY_R * PROXIMITY_R;
const BASE_SIZE    = 3;        // CSS 기본 파티클 px (scale의 기준)

const POINTS = Array.from({ length: NUM }, (_, i) => {
  const θ = Math.acos(1 - 2 * (i + 0.5) / NUM);
  const λ = (2 * Math.PI * i) / φ;
  return {
    x: R * Math.sin(θ) * Math.cos(λ),
    y: R * Math.sin(θ) * Math.sin(λ),
    z: R * Math.cos(θ),
  };
});

function rotate(p, ry, rx) {
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const x1 = p.x * cy - p.z * sy;
  const z1 = p.x * sy + p.z * cy;
  const y2 = p.y * cx - z1 * sx;
  const z2 = p.y * sx + z1 * cx;
  return { x: x1, y: y2, z: z2 };
}

const lerp = (a, b, t) => a + (b - a) * t;

export default function Hero() {
  const particleRefs   = useRef([]);
  const containerRef   = useRef(null);
  const ry             = useRef(0);
  const rx             = useRef(0);
  const rotSpeed       = useRef(BASE_SPEED);
  const raf            = useRef(null);
  const mode           = useRef('sphere');
  const gatherTimer    = useRef(0);
  const scatterTargets = useRef([]);
  const mousePos       = useRef({ x: null, y: null });

  const cur = useRef(
    Array.from({ length: NUM }, () => ({ x: 0, y: 0, op: 1, size: BASE_SIZE }))
  );

  // ── 타이핑 애니메이션 ──
  const TYPING_TEXTS = [
    personalInfo.tagline,
    'React / Node.js 풀스택 개발자',
    '사용자 경험을 설계하는 개발자',
    '코드와 디자인의 경계를 허무는 개발자',
  ];
  const [displayText, setDisplayText] = useState('');
  const [typingIdx, setTypingIdx]     = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);
  const [charIdx, setCharIdx]         = useState(0);

  useEffect(() => {
    const current = TYPING_TEXTS[typingIdx];
    let timeout;

    if (!isDeleting && charIdx <= current.length) {
      // 타이핑
      setDisplayText(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(c => c + 1), charIdx === 0 ? 600 : 55);
    } else if (!isDeleting && charIdx > current.length) {
      // 다 썼으면 2초 대기 후 지우기 시작
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIdx >= 0) {
      // 지우기
      setDisplayText(current.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(c => c - 1), 30);
    } else {
      // 다 지웠으면 다음 텍스트로
      setIsDeleting(false);
      setTypingIdx(i => (i + 1) % TYPING_TEXTS.length);
      setCharIdx(0);
    }

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, isDeleting, typingIdx]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left  - rect.width  / 2,
        y: e.clientY - rect.top   - rect.height / 2,
      };
    };
    const onLeave = () => { mousePos.current = { x: null, y: null }; };
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const tick = useCallback(() => {
    const m  = mode.current;
    const mp = mousePos.current;
    const hasMouse = mp.x !== null;

    /* ── SPHERE ──
       gather 직후: rotSpeed = MIN_SPEED에서 시작 → ACCEL_STEP으로 3프레임 안에 BASE로 복귀
       파티클은 gather 마지막에 이미 정확한 구 위치(gap≈0) → 여기선 항상 exact 배치 */
    if (m === 'sphere') {
      rotSpeed.current = Math.min(BASE_SPEED, rotSpeed.current + ACCEL_STEP);
      ry.current += rotSpeed.current;
      rx.current += rotSpeed.current * 0.3;

      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        const r     = rotate(POINTS[i], ry.current, rx.current);
        const depth = (r.z + R) / (R * 2);
        let   size  = 2 + depth * 5;
        let   op    = 0.04 + depth * 0.96;

        // hover: 크기+투명도만 (boxShadow 조작 없음 → GPU repaint stall 방지)
        if (hasMouse) {
          const dx = r.x - mp.x, dy = r.y - mp.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < PROXIMITY_R2) {
            const prox = 1 - Math.sqrt(d2) / PROXIMITY_R;
            size += prox * 6;
            op    = Math.min(1, op + prox * 0.65);
          }
        }

        cur.current[i] = { x: r.x, y: r.y, op, size };
        // transform scale: width/height DOM 조작 없음 → layout thrash 없음
        el.style.transform = `translate(${r.x.toFixed(2)}px,${r.y.toFixed(2)}px) scale(${(size / BASE_SIZE).toFixed(3)})`;
        el.style.opacity   = op.toFixed(2);
      });
    }

    /* ── SCATTER ── */
    else if (m === 'scatter') {
      let allGone = true;
      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        const c = cur.current[i];
        const t = scatterTargets.current[i];
        c.x  = lerp(c.x,  t.x,  0.09);
        c.y  = lerp(c.y,  t.y,  0.09);
        c.op = lerp(c.op, 0,    0.08);
        if (c.op > 0.01) allGone = false;
        el.style.transform = `translate(${c.x.toFixed(2)}px,${c.y.toFixed(2)}px) scale(${(c.size / BASE_SIZE).toFixed(3)})`;
        el.style.opacity   = Math.max(0, c.op).toFixed(2);
      });
      if (allGone) { mode.current = 'gather'; gatherTimer.current = 0; }
    }

    /* ── GATHER ── (핵심 아이디어)
       lerp를 이차함수로 0.025 → 1.0 으로 증가:
         lf(t) = 0.025 + (t/240)² × 0.975

       구 감속: 0~180프레임: BASE→MIN, 180~240프레임: MIN 유지

       결과 (equilibrium lag = R × speed / lf):
         t=  0: speed=0.004, lf=0.025 → lag=24.8px  (파티클은 scatter에서 오는 중이라 무관)
         t= 60: speed=0.003, lf=0.086 → lag= 5.4px
         t=120: speed=0.002, lf=0.269 → lag= 1.1px
         t=180: speed=0.001, lf=0.573 → lag= 0.27px
         t=240: speed=0.001, lf≈1.000 → lag≈ 0px  ← 이 시점에 sphere 전환
                                                       스냅 거리 < 0.01px → 완전 매끄러움 */
    else if (m === 'gather') {
      gatherTimer.current++;
      const t = gatherTimer.current;

      const progress = Math.min(1, t / 240);
      const lf  = 0.025 + progress * progress * 0.975;  // 이차 증가: 0.025→1.0
      const spd = t <= 180
        ? BASE_SPEED + (MIN_SPEED - BASE_SPEED) * (t / 180)
        : MIN_SPEED;

      ry.current += spd;
      rx.current += spd * 0.3;

      if (t >= 240) {
        // lf≈1.0 → 파티클이 이미 구 위에 있음 → 스냅 없이 전환
        particleRefs.current.forEach((el, i) => {
          if (!el) return;
          const r     = rotate(POINTS[i], ry.current, rx.current);
          const depth = (r.z + R) / (R * 2);
          const size  = 2 + depth * 5;
          const op    = 0.04 + depth * 0.96;
          cur.current[i] = { x: r.x, y: r.y, op, size };
          el.style.transform = `translate(${r.x.toFixed(2)}px,${r.y.toFixed(2)}px) scale(${(size / BASE_SIZE).toFixed(3)})`;
          el.style.opacity   = op.toFixed(2);
        });
        rotSpeed.current = MIN_SPEED;  // 끊김 없이 이어서 돌기 시작
        mode.current = 'sphere';
        gatherTimer.current = 0;
      } else {
        particleRefs.current.forEach((el, i) => {
          if (!el) return;
          const r     = rotate(POINTS[i], ry.current, rx.current);
          const depth = (r.z + R) / (R * 2);
          const c     = cur.current[i];
          c.x    = lerp(c.x,    r.x,             lf);
          c.y    = lerp(c.y,    r.y,             lf);
          c.op   = lerp(c.op,   0.04+depth*0.96, lf);
          c.size = lerp(c.size, 2+depth*5,       lf);
          el.style.transform = `translate(${c.x.toFixed(2)}px,${c.y.toFixed(2)}px) scale(${(c.size / BASE_SIZE).toFixed(3)})`;
          el.style.opacity   = c.op.toFixed(2);
        });
      }
    }

    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [tick]);

  const handleClick = () => {
    if (mode.current !== 'sphere') return;
    scatterTargets.current = cur.current.map(c => {
      const angle = Math.atan2(c.y, c.x) + (Math.random() - 0.5) * 0.8;
      const dist  = 250 + Math.random() * 130;
      return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
    });
    mode.current = 'scatter';
  };

  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <div className="hero__left">
          <span className="hero__badge">{personalInfo.title}</span>
          <h1 className="hero__title">
            안녕하세요,<br />
            저는 <span className="hero__name">{personalInfo.name}</span> 입니다.
          </h1>
          <p className="hero__tagline">
            {displayText}
            <span className="hero__cursor">|</span>
          </p>
          <div className="hero__actions">
            <a href="#main-projects" className="btn-primary">프로젝트 보기</a>
            <a href="#contact" className="btn-secondary">연락하기 →</a>
          </div>
        </div>

        <div className="hero__right">
          <div
            className="orbit-container"
            ref={containerRef}
            onClick={handleClick}
          >
            <div className="nano-sphere">
              {Array.from({ length: NUM }, (_, i) => (
                <div
                  key={i}
                  className="nano-particle"
                  ref={el => { particleRefs.current[i] = el; }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
