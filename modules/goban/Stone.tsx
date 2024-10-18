"use client";


import { CONFIGS } from './constants';
import type { Stone } from './types';

interface Props extends Stone {
  r: number;
  isLastMove?: boolean;
  isIndicator?: boolean;
}

const stones = CONFIGS.stones;

const Stone = ({ x, y, type, r, isLastMove, isIndicator }: Props) => {
  if (!type) {
    return null;
  }

  const selectedConfig = stones[type];

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={selectedConfig.fill}
        stroke={selectedConfig.stroke}
        strokeWidth={stones.strokeWidth}
        opacity={isIndicator ? '0.5' : '1'}
      />
      {isLastMove && (
        <circle
          cx={x}
          cy={y}
          r={r / 1.7}
          fill="transparent"
          stroke={selectedConfig.lastMove.stroke}
          strokeWidth={selectedConfig.lastMove.width}
        />
      )}
    </g>
  );
};

export default Stone;
