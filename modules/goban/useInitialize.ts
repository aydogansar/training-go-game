import { MutableRefObject, useEffect } from "react";
import SvgUtils from "@/utils/svg";
import { useGoContext } from "./context";
import { first19Letters } from "./constants";

const svgUtils = new SvgUtils();

function useInitiliaze(svgRef: MutableRefObject<SVGSVGElement | null>, showCoordinates?: boolean) {
  const { initialState, board, setBoard, width, BOARD_PADDING, cellSize, size, COORDINAT_PADDING } = useGoContext();

  const fontSize = 0.42 * cellSize;

  const drawBoard = () => {
    const svg = svgRef.current;
    if (svg) {
      svg.innerHTML = "";
      const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      background.setAttribute("width", String(width));
      background.setAttribute("height", String(width));
      background.setAttribute("fill", "#f0d9a8");
      svg.appendChild(background);

      for (let i = 0; i < size; i++) {
        const startPosition = BOARD_PADDING;
        const endPosition = width - BOARD_PADDING;

        // Draw lines
        const yPos = i * cellSize + BOARD_PADDING;
        svg.appendChild(svgUtils.createLine(yPos, startPosition, yPos, endPosition));
        const xPos = i * cellSize + BOARD_PADDING;
        svg.appendChild(svgUtils.createLine(startPosition, xPos, endPosition, xPos));

        // Draw coordinates
        if (showCoordinates) {
          svg.appendChild(svgUtils.createText(yPos - 5, startPosition + fontSize / 4 - COORDINAT_PADDING, first19Letters[i], fontSize));
          svg.appendChild(svgUtils.createText(yPos - 5, endPosition + fontSize / 2 + COORDINAT_PADDING, first19Letters[i], fontSize));
          svg.appendChild(svgUtils.createText(startPosition - fontSize / 2 - COORDINAT_PADDING, xPos + fontSize / 2, (i + 1).toString(), fontSize));
          svg.appendChild(svgUtils.createText(endPosition - fontSize / 4 + COORDINAT_PADDING, xPos + fontSize / 2, (i + 1).toString(), fontSize));
        }
      }
    }
  };

  const setupInitialState = () => {
    const newBoard = [...board];
    initialState.forEach(({ x, y, type }) => {
      newBoard[y][x] = type;
    });

    setBoard(newBoard);
  };

  useEffect(() => {
    setupInitialState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    drawBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
}
export default useInitiliaze;
