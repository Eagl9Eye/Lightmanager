import { Zone } from "../@types";
import { db as config } from "../config";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

export interface Mapping {
  id: number;
  name: string;
}

export interface Database {
  configuration: Zone[];
  parameterOrigin: string;
  parameterMapping: Array<Mapping>;
}
class DB {
  db: lowdb.LowdbSync<Database>;
  constructor() {
    this.init();
  }
  private async init() {
    const adapter = new FileSync<Database>(config.name);
    this.db = lowdb(adapter);
    this.db.read();
    await this.db
      .defaults({
        configuration: [],
        parameterOrigin: "", // http://127.0.0.1:4000/params.json
        parameterMapping: [],
      })
      .write();
  }
}
export default new DB().db;
