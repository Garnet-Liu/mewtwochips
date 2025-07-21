import { CONFIG } from "../config";
// 坐标转换函数
export const position2Coordinate = (position: number, size: number) => {
  return [Math.floor(position / size), position % size];
};

export const coordinate2Position = (x: number, y: number, size: number) => {
  return x * size + y;
};

// a和b是否在一条直线上，且距离小于maxDistance
export const isLine = (a: number, b: number, size: number) => {
  const maxDistance = CONFIG.inLineDistance;
  const [x1, y1] = position2Coordinate(a, size);
  const [x2, y2] = position2Coordinate(b, size);
  return (
    (x1 === x2 && Math.abs(y1 - y1) < maxDistance) ||
    (y1 === y2 && Math.abs(x1 - x2) < maxDistance) ||
    (Math.abs(x1 - x2) === Math.abs(y1 - y2) && Math.abs(x1 - x2) < maxDistance)
  );
};

export const isAllInLine = (p: number, arr: number[], size: number) => {
  for (let i = 0; i < arr.length; i++) {
    if (!isLine(p, arr[i], size)) {
      return false;
    }
  }
  return true;
};

export const hasInLine = (p: number, arr: number[], size: number) => {
  for (let i = 0; i < arr.length; i++) {
    if (isLine(p, arr[i], size)) {
      return true;
    }
  }
  return false;
};
