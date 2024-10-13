import { MutableRefObject, useEffect } from 'react';

interface Props {
  svgRef: MutableRefObject<SVGSVGElement | null>;
  initialWidth: number;
  setWidth: (width: number) => void;
}

function useResponsive({ svgRef, initialWidth, setWidth }: Props) {
  useEffect(() => {
    const svg = svgRef.current;

    if (svg) {
      const svgDimensions = svg.getBoundingClientRect();

      const handleResize = () => {
        const innerWidth = window.innerWidth - 50;
        const innerHeight = window.innerHeight - 50;

        const setSvgSize = (size: number) => {
          svg?.setAttribute('width', String(size));
          svg?.setAttribute('height', String(size));

          setWidth(size);
        };

        // ilk istenen değer ekrana sığıyorsa
        if (initialWidth < innerWidth && initialWidth < innerHeight) {
          return setSvgSize(initialWidth);
        }

        // svg'nin şu anki boyutları ekrana sığmıyorsa küçültüyoruz
        if (innerWidth < svgDimensions.width || innerHeight < svgDimensions.height) {
          const size = innerWidth < innerHeight ? innerWidth : innerHeight;

          return setSvgSize(size);
        }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [svgRef]);
}
export default useResponsive;
