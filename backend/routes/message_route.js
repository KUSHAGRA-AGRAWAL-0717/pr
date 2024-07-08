import express from "express"
import { getMessage,sendMessage } from "../controllers/message_controller.js"
import isAuthenticated from "../middleware/isAutheticated.js"


const router = express.Router();

router.post("/send/:id",isAuthenticated,sendMessage)
router.get("/:id",isAuthenticated,getMessage)

export default router;
