import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages,sendMessage, getConversations} from "@/controllers/message.controller.js";
const router = Router();

router.post("/send/:id", protectRoute ,sendMessage);
router.get("/:id", protectRoute, getMessages);
router.get("/conversations", protectRoute, getConversations);


export default router;