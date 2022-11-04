import { drawPoint, drawBezierLine, clearCanvas } from "./drawUtils.js";
import { Point } from "./Point.js";
import { getAuxPoint, getMiddlePoint, getBorderAuxPoint } from "./mathUtils.js";

const mainPointsColour = "#FF0000";
const auxPointColor = "#00FF00";
const middlePointColor = "#0000FF";
const accuracy = 0.01;

/***
 * Функция отрисовки кривой.
 */
const drawSpline = (points, context) => {
  let middlePoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    drawPoint(points[i], context, mainPointsColour);
    let middlePoint = getMiddlePoint(points[i], points[i + 1]);
    middlePoints.push(middlePoint);
  }
  drawPoint(points[points.length - 1], context, mainPointsColour);
  middlePoints.forEach((x) => drawPoint(x, context, middlePointColor));

  let auxiliaryPoints = [];
  for (let i = 0; i < middlePoints.length - 1; i++) {
    const auxPoint = getAuxPoint(
      points[i],
      points[i + 1],
      points[i + 2],
      middlePoints[i],
      middlePoints[i + 1]
    );
    drawPoint(auxPoint, context, "#00FFFF");
    const difX = points[i + 1].x - auxPoint.x;
    const difY = points[i + 1].y - auxPoint.y;
    const auxPointsObj = {
      P1: new Point(middlePoints[i].x + difX, middlePoints[i].y + difY),
      P2: new Point(middlePoints[i + 1].x + difX, middlePoints[i + 1].y + difY),
    };
    auxiliaryPoints.push(auxPointsObj);
  }

  for (let points of auxiliaryPoints) {
    drawPoint(points.P1, context, auxPointColor);
    drawPoint(points.P2, context, auxPointColor);
  }

  const P1_2 = getBorderAuxPoint(points[0], auxiliaryPoints[0].P1);
  auxiliaryPoints.unshift({
    P2: P1_2,
  });
  drawPoint(P1_2, context, auxPointColor);

  const P2_1 = getBorderAuxPoint(
    points[points.length - 1],
    auxiliaryPoints[auxiliaryPoints.length - 1].P2
  );
  drawPoint(P2_1, context, auxPointColor);
  auxiliaryPoints.push({
    P1: P2_1,
  });

  console.log(auxiliaryPoints);

  for (let i = 0; i < auxiliaryPoints.length - 1; i++) {
    drawBezierLine(
      points[i],
      auxiliaryPoints[i].P2,
      auxiliaryPoints[i + 1].P1,
      points[i + 1],
      accuracy,
      context
    );
  }
};

window.onload = () => {
  let mainPoints = [];

  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  canvas.addEventListener("mousedown", (event) => {
    const point = new Point(event.offsetX, event.offsetY);
    drawPoint(point, context, mainPointsColour);
    mainPoints.push(point);

    clearCanvas(context, canvas);
    drawSpline(mainPoints, context);
  });
};
