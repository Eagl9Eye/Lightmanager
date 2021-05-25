import { Request, Response, NextFunction } from "express";
import mappingService from "../service/mapping.service";
import fetch from "node-fetch";
import logger from "../../util/log";
const log = logger(module);

export async function validateMarker(req: Request, res: Response, next: NextFunction) {
  if (req.body.id <= 64 && req.body.id >= 0) next();
  else res.sendStatus(406);
}
export async function validateOrigin(req: Request, res: Response, next: NextFunction) {
  fetch(req.body.address)
    .then((response) => response.json())
    .then((json) => next())
    .catch((error) => res.sendStatus(404));
}
export async function validateMarkerName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (await mappingService.getByName(req.body.name)) next();
  else res.sendStatus(404);
}
export async function validateNewMarkerName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.newName) next();
  else res.sendStatus(406);
}
export async function extractMarkerId(req: Request, res: Response, next: NextFunction) {
  req.body.id = +req.params.markerId || -1;
  next();
}
export async function extractMarkerName(req: Request, res: Response, next: NextFunction) {
  req.body.name = req.params.markerName || "";
  next();
}
