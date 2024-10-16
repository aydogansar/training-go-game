import { useState } from 'react';
import { useGoContext } from './context';
import { StoneType } from './types';
import { calculateStonePositionsByMouse, canMove } from './utils';

interface Indicator {
  x: number;
  y: number;
  type: StoneType;
}

function useIndicator() {
  const { svgRef, BOARD_PADDING, cellSize, size, currentPlayer, board, history } = useGoContext();

  const [indicator, setIndicator] = useState<Indicator | null>(null);

  const removeIndicator = () => setIndicator(null);

  const onMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();

      const { x, y } = calculateStonePositionsByMouse({
        clientX: event.clientX,
        clientY: event.clientY,
        cellSize,
        extraPaddingX: -BOARD_PADDING - rect.left,
        extraPaddingY: -BOARD_PADDING - rect.top,
      });

      if (x >= 0 && x < size && y >= 0 && y < size && board[y][x] === null) {
        const updatedBoard = board.map(row => [...row]);
        updatedBoard[y][x] = currentPlayer;

        if (canMove(x, y, currentPlayer, updatedBoard, history)) {
          return setIndicator({
            x,
            y,
            type: currentPlayer,
          });
        }
      }

      setIndicator(null);
    }
  };

  return {
    indicator,
    onMouseMove,
    removeIndicator,
  };
}
export default useIndicator;
