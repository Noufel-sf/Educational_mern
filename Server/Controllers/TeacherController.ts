// controllers/teacherController.ts
import { Request, Response } from "express";
import { User } from "../Models/User";

// ✅ Get teacher by ID
export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // find user with role = teacher
    const teacher = await User.findOne({ _id: id, role: "teacher" })
      .select("-passwordHash") // don’t return password
      .populate("Courses"); // populate teacher's courses if needed

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ teacher });
  } catch (err) {
    console.error("Error fetching teacher:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const teacher = await User.findOne({ _id: id, role: "teacher" });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const updateData: any = { ...req.body };

    if (req.file) {
      updateData.profileimg = req.file.path;
      console.log("✅ Profile image updated:", req.file.path);
    }else{
      console.log("cant update the img");
      
    }

    const updatedTeacher = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (err) {
    console.error("❌ Error updating teacher:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
