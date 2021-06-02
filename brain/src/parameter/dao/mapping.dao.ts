import { AddressDto } from "../dto/address.dto";
import db, { Database } from "../../database/low.database";
import { logger } from "../../index";

export async function getMapping() {
  return db.get("parameterMapping").value();
}
export async function getId(name: string) {
  return db.get("parameterMapping").find({ name: name }).value().id || null;
}
export async function changeName(id: number, name: string) {
  logger.info(`Changed Marker(${id}) to "${name}"`);
  if (db.get("parameterMapping").find({ id: id }).value())
    await db
      .get("parameterMapping")
      .find({ id: id })
      .assign({ id: id, name: name })
      .write();
  else await db.get("parameterMapping").push({ id: id, name: name }).write();
  return getMapping();
}

export async function getAddress() {
  return { address: db.get("parameterOrigin").value() } as AddressDto;
}
export async function changeAddress(newAddress: string) {
  logger.info(`Change Address to "${newAddress}"`);
  return {
    address: db.set("parameterOrigin", newAddress).write<Database>().parameterOrigin,
  } as AddressDto;
}
