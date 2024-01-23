import React, { useRef, useState, MouseEvent } from "react";

interface Props {
  children: React.ReactNode;
}
function HorizontalScroll({ children }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | undefined>();

  const onDragStart = (e: MouseEvent) => {
    scrollRef.current?.classList.add("cursor-grab");
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + (scrollRef.current?.scrollLeft || 0));
  };

  const onDragEnd = () => {
    setIsDrag(false);
    scrollRef.current?.classList.remove("cursor-grab");
  };

  const onDragMove = (e: MouseEvent) => {
    if (isDrag && scrollRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      if (scrollRef.current) {
        scrollRef.current.scrollLeft = (startX || 0) - e.pageX;

        if (scrollLeft === 0) {
          setStartX(e.pageX);
        } else if (scrollWidth <= clientWidth + scrollLeft) {
          setStartX(e.pageX + scrollLeft);
        }
      }
    }
  };

  const throttle = <T extends any[]>(
    func: (...args: T) => void,
    ms: number
  ) => {
    let throttled = false;
    return (...args: T) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 30;
  const onThrottleDragMove = throttle(onDragMove, delay);

  return (
    <div
      className="overflow-auto scrollbar-hide"
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : undefined}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}
    >
      {children}
    </div>
  );
}

export default HorizontalScroll;
