export const translateTime = (time: string) => {
  // 按空格分割，处理组合时间如 "1d 3h"
  const parts = time.split(" ");

  // 初始化秒数
  let seconds = 0;

  // 遍历所有的部分
  parts.forEach((part) => {
    // 获取时间单位的最后一个字符（s, h, d）
    const unit = part.slice(-1);
    // 获取数字部分
    const amount = parseInt(part.slice(0, -1), 10);

    switch (unit) {
      case "s": // 秒
        seconds += amount;
        break;
      case "m": // 分钟
        seconds += amount * 60;
        break;
      case "h": // 小时
        seconds += amount * 60 * 60;
        break;
      case "d": // 天
        seconds += amount * 60 * 60 * 24;
        break;
      default: // 默认不加任何秒数
        console.warn("Unknown time unit:", unit);
    }
  });

  return seconds;
};
