import express from "express";
import {updateStudent , getStudentById} from "../Controllers/StudentController";
import upload from "../middleware/multer";

const router = express.Router();


router.get("/:id", getStudentById);
router.put("/update/:id",upload.single("profileimg"), updateStudent);

export default router;
