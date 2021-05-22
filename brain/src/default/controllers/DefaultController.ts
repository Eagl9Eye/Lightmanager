import { NextFunction, Request, Response } from "express";
export function defaultAction(req: Request, res: Response, next: NextFunction) {
  res.json({ test: "test" });
}
