interface Props {
  params: { lng: string };
}

export default async function Page(props: Props) {
  const { params } = props;
  return (
    <main className="container mx-auto my-20 flex w-full flex-1 flex-col gap-8 px-4">
      This is Upgrade tracker page.
    </main>
  );
}
