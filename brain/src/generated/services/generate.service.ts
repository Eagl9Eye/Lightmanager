import { ActuatorDto } from "../dto/actuator.dto";
import { Command, Configuration } from "../../@types";
import {
  deleteConfiguration,
  getZones,
  createZone,
  updateZone,
  deleteZone,
  getActuators,
  getActuator,
  createActuator,
  changeActuator,
  deleteActuator,
} from "../dao/devices.dao";

class GenerateService {
  async getAll() {
    return getZones();
  }
  async getZoneByName(name: string) {
    return (await getZones({ name: name }))[0];
  }
  async createZone(name: string) {
    return createZone(name);
  }
  async updateZone(id: string, name: string) {
    return updateZone(id, name);
  }
  async deleteZone(id: string) {
    return deleteZone(id);
  }
  async getActuators(id: string) {
    return getActuators(id);
  }
  async getActuator(zoneId: string, actuatorId: string) {
    return getActuator(zoneId, actuatorId);
  }
  async getActuatorByName(id: string, name: string) {
    return (await getActuators(id, name))[0];
  }
  async createActuator(id: string, actuator: ActuatorDto) {
    return createActuator(id, actuator);
  }
  async changeActuator(
    zoneId: string,
    actuatorId: string,
    changes: { name?: string; commands?: Command[] }
  ) {
    return changeActuator(zoneId, actuatorId, changes);
  }
  async deleteActuator(zoneId: string, actuatorId: string) {
    return deleteActuator(zoneId, actuatorId);
  }
  async overwrite(configuration: Configuration.Lightman) {
    deleteConfiguration();
    configuration.zones.forEach((zone) => {
      createZone(zone.name).then((createdZone) =>
        zone.actuators.forEach((device) =>
          createActuator(createdZone[createdZone.length - 1].id, device.toActuator())
        )
      );
    });
  }
}

export default new GenerateService();
