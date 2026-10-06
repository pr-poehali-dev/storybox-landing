import { FAQ_ITEMS as HOME_FAQ, TARIFFS } from "@/pages/data";
import { FAQ_ITEMS as OTHERS_FAQ } from "@/pages/others/othersData";
import { FAQ_ITEMS as FATHER_DAY_FAQ } from "@/pages/fatherday/fatherDayData";
import { FAQ_ITEMS as FATHER_STORY_FAQ } from "@/pages/fatherstory/fatherStoryData";

export const SITE_URL = "https://books.mystorybox.ru";

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  image?: string;
  faq?: { q: string; a: string }[];
  index?: boolean;
}

const OG_IMAGE = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/5c696408-eaef-4a98-af3e-834659b47ae3.jpg";

export const ROUTES_SEO: RouteSeo[] = [
  {
    path: "/",
    title: "StoryBox — книга воспоминаний о вашей семье на основе интервью",
    description: `Записываем интервью с вашими близкими, собираем фотографии и создаём книгу в твёрдом переплёте. Тарифы от ${TARIFFS[TARIFFS.length - 1].price}.`,
    image: OG_IMAGE,
    faq: HOME_FAQ,
  },
  {
    path: "/index_double",
    title: "StoryBox — книга воспоминаний: рассчитайте стоимость по часам интервью",
    description: "Выберите от 3 до 25 часов интервью и сразу узнайте стоимость книги. Чем больше часов, тем дешевле каждый час. Интервью, фотографии, книга в твёрдом переплёте.",
    image: OG_IMAGE,
    faq: HOME_FAQ,
    index: false,
  },
  {
    path: "/parents",
    title: "Книга воспоминаний о родителях в подарок — StoryBox",
    description: "Уникальный подарок родителям: бережно интервьюируем маму и папу, собираем фотографии и создаём книгу об их жизни в твёрдом переплёте.",
    image: OG_IMAGE,
    faq: HOME_FAQ,
  },
  {
    path: "/others",
    title: "Книга историй о дорогом человеке от его близких — StoryBox",
    description: "Поговорим с друзьями и родными героя, соберём трогательные, смешные и неожиданные истории с фотографиями и превратим их в книгу в твёрдом переплёте.",
    image: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/1cdc8773-bd6e-414c-a803-f7fba61d2f93.jpg",
    faq: OTHERS_FAQ,
  },
  {
    path: "/den-otca",
    title: "Подарок папе на День отца 18 октября — книга о нём от близких | StoryBox",
    description: "Подарочный сертификат на книгу о папе: родные и друзья расскажут истории о нём, мы добавим фотографии и напечатаем книгу. Сертификат — сразу, к празднику.",
    image: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/7ad38aff-c1de-46fd-9709-fa175367f2ed.jpg",
    faq: FATHER_DAY_FAQ,
  },
  {
    path: "/den-otca-istoriya",
    title: "Подарок папе на День отца — книга его воспоминаний | StoryBox",
    description: "Сертификат на книгу, в которой папа сам рассказывает о своей жизни и опыте — для детей, родных и будущих внуков. Интервью, фотографии, твёрдый переплёт.",
    image: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/039e1c38-0db7-4198-b98c-8a754185909b.jpg",
    faq: FATHER_STORY_FAQ,
  },
  { path: "/legal/privacy", title: "Политика обработки персональных данных — StoryBox", description: "Политика обработки персональных данных сервиса StoryBox.", index: false },
  { path: "/legal/data-consent", title: "Согласие на обработку персональных данных — StoryBox", description: "Согласие на обработку персональных данных StoryBox.", index: false },
  { path: "/legal/offer", title: "Публичная оферта — StoryBox", description: "Публичная оферта на оказание услуг StoryBox.", index: false },
  { path: "/legal/marketing-consent", title: "Согласие на рекламные сообщения — StoryBox", description: "Согласие на получение рекламных и информационных сообщений StoryBox.", index: false },
];

export function findRouteSeo(path: string): RouteSeo | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return ROUTES_SEO.find((r) => r.path === clean);
}
