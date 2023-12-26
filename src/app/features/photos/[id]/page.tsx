import Photo from "@/app/features/components/Photo/Photo";
import { PageHeader } from "@/app/features/components/PageHeader/PageHeader";
import { getPhotoDetail } from "@/app/features/components/Photo/service/data.service";

interface IPageProps {
  params: { id: string };
}

export default async function Page({ params }: IPageProps) {
  const photo = await getPhotoDetail(params.id);
  if (photo) {
    return (
      <div className="container mx-auto my-10">
        <PageHeader pageTitle={photo.name} backRoute="/photos" />

        <div className="mx-auto w-1/2 border border-gray-700">
          <Photo photo={photo} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container m-10 mx-auto">
        <PageHeader pageTitle="没找到" backRoute="/photos" />
      </div>
    );
  }
}
