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

// ✅ Update teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // only allow updates if role is teacher
    const updatedTeacher = await User.findOneAndUpdate(
      { _id: id, role: "teacher" },
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ teacher: updatedTeacher });
  } catch (err) {
    console.error("Error updating teacher:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
