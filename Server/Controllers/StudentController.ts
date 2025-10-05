
import { Request, Response } from "express";
import { User } from "../Models/User";



export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // only allow updates if role is student
    const updatedStudent = await User.findOneAndUpdate(
      { _id: id, role: "student" },
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ student: updatedStudent });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
