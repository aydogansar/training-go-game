'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { GameRefProps } from '@/modules/goban/types';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DEFAULT_BOARD_SIZE, GAME_SIZES } from '@/modules/goban/constants';

import Goban from '@/modules/goban';
import { RocketIcon, TrashIcon } from '@radix-ui/react-icons';
import { UndoIcon } from 'lucide-react';

const BOARD_STORAGE_KEY = '_states';

function GoApp() {
  const ref = useRef<GameRefProps>(null);

  const getInitialStates = () => {
    const states = localStorage.getItem(BOARD_STORAGE_KEY);

    if (states) {
      return JSON.parse(states);
    }

    return {};
  };

  const { history, size: savedSize } = getInitialStates();

  const [size, setSize] = useState(savedSize || DEFAULT_BOARD_SIZE);

  const clearStates = () => localStorage.removeItem(BOARD_STORAGE_KEY);

  return (
    <div className="flex justify-center items-center h-[100vh] gap-5 flex-col lg:flex-row">
      <Goban
        key={size}
        ref={ref}
        size={size}
        initialWidth={1200}
        initialState={history}
        initialHistory={history}
        showCoordinates
        onError={error => {
          toast({
            variant: 'destructive',
            description: error.message,
          });
        }}
        onPlay={({ board, history }) => {
          localStorage.setItem(BOARD_STORAGE_KEY, JSON.stringify({ board, history, size: board.length }));
        }}
      />

      <div className="flex flex-col gap-2">
        <ToggleGroup
          type="single"
          value={size.toString()}
          onValueChange={value => {
            if (!value) {
              return;
            }

            setSize(+value);
            clearStates();
          }}
        >
          {GAME_SIZES.map(({ value, label }) => (
            <ToggleGroupItem
              key={value}
              variant="outline"
              value={String(value)}
            >
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => ref.current?.undoLastMove()}
          >
            <UndoIcon className="mr-2 h-4 w-4" />
            Geri Al
          </Button>
          <Button
            variant="secondary"
            onClick={() => ref.current?.passTurn()}
          >
            <RocketIcon className="mr-2 h-4 w-4" />
            Pas
          </Button>
        </div>

        <Button
          variant="destructive"
          onClick={() => {
            clearStates();
            window.location.reload();
          }}
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          Kaydı Sil
        </Button>
      </div>
    </div>
  );
}
export default GoApp;
