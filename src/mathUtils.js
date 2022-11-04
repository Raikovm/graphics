import { Point } from "./Point.js";

/**
 * Функция вычисление координат точки на кривой по формуле кривой Безье
 */
export const bezierSplineFormula = (t, p0, p1, p2, p3) => {
  let cX = 3 * (p1.x - p0.x),
    bX = 3 * (p2.x - p1.x) - cX,
    aX = p3.x - p0.x - cX - bX;

  let cY = 3 * (p1.y - p0.y),
    bY = 3 * (p2.y - p1.y) - cY,
    aY = p3.y - p0.y - cY - bY;

  let X = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x;
  let Y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y;

  return new Point(X, Y);
};

/**
 * Получить среднюю точку между a и b.
 */
export const getMiddlePoint = (a, b) =>
  new Point((a.x + b.x) / 2, (a.y + b.y) / 2);

/**
 * Получить точку внутри вспомогательной линии.
 */
export const getAuxPoint = (P0, P1, P2, M0, M1) => {
  const P0_P1 = Math.sqrt(Math.pow(P0.x - P1.x, 2) + Math.pow(P0.y - P1.y, 2));
  const P1_P2 = Math.sqrt(Math.pow(P1.x - P2.x, 2) + Math.pow(P1.y - P2.y, 2));
  const r = P0_P1 / (P0_P1 + P1_P2);

  return new Point(M0.x + (M1.x - M0.x) * r, M0.y + (M1.y - M0.y) * r);
};

/**
 * Получить крайнюю вспомогательную точку.
 */
export const getBorderAuxPoint = (startPoint, auxPoint) => {
  const X = (startPoint.x + auxPoint.x) / 2;
  const Y = (startPoint.y + auxPoint.y) / 2;

  return new Point(X, Y);
};
