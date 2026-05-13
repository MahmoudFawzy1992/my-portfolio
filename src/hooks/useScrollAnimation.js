// src/hooks/useScrollAnimation.js
import { useEffect, useRef, useState } from 'react';

/**
 * Returns a [ref, isVisible] pair.
 * isVisible becomes true once the element enters the viewport.
 * Stays true after first trigger (animation plays once).
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // animate once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
