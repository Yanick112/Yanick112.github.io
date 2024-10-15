import rss from "@astrojs/rss";
import type { RSSOptions } from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import { SITE } from "@config";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

const folderToLinkPrefix: { [key: string]: string } = {
  weekly: "weekly",
};

export async function GET() {
  const allPosts = await getCollection(
    "blog",
    (a: CollectionEntry<"blog">) => a.slug.startsWith("weekly/") && !a.data.draft
  );

  const sortedPosts = allPosts
    .sort(
      (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
        new Date(b.data.pubDatetime).getTime() -
        new Date(a.data.pubDatetime).getTime()
    )
    .slice(0, 50);

  const rssOptions: RSSOptions = {
    title: "Yanick的魔法周刊",
    description: SITE.desc,
    site: SITE.website,
    trailingSlash: false,
    items: sortedPosts.map((post: CollectionEntry<"blog">) => {
      const slugParts = post.slug.split("/");
      const folder = slugParts[0];
      const linkPrefix = folderToLinkPrefix[folder] || folder;
      const slug = slugParts.slice(1).join("/");
      const link = `/${linkPrefix}/${slug}/`;

      return {
        link,
        title: post.data.title,
        description: post.data.description,
        pubDate: new Date(post.data.pubDatetime),
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }),
      };
    }),
    customData: `
    <image>
      <url>${SITE.website}${SITE.favicon}</url>
      <title>Yanick的魔法周刊</title>
      <link>${SITE.website}</link>
    </image>
    <follow_challenge>
      <feedId>69134443761654784</feedId>
      <userId>47967201307251712</userId>
    </follow_challenge>
    `,
  };

  const feed = await rss(rssOptions);
  return feed;
}
