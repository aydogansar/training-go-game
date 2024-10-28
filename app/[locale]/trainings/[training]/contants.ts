import { Stone } from '@/modules/goban/types';
import { calculateCoordinate, calculateCoordinateBulk } from './utils';

export interface ExpectedMove extends Stone {
  message?: string;
  next?: NextMove;
}

export interface NextMove extends Stone {
  expected?: ExpectedMove;
}

interface TrainingPlan {
  moves: (ExpectedMove | null)[];
  states: Stone[][];
  messages: string[];
}

export const move: TrainingPlan = {
  moves: [
    {
      x: -200,
      y: -200,
      type: 'black',
      message: 'Başardın!',
    },
  ],
  states: [],
  messages: ['Oyuna her zaman siyah oyuncu başlar. Oyuna başlamak için tahtada kesişim noktalarına bir hamle yap.'],
};

export const takeStone: TrainingPlan = {
  messages: [
    'Taşların komşu kesişim noktaları aynı zamanda nefes noktalarıdır',
    'Siyah taşların tek nefesi kalmış. Hamle sırası beyazda, nefes noktasını kapatarak siyah taşları alabilirsin!',
    'Siyah taş grubunun tek nefesi kalmış. Hamle sırası beyazda, grubun nefesini kapatarak taşları alabilirsin!',
    'Siyah taş grubunun tek nefesi kalmış. Hamle sırası beyazda, nefes noktasını kapatarak siyah grubu alabilirsin.',
    'Siyah taş grubunun tek nefesi kalmış. Hamle sırası beyazda, nefes noktasını kapatarak siyah grubu alabilirsin.',
    'Siyah taş grubunun tek nefesi kalmış. Hamle sırası beyazda, siyah grubun nefes noktalarını kapatarak grubu alabilirsin.',
    'Siyah taş grubunun iki nefes noktası var. Hamle sırası beyazda, siyah grubun nefeslerini kapatarak taşları alabilirsin',
  ],
  states: [
    [...calculateCoordinateBulk('[gg][fc][gc][be][ce][cf]', 'black')],
    [...calculateCoordinateBulk('[gg][fg]', 'black'), ...calculateCoordinateBulk('[gf][eg][hg][fh][gh]', 'white')],
    [...calculateCoordinateBulk('[dh][fh][ci][gi]', 'white'), ...calculateCoordinateBulk('[eh][di][ei][fi]', 'black')],
    [...calculateCoordinateBulk('[cd][be][bf][ef][cg][dg]', 'white'), ...calculateCoordinateBulk('[ce][cf][df]', 'black')],
    [...calculateCoordinateBulk('[fc][gc][dd][hd][ee][fe][ge]', 'white'), ...calculateCoordinateBulk('[ed][fd][gd]', 'black')],
    [
      ...calculateCoordinateBulk('[dc][ec][fc][cd][gd][ce][ge][cf][gf][dg][eg][fg]', 'white'),
      ...calculateCoordinateBulk('[dd][ed][fd][de][fe][df][ef][ff]', 'black'),
    ],
    [
      ...calculateCoordinateBulk('[dc][ec][fc][cd][gd][be][ge][cf][gf][dg][eg][fg]', 'white'),
      ...calculateCoordinateBulk('[dd][ed][fd][de][fe][df][ef][ff]', 'black'),
    ],
  ],
  moves: [
    null,
    {
      ...calculateCoordinate('ff'),
      type: 'white',
      message: 'Başardın!',
    },
    { ...calculateCoordinate('eg'), type: 'white', message: 'Başardın!' },
    { ...calculateCoordinate('de'), type: 'white', message: 'Başardın!' },
    { ...calculateCoordinate('ec'), type: 'white', message: 'Başardın!' },
    { ...calculateCoordinate('ee'), type: 'white', message: 'Başardın!' },
    {
      ...calculateCoordinate('ce'),
      type: 'white',
      next: { ...calculateCoordinate('cc'), type: 'black', expected: { ...calculateCoordinate('ee'), type: 'white', message: 'Başardın!' } },
    },
  ],
};

export const trainings = [
  {
    key: 'start',
    label: 'Başlangıç',
    sub: [
      {
        key: 'move',
        plan: move,
      },
      {
        key: 'take-stone',
        plan: takeStone,
      },
      {
        key: 'defence',
        label: 'Savun',
      },
      {
        key: 'end-game',
        label: 'Oyunu Sonlandır',
      },
    ],
  },
  {
    key: 'milestones',
    label: 'Temel Stratejiler',
    sub: [
      {
        key: 'board',
        label: 'Tahta',
      },
      {
        key: 'stairs',
        label: 'Merdiven',
      },
      {
        key: 'snapback',
        label: 'Snapback',
      },
      {
        key: 'seki',
        label: 'Seki',
      },
      {
        key: 'ko',
        label: 'KO',
      },
    ],
  },
];
