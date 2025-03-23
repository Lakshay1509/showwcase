import { Hono } from "hono";
import * as cheerio from 'cheerio';

const app = new Hono();

app.post("/", async (c) => {
  const body = await c.req.json();
  const url = body.url;

  if (!url || !/^https?:\/\//.test(url)) {
    return c.json({ error: "Invalid URL" }, 400);
  }

  try {
    // Fetch the HTML content of the website
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch the website content");

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract metadata
    const title = $("title").text();
    const description = $('meta[name="description"]').attr("content") || "";
    
    // Get OG image
    const ogImage = $('meta[property="og:image"]').attr("content") || "";
    
    // Get favicon path
    let faviconPath =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      '/favicon.ico';
    
    // Ensure favicon URL is absolute
    if (faviconPath && !faviconPath.startsWith('http') && !faviconPath.startsWith('data:')) {
      try {
        faviconPath = new URL(faviconPath, url).href;
      } catch (error) {
        // If URL construction fails, fallback to a default path
        const urlObj = new URL(url);
        faviconPath = `${urlObj.origin}/favicon.ico`;
      }
    }

    return c.json({ title, description, ogImage, faviconPath }, 200);
  } catch (err) {
    return c.json({ err: 500});
  }
});

export default app;