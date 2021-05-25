import { Request, Response } from "express";
import service from "../services/generate.service";
import log from "../../util/log";

export async function listDevices(req: Request, res: Response) {
  const routes = await service.list();
  res.status(200).send(routes);
}
export async function loadConfiguration(req: Request, res: Response) {
  log.info(req.body.lightman.zone);
  res.sendStatus(200);
}
export async function viewActuators(req: Request, res: Response) {
  const routes = await service.list();
  res.status(200).send(routes);
}
export async function addActuator(req: Request, res: Response) {
  const routes = await service.list();
  res.status(200).send(routes);
}
export async function changeZone(req: Request, res: Response) {
  const routes = await service.list();
  res.status(200).send(routes);
}
export async function viewActuator(req: Request, res: Response) {
  const routes = await service.list();
  res.status(200).send(routes);
}
export async function changeActuator(req: Request, res: Response) {
  const routes = await service.list();
  res.status(200).send(routes);
}
