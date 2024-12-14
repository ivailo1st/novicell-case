import React from "react";

interface InfiniteScrollProps {
  canFetchMore: boolean;
  fetchMore?: () => void;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  canFetchMore,
  fetchMore,
}) => {
  const elementRef = React.useRef<HTMLDivElement | null>(null);
  const intersectionObserver = React.useRef<IntersectionObserver | null>(null);

  const handleIntersectionObserver = React.useCallback(
    (intersectionEntries: IntersectionObserverEntry[]) => {
      const entryTarget = intersectionEntries[0];
      if (entryTarget.isIntersecting && canFetchMore) {
        fetchMore?.();
      }
    },
    [canFetchMore, fetchMore]
  );

  React.useEffect(() => {
    if (intersectionObserver.current) intersectionObserver.current.disconnect();

    intersectionObserver.current = new IntersectionObserver(
      handleIntersectionObserver,
      { rootMargin: "128px" }
    );
    if (elementRef.current)
      intersectionObserver.current.observe(elementRef.current);

    return () => {
      if (intersectionObserver.current)
        intersectionObserver.current.disconnect();
    };
  }, [handleIntersectionObserver]);

  return <div ref={elementRef as React.RefObject<HTMLDivElement>} />;
};
