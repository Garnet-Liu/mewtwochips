import BackRoute from "@/app/components/page-header/back-route/back-route";
import DateSection from "@/app/components/page-header/date-section/date-section";

interface IPageHeaderProps {
  pageTitle: string;
  backRoute: string;
  datetime: string;
}

export default function PageHeader({ pageTitle, backRoute, datetime }: IPageHeaderProps) {
  console.log("PageHeader");
  return (
    <div className="m-10 relative">
      <div className="absolute left-0 top-1/2 translate-y-[-50%]">
        <BackRoute href={backRoute}/>
      </div>

      <p className="text-center text-4xl font-bold">{pageTitle}</p>

      <div className="absolute right-0 top-1/2 translate-y-[-50%]">
        <DateSection date={datetime}/>
      </div>
    </div>
  );
}
