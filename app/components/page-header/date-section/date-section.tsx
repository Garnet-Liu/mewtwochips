interface IDateSectionProps {
  date: string;
}

export default function DateSection({ date }: IDateSectionProps) {
  return (
    <div>{date}</div>
  );
}
