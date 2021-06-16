/*
  Example Data: Product/Category Highlights on the Home Page
  Use your own real API instead
*/
export const highlights = [
  {
    id: 0,
    slug: "lcd",
    cover: "lcd.png",
    title: "«Licensed Drug Dealers» T-Shirts",
    width: "full",
    animation: "parallax",
    layers: [
      { image: "index-parallax-1.jpg", disallow: "both", deep: 100 },
      { image: "index-parallax-2.png", deep: -500 },
      { image: "index-parallax-3.png", deep: 300 },
      { image: "index-parallax-4.png", deep: 1000 },
      { deep: 500, content: "&laquo;Licensed Drug Dealers&raquo;&trade; T-Shirts" },
    ],
  },
  {
    id: 1,
    slug: "https://dimdows.demetrey.ru/",
    cover: "dimdows.jpg",
    title: "Dimdows™",
    width: "half",
    animation: "zoom",
  },
  {
    id: 2,
    slug: "https://nsk-walk.demetrey.ru/",
    cover: "nsk-walk.jpg",
    title: "Unэстетика Ебеней",
    width: "half",
    animation: "zoom",
  },
  {
    id: 3,
    slug: "dashboards",
    cover: "dashboards.jpg",
    title: "Dashboard Templates",
    width: "fourth",
    animation: "zoom",
  },
  {
    id: 4,
    slug: "https://www.behance.net/gallery/106769331/Die-Bahn",
    cover: "bahn.jpg",
    title: "Die Bahn Streckenagent",
    width: "fourth",
    animation: "zoom",
  },
  {
    id: 5,
    slug: "https://www.behance.net/gallery/107966349/Aptekaru",
    cover: "aptekaru.jpg",
    title: "Аптека.ру",
    width: "fourth",
    animation: "zoom",
  },
  {
    id: 6,
    slug: "https://www.behance.net/gallery/108240545/By-the-Dogs",
    cover: "dogs.jpg",
    title: "На Собаках™",
    width: "fourth",
    animation: "zoom",
  },
];
