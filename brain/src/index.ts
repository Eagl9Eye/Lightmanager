import express, { NextFunction, Request, Response } from "express";
import path from "path";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import xmlparser from "express-xml-bodyparser";
import cors from "cors";
import morganMiddleware from "./util/morgan.logger";
import defaultErrorMiddleware from "./default/middleware/error.middleware";
import defaultRouter from "./default/default.routes.config";
import parameterRouter from "./parameter/parameter.routes.config";
import generatedRouter from "./generated/generated.routes.config";
import logger from "./util/log";
import { Server, createServer } from "http";
import { port } from "./config";
const log = logger(module);

const app = express();
const server: Server = createServer(app);
app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(xmlparser());
app.use(express.static(path.join(__dirname, "public")));
app.use(defaultRouter);
app.use(generatedRouter);
app.use(parameterRouter);
// default route
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404));
});
// error handler
app.use(defaultErrorMiddleware);
server.listen(port, () => log.info(`Server running at http://localhost:${port}`));

module.exports = app;
