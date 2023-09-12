import { Randomizer } from "@/app/wheel/Randomizer/Randomizer";

export default function WheelPage() {
  return (
    <div className="p-12 flex justify-center flex-col gap-4">
      <div className="w-[400px] h-[400px]">
        <Randomizer></Randomizer>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <polygon points="50,5 95,95 5,95" fill="white" stroke="black" strokeWidth="10" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"  viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="white" stroke="black" strokeWidth="10" />
      </svg>
    </div>
  );
}
