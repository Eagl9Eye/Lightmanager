import { Router } from "express";
import {
  viewParameter,
  changeOrigin,
  changeMarkerName,
  viewParameterByName,
} from "./controller/parameter.controller";
import {
  validateMarker,
  validateOrigin,
  validateMarkerName,
  validateNewMarkerName,
  extractMarkerId,
  extractMarkerName,
} from "./middleware/parameter.middleware";
import logger from "../util/log";
const log = logger(module);
const router: Router = Router();

router.param("markerId", extractMarkerId);
router.param("markerName", extractMarkerName);

router.route("/parameter").get(viewParameter).post(validateOrigin, changeOrigin);
router.route("/parameter/:markerName").all(validateMarkerName).get(viewParameterByName);
router
  .route("/parameter/:markerId")
  .all(validateMarker)
  .put(validateNewMarkerName, changeMarkerName);

export default router;
