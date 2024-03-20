import { Router } from "express";
import { reviewRoute } from "./review/review.route.js";

const router = Router();

router.use("/review", reviewRoute);

export default router;
