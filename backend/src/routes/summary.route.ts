import express from "express";
import { getSummary } from "../controllers/summary.controller";
import protectRoute from "../middlewares/protectRoute.middleware";


const router = express.Router();

router.get("/",protectRoute,getSummary);

export default router;