import express from "express";
import { getDetails } from "../controllers/videoDetails.controller";
import protectRoute from "../middlewares/protectRoute.middleware";


const router = express.Router();

router.post("/",getDetails);
// router.post("/",protectRoute,getSummary);

export default router;