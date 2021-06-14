import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(process.cwd(), `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`),
});

export const port = process.env.PORT || 9000;
export const host = process.env.HOST || "http://localhost";
export const db = { name: process.env.DB_PATH || "./res/db.json" };
export const defaultPrefix = "Marker";
