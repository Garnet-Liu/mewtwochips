interface Props {
  size?: number;
}

export function BaseLoading(props: Props) {
  const { size = 16 } = props;
  const icon = size * 3;
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span className="material-symbols-outlined animate-spin" style={{ fontSize: `${icon}px` }}>
        refresh
      </span>

      <p style={{ fontSize: `${size}px` }}>loading...</p>
    </div>
  );
}
