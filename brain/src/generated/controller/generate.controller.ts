import { Request, Response } from "express";
import service from "../services/generate.service";
import { logger } from "../../index";

/**
 * List all stored Acutators
 * @param req Request
 * @param res Response
 */
export async function viewAll(req: Request, res: Response) {
  res.status(200).json(await service.getAll());
}
/**
 * Overwrite old configuration and replace with new
 * @param req Request
 * @param res Response
 */
export async function loadConfiguration(req: Request, res: Response) {
  logger.info(req.body.lightman);
  res.status(200).json(await service.overwrite(req.body.lightman));
  // datei konnte nicht verarbeitet werden fehler verarbeiten
}
/**
 * List all Actuators for a specific zonename
 * @param req Request
 * @param res Response
 */
export async function viewActuators(req: Request, res: Response) {
  res.status(200).json(await service.getActuators(req.params.zoneId));
}
/**
 * Add new Actuator
 * @param req Request
 * @param res Response
 */
export async function addActuator(req: Request, res: Response) {
  await service.createActuator(req.params.zoneId, req.body.actuator);
  res.sendStatus(200);
}
/**
 * Get a specific Actuator
 * @param req Request
 * @param res Response
 */
export async function viewActuator(req: Request, res: Response) {
  res
    .status(200)
    .json(await service.getActuator(req.params.zoneId, req.params.actuatorId));
}
/**
 * Change information of Actuator
 * @param req Request
 * @param res Response
 */
export async function changeActuator(req: Request, res: Response) {
  await service.changeActuator(req.params.zoneId, req.params.actuatorId, {
    name: req.body.name,
    commands: req.body.commands,
  });
  res.sendStatus(200);
}
/**
 * Delete Actuator
 * @param req Request
 * @param res Response
 */ export async function deleteActuator(req: Request, res: Response) {
  await service.deleteActuator(req.params.zoneId, req.params.actuatorId);
  res.sendStatus(200);
}
/**
 * Change information of zone
 * @param req Request
 * @param res Response
 */
export async function changeZone(req: Request, res: Response) {
  res.status(200).json(await service.updateZone(req.params.zoneId, req.body.name));
}
/**
 * Create new zone
 * @param req Request
 * @param res Response
 */
export async function createZone(req: Request, res: Response) {
  await service.createZone(req.body.name);
  res.sendStatus(200);
}
/**
 * Delete zone
 * @param req Request
 * @param res Response
 */
export async function deleteZone(req: Request, res: Response) {
  await service.deleteZone(req.params.zoneId);
  res.sendStatus(200);
}
