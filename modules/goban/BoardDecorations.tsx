import { useGoContext } from './context';
import { BOARD_BG_COLOR, BOARD_LINE_COLOR, BOARD_TEXT_FAMILY, BOARD_TEXT_FILL_COLOR, BOARD_TEXT_SROKE_COLOR, first19Letters, HOSHI_RATIO } from './constants';
import { Fragment } from 'react';

interface Props {
  showCoordinates?: boolean;
}

function BoardDecorations({ showCoordinates }: Props) {
  const { size, BOARD_PADDING, cellSize, width, COORDINAT_PADDING } = useGoContext();

  const startPosition = BOARD_PADDING;
  const endPosition = width - BOARD_PADDING;

  const fontSize = 0.5 * cellSize;

  const tengen = Math.floor(size / 2);

  const hoshiCoordinate = size < 13 ? 2 : 3;

  const hoshiR = cellSize * HOSHI_RATIO;

  const sizeArray = Array.from({ length: size }, () => Array(size).fill(null));

  const lines = sizeArray.map((_, i) => {
    const pos = i * cellSize + BOARD_PADDING;

    return (
      <Fragment key={i}>
        <g stroke={BOARD_LINE_COLOR}>
          <line
            x1={pos}
            y1={startPosition}
            x2={pos}
            y2={endPosition}
          />
          <line
            x1={startPosition}
            y1={pos}
            x2={endPosition}
            y2={pos}
          />
        </g>

        {showCoordinates && (
          <g
            stroke={BOARD_TEXT_SROKE_COLOR}
            fill={BOARD_TEXT_FILL_COLOR}
            className={`${BOARD_TEXT_FAMILY}`}
            fontSize={fontSize}
          >
            {/* Up */}
            <text
              x={pos - 5}
              y={startPosition + fontSize / 4 - COORDINAT_PADDING}
            >
              {first19Letters[i]}
            </text>
            {/* Down */}
            <text
              x={pos - 5}
              y={endPosition + fontSize / 2 + COORDINAT_PADDING}
            >
              {first19Letters[i]}
            </text>

            {/* Left */}
            <text
              x={startPosition - fontSize / 2 - COORDINAT_PADDING}
              y={pos + fontSize / 3}
            >
              {size - i}
            </text>
            {/* Right */}
            <text
              x={endPosition - fontSize / 4 + COORDINAT_PADDING}
              y={pos + fontSize / 3}
            >
              {size - i}
            </text>
          </g>
        )}
      </Fragment>
    );
  });

  return (
    <>
      <rect
        width={width}
        height={width}
        fill={BOARD_BG_COLOR}
      />

      {lines}

      {/** Hoshi */}

      <g fill={BOARD_LINE_COLOR}>
        {/** Tengen */}
        <circle
          cx={tengen * cellSize + BOARD_PADDING}
          cy={tengen * cellSize + BOARD_PADDING}
          r={hoshiR}
        />

        {/** Top left hoshi */}
        <circle
          cx={hoshiCoordinate * cellSize + BOARD_PADDING}
          cy={hoshiCoordinate * cellSize + BOARD_PADDING}
          r={hoshiR}
        />
        {/**Top right hoshi */}
        <circle
          cx={(size - hoshiCoordinate - 1) * cellSize + BOARD_PADDING}
          cy={hoshiCoordinate * cellSize + BOARD_PADDING}
          r={hoshiR}
        />
        {/**Bottom left hoshi */}
        <circle
          cx={hoshiCoordinate * cellSize + BOARD_PADDING}
          cy={(size - hoshiCoordinate - 1) * cellSize + BOARD_PADDING}
          r={hoshiR}
        />
        {/**Bottom right hoshi */}
        <circle
          cx={(size - hoshiCoordinate - 1) * cellSize + BOARD_PADDING}
          cy={(size - hoshiCoordinate - 1) * cellSize + BOARD_PADDING}
          r={hoshiR}
        />
      </g>
      {/** Hoshi */}
    </>
  );
}
export default BoardDecorations;
