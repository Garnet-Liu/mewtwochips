import { Photo } from "@/app/(protected)/photos/libs/components";
import { BaseModal } from "@/app/@modal/libs/components/base-modal";
import { getPhotoDetail } from "@/app/(protected)/photos/libs/services";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function PhotoModal({ params }: Readonly<IProps>) {
  const { id } = await params;

  const photo = await getPhotoDetail(id);

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
