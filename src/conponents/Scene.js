import * as PIXI from "pixi.js";

export const app = new PIXI.Application({
  view: document.querySelector("canvas"),
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  autoDensity: true,
  backgroundColor: 0xbbbbbb,
  resolution: devicePixelRatio,
});

const onResize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onResize);
