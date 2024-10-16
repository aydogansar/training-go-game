"use client";

import { forwardRef, Ref } from "react";
import Board from "./Board";
import { Provider } from "./context";
import type { GameProps, GameRefProps } from "./types";
import BoardDecorations from './BoardDecorations';

function GoGame(
  { initialState, initialPlayer, initialBoard, initialHistory, size, initialWidth, showCoordinates, onError, onPass, onPlay }: GameProps,
  ref: Ref<GameRefProps>
) {
  return (
    <Provider
      size={size}
      initialPlayer={initialPlayer}
      initialState={initialState}
      initialWidth={initialWidth}
      initialBoard={initialBoard}
      initialHistory={initialHistory}
      onError={onError}
      onPass={onPass}
      onPlay={onPlay}
    >
      <div className="flex items-center justify-center relative h-auto">
        <Board
          ref={ref}
          showCoordinates={showCoordinates}
        >
          <BoardDecorations showCoordinates={showCoordinates} />
        </Board>
      </div>
    </Provider>
  );
}

export default forwardRef(GoGame);
