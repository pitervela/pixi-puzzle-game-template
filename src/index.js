import { Graphics, Sprite } from "pixi.js";

import { app } from "./conponents/Scene";
import { onDragStart, onDragMove, onDragEnd } from "./conponents/Drag";

import { pieceArray } from "./constants";
import { ang2Rad } from "./utils/Math";

createPiece("round", 0, 100, 100);
createPiece("round", 1, 300, 100);
createPiece("square", 1, 500, 100);
function createPiece(type, boldIndex, x, y) {
  const piece = new Graphics();

  // piece.beginFill(0xff00ff, 0.85);
  // piece.drawRect(0, 0, 50, 100);

  piece.beginFill(type === "round" ? 0x0000ff : 0x00ff00);
  piece.lineStyle(2, 0xffffff, 1);

  piece.moveTo(0, 0);
  piece.lineTo(50, 0);
  piece.lineTo(50, 20);
  if (type === "round") {
    boldIndex === 0 && piece.arc(50, 40, 20, ang2Rad(-90), ang2Rad(90), true);
  }
  if (type === "square") {
    // boldIndex === 0 && piece.arc(50, 40, 20, ang2Rad(-90), ang2Rad(90), false);
  }

  piece.lineTo(50, 100);
  piece.lineTo(0, 100);
  piece.lineTo(0, 60);
  if (type === "round") {
    boldIndex === 1 && piece.arc(0, 40, 20, ang2Rad(90), ang2Rad(-90), false);
  }
  if (type === "square") {
    if (boldIndex === 1) {
      piece.lineTo(-20, 60);
      piece.lineTo(-20, 20);
      piece.lineTo(0, 20);
    }
  }

  piece.lineTo(0, 0);
  piece.endFill();

  piece.interactive = true;
  piece.position.set(x, y);

  app.stage.addChild(piece);
  piece
    .on("mousedown", onDragStart)
    .on("touchstart", onDragStart)
    .on("mouseup", onDragEnd)
    .on("mouseupoutside", onDragEnd)
    .on("touchend", onDragEnd)
    .on("touchendoutside", onDragEnd)
    .on("mousemove", onDragMove)
    .on("touchmove", onDragMove);
  piece.type = type;
  piece.index = pieceArray.length;
  pieceArray.push(piece);
}
