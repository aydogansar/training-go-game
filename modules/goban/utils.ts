import { DIRECTIONS, GAME } from "./constants";
import type { Board, HistoryEntry, onError, StoneType } from './types';

export const hasLiberty = (x: number, y: number, currentPiece: StoneType, board: Board): boolean => {
  const queue: { x: number; y: number }[] = [{ x, y }];
  const localVisited = new Set<string>();

  while (queue.length > 0) {
    const { x: currX, y: currY } = queue.shift()!;
    const key = `${currX},${currY}`;

    if (localVisited.has(key)) continue;
    localVisited.add(key);

    // Eğer boş hücre varsa, taşın özgürlüğü vardır
    if (board[currY][currX] === null) {
      return true;
    }

    // Sadece aynı türdeki taşları kontrol et
    if (board[currY][currX] === currentPiece) {
      for (const { dx, dy } of DIRECTIONS) {
        const newX = currX + dx;
        const newY = currY + dy;

        if (newX >= 0 && newX < board[0].length && newY >= 0 && newY < board.length) {
          queue.push({ x: newX, y: newY });
        }
      }
    }
  }

  return false; // Taşın özgürlüğü yok
};

export const removeCapturedStones = (board: Board, player: StoneType) => {
  const visited = new Set<string>();

  const opponent = player === GAME.BLACK ? GAME.WHITE : GAME.BLACK;

  const removes = [];

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const key = `${x},${y}`;
      if (board[y][x] !== null && !visited.has(key)) {
        const currentPiece = board[y][x];

        // Eğer nefesi yoksa, kaldır
        if (!hasLiberty(x, y, currentPiece, board)) {
          const queue: { x: number; y: number }[] = [{ x, y }];
          while (queue.length > 0) {
            const { x: currX, y: currY } = queue.shift()!;
            const removeKey = `${currX},${currY}`;

            if (visited.has(removeKey)) continue;
            visited.add(removeKey);

            removes.push({ x: currX, y: currY });

            // Komşu taşları kontrol et
            for (const { dx, dy } of DIRECTIONS) {
              const newX = currX + dx;
              const newY = currY + dy;

              if (newX >= 0 && newX < board[0].length && newY >= 0 && newY < board.length) {
                if (board[newY][newX] === currentPiece) {
                  queue.push({ x: newX, y: newY });
                }
              }
            }
          }
        }
      }
    }
  }

  let isRemoveOpponentStones = false;

  if (removes.some(({ x, y }) => board[y][x] === opponent)) {
    isRemoveOpponentStones = true;
  }

  removes
    .filter(({ x, y }) => (isRemoveOpponentStones ? board[y][x] !== player : true))
    .forEach(({ x, y }) => {
      board[y][x] = null;
    });

  return { board, isRemoveOpponentStones };
};

export const getLastMove = (history: HistoryEntry[]) => {
  const newHistory = [...history];
  const lastMove = newHistory.pop();

  return lastMove;
};

export const canMove = (x: number, y: number, type: StoneType, board: Board, history: HistoryEntry[], onError?: onError) => {
  const current = board.map(row => [...row]);
  const { board: finalBoard, isRemoveOpponentStones } = removeCapturedStones(board, type);

  let suicideMove = false;

  if (current[y][x] !== null && finalBoard[y][x] === null) {
    suicideMove = true;

    if (onError) {
      onError({
        name: 'suicide',
        message: 'Kurallara aykırı hamle',
      });
    }
  }

  const lastMove = getLastMove(history);

  let isKo = false;

  if (lastMove && lastMove.captured.some(item => item.x === x && item.y === y) && isRemoveOpponentStones) {
    isKo = true;

    if (onError) {
      onError({
        name: 'ko',
        message: 'Ko!',
      });
    }
  }

  const hasMove = !suicideMove && !isKo;

  return hasMove;
};
