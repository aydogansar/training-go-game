'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { GameRefProps } from '@/modules/goban/Game_old';
import Goban from '@/modules/goban';
import { GAME } from '@/modules/goban/constants';
import { useRef } from 'react';

export default function Home() {
  const ref = useRef<GameRefProps>(null);
  return (
    <div className="flex gap-4 m-2">
      <Goban
        ref={ref}
        initialPlayer={GAME.WHITE}
        size={9}
        initialWidth={600}
        showCoordinates
        onError={error => {
          toast({
            variant: 'destructive',
            description: error.message,
          });
        }}
      />

      <div className="flex flex-col gap-2">
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
