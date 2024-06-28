import Image from "next/image";

import { IPhoto } from "./service/data.service";

interface IPhotoProps {
  photo: IPhoto;
}

export function Photo({ photo }: IPhotoProps) {
  return (
    <>
      <Image
        alt="photo"
        src={photo.imageSrc}
        height={600}
        width={600}
        className="col-span-2 aspect-square w-full object-cover"
      />

      <div className="bg-white p-4 px-6 text-black">
        <h3>{photo.name}</h3>
        <p>Taken by {photo.username}</p>
      </div>
    </>
  );
}
