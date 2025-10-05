import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  _id: string;
  title: string;
  about: string;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: {
    sectionTitle: string;
    lessons: string[];
  }[];
  price: number;
  state: "draft" | "published" | "archived";
  category: string;
  coverImage: string;
  duration: string; // e.g. "6h 30m"
  owner: mongoose.Types.ObjectId; // User reference
  video: string;
}

const CourseSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    about: { type: String, required: true },

    whatYouWillLearn: {
      type: [String],
      required: true,
    },

    requirements: {
      type: [String],
      required: true,
    },

    curriculum: [
      {
        sectionTitle: { type: String, required: true },
        lessons: { type: [String], required: true },
      },
    ],

    price: { type: Number, required: true, default: 0 },
    state: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    category: { type: String, required: true },
    coverImage: { type: String, default: "" },
    duration: { type: String, required: true },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    video: {
      type: String, // store video URL (e.g., Cloudinary link)
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>("Course", CourseSchema);
