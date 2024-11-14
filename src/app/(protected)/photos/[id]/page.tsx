import { Photo } from "@/components/photos/photo";
import { PageHeader } from "@/components/page-header";
import { getPhotoDetail } from "@/services/photo-data";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Readonly<IProps>) {
  try {
    const { id } = await params;

    const photo = await getPhotoDetail(id);

    return (
      <div className="my-10">
        <PageHeader pageTitle={photo?.name} backRoute="/photos" />

        <Photo photo={photo} className="border border-gray-700" />
      </div>
    );
  } catch (e) {
    console.error("Failed to fetch photo: ", e);
    return (
      <div className="container m-10 mx-auto">
        <PageHeader pageTitle="没找到" backRoute="/photos" />
      </div>
    );
  }
}
