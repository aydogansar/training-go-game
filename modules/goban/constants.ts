export const GAME = {
  BLACK: 'black',
  WHITE: 'white',
} as const;

export const BOARD_BG_COLOR = '#f0d9a8';
export const BOARD_LINE_COLOR = '#09090b';
export const BOARD_TEXT_FILL_COLOR = '#27272a';
export const BOARD_TEXT_SROKE_COLOR = '#09090b';
export const BOARD_TEXT_FAMILY = 'font-rubik';

export const DEFAULT_BOARD_SIZE = 9;
export const BOARD_PADDING_RATIO = 0.125;
export const COORDINAT_PADDING_RATIO = 0.0666;
export const STONE_RATIO = 0.4;

export const HOSHI_RATIO = 0.1;

export const DIRECTIONS = [
  { dx: 0, dy: 1 }, // Up
  { dx: 0, dy: -1 }, // Down
  { dx: 1, dy: 0 }, // Right
  { dx: -1, dy: 0 }, // Left
];

export const GAME_SIZES = [
  {
    label: '9x9',
    value: 9,
  },
  {
    label: '13x13',
    value: 13,
  },
  {
    label: '19x19',
    value: 19,
  },
];

export const CONFIGS = {
  stones: {
    black: {
      fill: '#18181b',
      stroke: '#09090b',
      lastMove: {
        stroke: '#fafafa',
        width: 2,
      },
    },
    white: {
      fill: '#fafafa',
      stroke: '#d1d5db',
      lastMove: {
        stroke: '#18181b',
        width: 2,
      },
    },

    strokeWidth: 1,
  },
};

export const first19Letters = [...Array(19)].map((_, i) => String.fromCharCode(97 + i).toUpperCase());
