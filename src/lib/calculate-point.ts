import { MouseEvent } from "react";

export const calculatePoint = (e: MouseEvent<SVGSVGElement>, svg: SVGSVGElement) => {
  const point = svg.createSVGPoint();
  point.x = e.clientX;
  point.y = e.clientY;

  // 转换成SVG坐标
  const svgCoords = point.matrixTransform(svg.getScreenCTM()?.inverse());

  // 当前所在分区编号（从 0 开始）
  const segmentX = Math.floor(svgCoords.x / 30);
  const segmentY = Math.floor(svgCoords.y / 30);
  return { x: segmentX, y: segmentY };
};

export function piecePoint(p: number) {
  return 15 + p * 30;
}
