import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

const folderToLinkPrefix = {
  weekly: "weekly",
};

export async function get() {
  const allPosts = await getCollection(
    "blog",
    (a) => a.slug.startsWith("weekly/") && !a.data.draft
  );

  const sortedPosts = allPosts
    .sort(
      (a, b) =>
        new Date(b.data.pubDatetime).getTime() -
        new Date(a.data.pubDatetime).getTime()
    )
    .slice(0, 50);

  const rssOptions = {
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    trailingSlash: false,
    items: await Promise.all(
      sortedPosts.map(async (post) => {
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
          content: sanitizeHtml((await post.render()).html, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
          }),
        };
      })
    ),
    customData: `
    <follow_challenge>
        <feedId>56969302790438912</feedId>
        <userId>44596774657862656</userId>
    </follow_challenge>
    `,
  };

  return rss(rssOptions);
}
