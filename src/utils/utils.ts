import dayjs from "dayjs"; // 导入 dayjs 库，用于日期和时间的操作
import type { CollectionEntry } from "astro:content"; // 导入 CollectionEntry 类型，用于 Astro 内容集合条目

// 以下是注释掉的旧版本函数，使用了 MarkdownInstance 类型
// export const getSortedPostsByYear = (
//   posts: MarkdownInstance<Record<string, any>>[]
// ) => {
//   posts.sort((a, b) =>
//     b.frontmatter.pubDatetime.localeCompare(a.frontmatter.pubDatetime)
//   ); // 对文章按照 pubDatetime 字段进行降序排序
//   const map: Record<string, MarkdownInstance<Record<string, any>>[]> = {}; // 创建一个对象来存储按年份分类的文章
//   for (const p of posts) {
//     let y = dayjs(p.frontmatter.pubDatetime).format("YYYY"); // 获取文章发布的年份
//     map[y] ? map[y].push(p) : (map[y] = [p]); // 将文章添加到对应的年份数组中
//   }
//   return map; // 返回按年份分类的文章对象
// };

export const getSortedPostsByYear = (posts: CollectionEntry<"blog">[]) => {
  posts.sort(
    (a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime()
  ); // 对文章按照 pubDatetime 字段进行降序排序
  const map: Record<string, CollectionEntry<"blog">[]> = {}; // 创建一个对象来存储按年份分类的文章
  for (const p of posts) {
    const y = dayjs(p.data.pubDatetime).format("YYYY"); // 获取文章发布的年份
    map[y] ? map[y].push(p) : (map[y] = [p]); // 将文章添加到对应的年份数组中
  }
  return map; // 返回按年份分类的文章对象
};