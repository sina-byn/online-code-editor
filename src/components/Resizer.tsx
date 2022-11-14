import React, { useEffect, useRef, useState } from 'react';

// * interfaces
interface Stats {
    x: number;
    leftWidth: number;
};

const Resizer = () => {
  const resizerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<Stats>({
    x: 0,
    leftWidth: 0
  });
  const {x, leftWidth} = stats;

  useEffect(() => {
    if (leftWidth === 0 || x === 0) return;
    const resizer = resizerRef.current!;
    const leftSide = resizer.previousSibling! as HTMLElement;
    const resizeHandler = () => {
      if (window.innerWidth < 768) leftSide.style.width = '100%';
    };
    
    window.addEventListener('resize', resizeHandler);
    leftSide.style.width = `${leftWidth}px`;

    () => window.removeEventListener('reset', resizeHandler);
  }, [stats]);

  const mouseMoveHandler = (e: MouseEvent) => {
    const resizer = resizerRef.current!;
    const leftSide = resizer.previousSibling! as HTMLElement;
    const rightSide = resizer.nextSibling! as HTMLElement;
    const dx = e.clientX - x;

    const newLeftWidth = leftWidth + dx;
    setStats(prev => ({ ...prev, leftWidth: newLeftWidth }));

    resizer.classList.remove('cursor-ew-resize');
    resizer.classList.add('cursor-col-resize');
    document.body.classList.add('cursor-col-resize');

    leftSide.classList.add('select-none');
    leftSide.classList.add('pointer-events-none');

    rightSide.classList.add('select-none');
    rightSide.classList.add('pointer-events-none');
  };

  const mouseUpHandler = () => {
    const resizer = resizerRef.current!;
    const leftSide = resizer.previousSibling! as HTMLElement;
    const rightSide = resizer.nextSibling! as HTMLElement;

    resizer.classList.remove('cursor-col-resize');
    resizer.classList.add('cursor-ew-resize');
    document.body.classList.remove('cursor-col-resize');

    leftSide.classList.remove('select-none');
    leftSide.classList.remove('pointer-events-none');

    rightSide.classList.remove('select-none');
    rightSide.classList.remove('pointer-events-none');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    const resizer = resizerRef.current!;
    const mouseX = e.clientX;
    const leftSide = resizer.previousSibling! as HTMLElement;
    const leftWidth = leftSide.getBoundingClientRect().width;

    setStats({ x: mouseX, leftWidth: leftWidth });

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  return (
    <div
      ref={resizerRef}
      onMouseDown={mouseDownHandler}
      className='bg-blue-500/75 w-1 cursor-ew-resize hidden md:block'
    />
  );
};

export default Resizer;
