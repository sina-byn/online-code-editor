import { useEffect } from 'react';

const useClickOutside = (elem: Element | null, onClickOutside: Function) => {
  const handler = (e: Event) => {
    const { target } = e;
    if (
      !elem ||
      elem === target ||
      (elem?.children.length !== 0 && elem.contains(target as Node))
    )
      return;
    onClickOutside();
  };

  useEffect(() => {
    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [elem]);
};

export default useClickOutside;
