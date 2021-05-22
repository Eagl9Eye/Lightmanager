import { CRUD } from "../../default/interfaces/crud.interface";
import { DeviceDto } from "../dto/device.dto";
import {
  getDevices,
  createDevice,
  updateDevice,
  patchDevice,
  readDevice,
  deleteDevice,
} from "../daos/devices.dao";

class GenerateService implements CRUD<DeviceDto> {
  async list(limit?: number, page?: number) {
    return getDevices();
  }
  async create(resource: DeviceDto) {
    return createDevice(resource);
  }
  async update(resource: DeviceDto) {
    return updateDevice(resource);
  }
  async patch(resource: DeviceDto) {
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
