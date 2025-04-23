export function toScreamingSnakeCase(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // 在小写字母或数字与大写字母之间插入下划线
    .replace(/[\s\-]+/g, "_") // 将空格或连字符替换为下划线
    .toUpperCase(); // 转换为大写
}
