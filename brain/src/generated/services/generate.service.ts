import { CRUD } from "../../default/interface/crud.interface";
import { ActuatorDto } from "../dto/actuator.dto";
import {
  getDevices,
  createDevice,
  updateDevice,
  patchDevice,
  readDevice,
  deleteDevice,
} from "../dao/devices.dao";

class GenerateService implements CRUD<ActuatorDto> {
  async list(limit?: number, page?: number) {
    return getDevices();
  }
  async create(resource: ActuatorDto) {
    return createDevice(resource);
  }
  async update(resource: ActuatorDto) {
    return updateDevice(resource);
  }
  async patch(resource: ActuatorDto) {
    return patchDevice(resource);
  }
  async readById(resourceId: string) {
    return readDevice(resourceId);
  }
  async deleteById(resourceId: string) {
    return deleteDevice(resourceId);
  }
}

export default new GenerateService();
