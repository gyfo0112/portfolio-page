import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            if (entry.boundingClientRect.bottom < 0) {
              entry.target.classList.remove('visible');
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -60px 0px',
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
