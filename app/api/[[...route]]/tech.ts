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
        try {
            const tech = await db.tech.create({
                data: {
                    ...values
                }
            });
            return ctx.json({ tech });
        } catch (error) {
            console.error("Error creating tech:", error);
            return ctx.json({ error: "Internal Server Error." }, 500);
        }
    })



export default app;