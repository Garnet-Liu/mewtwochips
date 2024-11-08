import Image from "next/image";

import { IPhoto } from "@/app/(protected)/photos/libs/services";

interface IProps {
  photo: IPhoto;
}

export function Photo({ photo }: IProps) {
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
