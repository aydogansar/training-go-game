'use client';

import { NextMove, takeStone, trainings } from './contants';
import { useRef, useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { GameRefProps, HistoryEntry, Stone } from '@/modules/goban/types';
import { RocketIcon } from '@radix-ui/react-icons';
import { CheckIcon, ChevronsRightIcon, RefreshCcwIcon, ShieldXIcon } from 'lucide-react';
import { GAME } from '@/modules/goban/constants';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Goban from '@/modules/goban';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { isSameCoordinate } from '@/modules/goban/utils';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Messages } from '@/declarations';

interface Response {
  type: 'success' | 'error';
  message?: string;
}

const gobanVariants = cva('', {
  variants: {
    disabled: {
      true: 'pointer-events-none',
    },
  },
});

const alertVariants = cva('h-0 top-2 opacity-0 transition-all delay-200 duration-300', {
  variants: {
    show: {
      true: 'opacity-100 top-0 h-16 delay-0',
    },
  },
});

function PlayGround({ activeTraining }: { activeTraining: string }) {
  const ref = useRef<GameRefProps>(null);

  const t = useTranslations('training-contents');

  const { push } = useRouter();

  const [active, setActive] = useState(0);
  const [expectedNext, setExpectedNext] = useState<NextMove | null>(null);
  const [response, setResponse] = useState<Response | null>(null);

  const plans = trainings.map(item => item.sub).flat();
  const activePlan = plans.find(item => item.key === activeTraining)?.plan || plans[0].plan;

  const activeIndex = plans.findIndex(item => item.key === activeTraining);
  const nextPlan = plans[activeIndex + 1];

  const states = activePlan?.states[active];
  const expected = expectedNext?.expected || activePlan?.moves[active];
  const message = activePlan?.messages[active];

  const resetStates = () => {
    setResponse(null);
    setExpectedNext(null);
  };

  const handleNext = () => {
    resetStates();

    if ((activePlan?.states?.length || 0) <= active + 1 && nextPlan) {
      return push(`/trainings/${nextPlan.key}`);
    }

    setActive(p => p + 1);
  };

  const handleTryAgain = () => {
    ref.current?.resetBoard(states?.map(item => ({ ...item, captured: [] })));
    ref.current?.setCurrentPlayer(takeStone.moves[active]?.type || GAME.BLACK);

    resetStates();
  };

  const button = {
    success: {
      label: 'Devam Et',
      onClick: handleNext,
      variant: 'default',
      icon: <ChevronsRightIcon />,
    },
    error: {
      label: 'Tekrar Dene',
      onClick: handleTryAgain,
      variant: 'destructive',
      icon: <RefreshCcwIcon />,
    },
  };

  const selectedButton = button[response?.type || 'success'];

  return (
    <div className="px-12 flex flex-col lg:flex-row gap-6 w-full justify-center items-center">
      <div className={cn(gobanVariants({ disabled: !!response }))}>
        <Goban
          key={active}
          ref={ref}
          size={9}
          showCoordinates
          initialWidth={600}
          initialState={states as HistoryEntry[]}
          initialPlayer={expected?.type || GAME.BLACK}
          onPlay={({ move, board }) => {
            if (expectedNext && isSameCoordinate(move, expectedNext)) {
              return;
            }

            if (!expected) {
              return;
            }

            if ((expected.x === move.x || expected.x === -200) && (expected.y === move.y || expected.y === -200) && expected.type === expected.type) {
              if (expected.next) {
                const next = expected.next as Stone;

                setTimeout(() => ref.current?.makeMove(next.x, next.y, next.type, board), 250);

                return setExpectedNext(next);
              }

              return setResponse({
                type: 'success',
                message: expected.message,
              });
            }

            setResponse({
              type: 'error',
              message: 'Tekrar Dene...',
            });
          }}
        />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-56">
        <h1 className="text-primary text-2xl bg-blue-500 bg-opacity-10 p-4 font-bold rounded-md">{t(activeTraining as keyof Messages['training-contents'])}</h1>
        {message && <h3>{message}</h3>}

        <Alert
          className={cn(alertVariants({ show: !!response }))}
          variant={response?.type === 'error' ? 'destructive' : 'default'}
        >
          {response?.type === 'error' ? <ShieldXIcon /> : <CheckIcon />}
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>{response?.type === 'error' ? 'Yanlış!' : 'Doğru!'}</AlertTitle>
          <AlertDescription>{response?.message}</AlertDescription>
        </Alert>

        <Button
          variant={selectedButton.variant as ButtonProps['variant']}
          onClick={selectedButton.onClick}
          disabled={!!expected && !response}
        >
          {selectedButton.icon} {selectedButton.label}
        </Button>
      </div>
    </div>
  );
}
export default PlayGround;
