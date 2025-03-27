import { Hono } from "hono";
import { db } from "@/lib/prisma";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
  .get("/:id", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    const userId = ctx.req.param("id");

    if (!auth) {
      return ctx.json({ error: "Unauthorized." }, 401);
    }

    try {
      const user = await db.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return ctx.json({ error: "User not found." }, 404);
      }

      return ctx.json({ user });
    } catch (error) {
      console.error("Error fetching user:", error);
      return ctx.json({ error: "Internal Server Error." }, 500);
    }
  })
  

  .get("/username/:username",clerkMiddleware(),async (ctx) => {
    const auth = getAuth(ctx);
    const username = ctx.req.param("username");

    if (!auth) {
      return ctx.json({ error: "Unauthorized." }, 401);
    }

    try {
      const user = await db.users.findFirst({
        where: { username },
      });

      if (!user) {
        return ctx.json({ error: "User not found." }, 404);
      }

      return ctx.json({ user });
    } catch (error) {
      console.error("Error fetching user:", error);
      return ctx.json({ error: "Internal Server Error." }, 500);
    }
  })

  .post(
    "/create",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        username: z.string().min(3).max(20),
        description: z.string().min(10).max(100),
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const values = ctx.req.valid("json");

      if (!auth?.userId) {
        return ctx.json({ error: "Unauthorized." }, 401);
      }

      try {
        const clerkResponse = await fetch(
          `https://api.clerk.com/v1/users/${auth.userId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
          }
        );

        if (!clerkResponse.ok) {
          return ctx.json(
            { error: "Failed to fetch user details from Clerk." },
            500
          );
        }

        const clerkUser = await clerkResponse.json();

        const data = await db.users.create({
          data: {
            id: auth.userId,
            email:
              clerkUser.email_addresses[0]?.email_address,
            name: clerkUser.first_name + " " + clerkUser.last_name,
            profileImageUrl: clerkUser.image_url,
            ...values,
          },
        });

        return ctx.json({ data });
      } catch (error) {
        console.error("Error creating user:", error);
        return ctx.json({ error: "Internal Server Error." }, 500);
      }
    }
  )
  .patch(
    "/update/:id",clerkMiddleware(),zValidator(
      "json",
      z.object({
        description: z.string().min(10).max(100),
        location: z.string().min(3).max(50),
      })
    ),
    async (ctx) => {
      const auth = getAuth(ctx);
      const userId = ctx.req.param("id");
      const values = ctx.req.valid("json");

      if (!auth) {
        return ctx.json({ error: "Unauthorized." }, 401);
      }

      try {
        const user = await db.users.findUnique({
          where: { id: userId },
        });

        if (!user) {
          return ctx.json({ error: "User not found." }, 404);
        }

        if (user.id !== auth.userId) {
          return ctx.json({ error: "Unauthorized." }, 401);
        }

        const data = await db.users.update({
          where: { id: userId },
          data: values,
        });

        return ctx.json({ data });
      } catch (error) {
        console.error("Error updating user:", error);
        return ctx.json({ error: "Internal Server Error." }, 500);
      }
    }
  )
  

export default app;
