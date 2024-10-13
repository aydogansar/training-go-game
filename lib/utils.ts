import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class SvgUtils {
  private svgNamespace = 'http://www.w3.org/2000/svg';

  createLine(x1: number, y1: number, x2: number, y2: number) {
    const line = document.createElementNS(this.svgNamespace, 'line');
    line.setAttribute('x1', x1.toString());
    line.setAttribute('y1', y1.toString());
    line.setAttribute('x2', x2.toString());
    line.setAttribute('y2', y2.toString());
    line.setAttribute('stroke', 'black');
    return line;
  }

  createText(x: number, y: number, text: string,size:number = 24) {
    const textElement = document.createElementNS(this.svgNamespace, 'text');
    textElement.setAttribute('x', x.toString());
    textElement.setAttribute('y', y.toString());
    textElement.setAttribute('font-family', 'Arial');
    textElement.setAttribute('font-size', size.toString());
    textElement.setAttribute('fill', 'black');
    textElement.textContent = text;

    return textElement
  }
}
