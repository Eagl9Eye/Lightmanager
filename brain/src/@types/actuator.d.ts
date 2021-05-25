export interface Actuator {
  id: string;
  name: string;
  address: string;
  method: HttpMethod;
  commands: CommandType[];
  zone: string;
  status?: 1 | 0;
}
export type HttpMethod = "post" | "delete" | "put" | "patch" | "get";
export type CommandType = "off" | "on" | "toggle" | any;
