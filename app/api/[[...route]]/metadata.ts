import { Hono } from "hono";
import * as cheerio from 'cheerio';
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
  .post("/", clerkMiddleware(),zValidator(
    "json",
    z.object({
      url: z.string().url(),
    })
  ), async (c) => {

  const auth = getAuth(c);
  if (!auth) {
    return c.json({ error: "Unauthorized." }, 401);
  }
  const values = c.req.valid("json");
  const url = values.url;

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
    
    // Get website name
    let websiteName = $('meta[property="og:site_name"]').attr("content") || 
                      $('meta[name="application-name"]').attr("content");
    
    // If no metadata name found, extract from hostname
    if (!websiteName) {
      const hostname = new URL(url).hostname.replace(/^www\./, '');
      // Get the domain name without the TLD
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        websiteName = parts[parts.length - 2]; // Take the second-to-last part (e.g., "shadcn" from "ui.shadcn.com")
        // Capitalize first letter
        websiteName = websiteName.charAt(0).toUpperCase() + websiteName.slice(1);
      } else {
        websiteName = hostname;
      }
    }
    
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

    return c.json({ title, description, ogImage, faviconPath, websiteName }, 200);
  } catch (err) {
    return c.json({ err: 500});
  }
});

export default app;