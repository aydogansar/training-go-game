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
      const handleResize = () => {
        const padding = window.innerWidth < 780 ? 5 : 50;
        const innerWidth = window.innerWidth - padding;
        const innerHeight = window.innerHeight - padding - 100;

        const svgDimensions = svg.getBoundingClientRect();
        const availableWidth = innerWidth;
        const availableHeight = innerHeight;

        const setSvgSize = (size: number) => {
          svg.setAttribute('width', String(size));
          svg.setAttribute('height', String(size));
          setWidth(size);
        };

        const newSize = Math.min(availableWidth, availableHeight, initialWidth);

        if (newSize !== svgDimensions.width) {
          setSvgSize(newSize);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [svgRef, initialWidth, setWidth]);
}
export default useResponsive;
