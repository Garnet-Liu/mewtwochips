import { CONFIG } from "@/services/gobang/config";

/**
 * 先入先出的缓存类，缓存指定的数据格式
 */
export class Cache<T> {
  capacity = 1000000;
  map: Map<bigint, T> = new Map();

  // 获取一个键的值
  get(key: bigint) {
    if (CONFIG.enableCache) {
      return this.map.get(key);
    } else {
      return undefined;
    }
  }

  // 设置或插入一个值
  put(key: bigint, value: T) {
    if (CONFIG.enableCache) {
      this.map.set(key, value); // 更新或设置键值

      // 检查长度，超过限制时移除最早插入的键
      if (this.map.size > this.capacity) {
        const oldestKey = this.map.keys().next().value;
        this.map.delete(oldestKey!);
      }

      return true;
    } else {
      return false;
    }
  }

  // 检查缓存中是否存在某个键
  has(key: bigint) {
    if (CONFIG.enableCache) {
      return this.map.has(key);
    } else {
      return false;
    }
  }
}
