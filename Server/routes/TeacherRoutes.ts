// routes/teacherRoutes.ts
import express from "express";
import { getTeacherById , updateTeacher} from "../Controllers/TeacherController";
import upload from "../middleware/multer"; 



const router = express.Router();

router.get("/:id", getTeacherById);
router.put("/update/:id",upload.single("profileimg"), updateTeacher);

export default router;
