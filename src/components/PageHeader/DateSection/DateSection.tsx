interface IDateSectionProps {
  date: string;
}

export function DateSection({ date }: IDateSectionProps) {
  return <div className="px-3">{date ? date : "Can not request!"}</div>;
}
