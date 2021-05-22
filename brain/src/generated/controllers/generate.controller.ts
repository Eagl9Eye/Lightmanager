import { NextFunction, Request, Response } from "express";
import service from "../services/generate.service";
export async function listDevices(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const routes = await service.list();
  res.status(200).send(routes);
}
