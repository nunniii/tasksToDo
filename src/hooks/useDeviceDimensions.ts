import { useState, useEffect } from 'react';

function useDeviceDimensions() {
  const [isMobileOrTabletPortrait, setIsMobileOrTabletPortrait] = useState(false);

  const checkDeviceDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPortrait = height > width;

    // Define os limites para tablet e celular
    const isMobile = width <= 768;
    const isTabletPortrait = width <= 1024 && isPortrait;

    setIsMobileOrTabletPortrait(isMobile || isTabletPortrait);
  };

  useEffect(() => {
    // Verifica as dimensões inicialmente
    checkDeviceDimensions();

    // Adiciona o evento listener para atualizar em caso de redimensionamento
    window.addEventListener('resize', checkDeviceDimensions);

    return () => {
      window.removeEventListener('resize', checkDeviceDimensions);
    };
  }, []);

  return isMobileOrTabletPortrait;
}

export default useDeviceDimensions;
