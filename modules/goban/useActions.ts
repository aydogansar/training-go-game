import { Ref, useImperativeHandle } from "react";
import { GAME } from "./constants";
import { useGoContext } from "./context";
import { Stone, StoneType, GameRefProps } from './types';
import { canMove, removeCapturedStones } from './utils';

function useActions(ref: Ref<GameRefProps>) {
  const { board, currentPlayer, history, setBoard, setHistory, setCurrentPlayer, onPlay, onPass, onError } = useGoContext();

  const makeMove = (x: number, y: number, type: StoneType) => {
    const updatedBoard = board.map(row => [...row]);
    updatedBoard[y][x] = type;

    const opponent = currentPlayer === GAME.BLACK ? GAME.WHITE : GAME.BLACK;

    if (!canMove(x, y, type, updatedBoard, history, onError)) {
      return;
    }

    const { board: finalBoard } = removeCapturedStones(updatedBoard, type);

    // Kaldırılan taşları belirleyelim
    const capturedStones: Stone[] = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== null && finalBoard[i][j] === null) {
          capturedStones.push({ x: j, y: i, type: board[i][j] });
        }
      }
    }

    setBoard(finalBoard);
    const finalHistory = [...history, { x, y, type, captured: capturedStones }];
    setHistory(finalHistory);
    setCurrentPlayer(opponent);

    if (onPlay) {
      onPlay({ move: { x, y, type }, board: finalBoard, history: finalHistory, opponent });
    }
  };

  const passTurn = () => {
    // Geçiş yaparken kaldırılan taş olmadığını kaydedelim
    setHistory([...history, { x: -1, y: -1, type: currentPlayer, captured: [] }]);
    setCurrentPlayer(currentPlayer === GAME.BLACK ? GAME.WHITE : GAME.BLACK);

    if (onPass) {
      onPass(currentPlayer);
    }
  };

  const undoLastMove = () => {
    const newHistory = [...history];
    const lastMove = newHistory.pop();

    if (lastMove) {
      const newBoard = [...board];
      if (lastMove.x !== -1 && lastMove.y !== -1) {
        newBoard[lastMove.y][lastMove.x] = null; // Taşı kaldır
      }

      // Kaldırılan taşları geri yükleyelim
      lastMove.captured.forEach(({ x, y, type }) => {
        newBoard[y][x] = type;
      });

      setBoard(newBoard);
      setHistory(newHistory);
      setCurrentPlayer(lastMove.type);
    }
  };

  useImperativeHandle(ref, () => ({
    makeMove,
    undoLastMove,
    passTurn,
    setCurrentPlayer,
  }));

  return {
    makeMove,
    undoLastMove,
    passTurn,
  };
}
export default useActions;
