import express from "express";
import { getVideo,getAllVideos, getAns } from "../controllers/video.controller";
import protectRoute from "../middlewares/protectRoute.middleware";


const router = express.Router();
router.get("/getAllVideos",protectRoute,getAllVideos);
router.post("/getVideo",protectRoute,getVideo);
router.post("/chat",protectRoute,getAns);


export default router;