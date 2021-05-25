import { CommandType, HttpMethod } from "../../@types/actuator";

export interface ActuatorDto {
  id: string;
  address: string;
  method: HttpMethod;
  commands: CommandType[];
  name?: string;
  zone?: string;
}
