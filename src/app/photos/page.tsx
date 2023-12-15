import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader/PageHeader";
import { getPhotoList } from "@/components/Photo/service/data.service";

export default async function Page() {
  const photos = await getPhotoList();
  return (
    <main className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Photos" backRoute="/" />

      <div className="m-10 grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2	 md:grid-cols-3 lg:grid-cols-3">
        {photos.map(({ id, imageSrc }) => (
          <Link key={id} href={`/photos/${id}`}>
            <Image
              alt="photo"
              src={imageSrc}
              height={500}
              width={500}
              className="aspect-square w-full object-cover"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
