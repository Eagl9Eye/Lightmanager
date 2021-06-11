import morgan from "morgan";
import { IncomingMessage, ServerResponse } from "http";
import { Request, Response } from "express";
import { logger } from "./../index";

const stream = { write: (msg: string) => logger.http(msg.slice(0, -1)) };
const skip = (req: IncomingMessage, res: ServerResponse) => {
  const env = process.env.NODE_ENV || "development";
  return req.url.includes("socket.io") || env !== "development";
};

morgan.token("body", (req: Request, res: Response) => JSON.stringify(req.body));

const morganMiddleware = morgan(
  ":remote-addr :method :url :status :body :res[content-length] :response-time ms",
  { stream, skip }
);

export default morganMiddleware;
