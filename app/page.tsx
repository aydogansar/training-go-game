'use client';

import { toast } from '@/hooks/use-toast';
import Goban from '@/modules/goban';
// import { GAME } from '@/modules/goban/constants';

// const initialState = [
//   { x: 3, y: 3, type: GAME.BLACK },
//   { x: 3, y: 4, type: GAME.WHITE },
//   { x: 4, y: 3, type: GAME.WHITE },
//   { x: 4, y: 4, type: GAME.WHITE },
//   { x: 5, y: 5, type: GAME.BLACK },
//   { x: 5, y: 6, type: GAME.WHITE },
//   { x: 6, y: 5, type: GAME.WHITE },
// ];

export default function Home() {

  return (
    <div className="m-2">
      <Goban
        // initialPlayer={GAME.WHITE}
        // initialState={initialState}
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
    </div>
  );
}
