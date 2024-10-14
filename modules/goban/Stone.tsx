"use client";

import { CONFIGS } from "./constants";
import type { Stone } from './types';

interface Props extends Stone {
  r: number;
}

const stones = CONFIGS.stones;

const Stone = ({ x, y, type, r }: Props) => {
  if (!type) {
    return null;
  }

  const color = stones[type].fill;

  const strokeColor = stones[type].stroke;

  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      fill={color}
      stroke={strokeColor}
      strokeWidth={stones.strokeWidth}
    />
  );
};

export default Stone;
