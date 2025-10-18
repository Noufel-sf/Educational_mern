
import express from "express";
import { CheckAdmin } from "../Controllers/AuthController";
import { isAdmin } from "../middleware/isAdmin";


const router = express.Router();



router.get("/check", isAdmin, CheckAdmin);


export default router;