// 一些全局配置放在这里，其中有一些配置是用来控制一些不稳定的功能是否开启的，比如缓存，只搜索一条线上的点位等。
export const CONFIG = {
  enableCache: true, // 是否开启缓存
  pointsLimit: 20, // 每一层最多搜索节点数
  onlyInLine: false, // 是否只搜索一条线上的点位，一种优化方式。
  inlineCount: 4, // 最近多少个点位能算作
  inLineDistance: 5, // 判断点位是否在一条线上的最大距离
};

export const BOARD_SIZE = 15;

export const FIVE = 10000000;
export const BLOCK_FIVE = FIVE;
export const FOUR = 100000;
export const FOUR_FOUR = FOUR; // 双冲四
export const FOUR_THREE = FOUR; // 冲四活三
export const THREE_THREE = FOUR / 2; // 双三
export const BLOCK_FOUR = 1500;
export const THREE = 1000;
export const BLOCK_THREE = 150;
export const TWO_TWO = 200; // 双活二
export const TWO = 100;
export const BLOCK_TWO = 15;
export const ONE = 10;
export const BLOCK_ONE = 1;

export const DIRECTIONS = [
  [0, 1], // Horizontal
  [1, 0], // Vertical
  [1, 1], // Diagonal \
  [1, -1], // Diagonal /
];
