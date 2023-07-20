interface IDateSectionProps {
  date: string;
}

export default function DateSection({ date }: IDateSectionProps) {
  return (
    <div className="px-3">{date}</div>
  );
}
