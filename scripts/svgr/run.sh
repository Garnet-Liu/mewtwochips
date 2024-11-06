#!/bin/bash

# SVG 文件所在的目录
INPUT_DIR="./originalSvgs"       # 请修改为你的 SVG 文件目录
INDEX_DIR="./svgrComponents"       # 请修改为你的 SVG 文件目录
OUTPUT_DIR="../../src/components/Svgs/" # 输出组件的目录
INDEX_TEMPLATE="../../src/components/Svgs/index.ts" # 自定义 index 模板

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 遍历所有 SVG 文件
for file in "$INPUT_DIR"/*.svg; do
  # 获取文件名（不带路径和扩展名）
  filename=$(basename "$file" .svg)

  # 将 filename 首字母大写
  capitalized_filename="$(echo "$filename" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')"

  # 创建文件夹，以首字母大写的文件名为名称
  mkdir -p "$OUTPUT_DIR/$capitalized_filename"

  # 将原始 SVG 文件复制到新文件夹
  cp "$file" "$OUTPUT_DIR/$capitalized_filename/$capitalized_filename.svg"

  # 使用 svgr 转换为 React 组件并输出到新文件夹
  npx @svgr/cli "$file" --out-dir "$OUTPUT_DIR/$capitalized_filename" --icon --typescript
done

# 生成index.js文件
npx @svgr/cli "$INPUT_DIR" --out-dir "$INDEX_DIR" --no-dimensions --typescript --index-template ./svgrIndexTemplate.js

echo "复制index文件到 $OUTPUT_DIR"
cp "$INDEX_DIR/index.ts" "$OUTPUT_DIR"
find $INDEX_DIR -name "*.ts" -type f -delete
find $INDEX_DIR -name "*.tsx" -type f -delete
find $INPUT_DIR -name "*.svg" -type f -delete

echo "SVG 转换完成！所有组件已生成到 $OUTPUT_DIR 目录中，并创建了 index.js 文件。"
