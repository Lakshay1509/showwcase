import {Hono} from "hono";
import {handle} from "hono/vercel";
import profile from "./profile";
import tags from "./tags";
import fetchMetadata from "./fetch-metadata";

export const runtime = "nodejs";
const app = new Hono().basePath("/api");


const routes = app
    .route("/profile", profile)
    .route("/tags", tags)
    .route("/fetch-metadata", fetchMetadata);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;