import { getAddress, changeAddress } from "../dao/address.dao";
import { AddressDto } from "../dto/address.dto";

class AddressService {
  async getAddress(): Promise<AddressDto> {
    return getAddress();
  }
  async update(address: string): Promise<AddressDto> {
    return changeAddress(address);
  }
}
export default new AddressService();
