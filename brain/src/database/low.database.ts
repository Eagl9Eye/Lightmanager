import { Low, JSONFile } from "lowdb";
import { Actuator } from "../@types/actuator";
import { db } from "../config";

interface Database {
  devices: Array<Actuator>;
  parameterOrigin: string;
  parameterMapping: Map<number, string>;
}

const adapter = new JSONFile<Database>(db.name);
const database = new Low<Database>(adapter);
database.data ||= {
  devices: [],
  parameterOrigin: "",
  parameterMapping: new Map(),
};

export default database;
