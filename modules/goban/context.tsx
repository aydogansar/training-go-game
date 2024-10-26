import { createContext, useContext, useState, ReactNode, useRef, MutableRefObject } from "react";
import { BOARD_PADDING_RATIO, COORDINAT_PADDING_RATIO, GAME, STONE_RATIO } from './constants';

import type { Board, HistoryEntry, onPlay, onPass, onError, StoneType } from './types';

interface GoContextProps {
  initialState: HistoryEntry[];
  svgRef: MutableRefObject<SVGSVGElement | null>;
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: StoneType;
  setCurrentPlayer: (player: StoneType) => void;
  history: HistoryEntry[];
  setHistory: (history: HistoryEntry[]) => void;
  width: number;
  setWidth: (width: number) => void;
  BOARD_PADDING: number;
  COORDINAT_PADDING: number;
  cellSize: number;
  pieceR: number;
  size: number;
  initialWidth: number;

  //events
  onPlay?: onPlay;
  onPass?: onPass;
  onError?: onError;
}

interface ProviderProps {
  children: ReactNode;
  initialState?: HistoryEntry[];
  initialPlayer?: StoneType;
  initialBoard?: Board;
  initialHistory?: HistoryEntry[];
  size?: number;
  initialWidth?: number;

  //events
  onPlay?: onPlay;
  onPass?: onPass;
  onError?: onError;
}

/**
 * temporarily created by chatgpt
 */
const GoContext = createContext<GoContextProps>({
  initialState: [],
  svgRef: { current: null },
  board: [], // Assuming Board is an array or any other initial structure
  setBoard: () => {}, // A no-op function
  currentPlayer: 'black', // Assuming 'black' and 'white' are possible StoneType values
  setCurrentPlayer: () => {},
  history: [],
  setHistory: () => {},
  width: 0,
  setWidth: () => {},
  BOARD_PADDING: 10, // Example padding
  COORDINAT_PADDING: 5, // Example padding
  cellSize: 30, // Example cell size
  pieceR: 12, // Example piece radius
  size: 19, // Example board size (19x19)
  initialWidth: 600, // Example initial width

  // Events
  onPlay: undefined,
  onPass: undefined,
  onError: undefined,
});

export function Provider({
  children,
  size = 9,
  initialState = [],
  initialPlayer = GAME.BLACK,
  initialWidth = 600,
  initialBoard = Array.from({ length: size }, () => Array(size).fill(null)),
  initialHistory = [],

  onError,
  onPass,
  onPlay,
}: ProviderProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<StoneType>(initialPlayer);
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);

  const [width, setWidth] = useState<number>(initialWidth);

  const BOARD_PADDING = (width * BOARD_PADDING_RATIO) / (size * 0.12);
  const COORDINAT_PADDING = (width * COORDINAT_PADDING_RATIO) / (size * 0.111);

  const cellSize = (width - BOARD_PADDING * 2) / (size - 1);
  const r = cellSize * STONE_RATIO;

  return (
    <GoContext.Provider
      value={{
        initialWidth,
        initialState,
        svgRef,
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        history,
        setHistory,
        width,
        setWidth,
        COORDINAT_PADDING,
        BOARD_PADDING,
        cellSize,
        pieceR: r,
        size,
        onError,
        onPass,
        onPlay,
      }}
    >
      {children}
    </GoContext.Provider>
  );
}

export function useGoContext() {
  return useContext(GoContext);
}
