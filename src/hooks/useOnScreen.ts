import { useEffect, useState } from 'react';

// https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
export function useOnScreen(id: string): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = document.getElementById(id);
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    if (el) {
      observer.observe(el);
    }

    return (): void => {
      observer.disconnect();
    };
  }, [id]);

  return isIntersecting;
}
