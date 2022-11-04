import { bezierSplineFormula } from "./mathUtils.js";

/**
 * Очистить canvas.
 */
export const clearCanvas = (context, canvas) =>
  context.clearRect(0, 0, canvas.width, canvas.height);

/**
 * Нарисовать точку.
 */
export const drawPoint = (point, context, color, width) => {
  context.fillStyle = color;
  if (width === undefined) {
    width = 7;
  }
  context.fillRect(point.x - width / 2, point.y - width / 2, width, width);
};

/**
 * Нарисовать кривую Безье.
 */
export const drawBezierLine = (p0, p1, p2, p3, accuracy, context) => {
  for (let i = 0; i < 1; i += accuracy) {
    let point = bezierSplineFormula(i, p0, p1, p2, p3);
    drawPoint(point, context, "#000000", 3);
  }
};
