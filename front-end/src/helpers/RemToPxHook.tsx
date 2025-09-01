import { useMemo } from 'react';

const useRemtoPx = (rem: number) => {
  const px = useMemo(() => {
    return parseInt(getComputedStyle(document.documentElement).fontSize) * rem;
  }, [rem]);

  return px;
};

export default useRemtoPx;
