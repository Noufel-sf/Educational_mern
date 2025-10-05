import express from "express";
import {updateStudent} from "../Controllers/StudentController";

const router = express.Router();

router.put("/update/:id", updateStudent);

export default router;
