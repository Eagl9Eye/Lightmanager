import { Request, Response } from "express";
import service from "../services/generate.service";
export async function listDevices(req: Request, res: Response) {
  const routes = await service.list();
  res.status(200).send(routes);
}
export async function loadConfiguration(req: Request, res: Response) {
  const routes = await service.list();
  res.status(200).send(routes);
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
