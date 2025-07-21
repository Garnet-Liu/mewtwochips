import { CONFIG } from "../config";

// 先入先出缓存
export class Cache<T> {
  capacity = 1000000;
  cache: bigint[] = [];
  map: Map<bigint, T> = new Map();

  // 获取一个键的值
  get(key: bigint) {
    if (!CONFIG.enableCache) {
      return undefined;
    }

    if (this.map.has(key)) {
      return this.map.get(key);
    }

    return undefined;
  }

  // 设置或插入一个值
  put(key: bigint, value: T) {
    if (!CONFIG.enableCache) return false;
    if (this.cache.length >= this.capacity) {
      const oldestKey = this.cache.shift(); // 移除最老的键
      this.map.delete(oldestKey!); // 从map中也删除它
    }

    if (!this.map.has(key)) {
      this.cache.push(key); // 将新键添加到cache数组
    }
    this.map.set(key, value); // 更新或设置键值
  }

  // 检查缓存中是否存在某个键
  has(key: bigint) {
    if (!CONFIG.enableCache) {
      return false;
    } else {
      return this.map.has(key);
    }
  }
}
