import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// 推文接口定义
export interface Tweet {
  id: string;
  content: string;
  html: string;
  date: Date;
}

// 获取所有推文
export async function getAllTweets(): Promise<Tweet[]> {
  const tweetsDirectory = path.join(process.cwd(), 'src/content/tweets');
  const filenames = fs.readdirSync(tweetsDirectory);
  
  const tweetPromises = filenames.map(async (filename) => {
    const filePath = path.join(tweetsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const stats = fs.statSync(filePath);
    const { content } = matter(fileContents);
    
    const htmlContent = marked(content);
    // Await if it's a promise, otherwise use directly
    const html = typeof htmlContent === 'string' ? htmlContent : await htmlContent;
    
    return {
      id: filename.replace(/\.md$/, ''),
      content,
      html,
      date: stats.birthtime,
    };
  });
  
  const tweets = await Promise.all(tweetPromises);
  
  return tweets.sort((a, b) => b.date.getTime() - a.date.getTime());
}

// 分页获取推文
export async function getPaginatedTweets(page: number, tweetsPerPage: number = 20): Promise<{
  tweets: Tweet[];
  totalPages: number;
  currentPage: number;
}> {
  const allTweets = await getAllTweets();
  const totalPages = Math.ceil(allTweets.length / tweetsPerPage);
  // Ensure currentPage is within valid bounds, at least 1
  const currentPage = Math.max(1, Math.min(page, totalPages > 0 ? totalPages : 1)); 
  
  const startIndex = (currentPage - 1) * tweetsPerPage;
  const endIndex = startIndex + tweetsPerPage;
  const tweets = allTweets.slice(startIndex, endIndex);
  
  return {
    tweets,
    totalPages,
    currentPage,
  };
} 