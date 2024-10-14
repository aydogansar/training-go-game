"use client";

import { forwardRef, Ref } from "react";
import Board from "./Board";
import { Provider } from "./context";
import type { GameProps, GameRefProps } from "./types";

function GoGame({ initialState, initialPlayer, size, initialWidth, showCoordinates, onError, onPass, onPlay }: GameProps, ref: Ref<GameRefProps>) {
  return (
    <Provider
      size={size}
      initialPlayer={initialPlayer}
      initialState={initialState}
      initialWidth={initialWidth}
      onError={onError}
      onPass={onPass}
      onPlay={onPlay}
    >
      <Board
        ref={ref}
        showCoordinates={showCoordinates}
      />
    </Provider>
  );
}

export default forwardRef(GoGame);
