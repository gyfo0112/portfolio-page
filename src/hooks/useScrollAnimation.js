import { useEffect } from 'react';

// 네비게이션 스크롤 중 visible 리셋 방지용 전역 플래그
export let isNavigating = false;
export function setNavigating(val) { isNavigating = val; }

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // 네비게이션으로 스크롤 중이면 visible 제거하지 않음
            // (스크롤 도중 요소가 뷰포트를 지나가도 깜빡이지 않음)
            if (isNavigating) return;

            entry.target.style.transition = 'none';
            entry.target.classList.remove('visible');
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                entry.target.style.transition = '';
              });
            });
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observe = () => {
      const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      els.forEach((el) => observer.observe(el));
    };

    observe();

    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
