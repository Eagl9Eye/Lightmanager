import { HttpMethod } from "../../@types/actuator";

export interface AddressDto {
  address: string;
  method?: HttpMethod;
}
