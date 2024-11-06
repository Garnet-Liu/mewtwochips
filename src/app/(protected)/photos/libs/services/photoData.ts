// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

const cache = new Map();

export function fetchData(url: string) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url: string) {
  if (url === "/the-beatles/albums") {
    return await getAlbums();
  } else if (url === "/the-beatles/bio") {
    return await getBio();
  } else {
    throw Error("Not implemented");
  }
}

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    console.log("getBio getBio");
    setTimeout(resolve, 1000);
  });

  return `The Beatles were an English rock band, 
    formed in Liverpool in 1960, that comprised 
    John Lennon, Paul McCartney, George Harrison 
    and Ringo Starr.`;
}

export const getPhotoDetail = async (id: string) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return photos.find((p) => p.id === id);
};

export const getPhotoList = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return photos;
};

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return [
    {
      id: 13,
      title: "Let It Be",
      year: 1970,
    },
    {
      id: 12,
      title: "Abbey Road",
      year: 1969,
    },
    {
      id: 11,
      title: "Yellow Submarine",
      year: 1969,
    },
    {
      id: 10,
      title: "The Beatles",
      year: 1968,
    },
    {
      id: 9,
      title: "Magical Mystery Tour",
      year: 1967,
    },
    {
      id: 8,
      title: "Sgt. Pepper's Lonely Hearts Club Band",
      year: 1967,
    },
    {
      id: 7,
      title: "Revolver",
      year: 1966,
    },
    {
      id: 6,
      title: "Rubber Soul",
      year: 1965,
    },
    {
      id: 5,
      title: "Help!",
      year: 1965,
    },
    {
      id: 4,
      title: "Beatles For Sale",
      year: 1964,
    },
    {
      id: 3,
      title: "A Hard Day's Night",
      year: 1964,
    },
    {
      id: 2,
      title: "With The Beatles",
      year: 1963,
    },
    {
      id: 1,
      title: "Please Please Me",
      year: 1963,
    },
  ];
}

export interface IPhoto {
  id: string;
  name: string;
  href: string;
  username: string;
  imageSrc: string;
}

const photos: IPhoto[] = [
  {
    id: "1",
    name: "Kevin Canlas",
    href: "https://twitter.com/kvncnls/status/1471832344986324998",
    username: "@kvncnls",
    imageSrc: "https://pbs.twimg.com/media/FGz_t1wXIAIFyT-?format=jpg",
  },
  {
    id: "2",
    name: "Pedro Duarte",
    href: "https://twitter.com/peduarte/status/1463897468383412231",
    username: "@peduarte",
    imageSrc: "https://pbs.twimg.com/media/FFDOtLkWYAsWjTM?format=jpg",
  },
  {
    id: "3",
    name: "Ahmad Awais",
    href: "https://twitter.com/MrAhmadAwais/status/1338151679083032577",
    username: "@MrAhmadAwais",
    imageSrc: "https://pbs.twimg.com/media/EpIR281XIAMUrEM?format=jpg",
  },
  {
    id: "4",
    name: "Leandro Soengas",
    href: "https://twitter.com/lsoengas/status/1352302741339693061",
    username: "@lsoengas",
    imageSrc: "https://pbs.twimg.com/media/EsRYK8oWMAEkObV?format=jpg",
  },
  {
    id: "5",
    name: "Samina",
    href: "https://twitter.com/saminacodes/status/1466479548837482497",
    username: "@saminacodes",
    imageSrc: "https://pbs.twimg.com/media/FFn7X76VgAEVTgs?format=jpg",
  },
  {
    id: "6",
    name: "lafond.eth",
    href: "https://twitter.com/laf0nd/status/1464640065615929346",
    username: "@laf0nd",
    imageSrc: "https://pbs.twimg.com/media/FFNyYEAXsAMdOhV?format=jpg",
  },
  {
    id: "7",
    name: "山岸和利💛",
    href: "https://twitter.com/ykzts/status/1426358452356407297",
    username: "@ykzts",
    imageSrc: "https://pbs.twimg.com/media/E8txb2yVkAQxRVw?format=jpg",
  },
  {
    id: "8",
    name: "Altngelo",
    href: "https://twitter.com/AfterDarkAngelo/status/1456372859090075648",
    username: "@AfterDarkAngelo",
    imageSrc: "https://pbs.twimg.com/media/FDYTZN1VIAAT-X1?format=jpg",
  },
  {
    id: "9",
    name: "Matias Baldanza",
    href: "https://twitter.com/matiasbaldanza/status/1404834163203715073",
    username: "@matiasbaldanza",
    imageSrc: "https://pbs.twimg.com/media/E374pyaWEAMCT2R?format=jpg",
  },
];
