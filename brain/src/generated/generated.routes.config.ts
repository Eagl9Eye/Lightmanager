import { Router } from "express";
import {
  processConfiguration,
  processZoneName,
  processActuatorName,
  validateActuator,
  processActuator,
} from "./middleware/generated.middleware";
import {
  viewAll,
  loadConfiguration,
  viewActuators,
  addActuator,
  viewActuator,
  changeActuator,
  deleteActuator,
  changeZone,
  createZone,
  deleteZone,
} from "./controller/generate.controller";
const router: Router = Router();

router.param("zoneName", processZoneName);
router.param("actuatorName", processActuatorName);

router
  .route("/home")
  .get(viewAll)
  .post(createZone)
  .put(processConfiguration, loadConfiguration);
router
  .route("/home/:zoneName")
  .get(viewActuators)
  .post(validateActuator, processActuator, addActuator)
  .put(changeZone)
  .delete(deleteZone);
router
  .route("/home/:zoneName/:actuatorName")
  .get(viewActuator)
  .post(changeActuator)
  .delete(deleteActuator);

export default router;
