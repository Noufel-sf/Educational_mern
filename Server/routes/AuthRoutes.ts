import express from "express";
import { signup, login ,fetchCurrentUser ,logout } from "../Controllers/AuthController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/currentuser", fetchCurrentUser);
router.post("/logout", logout);

export default router;