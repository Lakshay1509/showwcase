import { Hono } from "hono";
import { db } from "@/lib/prisma";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
  .post(
    "/create",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        name: z.string().min(3).max(20),
      })
    ),

    async (ctx) => {
      try {
        const auth = getAuth(ctx);
        const values = ctx.req.valid("json");

        if (!auth?.userId) {
          return ctx.json({ error: "Unauthorized." }, 401);
        }

        const data = await db.groups.create({
          data: {
            user_id: auth.userId,
            id: createId(),
            ...values,
          },
        });

        return ctx.json({ data });
      } catch (error) {
        return ctx.json({ error: "Internal Server Error" }, 500);
      }
    }
  )
  
  .get("/user/:username", clerkMiddleware(), async (ctx) => {
    try {
      const username = ctx.req.param("username");

      // Fetch user by username
      const user = await db.users.findUnique({
        where: { username },
        select: { id: true },
      });

      if (!user) {
        return ctx.json({ error: "User not found" }, 404);
      }

      // Fetch user's tech groups with associated techs
      const techGroups = await db.groups.findMany({
        where: { user_id: user.id },
        include: {
          group_techs: {
            include: {
              tech: true,
            },
          },
        },
        orderBy:{
          position: 'asc'
          
        }
      });

      // Format response
      const formattedData = techGroups.map((group) => ({
        id: group.id,
        name: group.name,
        position : group.position,
        techs: group.group_techs.map((gt) => ({
          id: gt.tech.id,
          name: gt.tech.name,
          img_url: gt.tech.img_url,
        })),
      }));

      return ctx.json({ techGroups: formattedData });
    } catch (error) {
      console.error("Error fetching tech groups:", error);
      return ctx.json({ error: "Internal Server Error" }, 500);
    }
  })
  .post(
    "/update/:id",clerkMiddleware(),zValidator(
      "json",
      z.array(
        z.object({
          id: z.number(),
        })
      )
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const newTech = ctx.req.valid("json");
  
      if (!auth || !auth.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }
  
      
      const existingTags = await db.group_techs.findMany({
        where: { group_id: ctx.req.param("id") },
        select: { tech_id: true },
      });
  
      const existingTagIds = existingTags.map((tech) => tech.tech_id);
      const newTagIds = newTech.map((tech) => tech.id);
  
      
      const tagsToDelete = existingTagIds.filter((id) => !newTagIds.includes(id));
  
      
      const tagsToInsert = newTagIds.filter((id) => !existingTagIds.includes(id));
  
      
      if (tagsToDelete.length > 0) {
        await db.group_techs.deleteMany({
          where: {
            group_id: ctx.req.param("id"),
            tech_id: { in: tagsToDelete },
          },
        });
      }
  
      
      if (tagsToInsert.length > 0) {
        await db.group_techs.createMany({
          data: tagsToInsert.map((tagId) => ({
            group_id: ctx.req.param("id"),
            tech_id: tagId,
          })),
        });
      }
  
      return ctx.json({ success: true });
    }
  )
  .patch(
    "/update/:id",clerkMiddleware(),zValidator(
      "json",
      z.object({
        name: z.string().min(3).max(20),
        position : z.number()
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const values = ctx.req.valid("json");
  
      if (!auth || !auth.userId) {
        return ctx.json({ error: "Unauthorized" }, 401);
      }

      const group = await db.groups.findUnique({
        where: { id: ctx.req.param("id") },
        select: { user_id: true }, // Adjust based on your schema
      });
      
      if (!group || group.user_id !== auth.userId) {
        return ctx.json({ error: "Forbidden" }, 403);
      }
  
      await db.groups.update({
        where: { id: ctx.req.param("id") },
        data: values,
      });
  
      return ctx.json({ success: true });
    }
  )
  .delete("/delete/:id", clerkMiddleware(), async (ctx) =>{
    const auth = getAuth(ctx);
    if (!auth || !auth.userId) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }
    try{
     await db.groups.delete({
      where: { id: ctx.req.param("id") },
    });
    return ctx.json({ success: true });
     }
    catch(error){
      return ctx.json({ error: "Internal Server Error" }, 500);
    }
  }
   
)


export default app;
