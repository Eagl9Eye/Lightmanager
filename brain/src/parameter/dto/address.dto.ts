import { HttpMethod } from "../../@types";

export interface AddressDto {
  address: string;
  method?: HttpMethod;
}
