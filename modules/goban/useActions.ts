import { Ref, useImperativeHandle } from "react";
import { GAME } from "./constants";
import { useGoContext } from "./context";
import { Piece } from "./types";
import { canMove, removeCapturedStones } from "./utils";
import { GameRefProps } from "./Game_old";

function useActions(ref: Ref<GameRefProps>) {
  const { board, currentPlayer, history, setBoard, setHistory, setCurrentPlayer, onPlay, onPass, onError } = useGoContext();

  const makeMove = (x: number, y: number, type: string) => {
    const updatedBoard = board.map((row) => [...row]);
    updatedBoard[y][x] = type;

    const opponent = currentPlayer === GAME.BLACK ? GAME.WHITE : GAME.BLACK;

    if (!canMove(x, y, type, updatedBoard, history, onError)) {
      return;
    }

    const { board: finalBoard } = removeCapturedStones(updatedBoard, type);

    // Kaldırılan taşları belirleyelim
    const capturedStones: Piece[] = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== null && finalBoard[i][j] === null) {
          capturedStones.push({ x: j, y: i, type: board[i][j] });
        }
      }
    }

    setBoard(finalBoard);
    setHistory([...history, { x, y, type, captured: capturedStones }]);
    setCurrentPlayer(opponent);

    if (onPlay) {
      onPlay({ x, y, type }, finalBoard);
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
