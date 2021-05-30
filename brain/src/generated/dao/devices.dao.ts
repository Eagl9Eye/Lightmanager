import { ActuatorDto } from "../dto/actuator.dto";
import { v4 as uuid } from "uuid";
import db from "../../database/low.database";
import { Command, Zone } from "../../@types";
import { ListIterateeCustom } from "lodash";
import log from "../../util/log";

// All
export async function deleteConfiguration() {
  return db.set("configuration", []).write();
}
// Zones
export async function getZones(predicate?: ListIterateeCustom<Zone, boolean>) {
  return db.get("configuration").filter(predicate).value();
}
export async function createZone(name: string) {
  log.info(`Zone (${name}) hinzugefügt`);
  return db.get("configuration").push({ id: uuid(), name: name, actuators: [] }).write();
}
export async function updateZone(id: string, name: string) {
  return db.get("configuration").find({ id: id }).assign({ name: name }).write();
}
export async function deleteZone(id: string) {
  return db.get("configuration").remove({ id: id }).write();
}
export async function getZone(id: string) {
  return db.get("configuration").find({ id: id }).value();
}
// Actuators
export async function getActuators(id: string, name?: string) {
  return getZone(id).then((zone) => {
    if (name)
      return zone.actuators.filter((actuator) => (name ? actuator.name === name : true));
    else return zone.actuators;
  });
}
export async function getActuator(zoneId: string, actuatorId: string) {
  return getZone(zoneId).then((zone) =>
    zone.actuators.find((actuator) => actuator.id === actuatorId)
  );
}
export async function createActuator(id: string, device: ActuatorDto) {
  getZone(id).then((zone) =>
    zone.actuators.push({
      commands: [],
      ...device,
      id: uuid(),
    })
  );
  return db.write<Zone>();
}
export async function deleteActuator(zoneId: string, actuatorId: string) {
  getZone(zoneId).then((zone) =>
    zone.actuators.filter((actuator, index, array) => {
      if (actuator.id === actuatorId) {
        array.splice(index, 1);
        return false;
      }
    })
  );
  return db.write<Zone>();
}
export async function changeActuator(
  zoneId: string,
  actuatorId: string,
  changes: { name?: string; commands?: Command[] }
) {
  getActuator(zoneId, actuatorId).then((actuator) => {
    if (changes.name) actuator.name = changes.name;
    if (changes.commands) actuator.commands = changes.commands;
  });
  return db.write<Zone>();
}
