import { Hono } from "hono";
import { db } from "@/lib/prisma";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
    .get("/",clerkMiddleware(),async(ctx)=>{
        const auth = getAuth(ctx);
        if(!auth){
            return ctx.json({error:"Unauthorized"},401)
        }
        try{
            const tags = await db.tags.findMany();
            return ctx.json({tags})
        }catch(error){
            console.error("Error fetching tags:",error);
            return ctx.json({error:"Internal Server Error"},500)
        }
    })

    .get("/user", clerkMiddleware(), async (ctx) => {
      const auth = getAuth(ctx);
      if (!auth || !auth.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }
    
      try {
        const userTags = await db.user_tags.findMany({
          where: { user_id: auth.userId },
          select: {
            tag_id: true,
            tags: {
              select: { name: true },
            },
          },
        });
    
        const tagsData = userTags.map((tag) => ({
          id: tag.tag_id,
          name: tag.tags.name,
        }));
    
        return ctx.json({ tagsData });
      } catch (error) {
        console.error("Error fetching user tags:", error);
        return ctx.json({ error: "Internal Server Error" }, 500);
      }
    })

    .post(
        "/update",
        clerkMiddleware(),
        zValidator(
          "json",
          z.array(
            z.object({
              id: z.number(),
            })
          )
        ),
        async (ctx) => {
          const auth = getAuth(ctx);
          const newTags = ctx.req.valid("json");
      
          if (!auth || !auth.userId) {
            return ctx.json({ error: "Unauthorized" }, 401);
          }
      
          
          const existingTags = await db.user_tags.findMany({
            where: { user_id: auth.userId },
            select: { tag_id: true },
          });
      
          const existingTagIds = existingTags.map((tag) => tag.tag_id);
          const newTagIds = newTags.map((tag) => tag.id);
      
          
          const tagsToDelete = existingTagIds.filter((id) => !newTagIds.includes(id));
      
          
          const tagsToInsert = newTagIds.filter((id) => !existingTagIds.includes(id));
      
          
          if (tagsToDelete.length > 0) {
            await db.user_tags.deleteMany({
              where: {
                user_id: auth.userId,
                tag_id: { in: tagsToDelete },
              },
            });
          }
      
          
          if (tagsToInsert.length > 0) {
            await db.user_tags.createMany({
              data: tagsToInsert.map((tagId) => ({
                user_id: auth.userId,
                tag_id: tagId,
              })),
            });
          }
      
          return ctx.json({ success: true });
        }
      );
      
      



export default app;