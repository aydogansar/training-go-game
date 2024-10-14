import { StoneType } from './types';

export const GAME = {
  BLACK: 'black',
  WHITE: 'white',
} as const;

export const BOARD_PADDING_RATIO = 8;
export const COORDINAT_PADDING_RATIO = 15;

export const DIRECTIONS = [
  { dx: 0, dy: 1 }, // Up
  { dx: 0, dy: -1 }, // Down
  { dx: 1, dy: 0 }, // Right
  { dx: -1, dy: 0 }, // Left
];

export const CONFIGS = {
  stones: {
    black: {
      fill: '#18181b',
      stroke: '#09090b',
    },
    white: {
      fill: '#fafafa',
      stroke: '#d1d5db',
    },
    strokeWidth: 1,
  },
};

export const first19Letters = [...Array(19)].map((_, i) => String.fromCharCode(97 + i).toUpperCase());
