import Modal from "@/app/components/modal/modal";
import Photo from "@/app/components/photo/photo";
import { getPhotoDetail } from "@/services/data.service";

interface IPageProps {
  params: { id: string };
}

export default async function PhotoModal({ params }: IPageProps) {
  console.log("Photo Modal");
  const photo = await getPhotoDetail(params.id);

  if (photo) {
    return (
      <Modal>
        <Photo photo={photo}/>
      </Modal>
    );
  } else {
    return (
      <div>没找到</div>
    );
  }
}
