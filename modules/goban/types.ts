export interface Piece {
  x: number;
  y: number;
  type: string | null;
}

export type Board = (string | null)[][];

export interface GameProps {
  initialState?: Piece[];
  initialPlayer?: string;
  size?: number;
  initialWidth?: number;
  onPlay?: (piexe: Piece, board: Board) => void;
  onPass?: (player: string) => void;
  onError?: (err: ErrorProps) => void;
  showCoordinates?: boolean;
}

export interface HistoryEntry {
  x: number;
  y: number;
  type: string;
  captured: Piece[];
}

export interface ErrorProps {
  name: "suicide" | "ko";
  message: string;
}

export type CurrentPlayer = string;

export interface GameRefProps {
  makeMove: (x: number, y: number, type: string) => void;
  undoLastMove: () => void;
  passTurn: () => void;
  setCurrentPlayer: (player: string) => void;
}

export type onPlay = (piexe: Piece, board: Board) => void;
export type onPass = (player: CurrentPlayer) => void;
export type onError = (err: ErrorProps) => void;
