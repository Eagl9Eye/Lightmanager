import { Router } from "express";
import { listDevices } from "./controllers/generate.controller";
import logger from "../util/log";
const log = logger(module);
const router: Router = Router();

router.route("/generated").get(listDevices);

export default router;
