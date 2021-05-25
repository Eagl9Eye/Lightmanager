import { Request, Response } from "express";
import addressService from "../service/address.service";
import mappingService from "../service/mapping.service";
import { Parameter } from "../../@types/params";
import log from "../../util/log";
import { toObj } from "../../util/converter";
import fetch from "node-fetch";

export async function viewParameter(req: Request, res: Response) {
  const mapping: Map<number, string> = await mappingService.getMapping();
  fetchParams()
    .then((params: Parameter) =>
      res.status(200).send(JSON.stringify(toObj(applyMapping(params, mapping))))
    )
    .catch((error) => {
      log.error(error);
      res.sendStatus(404);
    });
}
export async function viewParameterByName(req: Request, res: Response) {
  const mapping: Map<number, string> = await mappingService.getMapping();
  fetchParams()
    .then((params: Parameter) =>
      res
        .status(200)
        .send(JSON.stringify(applyMapping(params, mapping).get(req.body.name)))
    )
    .catch((error) => {
      log.error(error.stack);
      res.sendStatus(404);
    });
}
export async function changeOrigin(req: Request, res: Response) {
  const origin = await addressService.update(req.body.address);
  res.status(200).send(origin);
}
export async function changeMarkerName(req: Request, res: Response) {
  const mapping = await mappingService.changeName(req.body.id, req.body.newName);
  res.status(200).send(JSON.stringify(toObj(mapping)));
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

const applyMapping = (parameter: Parameter, mapping?: Map<number, string>) => {
  return new Map<string, string>(
    parameter.marker
      .split("")
      .map((value, index) => [mapping.get(index) || `Marker${index}`, value])
  );
};
