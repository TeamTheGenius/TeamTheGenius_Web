import { useEffect, useRef } from "react";

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

interface Params {
  observerOptions?: ObserverOptions;
  isLoadingRef: React.MutableRefObject<boolean>;
  isLastRef: React.MutableRefObject<boolean>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const useInfiniteScroll = ({
  observerOptions,
  isLoadingRef,
  isLastRef,
  setPage,
}: Params) => {
  const target = useRef<HTMLDivElement>(null);

  const {
    root = null,
    rootMargin = "0px",
    threshold = 0.1,
  } = observerOptions || {};

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoadingRef.current && !isLastRef.current) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return target;
};
