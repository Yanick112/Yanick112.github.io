import kebabcase from "lodash.kebabcase";
import { slug as slugger } from "github-slugger";
import type { BlogFrontmatter } from "@content/_schemas";

const slugify = (post: BlogFrontmatter) => {
  return post.postSlug ? slugger(post.postSlug) : slugger(post.title);
};

export const slugifyStr = (str: string) => kebabcase(str);

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;