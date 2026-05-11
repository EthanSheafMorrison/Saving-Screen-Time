import React from "react";

// Colour palette — brand vars only
const _ = null;
const B = "#050505"; // black
const R = "#ff0000"; // red
const W = "#ffffff"; // white
const Y = "#E7FF00"; // yellow
const U = "#0F29EC"; // blue
const G = "#CFCCD3"; // grey (brand white)
const O = "#ff8800"; // orange fuse spark

const PIXEL = 7;

type Grid = (string | null)[][];

function Sprite({ pixels }: { pixels: Grid }) {
  const h = pixels.length;
  const w = Math.max(...pixels.map((r) => r.length));
  return (
    <svg
      width={w * PIXEL}
      height={h * PIXEL}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated", display: "block" }}
      aria-hidden
    >
      {pixels.flatMap((row, y) =>
        row.map((color, x) =>
          color ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
          ) : null
        )
      )}
    </svg>
  );
}

// ── DEFACER — angry red bomb, white fuse, on black bg ──────────────
const defacerPixels: Grid = [
  [_,_,_,_,O,_,_,_], // orange spark
  [_,_,_,_,W,_,_,_], // fuse
  [_,_,_,W,W,_,_,_], // fuse bend
  [_,_,R,R,R,R,_,_], // head top
  [_,R,R,R,R,R,R,_],
  [R,R,W,B,R,W,B,R], // eyes (white socket, black pupil)
  [R,R,R,R,R,R,R,R],
  [R,W,R,R,R,R,W,R], // angry brows
  [R,R,W,W,W,W,R,R], // grimace teeth
  [_,R,R,R,R,R,R,_],
  [_,_,R,R,R,R,_,_],
];

// ── FORTUNE — glowing yellow orb, on red bg ────────────────────────
const fortunePixels: Grid = [
  [_,_,Y,Y,Y,Y,_,_],
  [_,Y,Y,Y,Y,Y,Y,_],
  [Y,Y,W,Y,Y,Y,Y,Y], // shine spot
  [Y,Y,Y,Y,Y,Y,Y,Y],
  [Y,Y,B,B,Y,B,B,Y], // eyes
  [Y,Y,Y,Y,Y,Y,Y,Y],
  [Y,Y,Y,B,B,Y,Y,Y], // smile
  [_,Y,Y,Y,Y,Y,Y,_],
  [_,_,Y,Y,Y,Y,_,_],
  [_,_,W,W,W,W,_,_], // pedestal
];

// ── HOROSCOPE — blue wizard on yellow bg ───────────────────────────
const horoscopePixels: Grid = [
  [_,_,_,_,U,_,_,_], // hat tip
  [_,_,_,Y,U,U,_,_], // yellow star on hat
  [_,_,U,U,U,U,U,_],
  [_,_,U,U,U,U,U,_],
  [U,U,U,U,U,U,U,U], // wide hat brim
  [_,_,G,G,G,G,_,_], // face
  [_,G,G,B,_,G,G,_], // eyes
  [_,G,G,G,G,G,G,_],
  [_,G,_,B,B,_,G,_], // smile
  [_,_,U,U,U,U,_,_], // collar
  [_,U,U,U,U,U,U,_], // robe
  [U,U,U,_,_,U,U,U], // robe hem
];

export function DefacerCharacter() {
  return (
    <div className="pixel-character pixel-character--defacer">
      <Sprite pixels={defacerPixels} />
    </div>
  );
}

export function FortuneCharacter() {
  return (
    <div className="pixel-character pixel-character--fortune">
      <Sprite pixels={fortunePixels} />
    </div>
  );
}

export function HoroscopeCharacter() {
  return (
    <div className="pixel-character pixel-character--horoscope">
      <Sprite pixels={horoscopePixels} />
    </div>
  );
}
