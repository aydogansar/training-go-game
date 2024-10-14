"use client";

import { forwardRef, Ref } from "react";

import type { Board, GameRefProps } from "./types";

import { useGoContext } from "./context";

import Stone from "./Stone";

import useActions from "./useActions";
import useInitiliaze from "./useInitiliaze";
import useResponsive from "./useResponsive";

interface Props {
  showCoordinates?: boolean;
}

const Board = ({ showCoordinates }: Props, ref: Ref<GameRefProps>) => {
  const { width, cellSize, svgRef, BOARD_PADDING, size, board, pieceR: r, initialWidth, currentPlayer, setWidth } = useGoContext();

  useInitiliaze(svgRef, showCoordinates);

  useResponsive({ svgRef, initialWidth, setWidth });

  const { makeMove } = useActions(ref);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = Math.floor((event.clientX - BOARD_PADDING - rect.left + cellSize / 2) / cellSize);
      const y = Math.floor((event.clientY - BOARD_PADDING - rect.top + cellSize / 2) / cellSize);

      // Taş yerleştirilecek hücrenin sınırlarını kontrol et
      if (x >= 0 && x < size && y >= 0 && y < size && board[y][x] === null) {
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
              />
            )
        )
      )}
    </svg>
  );
};

export default forwardRef(Board);
