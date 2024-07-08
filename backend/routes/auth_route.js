import express from "express";
import { login, register,logout,getOtherExperts ,getOtherStudents} from "../controllers/auth.js";
import isAuthenticated from "../middleware/isAutheticated.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout",logout)
router.get("/experts",isAuthenticated,getOtherExperts)
router.get("/students",isAuthenticated,getOtherStudents)

export default router