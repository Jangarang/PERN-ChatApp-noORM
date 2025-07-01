import { Router } from "express";
import { login, logout, signup, getMe, accessRefresh } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

// <url>/api/auth/signup
router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/generate-token",accessRefresh);

router.get("/me", protectRoute , getMe);

export default router;