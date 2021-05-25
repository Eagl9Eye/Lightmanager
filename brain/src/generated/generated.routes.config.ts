import { Router } from "express";
import {
  extractZoneName,
  extractActuatorName,
  validateConfiguration,
  validateZoneName,
  validateActuatorName,
} from "./middleware/generated.middleware";
import {
  listDevices,
  loadConfiguration,
  viewActuators,
  addActuator,
  changeZone,
  viewActuator,
  changeActuator,
} from "./controller/generate.controller";
const router: Router = Router();

router.param("zoneName", extractZoneName);
router.param("actuatorName", extractActuatorName);

router
  .route("/generated")
  .get(listDevices)
  .post(validateConfiguration, loadConfiguration);
router
  .route("/generated/:zoneName")
  .all(validateZoneName)
  .get(viewActuators)
  .post(addActuator)
  .put(changeZone);
router
  .route("/generated/:zoneName/:actuatorName")
  .all(validateActuatorName)
  .get(viewActuator)
  .put(changeActuator);

export default router;
