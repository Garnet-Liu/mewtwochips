import Link from "next/link";

import Photo from "@/app/components/photo/photo";
import { getPhotoDetail } from "@/services/data.service";

interface IPageProps {
  params: { id: string };
}

export default async function Page({ params }: IPageProps) {
  const photo = await getPhotoDetail(params.id);

  if (photo) {
    return (
      <div className="container mx-auto my-10">
        <div className="w-1/2 mx-auto border border-gray-700">
          <Link href="/photos">back to photos</Link>
          <Photo photo={photo}/>
        </div>
      </div>
    );
  } else {
    return (
      <div>没找到</div>
    );
  }
}
