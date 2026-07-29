/**
 * Розділ «Меблі» (/mebli).
 *
 * ЯК ДОДАТИ ФОТО
 * 1. Прожени файли через скрипт якості:
 *      npm run photos -- ../furniture/kitchens ~/foto/kuhni/*.jpg
 *    (він покладе їх у public/projects/… — для меблів просто перенеси
 *     готові файли в public/furniture/<slug>/)
 * 2. Додай шляхи в масив photos потрібної категорії.
 *
 * Порядок у масиві = порядок показу. Щоб переставити фото — переставте рядки.
 * Щоб додати категорію — додайте об'єкт у масив нижче. Дизайн міняти не треба.
 */

export type FurniturePhoto = {
  src: string;
  /**
   * Реальні розміри кадру в пікселях. Галерея вирівнює фото по висоті ряду
   * і рахує ширину з цих чисел, тому нічого не обрізається — ані вертикальні
   * кадри з телефона, ані широкі загальні плани.
   */
  w: number;
  h: number;
};

export type FurnitureCategory = {
  slug: string;
  title: string;
  photos: FurniturePhoto[];
  /** Скільки заглушок показати, поки немає фото. */
  placeholders?: number;
};

export const furnitureHero = {
  eyebrow: "Власне виробництво",
  title: "Меблі",
  lead: "Індивідуальні меблі, створені саме під ваш простір.",
};

export const furnitureCategories: FurnitureCategory[] = [
  {
    slug: "kitchens",
    title: "Кухні",
    photos: [
      { src: "/furniture/kitchens/01-walnut-island.jpg", w: 960, h: 1280 },
      { src: "/furniture/kitchens/02-walnut-herringbone.jpg", w: 519, h: 1152 },
      { src: "/furniture/kitchens/03-walnut-gloss.jpg", w: 1179, h: 1548 },
      { src: "/furniture/kitchens/04-oak-graphite.jpg", w: 577, h: 1280 },
      { src: "/furniture/kitchens/05-oak-corner.jpg", w: 1920, h: 2560 },
      { src: "/furniture/kitchens/06-oak-white-dining.jpg", w: 1280, h: 577 },
      { src: "/furniture/kitchens/07-beige-general.jpg", w: 1920, h: 2560 },
      { src: "/furniture/kitchens/08-beige-detail.jpg", w: 1920, h: 2560 },
      { src: "/furniture/kitchens/09-white-minimal.jpg", w: 576, h: 1280 },
      { src: "/furniture/kitchens/10-white-marble.jpg", w: 960, h: 1280 },
      { src: "/furniture/kitchens/11-white-gloss.jpg", w: 1280, h: 960 },
      { src: "/furniture/kitchens/12-white-brick.jpg", w: 1280, h: 577 },
      { src: "/furniture/kitchens/13-rose-line.jpg", w: 720, h: 1280 },
      { src: "/furniture/kitchens/14-rose-island.jpg", w: 960, h: 1280 },
      { src: "/furniture/kitchens/15-black-coral.jpg", w: 1280, h: 720 },
      { src: "/furniture/kitchens/16-steel-grill.jpg", w: 577, h: 1280 },
      { src: "/furniture/kitchens/17-dining-teal.jpg", w: 607, h: 1280 },
      { src: "/furniture/kitchens/18-wood-ceiling.jpg", w: 577, h: 1280 },
      { src: "/furniture/kitchens/19-glass-partition.jpg", w: 577, h: 1280 },
      { src: "/furniture/kitchens/20-mirror-wall.jpg", w: 577, h: 1280 },
    ],
  },
  {
    slug: "wardrobes",
    title: "Гардеробні / Шафи",
    photos: [
      { src: "/furniture/wardrobes/01-dark-glass-dressing.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/02-glass-display.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/03-dark-dressing-mirror.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/04-black-system.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/05-oak-walkin.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/06-light-walkin-bedroom.jpg", w: 960, h: 1280 },
      { src: "/furniture/wardrobes/07-grey-interior.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/08-hidden-door.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/09-beige-minimal.jpg", w: 720, h: 1280 },
      { src: "/furniture/wardrobes/10-walnut-wardrobe.jpg", w: 1350, h: 1800 },
      { src: "/furniture/wardrobes/11-mirror-doors.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/12-terracotta-slats.jpg", w: 900, h: 1600 },
      { src: "/furniture/wardrobes/13-hall-gloss-oak.jpg", w: 960, h: 1280 },
      { src: "/furniture/wardrobes/14-hall-taupe-niche.jpg", w: 900, h: 1600 },
      { src: "/furniture/wardrobes/15-hall-black-mirror.jpg", w: 960, h: 1280 },
      { src: "/furniture/wardrobes/16-hall-graphite.jpg", w: 1153, h: 2560 },
      { src: "/furniture/wardrobes/17-hall-slats-mirror.jpg", w: 1079, h: 1534 },
    ],
  },
  {
    slug: "kids",
    title: "Дитячі",
    photos: [
      { src: "/furniture/kids/01-loft-bed-cloud.jpg", w: 1920, h: 2560 },
      { src: "/furniture/kids/02-room-rose-ceiling.jpg", w: 720, h: 1280 },
      { src: "/furniture/kids/03-window-desk-light.jpg", w: 1920, h: 2560 },
      { src: "/furniture/kids/04-window-desk-angle.jpg", w: 720, h: 1280 },
      { src: "/furniture/kids/05-teen-oak-graphite.jpg", w: 1280, h: 607 },
      { src: "/furniture/kids/06-storage-vanity-corner.jpg", w: 960, h: 1280 },
      { src: "/furniture/kids/07-desk-rose-drawers.jpg", w: 960, h: 1280 },
      { src: "/furniture/kids/08-house-niche-lit.jpg", w: 1920, h: 2560 },
      { src: "/furniture/kids/09-bunny-vanity.jpg", w: 1920, h: 2560 },
      { src: "/furniture/kids/10-shelf-led-detail.jpg", w: 577, h: 1280 },
      // Кадр із тумбою прибраний із показу: на ньому видно дроти й роутер,
      // і це радше вітальня, ніж дитяча. Файл лежить у папці — щоб повернути,
      // розкоментуйте рядок.
      // { src: "/furniture/kids/11-white-sideboard.jpg", w: 1920, h: 2560 },
    ],
  },
  {
    slug: "bathrooms",
    title: "Санвузли",
    photos: [
      { src: "/furniture/bathrooms/01-travertine-vanity.jpg", w: 1920, h: 2560 },
      { src: "/furniture/bathrooms/02-black-marble-walnut.jpg", w: 1280, h: 960 },
      { src: "/furniture/bathrooms/03-stone-oak-general.jpg", w: 1920, h: 2560 },
      { src: "/furniture/bathrooms/04-terrazzo-basin.jpg", w: 1920, h: 2560 },
      { src: "/furniture/bathrooms/05-marble-tall-unit.jpg", w: 577, h: 1280 },
      { src: "/furniture/bathrooms/06-graphite-open-storage.jpg", w: 960, h: 1280 },
      { src: "/furniture/bathrooms/07-mirror-cabinet-oak.jpg", w: 2560, h: 1920 },
      { src: "/furniture/bathrooms/08-sliding-mirror-wc.jpg", w: 1920, h: 2560 },
      { src: "/furniture/bathrooms/09-laundry-built-in.jpg", w: 577, h: 1280 },
      { src: "/furniture/bathrooms/10-travertine-detail.jpg", w: 577, h: 1280 },
    ],
  },
];
