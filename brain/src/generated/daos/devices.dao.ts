import { DeviceDto } from "../dto/device.dto";
import db from "../../database/low.database";

export async function getDevices() {
  return db.data.devices;
}
export async function createDevice(device: DeviceDto) {
  return device;
}
export async function updateDevice(device: DeviceDto) {
  return device;
}
export async function patchDevice(device: DeviceDto) {
  return device;
}
export async function readDevice(id: string) {
  return `${id} wurde gelesen`;
}
export async function deleteDevice(id: string) {
  return `${id} wurde entfern`;
}
