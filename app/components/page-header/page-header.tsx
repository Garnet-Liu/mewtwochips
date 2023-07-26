import BackRoute from "@/app/components/page-header/back-route/back-route";
import DateSection from "@/app/components/page-header/date-section/date-section";

interface IPageHeaderProps {
  pageTitle: string;
  backRoute: string;
}

export default async function PageHeader({ pageTitle, backRoute }: IPageHeaderProps) {
  console.log("PageHeader");
  let dateData: string = "";
  try {
    const dateResponse = await fetch("https://worldtimeapi.org/api/ip");
    dateData = (await dateResponse.json()).datetime;
  } catch (error) {
    console.log("fetch date failed", error);
  }
  return (
    <div className="p-10 relative">
      <div className="absolute left-0 top-1/2 translate-y-[-50%]">
        <BackRoute href={backRoute}/>
      </div>

      <p className="text-center text-4xl font-bold">{pageTitle}</p>

      <div className="absolute right-0 top-1/2 translate-y-[-50%]">
        <DateSection date={dateData}/>
      </div>
    </div>
  );
}
