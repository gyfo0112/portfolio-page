import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: -100, y: -100 });
  const ring     = useRef({ x: -100, y: -100 });
  const raf      = useRef(null);
  const hovering = useRef(false);

  useEffect(() => {
    // 터치 디바이스에선 렌더 안 함
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current;
    const rng  = ringRef.current;
    if (!dot || !rng) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => {
      hovering.current = true;
      rng.classList.add('cursor-ring--hover');
      dot.classList.add('cursor-dot--hover');
    };
    const onLeave = () => {
      hovering.current = false;
      rng.classList.remove('cursor-ring--hover');
      dot.classList.remove('cursor-dot--hover');
    };

    // 클릭 가능한 모든 요소에 hover 이벤트
    const targets = () => document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label, .main-card, .mini-card, .skill-card, .orbit-container'
    );

    const attachHover = () => {
      targets().forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    attachHover();

    // MutationObserver로 동적 추가 요소에도 적용
    const mo = new MutationObserver(attachHover);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove, { passive: true });

    // RAF로 ring이 dot을 부드럽게 쫓아오게
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      const { x, y } = pos.current;

      // dot은 즉시 따라감
      dot.style.transform = `translate(${x}px, ${y}px)`;

      // ring은 부드럽게 지연 추적
      ring.current.x = lerp(ring.current.x, x, 0.12);
      ring.current.y = lerp(ring.current.y, y, 0.12);
      rng.style.transform = `translate(${ring.current.x.toFixed(2)}px, ${ring.current.y.toFixed(2)}px)`;

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      mo.disconnect();
      targets().forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* 커서 중심 점 */}
      <div ref={dotRef} className="cursor-dot" />
      {/* 지연 추적 링 */}
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
