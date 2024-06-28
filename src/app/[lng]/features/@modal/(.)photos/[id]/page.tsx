import { BaseModal, getPhotoDetail, Photo } from "@/app/[lng]/features/libs";

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
