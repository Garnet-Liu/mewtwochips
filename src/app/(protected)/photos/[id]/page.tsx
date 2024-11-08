import { PageHeader } from "@/components/page-header";
import { Photo } from "@/app/(protected)/photos/libs/components";
import { getPhotoDetail } from "@/app/(protected)/photos/libs/services";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Readonly<IProps>) {
  const { id } = await params;

  const photo = await getPhotoDetail(id);

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
