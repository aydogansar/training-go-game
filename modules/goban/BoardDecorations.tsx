import { useGoContext } from './context';
import { first19Letters } from './constants';

interface Props {
  showCoordinates?: boolean;
}

function BoardDecorations({ showCoordinates }: Props) {
  const { size, BOARD_PADDING, cellSize, width, COORDINAT_PADDING } = useGoContext();

  const startPosition = BOARD_PADDING;
  const endPosition = width - BOARD_PADDING;

  const fontSize = 0.6 * cellSize;

  const sizeArray = Array.from({ length: size }, () => Array(size).fill(null));

  return sizeArray.map((_, i) => {
    const pos = i * cellSize + BOARD_PADDING;

    return (
      <>
        <line
          key={i}
          x1={pos}
          y1={startPosition}
          x2={pos}
          y2={endPosition}
          stroke="black"
        />
        <line
          key={i + 100}
          x1={startPosition}
          y1={pos}
          x2={endPosition}
          y2={pos}
          stroke="black"
        />
        {showCoordinates && (
          <>
            <text
              x={pos - 5}
              y={startPosition + fontSize / 4 - COORDINAT_PADDING}
              fontSize={fontSize}
              fill="black"
            >
              {first19Letters[i]}
            </text>
            <text
              x={pos - 5}
              y={endPosition + fontSize / 2 + COORDINAT_PADDING}
              fontSize={fontSize}
              fill="black"
            >
              {first19Letters[i]}
            </text>
            <text
              x={startPosition - fontSize / 2 - COORDINAT_PADDING}
              y={pos + fontSize / 3}
              fontSize={fontSize}
              fill="black"
            >
              {size - i}
            </text>
            <text
              x={endPosition - fontSize / 4 + COORDINAT_PADDING}
              y={pos + fontSize / 3}
              fontSize={fontSize}
              fill="black"
            >
              {size - i}
            </text>
          </>
        )}
      </>
    );
  });
}
export default BoardDecorations;
