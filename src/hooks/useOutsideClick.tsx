import { useEffect, RefObject } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (ref.current && !ref.current.contains(target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
