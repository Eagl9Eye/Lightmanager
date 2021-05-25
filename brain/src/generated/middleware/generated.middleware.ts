import { Request, Response, NextFunction } from "express";
import log from "../../util/log";

export async function validateActuatorName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.id <= 64 && req.body.id >= 0) next();
  else res.sendStatus(406);
}
export async function validateCommandName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // typ,get,uri,192.168.178.74/cm?cmnd=Power2%20On
  // 192.168.178.74/cm?cmnd=Power2 On
  if (req.body.id <= 64 && req.body.id >= 0) next();
  else res.sendStatus(406);
}
export async function validateConfiguration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.header("Content-Type").match("application/xml")) next();
  else res.sendStatus(415);
}
export async function validateZoneName(req: Request, res: Response, next: NextFunction) {
  if (true) next();
  else res.sendStatus(404);
}
export async function extractZoneName(req: Request, res: Response, next: NextFunction) {
  req.body.zone = req.params.zoneName || "";
  next();
}
export async function extractActuatorName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.actuator = req.params.actuatorName || "";
  next();
}
