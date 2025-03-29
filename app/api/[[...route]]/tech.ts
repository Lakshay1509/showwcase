import { Hono } from "hono";
import { db } from "@/lib/prisma";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";


const app = new Hono()
    .post("/",clerkMiddleware(), zValidator(
        "json",
        z.object({
            name: z.string(),
            img_url : z.string().optional(),

        })
    ),
    async (ctx) => {
        const auth = getAuth(ctx);
        const values = ctx.req.valid("json");
        if (!auth) {
            return ctx.json({ error: "Unauthorized." }, 401);
        }
        
        const tech = await db.tech.create({
                data: {
                    ...values
                }
    });

        if (tech) {
            return ctx.json({ tech });
        }

        
        return ctx.json({ error: "Error creating tech" }, 500);
        
    })
    .get("/",clerkMiddleware(),async(ctx)=>{

        const auth = getAuth(ctx);

        if(!auth){
            return ctx.json({error:"Unauthorized"},401)
        }

        try{
            const techs = await db.tech.findMany();
            return ctx.json({techs})
        }
        catch(error){
            return ctx.json({error:"Internal Server Error"},500)
        }

    })



export default app;