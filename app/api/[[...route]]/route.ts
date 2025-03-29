import {Hono} from "hono";
import {handle} from "hono/vercel";
import profile from "./profile";
import tags from "./tags";
import fetchMetadata from "./metadata";
import tech from "./tech";
import group from './group'
import hero from "./hero";

export const runtime = "nodejs";
const app = new Hono().basePath("/api");


const routes = app
    .route("/profile", profile)
    .route("/tags", tags)
    .route("/metadata", fetchMetadata)
    .route("/tech", tech)
    .route("/group",group)
    .route("/hero", hero);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;