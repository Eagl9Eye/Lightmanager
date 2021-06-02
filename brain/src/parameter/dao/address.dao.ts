import { AddressDto } from "../dto/address.dto";
import db, { Database } from "../../database/low.database";
import { logger } from "../../index";

export async function getAddress() {
  return { address: db.get("parameterOrigin").value() } as AddressDto;
}
export async function changeAddress(newAddress: string) {
  logger.info(`Change Address to "${newAddress}"`);
  return {
    address: db.set("parameterOrigin", newAddress).write<Database>().parameterOrigin,
  } as AddressDto;
}
