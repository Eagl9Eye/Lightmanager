import { Request, Response, NextFunction } from "express";
import service from "../services/generate.service";
import log from "../../util/log";

export async function processConfiguration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // typ,get,uri,192.168.178.74/cm?cmnd=Power2%20On
  // 192.168.178.74/cm?cmnd=Power2 On
  if (req.header("Content-Type").match("application/xml")) next();
  else res.sendStatus(415);
  // processConfiguration
}

export async function processZoneName(req: Request, res: Response, next: NextFunction) {
  service.getZoneByName(req.params.zoneName || "").then((zone) => {
    if (zone) {
      req.params.zoneId = zone.id;
      next();
    } else res.sendStatus(404);
  });
}
export async function processActuatorName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  service
    .getActuatorByName(req.params.zoneId, req.params.actuatorName || "")
    .then((actuator) => {
      if (actuator) {
        req.params.actuatorId = actuator.id;
        next();
      } else res.sendStatus(404);
    });
}

export async function validateActuator(req: Request, res: Response, next: NextFunction) {
  if (req.body.name || req.body.commands) next();
  else res.sendStatus(406);
}
export async function processActuator(req: Request, res: Response, next: NextFunction) {
  req.body.actuator = { name: req.body.name, commands: req.body.commands };
  next();
}
