
import { Request, Response } from "express";
import { User } from "../Models/User";




export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // find user with role = student
    const student = await User.findOne({ _id: id, role: "student" })
      .select("-passwordHash") // don’t return password

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ student });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const student = await User.findById(id);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const updateData: any = { ...req.body };

    if (req.file) {
      updateData.profileimg = req.file.path;
      console.log("✅ Profile image updated:", req.file.path);
    }else{
      console.log("cant update the img");
      
    }

    const updatedStudent = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    res.status(200).json({
      message: "✅ Student profile updated successfully",
      student: updateStudent,
    });
  } catch (err) {
    console.error("❌ Error updating student:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
