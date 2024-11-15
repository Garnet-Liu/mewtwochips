interface IProps {
  rotate: number;
  winIndex: number;
  rotateNumber: number;
}

export function Win(props: IProps) {
  const { rotate, winIndex, rotateNumber } = props;

  // 圆心坐标
  const cx = 200;
  const cy = 200;

  // 圆的半径
  const r = 192;

  const start = winIndex * rotate - 90;
  const end = start + rotate;

  console.log("大小", end - start);

  // 起始角度和结束角度（以弧度表示）
  const startAngle = (start * Math.PI) / 180; // 起始角度为30度，转换为弧度
  const endAngle = (end * Math.PI) / 180; // 结束角度为120度，转换为弧度

  // 计算起点坐标
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);

  // 计算终点坐标
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);

  // 输出起点和终点坐标
  console.log("起点坐标:", x1, y1);
  console.log("终点坐标:", x2, y2);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotateNumber}deg)` }}
      className="absolute left-0 top-0 h-full w-full"
      width="400"
      height="400"
      viewBox="0 0 400 400"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#0f77c9", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#f32a59", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <path
        d={`M200,200 L${x1},${y1} A${r},${r} 0 ${end - start > 180 ? "1" : "0"} 1 ${x2},${y2} Z`}
        fill="transparent"
        stroke="url(#gradient)"
        strokeWidth="3"
      />
    </svg>
  );
}
