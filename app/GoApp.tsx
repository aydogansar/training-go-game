'use client';

import { useRef, useState } from 'react';


import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { GameRefProps } from '@/modules/goban/types';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { DEFAULT_BOARD_SIZE, GAME_SIZES } from '@/modules/goban/constants';

import Goban from '@/modules/goban';

function GoApp() {
  const ref = useRef<GameRefProps>(null);

  const [size, setSize] = useState(DEFAULT_BOARD_SIZE);

  return (
    <div className="flex justify-center items-center h-[100vh] gap-5 flex-col md:flex-row">
      <Goban
        key={size}
        ref={ref}
        size={size}
        initialWidth={1200}
        showCoordinates
        onError={error => {
          toast({
            variant: 'destructive',
            description: error.message,
          });
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

        <Button
          variant="destructive"
          onClick={() => ref.current?.undoLastMove()}
        >
          Geri Al
        </Button>
        <Button
          variant="secondary"
          onClick={() => ref.current?.passTurn()}
        >
          Pas
        </Button>
      </div>
    </div>
  );
}
export default GoApp;
