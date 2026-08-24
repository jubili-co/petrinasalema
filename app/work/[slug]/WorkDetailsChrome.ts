import type { PaperWordKey } from "@/app/components/PaperWord";
import type { SketchFade } from "@/app/components/SketchArtifact";
import { PAPERS } from "@/lib/papers";

type WorkDetailsChrome = {
  sketch: Sketch;
  stamps: Stamp[];
};

type Sketch = {
  src: string;
  fade: SketchFade;
  className: string;
  imageClassName: string;
};

type Stamp = {
  word: PaperWordKey;
  className: string;
};

const FALLBACK: WorkDetailsChrome = {
  sketch: {
    src: `${PAPERS}/hofansicht--haus-line.webp`,
    fade: "up",
    className: "-right-8 bottom-[-2rem] h-[22rem] w-[48%] md:h-[26rem] md:w-[40%]",
    imageClassName: "rotate-[10deg] scale-[1.25] object-left",
  },
  stamps: [
    {
      word: "keller",
      className: "-right-6 bottom-28 w-16 -rotate-[12deg] md:w-20",
    },
    {
      word: "dachfenster",
      className: "bottom-6 left-[46%] w-[4.75rem] rotate-[14deg] md:w-24",
    },
  ],
};

const CHROME: Record<string, WorkDetailsChrome> = {
  "tegelweg-rental-maisonette-vienna": {
    sketch: {
      src: `${PAPERS}/neu-mansarde--plan-line.webp`,
      fade: "up",
      className: "-right-8 bottom-[-2rem] h-[22rem] w-[52%] md:h-[26rem] md:w-[40%]",
      imageClassName: "rotate-[22deg] scale-[1.55] object-bottom",
    },
    stamps: [
      {
        word: "dachfenster",
        className: "-right-8 bottom-36 w-[4.75rem] rotate-[16deg] md:w-24",
      },
      {
        word: "keller",
        className: "bottom-5 left-[42%] w-16 -rotate-[9deg] md:left-[50%] md:w-20",
      },
      {
        word: "schnittAb",
        className: "right-[22%] bottom-16 w-[5.5rem] rotate-[8deg] md:w-28",
      },
    ],
  },
  "brabbeegasse-single-unit-apartment-vienna": {
    sketch: {
      src: `${PAPERS}/neu-erdgeschoss--plan-line.webp`,
      fade: "up",
      className: "-right-6 bottom-[-2rem] h-[20rem] w-[58%] md:h-[24rem] md:w-[44%]",
      imageClassName: "-rotate-[8deg] scale-[1.3] object-left",
    },
    stamps: [
      {
        word: "ersterStock",
        className: "-right-7 bottom-32 w-[5.25rem] rotate-[11deg] md:w-24",
      },
      {
        word: "fassadeDolomit",
        className: "-bottom-3 left-[34%] w-36 -rotate-[7deg] md:left-[40%] md:w-44",
      },
    ],
  },
  "tan-house-office-building": {
    sketch: {
      src: `${PAPERS}/neu-obergeschoss--plan-line.webp`,
      fade: "right",
      className: "-right-12 bottom-[-1rem] h-[22rem] w-[50%] md:h-[26rem] md:w-[38%]",
      imageClassName: "rotate-[16deg] scale-[1.4] object-[40%_30%]",
    },
    stamps: [
      {
        word: "hofansicht",
        className: "right-[8%] bottom-28 w-[5.75rem] -rotate-[10deg] md:w-28",
      },
      {
        word: "zentralBeheizt",
        className: "-right-12 bottom-12 w-28 rotate-[13deg] md:w-36",
      },
    ],
  },
  "nhc-eco-residence": {
    sketch: {
      src: `${PAPERS}/strassenansicht--haus-line.webp`,
      fade: "inset",
      className: "-right-16 bottom-0 h-[22rem] w-[54%] md:h-[26rem] md:w-[42%]",
      imageClassName: "-rotate-[6deg] scale-[1.35] object-bottom",
    },
    stamps: [
      {
        word: "mansarde",
        className: "-right-8 bottom-28 w-[5.5rem] rotate-[9deg] md:w-28",
      },
      {
        word: "kellerAlt",
        className: "bottom-7 left-[44%] w-16 -rotate-[14deg] md:w-20",
      },
    ],
  },
  "bank-of-tanzania-mwanza-branch": {
    sketch: {
      src: `${PAPERS}/schnitt-a-b--schnitt-line.webp`,
      fade: "right",
      className: "-right-8 bottom-[-1rem] h-[24rem] w-[50%] md:h-[28rem] md:w-[40%]",
      imageClassName: "rotate-[9deg] scale-[1.2] object-left",
    },
    stamps: [
      {
        word: "erdgeschoss",
        className: "right-[6%] bottom-32 w-[5.75rem] rotate-[12deg] md:w-28",
      },
      {
        word: "dachfenster",
        className: "-right-6 bottom-14 w-[4.75rem] -rotate-[11deg] md:w-24",
      },
    ],
  },
  "ppf-commercial-property-head-office-competition": {
    sketch: {
      src: `${PAPERS}/hofansicht--haus-line.webp`,
      fade: "diag",
      className: "-right-4 bottom-[-1.5rem] h-[22rem] w-[56%] md:h-[26rem] md:w-[42%]",
      imageClassName: "rotate-[18deg] scale-[1.45] object-top",
    },
    stamps: [
      {
        word: "obergeschoss",
        className: "-right-10 bottom-28 w-[6.25rem] -rotate-[8deg] md:w-32",
      },
      {
        word: "schnittCd",
        className: "bottom-5 left-[48%] w-[5.25rem] rotate-[15deg] md:w-24",
      },
    ],
  },
  "international-school-of-tanganyika-athletic-centre": {
    sketch: {
      src: `${PAPERS}/schnitt-c-d--schnitt-line.webp`,
      fade: "right",
      className: "-right-10 bottom-[-2rem] h-[22rem] w-[52%] md:h-[26rem] md:w-[40%]",
      imageClassName: "rotate-[14deg] scale-[1.35] object-left",
    },
    stamps: [
      {
        word: "zentralBeheiztAlt",
        className: "right-[28%] bottom-36 w-28 rotate-[10deg] md:w-36",
      },
      {
        word: "ersterStock",
        className: "right-[16%] bottom-20 w-[5.25rem] -rotate-[9deg] md:w-24",
      },
      {
        word: "keller",
        className: "-bottom-1 left-[42%] w-16 rotate-[17deg] md:left-[52%] md:w-20",
      },
    ],
  },
  "international-school-of-tanganyika-classroom-blocks-d-e": {
    sketch: {
      src: `${PAPERS}/alt-obergeschoss--plan-line.webp`,
      fade: "up",
      className: "right-0 bottom-[-2.5rem] h-[20rem] w-[70%] md:h-[24rem] md:w-[46%]",
      imageClassName: "-rotate-[12deg] scale-[1.4] object-[30%_40%]",
    },
    stamps: [
      {
        word: "strassenansicht",
        className: "-right-12 bottom-24 w-32 rotate-[7deg] md:w-40",
      },
      {
        word: "erdgeschossAlt",
        className: "bottom-4 left-[40%] w-[5.5rem] -rotate-[13deg] md:w-28",
      },
    ],
  },
  "analytical-fingerprint-laboratory-rehabilitation": {
    sketch: {
      src: `${PAPERS}/alt-erdgeschoss--plan-line.webp`,
      fade: "right",
      className: "-right-8 bottom-[-1rem] h-[22rem] w-[50%] md:h-[26rem] md:w-[40%]",
      imageClassName: "rotate-[7deg] scale-[1.28] object-[45%_20%]",
    },
    stamps: [
      {
        word: "schnittAb",
        className: "right-[5%] bottom-28 w-[5.75rem] -rotate-[6deg] md:w-28",
      },
      {
        word: "mansarde",
        className: "-right-7 bottom-12 w-[5.5rem] rotate-[14deg] md:w-28",
      },
    ],
  },
  "house-on-chake-chake-road": {
    sketch: {
      src: `${PAPERS}/bereiche--flaechen-tabelle-line.webp`,
      fade: "inset",
      className: "-right-8 bottom-4 h-[20rem] w-[50%] md:h-[24rem] md:w-[36%]",
      imageClassName: "rotate-[28deg] scale-[1.6] object-center",
    },
    stamps: [
      {
        word: "hofansicht",
        className: "-right-8 bottom-32 w-[5.75rem] rotate-[16deg] md:w-28",
      },
      {
        word: "dachfenster",
        className: "bottom-8 left-[46%] w-[4.75rem] -rotate-[10deg] md:w-24",
      },
    ],
  },
  "ministry-of-foreign-affairs-office": {
    sketch: {
      src: `${PAPERS}/hofansicht--haus-line.webp`,
      fade: "left",
      className: "-right-16 bottom-[-1rem] h-[24rem] w-[58%] md:h-[28rem] md:w-[44%]",
      imageClassName: "-rotate-[14deg] scale-[1.5] object-top",
    },
    stamps: [
      {
        word: "fassadeDolomit",
        className: "-right-14 bottom-24 w-40 rotate-[8deg] md:w-52",
      },
      {
        word: "kellerAlt",
        className: "bottom-6 left-[50%] w-16 -rotate-[15deg] md:w-20",
      },
    ],
  },
  "bugando-medical-centre-theatre-block": {
    sketch: {
      src: `${PAPERS}/schnitt-a-b--schnitt-line.webp`,
      fade: "up",
      className: "-right-8 bottom-[-2rem] h-[22rem] w-[58%] md:h-[26rem] md:w-[44%]",
      imageClassName: "rotate-[20deg] scale-[1.38] object-right",
    },
    stamps: [
      {
        word: "zentralBeheizt",
        className: "-right-10 bottom-28 w-[6.5rem] -rotate-[8deg] md:w-32",
      },
      {
        word: "obergeschoss",
        className: "bottom-5 left-[44%] w-[5.75rem] rotate-[11deg] md:left-[54%] md:w-28",
      },
    ],
  },
  "aga-khan-hospital": {
    sketch: {
      src: `${PAPERS}/neu-erdgeschoss--plan-line.webp`,
      fade: "right",
      className: "-right-10 bottom-[-1rem] h-[24rem] w-[52%] md:h-[28rem] md:w-[40%]",
      imageClassName: "-rotate-[10deg] scale-[1.32] object-bottom",
    },
    stamps: [
      {
        word: "schnittCd",
        className: "right-[10%] bottom-32 w-[5.75rem] rotate-[14deg] md:w-28",
      },
      {
        word: "mansarde",
        className: "-right-8 bottom-16 w-[5.5rem] -rotate-[6deg] md:w-28",
      },
    ],
  },
  "new-ccbrt-maternity-hospital": {
    sketch: {
      src: `${PAPERS}/strassenansicht--haus-line.webp`,
      fade: "diag",
      className: "-right-12 bottom-0 h-[22rem] w-[52%] md:h-[26rem] md:w-[38%]",
      imageClassName: "rotate-[8deg] scale-[1.42] object-left",
    },
    stamps: [
      {
        word: "ersterStock",
        className: "-right-8 bottom-28 w-[5.25rem] -rotate-[11deg] md:w-24",
      },
      {
        word: "keller",
        className: "bottom-8 left-[48%] w-16 rotate-[17deg] md:w-20",
      },
    ],
  },
  "bank-m-headquarters": {
    sketch: {
      src: `${PAPERS}/neu-obergeschoss--plan-line.webp`,
      fade: "inset",
      className: "-right-8 bottom-[-2.5rem] h-[22rem] w-[56%] md:h-[26rem] md:w-[42%]",
      imageClassName: "rotate-[26deg] scale-[1.5] object-[60%_40%]",
    },
    stamps: [
      {
        word: "erdgeschossAlt",
        className: "right-[14%] bottom-32 w-[5.75rem] rotate-[5deg] md:w-28",
      },
      {
        word: "strassenansicht",
        className: "-right-10 bottom-7 w-32 -rotate-[16deg] md:w-40",
      },
    ],
  },
};

export function getChrome(slug: string): WorkDetailsChrome {
  return CHROME[slug] ?? FALLBACK;
}
