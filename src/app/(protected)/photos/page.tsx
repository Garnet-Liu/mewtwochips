import Image from "next/image";
import Link from "next/link";

import { getPhotoList } from "@/services/photo-data";
import { PageHeader } from "@/components/page-header";

export default async function Page() {
  try {
    const photos = await getPhotoList();

    return (
      <main className="max-width mx-auto">
        <PageHeader pageTitle="Photos" backRoute="/" />

        <div className="m-10 grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
  } catch (e) {
    console.error("Failed to fetch photo: ", e);
    return <div>没找到</div>;
  }
}
