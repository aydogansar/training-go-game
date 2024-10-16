import { useEffect } from 'react';
import SvgUtils from '@/utils/svg';
import { useGoContext } from './context';

function useInitiliaze() {
  const { initialState, board, setBoard } = useGoContext();

  const setupInitialState = () => {
    const newBoard = [...board];

    if (initialState.length > 0) {
      initialState.forEach(({ x, y, type }) => {
        newBoard[y][x] = type;
      });

      setBoard(newBoard);
    }
  };

  useEffect(() => {
    setupInitialState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
export default useInitiliaze;
