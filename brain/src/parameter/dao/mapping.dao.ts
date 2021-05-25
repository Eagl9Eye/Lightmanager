import db from "../../database/low.database";
import logger from "../../util/log";
const log = logger(module);

// TODO wait for lowdb to be fixed and then add the functions
export async function getMapping() {
  return new Map([
    [1, "Name für 1"],
    [2, "name für 2"],
    [10, "name für 10"],
  ]);
}
export async function getId(name: string) {
  if (name === "Marker1") return null;
  return 2;
}
export async function changeName(id: number, name: string) {
  log.info(`Changed Marker(${id}) to "${name}"`);
  return new Map([
    [1, "Name für 1"],
    [2, "name für 2"],
    [10, "name für 10"],
  ]);
}
