const express = require("express");
const  upload  = require("../middleware/multer"); 
const { addCourse , getAllCourses ,confirmCourse ,getPublishedCourses ,getHomeCourses ,getCourseDetails , DeleteCourse } = require("../controllers/courseController");

const router = express.Router();

// upload.fields → handle multiple files (coverImage + video)
router.post(
  "/add",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  addCourse
);

router.get("/getallcourses", getAllCourses);
router.get("/getpublishedcourses", getPublishedCourses);
router.get("/gethomecourses", getHomeCourses);
router.put("/:id" ,confirmCourse);
router.get("/:id", getCourseDetails);
router.delete("/deletecourse/:id", DeleteCourse);

export default router;
