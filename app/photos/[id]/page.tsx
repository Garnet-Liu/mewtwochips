import Photo from "@/app/components/photo/photo";
import { getPhotoDetail } from "@/services/data.service";
import PageHeader from "@/app/components/page-header/page-header";

interface IPageProps {
  params: { id: string };
}

export default async function Page({ params }: IPageProps) {
  const photo = await getPhotoDetail(params.id);
  const dateResponse = await fetch("https://worldtimeapi.org/api/ip");
  const dateData = await dateResponse.json();
  if (photo) {
    return (
      <div className="container mx-auto my-10">
        <PageHeader pageTitle={photo.name} backRoute="/photos" datetime={dateData?.datetime || ""}/>

        <div className="w-1/2 mx-auto border border-gray-700">
          <Photo photo={photo}/>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto m-10">
        <PageHeader pageTitle="没找到" backRoute="/photos" datetime={dateData?.datetime || ""}/>
      </div>
    );
  }
}
