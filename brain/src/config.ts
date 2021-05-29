import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(process.cwd(), `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`),
});

export const port = process.env.PORT || 9000;
export const db = { name: process.env.db || "./res/db.json" };
