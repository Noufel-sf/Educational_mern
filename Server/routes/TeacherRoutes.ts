// routes/teacherRoutes.ts
import express from "express";
import { getTeacherById , updateTeacher} from "../Controllers/TeacherController";

const router = express.Router();

router.get("/:id", getTeacherById);
router.put("/update/:id", updateTeacher);

export default router;
