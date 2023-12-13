import Photo from "@/components/Photo/Photo";
import BaseModal from "@/components/BaseModal/BaseModal";
import { getPhotoDetail } from "@/components/Photo/service/data.service";

interface IPageProps {
  params: { id: string };
}

export default async function PhotoModal({ params }: IPageProps) {
  const photo = await getPhotoDetail(params.id);

  if (photo) {
    return (
      <BaseModal>
        <Photo photo={photo} />
      </BaseModal>
    );
  } else {
    return <div>没找到</div>;
  }
}
