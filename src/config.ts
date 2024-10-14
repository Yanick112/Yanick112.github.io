import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.yanick.cn", // replace this with your deployed domain
  author: "Yanick",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Yanick魔法口袋",
  ogImage: "https://cdn.midjourney.com/db195e62-ec4c-46f4-ae7b-36b3998da4ad/0_3_640_N.webp?method=shortest",
  lightAndDarkMode: true,
  postPerPage: 999,
};

export const LOCALE = ["zh-CN"];

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/Yanick112",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
/*   {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },  */
];
