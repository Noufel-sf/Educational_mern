import { User } from "../Models/User";
import Course from "../Models/Course";
import { Request, Response } from "express";


const getUsers = async (req : Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({  users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export { getUsers};