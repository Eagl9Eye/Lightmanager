import { getMapping, getId, changeName } from "../dao/mapping.dao";

class MappingService {
  async getMapping(): Promise<Map<number, string>> {
    return getMapping();
  }
  async changeName(id: number, name: string): Promise<Map<number, string>> {
    return changeName(id, name);
  }
  async getByName(name: string): Promise<number> {
    return getId(name);
  }
}
export default new MappingService();
