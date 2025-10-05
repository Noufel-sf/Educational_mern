import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["student", "teacher", "admin"], required: true },
  passwordHash: { type: String, required: true },
  profileimg: { type: String, default: "" },
  bio: { type: String, default: "" },

  // student-specific
  FavouriteCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

  // teacher-specific
  Courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  Experiences: { type: String, default: "" },
  domain: { type: String, default: "" }
});

export const User = mongoose.model("User", userSchema);
