import { Router } from "express";
import { defaultAction } from "./controller/DefaultController";
const router: Router = Router();

router.route("/").get(defaultAction);

export default router;
