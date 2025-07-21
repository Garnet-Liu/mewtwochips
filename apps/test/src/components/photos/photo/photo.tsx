import { HTMLAttributes } from "react";
import Image from "next/image";

import { cn } from "@/common/utils";
import { Maybe } from "@/types/maybe";
import { IPhoto } from "@/services/photo-data";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  photo: Maybe<IPhoto>;
}

export function Photo(props: IProps) {
  const { photo, className } = props;
  return (
    <div className={cn("mx-auto w-[600px]", className)}>
      <div className="h-[600px] w-[600px]">
        {photo?.imageSrc ? (
          <Image
            alt="photo"
            src={photo.imageSrc}
            width={600}
            height={600}
            className="aspect-square h-[600px] w-[600px] object-cover"
          />
        ) : null}
      </div>

      <div className="`bg-background p-4 px-6">
        <h3>{photo?.name}</h3>
        <p>Taken by {photo?.username}</p>
      </div>
    </div>
  );
}
