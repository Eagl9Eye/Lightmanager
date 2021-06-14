import { HttpMethod, CommandType } from "./index";
export namespace ResponseBody {
  export interface Command {
    address: string;
    method: HttpMethod;
    type: CommandType;
  }
  export interface Configuration {
    zones: Zone[];
  }
  export interface Zone {
    id: string;
    name: string;
    actuators: Actuator[];
  }
  export interface Actuator {
    id: string;
    name: string;
    commands: Command[];
    status?: 1 | 0;
  }
  export interface Mapping {
    mappings: MappingEntry[];
  }
  export interface MappingEntry {
    id: number;
    name: string;
  }
  export interface Marker {
    [key: string]: number;
  }
  export interface Address {
    address: string;
  }
  export interface Parameter {
    [key: string]: number;
  }
}
