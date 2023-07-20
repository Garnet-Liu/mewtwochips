export default function Clan({ params }: { params: { tag: string } }) {
  console.log("params tag", decodeURIComponent(params.tag));
  return (
    <div className="w-[1200px] mx-auto">
      Clan
    </div>
  );
}
