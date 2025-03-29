import { Hono } from "hono";
import { db } from "@/lib/prisma";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";


const app = new Hono()
    .post("/create",clerkMiddleware(),zValidator(
        "json",
        z.object({

            url : z.string().url(),
            title : z.string(),
            description : z.string(),
            faviconPath : z.string().optional()

        })
    ),

    async(ctx) =>{

        const auth = getAuth(ctx);
        const values = ctx.req.valid("json");

        if(!auth?.userId){
            return ctx.json({error:"Unauthorized"},401);
        }

        const data = await db.hero_section.create({
            data:{
                user_id : auth.userId,
                id: createId(),
                ...values,
            }
        })


        if(!data){
            return ctx.json({error:"Error crrating "},500);
        }

        return ctx.json({data},200);
    }
)
.get("/user/:username",async(ctx)=>{

    const username = ctx.req.param("username");

    const user = await db.users.findUnique({
        where: { username },
        select: { id: true },
      });

      if (!user) {
        return ctx.json({ error: "User not found" }, 404);
      }

    const hero = await db.hero_section.findMany({
        where:{user_id: user.id},
        select: {
            id: true,
            url: true,
            title: true,
            description: true,
            faviconPath: true
        }
    })

    if(!hero){
        return ctx.json({error : "Error fetching"},500)
    }

    return ctx.json({hero});

})
.delete("/delete/:id", clerkMiddleware(), async (ctx) =>{
    const auth = getAuth(ctx);
    if (!auth || !auth.userId) {
      return ctx.json({ error: "Unauthorized" }, 401);
    }
    
    const response = await db.hero_section.delete({
      where: { id: ctx.req.param("id") },
    }); 
    if(response){
        return ctx.json({ success: true });
    }
      return ctx.json({ error: "Internal Server Error" }, 500);
    
  }
   
)





export default app