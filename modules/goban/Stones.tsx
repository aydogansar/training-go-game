import { useGoContext } from './context';
import Stone from './Stone';
import { Board, StoneType } from './types';
import { isLastMove } from './utils';

function Stones() {
  const { board, cellSize, BOARD_PADDING, history, pieceR: r } = useGoContext();

  const getPosition = (coordinat: number) => coordinat * cellSize + BOARD_PADDING;

  const getStone = (x: number, y: number, piece: StoneType) =>
    piece && (
      <Stone
        key={`${x}-${y}`}
        x={getPosition(x)}
        y={getPosition(y)}
        type={piece}
        r={r}
        isLastMove={isLastMove(x, y, history)}
      />
    );

  const rowMap = (row: Board[0], y: number) => row.map((piece, x) => getStone(x, y, piece));

  return board.map(rowMap);
}
export default Stones;
