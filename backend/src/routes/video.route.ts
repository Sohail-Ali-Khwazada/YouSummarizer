import express from "express";
import { getVideo,getAllVideos } from "../controllers/video.controller";
import protectRoute from "../middlewares/protectRoute.middleware";


const router = express.Router();
router.get("/getAllVideos",protectRoute,getAllVideos);
router.post("/getVideo",protectRoute,getVideo);


export default router;