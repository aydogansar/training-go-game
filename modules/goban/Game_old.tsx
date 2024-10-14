'use client';

import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from "react";

import SvgUtils  from "@/utils/svg";

import useResponsive from "./useResponsive";
import { GAME, BOARD_PADDING_RATIO, DIRECTIONS, first19Letters, COORDINAT_PADDING_RATIO } from "./constants";
import { GameProps, Board, HistoryEntry, Piece } from "./types";

export interface GameRefProps {
  makeMove: (x: number, y: number, type: string) => void;
  undoLastMove: () => void;
  passTurn: () => void;
  setCurrentPlayer: (player: string) => void;
}

const svgUtils = new SvgUtils();

const GoGame: React.ForwardRefRenderFunction<GameRefProps, GameProps> = (
  { initialState = [], initialPlayer = GAME.BLACK, size = 19, initialWidth = 600, showCoordinates, onError, onPass, onPlay },
  ref
) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [board, setBoard] = useState<Board>(Array.from({ length: size }, () => Array(size).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState<string>(initialPlayer);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const [width, setWidth] = useState<number>(initialWidth);

  const BOARD_PADDING = width / BOARD_PADDING_RATIO;
  const COORDINAT_PADDING = width / COORDINAT_PADDING_RATIO;

  const cellSize = (width - BOARD_PADDING * 2) / (size - 1);
  const r = cellSize / 2.5;

  useResponsive({ svgRef: svgRef, initialWidth, setWidth });

  useEffect(() => {
    drawBoard();
    setupInitialState(initialState);
  }, [width]);

  const drawBoard = () => {
    const svg = svgRef.current;

    if (svg) {
      svg.innerHTML = ""; // Tahtayı temizle
      const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      background.setAttribute("width", String(width));
      background.setAttribute("height", String(width));
      background.setAttribute("fill", "#f0d9a8");
      svg.appendChild(background);

      const fontSize = 0.42 * cellSize;

      for (let i = 0; i < size; i++) {
        const startPosition = BOARD_PADDING;
        const endPosition = width - BOARD_PADDING;

        // Yatay çizgiler
        const yPos = i * cellSize + BOARD_PADDING;
        svg.appendChild(svgUtils.createLine(yPos, startPosition, yPos, endPosition));

        // Dikey çizgiler
        const xPos = i * cellSize + BOARD_PADDING;
        svg.appendChild(svgUtils.createLine(startPosition, xPos, endPosition, xPos));

        if (showCoordinates) {
          svg.appendChild(svgUtils.createText(yPos - 5, startPosition + fontSize / 4 - COORDINAT_PADDING, first19Letters[i], fontSize));
          svg.appendChild(svgUtils.createText(yPos - 5, endPosition + fontSize / 2 + COORDINAT_PADDING, first19Letters[i], fontSize));

          svg.appendChild(svgUtils.createText(startPosition - fontSize / 2 - COORDINAT_PADDING, xPos + fontSize / 2, (size - i).toString(), fontSize));
          svg.appendChild(svgUtils.createText(endPosition - fontSize / 4 + COORDINAT_PADDING, xPos + fontSize / 2, (size - i).toString(), fontSize));
        }
      }
    }
  };

  const setupInitialState = (initialState: Piece[]) => {
    const newBoard = [...board];
    initialState.forEach(({ x, y, type }) => {
      newBoard[y][x] = type;
    });

    setBoard(newBoard);
    drawPieces(newBoard); // Taşları başlangıçta çiz
  };

  const drawPieces = (currentBoard: (string | null)[][]) => {
    const svg = svgRef.current;
    if (svg) {
      // Mevcut taşları temizle
      const circles = svg.getElementsByTagName("circle");
      while (circles.length > 0) {
        svg.removeChild(circles[0]);
      }
      // Taşları çiz
      currentBoard.forEach((row, y) => {
        row.forEach((piece, x) => {
          if (piece) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

            circle.setAttribute("cx", (x * cellSize + BOARD_PADDING).toString()); // Kesişim noktası için 0 ekleyin
            circle.setAttribute("cy", (y * cellSize + BOARD_PADDING).toString()); // Kesişim noktası için 0 ekleyin
            circle.setAttribute("r", String(r)); // Yarıçap
            circle.setAttribute("fill", piece === GAME.BLACK ? "#18181b" : "#ffffff");
            circle.setAttribute("stroke", piece === GAME.BLACK ? "#09090b" : "#d1d5db");
            circle.setAttribute("stroke-width", "1");
            svg.appendChild(circle);
          }
        });
      });
    }
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = Math.floor((event.clientX - BOARD_PADDING - rect.left + cellSize / 2) / cellSize);
      const y = Math.floor((event.clientY - BOARD_PADDING - rect.top + cellSize / 2) / cellSize);

      // Taş yerleştirilecek hücrenin sınırlarını kontrol et
      if (x >= 0 && x < size && y >= 0 && y < size && board[y][x] === null) {
        makeMove(x, y, currentPlayer);
      }
    }
  };

  const hasLiberty = (x: number, y: number, currentPiece: string | null, board: Board): boolean => {
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

  const removeCapturedStones = (board: Board, player: string) => {
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

  const getLastMove = () => {
    const newHistory = [...history];
    const lastMove = newHistory.pop();

    return lastMove;
  };

  const canMove = (x: number, y: number, type: string, board: Board) => {
    const current = board.map((row) => [...row]);
    const { board: finalBoard, isRemoveOpponentStones } = removeCapturedStones(board, type);

    let suicideMove = false;

    if (current[y][x] !== null && finalBoard[y][x] === null) {
      suicideMove = true;

      if (onError) {
        onError({
          name: "suicide",
          message: "Kurallara aykırı hamle",
        });
      }
    }

    const lastMove = getLastMove();

    let isKo = false;

    if (lastMove && lastMove.captured.some((item) => item.x === x && item.y === y) && isRemoveOpponentStones) {
      isKo = true;

      if (onError) {
        onError({
          name: "ko",
          message: "Ko!",
        });
      }
    }

    const hasMove = !suicideMove && !isKo;

    return hasMove;
  };

  const makeMove = (x: number, y: number, type: string) => {
    const updatedBoard = board.map((row) => [...row]);
    updatedBoard[y][x] = type;

    const opponent = currentPlayer === GAME.BLACK ? GAME.WHITE : GAME.BLACK;

    if (!canMove(x, y, type, updatedBoard)) {
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
    drawPieces(finalBoard);

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
      setCurrentPlayer(lastMove.type === GAME.BLACK ? GAME.WHITE : GAME.BLACK);
      drawPieces(newBoard);
    }
  };

  useImperativeHandle(ref, () => ({
    makeMove,
    undoLastMove,
    passTurn,
    setCurrentPlayer,
  }));

  return (
    <svg
      className="select-none rounded-lg"
      ref={svgRef}
      width={width}
      height={width}
      onClick={handleClick}
    />
  );
};

export default forwardRef(GoGame);
