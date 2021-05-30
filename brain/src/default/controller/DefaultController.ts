import { NextFunction, Request, Response } from "express";
export function defaultAction(req: Request, res: Response, next: NextFunction) {
  res.send("<H1>Server is running...</H1>");
}
