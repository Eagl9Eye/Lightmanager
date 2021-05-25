import { ActuatorDto } from "../dto/actuator.dto";
import { CommandType, HttpMethod } from "../../@types/actuator";
import { v4 as uuid } from "uuid";
import db from "../../database/low.database";

// TODO wait for lowdb to be fixed and then add the functions
export async function getDevices() {
  return [
    {
      id: uuid(),
      commands: [
        {
          type: "toggle" as CommandType,
        },
      ],
      method: "get" as HttpMethod,
      address: "/test/address",
      name: "test",
    },
  ];
  //db.data.devices;
}
export async function createDevice(device: ActuatorDto) {
  return device;
}
export async function updateDevice(device: ActuatorDto) {
  return device;
}
export async function patchDevice(device: ActuatorDto) {
  return device;
}
export async function readDevice(id: string) {
  return `${id} wurde gelesen`;
}
export async function deleteDevice(id: string) {
  return `${id} wurde entfern`;
}
