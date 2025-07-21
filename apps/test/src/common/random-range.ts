export const randomRange = (min: number, max: number) => {
  min = Math.ceil(min); // 向上取整，确保范围包含最小值
  max = Math.floor(max); // 向下取整，确保范围包含最大值
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
