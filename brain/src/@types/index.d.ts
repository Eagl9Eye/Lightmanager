export namespace Configuration {
  interface Lightman {
    zones: Zone[];
  }
  interface Zone {
    name: string;
    actuators: Device[];
  }
  interface Device {
    name: string;
    commands: Command[];
    toActuator(): Actuator;
  }
  interface Command {
    name: string;
    param: string;
  }
}
export interface Actuator {
  id: string;
  name: string;
  commands: Command[];
  status?: 1 | 0;
}
export interface Zone {
  id: string;
  name: string;
  actuators?: Actuator[];
}
export interface Command {
  method: HttpMethod;
  type: CommandType;
  address: string;
  alias?: string;
}
export interface Parameter {
  marker: string;
  auth?: boolean;
  ssid?: string;
  mac?: string;
  lon?: number;
  lat?: number;
  busy?: boolean;
}

export type HttpMethod = "post" | "delete" | "put" | "patch" | "get";
export type CommandType = "off" | "on" | "toggle" | any;
