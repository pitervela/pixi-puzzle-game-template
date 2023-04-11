import { tempState, pieceArray, mousePosition } from "../constants";
import { app } from "./Scene";

export function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.isDragging = true;
  tempState.piece = this.clone();
  // mousePosition.x = this.data.getLocalPosition(this.parent).x;
  // mousePosition.y = this.data.getLocalPosition(this.parent).y;
}

export function onDragMove(event) {
  if (this.isDragging) {
    // console.log(mousePosition);
    const newPosition = this.data.getLocalPosition(this.parent);

    // this.position.x = mousePosition.x - newPosition.x;
    // this.position.y = mousePosition.y - newPosition.y;
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
    const nearPiecePosition = getNearestPiece(this);

    if (nearPiecePosition && tempState.avaiable == false) {
      tempState.piece.alpha = 0.15;
      tempState.piece.position.x = nearPiecePosition.x + 50;
      tempState.piece.position.y = nearPiecePosition.y;
      app.stage.addChild(tempState.piece);
      tempState.avaiable = true;
    }
    if (nearPiecePosition === undefined && tempState.avaiable == true) {
      tempState.avaiable = false;
      app.stage.removeChild(tempState.piece);
    }
  }
}

export function onDragEnd(event) {
  this.isDragging = false;
  this.alpha = 1;
  this.data = null;
  if (tempState.avaiable) {
    this.position.x = tempState.piece.position.x;
    this.position.y = tempState.piece.position.y;
    tempState.avaiable = false;
    app.stage.removeChild(tempState.piece);
  }
}

function getNearestPiece(piece) {
  let nearest;
  pieceArray.every((object, index) => {
    if (piece.type !== object.type) return true;
    if (piece.index === index) return true;

    if (
      Math.abs(object.position.x - piece.position.x) < 100 &&
      Math.abs(object.position.y - piece.position.y) < 200
    ) {
      nearest = { x: object.position.x, y: object.position.y };
      return false;
    }

    return true;
  });
  return nearest;
}
