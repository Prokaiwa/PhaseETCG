import { useEffect } from 'react';

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title ? `${title} | Phase-E TCG` : 'Phase-E TCG — Authentic Japanese Pokémon Cards';
  }, [title]);
};

export default usePageTitle;
