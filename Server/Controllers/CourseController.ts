import Course from "../Models/Course";
import { User } from "../Models/User";
import { Request, Response } from "express";
import { transporter } from "../middleware/mailer";

const addCourse = async (req: Request, res: Response) => {
  try {
    console.log("=== ADD COURSE REQUEST ===");
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const {
      title,
      about,
      price,
      category,
      duration,
      whatYouWillLearn,
      requirements,
      curriculum,
      owner, // teacher _id
    } = req.body;

    // Validate required fields
    if (!title || !about || !price || !category || !duration || !owner) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // ✅ Check that owner exists and is a teacher
    const teacher = await User.findOne({ _id: owner, role: "teacher" });
    if (!teacher) {
      return res.status(400).json({
        success: false,
        error: "Owner must be a valid teacher",
      });
    }

    // Parse JSON fields
    const parsedLearn = JSON.parse(whatYouWillLearn || "[]");
    const parsedReqs = JSON.parse(requirements || "[]");
    const parsedCurriculum = JSON.parse(curriculum || "[]");

    // Files
    const coverImage = (req.files as any)?.coverImage?.[0]?.path || "";
    const video = (req.files as any)?.video?.[0]?.path || "";

    // Create new course
    const newCourse = new Course({
      title,
      about,
      price: Number(price),
      category,
      duration,
      coverImage,
      video,
      whatYouWillLearn: parsedLearn,
      requirements: parsedReqs,
      curriculum: parsedCurriculum,
      owner: teacher._id,
    });

    await newCourse.save();

    // 🔥 Push course to teacher’s Courses array
    await User.findByIdAndUpdate(teacher._id, {
      $push: { Courses: newCourse._id },
    });

    res.status(201).json({
      success: true,
      message: "Course submitted successfully. Pending admin approval.",
      course: newCourse,
    });
  } catch (error: any) {
    console.error("=== ERROR IN ADD COURSE ===", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: "Failed to add course",
        details: error.message,
      });
    }
  }
};

const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().populate("owner", "name email role");
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const getPublishedCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({ state: "published" }) // 👈 filter
      .populate("owner", "name email role");

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};


// ✅ Get only 3 courses (home page)
const getHomeCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find()
      .populate("owner", "name email role")
      .limit(3); // 👈 only 3 docs

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};


const getCourseDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate(
      "owner",
      "name email role"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ error: "Failed to fetch course details" });
  }
};

// ✅ Confirm or reject course
const confirmCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { state },
      { new: true }
    ).populate("owner", "name email role");

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Only send email if course is approved
    if (state === "published" && updatedCourse.owner) {
      const owner = updatedCourse.owner as any;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: owner.email,
        subject: "Your Course Has Been Approved 🎉",
        html: `
          <h2>Hello ${owner.name},</h2>
          <p>Great news! Your course <b>${updatedCourse.title}</b> has been <b>approved</b> and is now live on the platform.</p>
          <p>Thank you for contributing!</p>
          <br/>
          <p>— The Admin Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Error confirming course:", error);
    res.status(500).json({ error: "Failed to confirm course" });
  }
};

const DeleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
};



export { addCourse, getAllCourses , getPublishedCourses, getHomeCourses, confirmCourse, getCourseDetails, DeleteCourse };
