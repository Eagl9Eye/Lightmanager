import { AddressDto } from "../dto/address.dto";
import db from "../../database/low.database";
import logger from "../../util/log";
const log = logger(module);

// TODO wait for lowdb to be fixed and then add the functions
export async function getAddress() {
  return { address: "http://127.0.0.1:4000/params.json" } as AddressDto;
}
export async function changeAddress(newAddress: string) {
  log.info(`Change Address to ${newAddress}`);
  return { address: "http://127.0.0.1:4000/params.json" } as AddressDto;
}
