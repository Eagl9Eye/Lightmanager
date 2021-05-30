import { Mapping } from "../../database/low.database";
import { getMapping, getId, changeName } from "../dao/mapping.dao";

class MappingService {
  async getMapping(): Promise<Array<Mapping>> {
    return getMapping();
  }
  async changeName(id: number, name: string): Promise<Array<Mapping>> {
    return changeName(id, name);
  }
  async getByName(name: string): Promise<number> {
    return getId(name);
  }
}
export default new MappingService();
