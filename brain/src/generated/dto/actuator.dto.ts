import { CommandType, HttpMethod } from "../../@types";

export interface ActuatorDto {
  commands: CommandDto[];
  name: string;
  id?: string;
  status?: 1 | 0;
}
export interface CommandDto {
  method: HttpMethod;
  type: CommandType;
  address: string;
  alias?: string;
}
