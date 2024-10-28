export type StoneType = 'white' | 'black' | null;

export interface Stone {
  x: number;
  y: number;
  type: StoneType;
}

export type Board = StoneType[][];

export interface GameProps {
  initialState?: HistoryEntry[];
  initialBoard?: Board;
  initialHistory?: HistoryEntry[];
  initialPlayer?: StoneType;
  size?: number;
  initialWidth?: number;
  onPlay?: onPlay;
  onPass?: onPass;
  onError?: onError;
  showCoordinates?: boolean;
}

export interface HistoryEntry {
  x: number;
  y: number;
  type: StoneType;
  captured: Stone[];
}

export interface ErrorProps {
  name: 'suicide' | 'ko';
  message: string;
}

export type CurrentPlayer = string;


export type onPlay = (props: { move: Stone; board: Board; history: HistoryEntry[]; opponent: StoneType; isUndoMove?: boolean }) => void;
export type onPass = (player: StoneType) => void;
export type onError = (err: ErrorProps) => void;

export interface GameRefProps {
  makeMove: (x: number, y: number, type: StoneType, board?: Board) => void;
  undoLastMove: () => void;
  passTurn: () => void;
  setCurrentPlayer: (player: StoneType) => void;
  resetBoard: (initialState?: HistoryEntry[]) => void;
}
