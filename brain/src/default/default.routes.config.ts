import { Router } from "express";
import { defaultAction } from "./controller/DefaultController";
import swagger from "swagger-ui-express";
import docu from "../../res/openapi.json";
const router: Router = Router();

router.route("/").get(defaultAction);
router.use("/api", swagger.serve);
router.route("/api").get(swagger.setup(docu));

export default router;
