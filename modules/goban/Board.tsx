"use client";

import { forwardRef, Ref } from "react";

import type { Board, GameRefProps } from "./types";

import { useGoContext } from "./context";

import Stone from "./Stone";

import useActions from "./useActions";
import useInitiliaze from './useInitialize';
import useResponsive from "./useResponsive";
import useIndicator from './useIndicator';
import { calculateStonePositionsByMouse } from './utils';

interface Props {
  showCoordinates?: boolean;
}

const Board = ({ showCoordinates }: Props, ref: Ref<GameRefProps>) => {
  const { width, cellSize, svgRef, BOARD_PADDING, size, board, pieceR: r, history, initialWidth, currentPlayer, setWidth } = useGoContext();

  const { isReady } = useInitiliaze(svgRef, showCoordinates);

  useResponsive({ svgRef, initialWidth, setWidth });

  const { makeMove } = useActions(ref);

  const { indicator, onMouseMove, removeIndicator } = useIndicator(isReady);

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
      width={width}
      height={width}
      onClick={handleClick}
      onMouseMove={onMouseMove}
      onMouseLeave={removeIndicator}
      className="select-none rounded-lg"
    >
      {board.map((row, y) =>
        row.map(
          (piece, x) =>
            piece && (
              <Stone
                key={`${x}-${y}`}
                x={x * cellSize + BOARD_PADDING}
                y={y * cellSize + BOARD_PADDING}
                type={piece}
                r={r}
                isLastMove={history[history.length - 1].x === x && history[history.length - 1].y === y}
              />
            )
        )
      )}
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
