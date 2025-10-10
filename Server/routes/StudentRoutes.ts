import express from "express";
import {updateStudent} from "../Controllers/StudentController";
import upload from "../middleware/multer";

const router = express.Router();

router.put("/update/:id",upload.single("profileimg"), updateStudent);

export default router;
