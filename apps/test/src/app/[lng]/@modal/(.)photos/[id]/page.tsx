import { Photo } from "@/components/photos/photo";
import { getPhotoDetail } from "@/services/photo-data";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoModal({ params }: Readonly<IProps>) {
  try {
    const { id } = await params;

    const photo = await getPhotoDetail(id);

    return <Photo photo={photo} />;
  } catch (e) {
    console.error("Failed to fetch photo: ", e);
    return <div>没找到</div>;
  }
}
