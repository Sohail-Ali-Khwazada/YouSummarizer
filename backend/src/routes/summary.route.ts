import express from "express";
import { getSummary } from "../controllers/summary.controller";
import protectRoute from "../middlewares/protectRoute.middleware";


const router = express.Router();

router.post("/",getSummary);
// router.post("/",protectRoute,getSummary);

export default router;