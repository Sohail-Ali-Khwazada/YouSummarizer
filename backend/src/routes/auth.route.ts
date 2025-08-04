import express from "express";
import { login, signup, loginGoogle } from "../controllers/auth.controller";
import passport from "../config/passport";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  loginGoogle
);

export default router;