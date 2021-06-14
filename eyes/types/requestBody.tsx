import { HttpMethod, CommandType } from "./index";
export namespace RequestBody {
  export interface Address {
    address: string;
  }
  export interface Marker {
    newName: string;
  }
  export interface Zone {
    name: string;
  }
  export interface Actuator {
    name: string;
    commands?: Command[];
  }
  export interface Command {
    address: string;
    method: HttpMethod;
    type: CommandType;
  }
}
