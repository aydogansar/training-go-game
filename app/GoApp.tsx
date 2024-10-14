'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { GameRefProps } from '@/modules/goban/types';
import Goban from '@/modules/goban';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

function GoApp() {
  const ref = useRef<GameRefProps>(null);

  const [size, setSize] = useState(9);

  return (
    <div className="flex justify-center items-center h-[100vh] gap-5 flex-col md:flex-row">
      <Goban
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
          onValueChange={value => setSize(+value)}
        >
          <ToggleGroupItem
            variant="outline"
            value="9"
          >
            9x9
          </ToggleGroupItem>
          <ToggleGroupItem
            variant="outline"
            value="13"
            disabled
          >
            13x13
          </ToggleGroupItem>
          <ToggleGroupItem
            variant="outline"
            value="19"
            disabled
          >
            19x19
          </ToggleGroupItem>
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
