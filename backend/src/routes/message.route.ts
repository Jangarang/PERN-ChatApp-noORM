import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, sendMessage, getConversations} from "@/controllers/message.controller.js";
const router = Router();

router.post("/send/:id", protectRoute ,sendMessage);
router.get("/conversations", protectRoute, getConversations);
router.get("/:id", protectRoute, getMessages);



export default router;