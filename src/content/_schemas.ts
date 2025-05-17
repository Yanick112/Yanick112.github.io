import { z } from "astro:content";

// 自定义转换函数，将YYYY-MM格式转换为日期对象
const dateTransformer = (dateString: string | Date) => {
  if (dateString instanceof Date) return dateString;
  
  // 处理YYYY-MM格式
  if (/^\d{4}-\d{2}$/.test(dateString)) {
    return new Date(`${dateString}-01T00:00:00.000Z`);
  }
  
  // 处理其他格式的日期字符串
  return new Date(dateString);
};

export const blogSchema = z
  .object({
    author: z.string().optional(),
    pubDatetime: z.union([
      z.string().transform(dateTransformer),
      z.date()
    ]),
    modDatetime: z.union([
      z.string().transform(dateTransformer),
      z.date()
    ]).optional(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string(),
    otherSource: z
      .array(
        z.object({ href: z.string(), plat: z.string(), badge: z.string() })
      )
      .optional(),
    badge: z.array(z.string()).optional(),
  })
  .strict();



export type BlogFrontmatter = z.infer<typeof blogSchema>;
