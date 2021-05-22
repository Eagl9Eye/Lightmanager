import { Router } from "express";
import { defaultAction } from "./controllers/DefaultController";
const router: Router = Router();

router.route("/").get(defaultAction);

export default router;
