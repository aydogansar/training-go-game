import { useEffect } from 'react';
import { useGoContext } from './context';

function useInitiliaze() {
  const { initialState, board, setBoard } = useGoContext();

  const setupInitialState = () => {
    const newBoard = [...board];

    if (initialState.length > 0) {
      initialState.forEach(({ x, y, type, captured }) => {
        newBoard[y][x] = type;

        if (captured) {
          captured.forEach(({ x, y }) => {
            newBoard[y][x] = null;
          });
        }
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
