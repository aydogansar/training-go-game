"use client";

import { forwardRef, ReactNode, Ref } from 'react';

import type { Board, GameRefProps } from './types';

import { useGoContext } from './context';

import Stone from './Stone';

import useActions from './useActions';
import useInitiliaze from './useInitialize';
import useResponsive from './useResponsive';
import useIndicator from './useIndicator';
import { calculateStonePositionsByMouse } from './utils';


interface Props {
  showCoordinates?: boolean;
  children: ReactNode;
}

const Board = ({ children }: Props, ref: Ref<GameRefProps>) => {
  const { width, cellSize, svgRef, BOARD_PADDING, size, board, pieceR: r, initialWidth, currentPlayer, setWidth } = useGoContext();

  useInitiliaze();

  useResponsive({ svgRef, initialWidth, setWidth });

  const { makeMove } = useActions(ref);

  const { indicator, onMouseMove, removeIndicator } = useIndicator();

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();

      const { x, y } = calculateStonePositionsByMouse({
        clientX: event.clientX,
        clientY: event.clientY,
        cellSize,
        extraPaddingX: -BOARD_PADDING - rect.left,
        extraPaddingY: -BOARD_PADDING - rect.top,
      });

      // Taş yerleştirilecek hücrenin sınırlarını kontrol et
      if (x >= 0 && x < size && y >= 0 && y < size && board[y][x] === null) {
        removeIndicator();
        makeMove(x, y, currentPlayer);
      }
    }
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${width}`}
      width={initialWidth}
      height={initialWidth}
      onClick={handleClick}
      onMouseMove={onMouseMove}
      onMouseLeave={removeIndicator}
      className="select-none rounded-lg block max-w-full  h-auto"
    >
      {children}

      {indicator && (
        <Stone
          key={`indicator-${indicator.x}-${indicator.y}`}
          x={indicator.x * cellSize + BOARD_PADDING}
          y={indicator.y * cellSize + BOARD_PADDING}
          type={indicator.type}
          r={r}
          isIndicator
        />
      )}
    </svg>
  );
};

export default forwardRef(Board);
