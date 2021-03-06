import { Request, Response } from "express";
import addressService from "../service/address.service";
import mappingService from "../service/mapping.service";
import { Parameter } from "../../@types";
import { logger } from "../../index";
import { toObj } from "../../util/converter";
import { defaultPrefix } from "../../config";
import fetch from "node-fetch";

export async function viewParameter(req: Request, res: Response) {
  fetchParams()
    .then((params: Parameter) => applyMapping(params))
    .then((map) => res.status(200).json(toObj(map)))
    .catch((error) => {
      logger.error(error.stack);
      res.sendStatus(404);
    });
}
export async function viewParameterByName(req: Request, res: Response) {
  fetchParams()
    .then((params: Parameter) => applyMapping(params))
    .then((map) => res.status(200).json(map.get(req.body.name)))
    .catch((error) => {
      logger.error(error.stack);
      res.sendStatus(404);
    });
}
export async function viewMapping(req: Request, res: Response) {
  res.status(200).json(await mappingService.getMapping());
}
export async function changeOrigin(req: Request, res: Response) {
  res.status(200).json(await addressService.update(req.body.address));
}
export async function changeMarkerName(req: Request, res: Response) {
  const mapping = await mappingService.changeName(req.body.id, req.body.newName);
  res.status(200).json(mapping);
}
const fetchParams = async () => {
  const address = await addressService.getAddress();
  return fetch(address.address)
    .then((response) => response.json())
    .then((response) => {
      return {
        marker: response["marker state"],
        auth: response["auth enabled"],
        ssid: response["ssid"],
        mac: response["mac addr"],
        lon: response["lon"],
        lat: response["lat"],
        busy: response["busy"],
      } as Parameter;
    });
};

const applyMapping = async (parameter: Parameter) => {
  const mapping = await mappingService.getMapping();
  return new Map<string, string>(
    parameter.marker
      .split("")
      .map((value, index) => [
        mapping.find((entry) => entry.id === index)?.name || `${defaultPrefix}${index}`,
        value,
      ])
  );
};
