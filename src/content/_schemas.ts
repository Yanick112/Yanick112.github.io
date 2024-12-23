import { z } from "astro:content";

export const blogSchema = z
  .object({
    author: z.string().optional(),
    pubDatetime: z.date(),
    modDatetime: z.date().optional(),
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
