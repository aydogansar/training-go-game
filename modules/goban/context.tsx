import { createContext, useContext, useState, ReactNode, useRef, MutableRefObject } from "react";
import { BOARD_PADDING_RATIO, COORDINAT_PADDING_RATIO, GAME } from "./constants";

import type { Board, HistoryEntry, Piece, CurrentPlayer, onPlay, onPass, onError } from "./types";

interface GoContextProps {
  initialState: Piece[];
  svgRef: MutableRefObject<SVGSVGElement | null>;
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: CurrentPlayer;
  setCurrentPlayer: (player: CurrentPlayer) => void;
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
  initialState?: Piece[];
  initialPlayer?: CurrentPlayer;
  size?: number;
  initialWidth?: number;

  //events
  onPlay?: onPlay;
  onPass?: onPass;
  onError?: onError;
}

// Default değer

// Context'i oluşturun
const GoContext = createContext<GoContextProps>(undefined);

// Provider bileşeni
export function Provider({ children, size = 9, initialState = [], initialPlayer = GAME.BLACK, initialWidth = 600, onError, onPass, onPlay }: ProviderProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [board, setBoard] = useState<Board>(Array.from({ length: size }, () => Array(size).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>(initialPlayer);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const [width, setWidth] = useState<number>(initialWidth);

  const BOARD_PADDING = width / BOARD_PADDING_RATIO;
  const COORDINAT_PADDING = width / COORDINAT_PADDING_RATIO;

  const cellSize = (width - BOARD_PADDING * 2) / (size - 1);
  const r = cellSize / 2.5;

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
