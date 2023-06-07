import Image from "next/image";

import { IPhoto } from "@/services/data.service";

interface IPhotoProps {
  photo: IPhoto;
}

export default function Photo({ photo }: IPhotoProps) {
  console.log("Photo", photo);
  return (
    <>
      <Image
        alt=""
        src={photo.imageSrc}
        height={600}
        width={600}
        className="w-full object-cover aspect-square col-span-2"
      />

      <div className="bg-white text-black p-4 px-6">
        <h3>{photo.name}</h3>
        <p>Taken by {photo.username}</p>
      </div>
    </>
  );
}
