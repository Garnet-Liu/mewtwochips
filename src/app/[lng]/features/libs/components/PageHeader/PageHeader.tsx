import { Heading } from "@radix-ui/themes";

import { BackRoute } from "./BackRoute/BackRoute";
import { DateSection } from "./DateSection/DateSection";
import { baseFetchRequest } from "@/context/apiFetchRequest";

interface IPageHeaderProps {
  pageTitle: string;
  backRoute: string;
}

export async function PageHeader({ pageTitle, backRoute }: IPageHeaderProps) {
  let dateData: string = "";
  try {
    const dateResponse = await baseFetchRequest<{
      datetime: string;
    }>("https://worldtimeapi.org/api/ip");
    dateData = dateResponse.datetime;
  } catch (error) {
    console.log("fetch date failed", error);
  }
  return (
    <div className="relative flex items-center gap-3">
      <BackRoute href={backRoute} />

      <Heading className="flex-1">{pageTitle}</Heading>

      <div className="text-sm">
        <DateSection date={dateData} />
      </div>
    </div>
  );
}
