import morgan from "morgan";
import { Request, Response } from "express";
import log from "./log";

const stream = { write: (msg: string) => log.http(msg.slice(0, -1)) };
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

morgan.token("body", (req: Request, res: Response) => JSON.stringify(req.body));

const morganMiddleware = morgan(
  ":method :url :status :body :res[content-length] - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
