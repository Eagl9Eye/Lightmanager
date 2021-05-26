import { Actuator } from "../@types/actuator";
import { db as config } from "../config";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import log from "../util/log";

export interface Database {
  devices: Array<Actuator>;
  parameterOrigin: string;
  parameterMapping: Map<number, string>;
}
class DB {
  db: lowdb.LowdbSync<Database>;
  constructor() {
    this.init();
  }
  private async init() {
    const adapter = new FileSync<Database>(config.name);
    this.db = lowdb(adapter);
    await this.db
      .defaults({
        devices: [],
        parameterOrigin: "http://127.0.0.1:4000/params.json",
        parameterMapping: [],
      })
      .write();
    log.debug("parameterOrigin:", this.db.get("parameterOrigin").value());
  }
}
export default new DB().db;
