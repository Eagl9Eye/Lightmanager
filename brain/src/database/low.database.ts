import { Low, JSONFile } from "lowdb";
import { Device } from "../default/interfaces/index";
import { db } from "../config";

interface Database {
  devices: Array<Device>;
}

const adapter = new JSONFile<Database>(db.name);
const database = new Low<Database>(adapter);
database.data ||= { devices: [] };

export default database;
