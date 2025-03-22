import { RefObject, useEffect } from "react";

export const useElementReached = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const observedElement = ref?.current;

    if (!observedElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(observedElement);

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, [ref, callback]);
};
