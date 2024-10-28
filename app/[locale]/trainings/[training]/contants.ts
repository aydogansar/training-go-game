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

const defence: TrainingPlan = {
  messages: [
    'Şimdi de taşlarımızı savunalım. Siyah taşın tek nefesi kalmış. Hamle sırası siyahta, onun nefesini arttırabilirsin.',
    'Bir taş başka bir taşa nefes noktasıyla bağlandığında grup oluştururlar. Artık nefes noktaları daha fazla ve siyah taş grubu kurtuldu!',
    'Siyah taş grubunun tek nefesi var. Hamle sırası siyahta, taşların nefes noktasını arttırabilirsin.',
    'Hamle sırası siyahta, nefes noktalarını arttır ve yaşa.',
    'Hamle sırası beyazda. Beyaz grubun nefese ihtiyacı var.',
  ],
  states: [
    [...calculateCoordinateBulk('[ee]', 'black'), ...calculateCoordinateBulk('[de][fe][ef]', 'white')],
    [...calculateCoordinateBulk('[ed][ec][dd][fd]', 'black')],
    [...calculateCoordinateBulk('[ee][ge][ef][gf][fg]', 'white'), ...calculateCoordinateBulk('[fe][ff]', 'black')],
    [...calculateCoordinateBulk('[dh][fh][ci][gi]', 'white'), ...calculateCoordinateBulk('[eh][di][ei][fi]', 'black')],
    [...calculateCoordinateBulk('[ee][ef][ff][fg]', 'white'), ...calculateCoordinateBulk('[ed][de][fe][df][gf][eg][gg]', 'black')],
  ],
  moves: [
    {
      ...calculateCoordinate('ed'),
      type: 'black',
      message: 'Başardın!',
    },
    null,
    {
      ...calculateCoordinate('fd'),
      type: 'black',
      message: 'Başardın!',
    },
    {
      ...calculateCoordinate('eg'),
      type: 'black',
      message: 'Başardın!',
    },
    {
      ...calculateCoordinate('fh'),
      type: 'white',
      message: 'Başardın!',
    },
  ],
};

const endGame: TrainingPlan = {
  messages: ['Oyunda sınırlar kapandığında ve hamle kalmadığını düşündüğünde pas diyerek oyunu sonlandırabilirsin.'],
  states: [
    [
      ...calculateCoordinateBulk('[da][eb][cc][dc][ec][fc][cd][fd][be][he][ie][bf][df][gf][if][ag][bg][cg][gg][hg][ah][hh][gi][hi]', 'white'),
      ...calculateCoordinateBulk(
        '[ea][fa][fb][gb][gc][dd][ed][gd][hd][id][ce][de][ee][fe][ge][cf][ff][dg][eg][fg][bh][ch][eh][fh][gh][ai][bi][ci][di][fi]',
        'black'
      ),
    ],
  ],
  moves: [null],
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
        plan: defence,
      },
      {
        key: 'end-game',
        plan: endGame,
      },
    ],
  },
  // {
  //   key: 'milestones',
  //   label: 'Temel Stratejiler',
  //   sub: [
  //     {
  //       key: 'board',
  //       label: 'Tahta',
  //     },
  //     {
  //       key: 'stairs',
  //       label: 'Merdiven',
  //     },
  //     {
  //       key: 'snapback',
  //       label: 'Snapback',
  //     },
  //     {
  //       key: 'seki',
  //       label: 'Seki',
  //     },
  //     {
  //       key: 'ko',
  //       label: 'KO',
  //     },
  //   ],
  // },
];
