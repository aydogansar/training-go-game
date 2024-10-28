import { Stone, StoneType } from '@/modules/goban/types';

export const calculateCoordinate = (coor: string): { x: number; y: number } => ({
  x: coor.charCodeAt(0) - 'a'.charCodeAt(0),
  y: coor.charCodeAt(1) - 'a'.charCodeAt(0),
});

export const calculateCoordinateBulk = (coors: string, type: StoneType): Stone[] => {
  const coorArray = coors
    .replaceAll('[', '')
    .replaceAll(']', '')
    .match(/[\s\S]{1,2}/g)
    ?.map(item => ({
      ...calculateCoordinate(item),
      type,
    }));

  return coorArray || [];
};
