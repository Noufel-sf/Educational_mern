// controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../Models/User";
import { signupSchema, loginSchema } from "../Schemas";
import jwt from "jsonwebtoken";
import {
  signAccessToken,
  setAuthCookie,
  clearAuthCookie,
  readToken,
} from "../middleware/auth";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is required");

const sanitize = (u: any) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  bio: u.bio,
  role: u.role,
  profileimg: u.profileimg,
});

export const signup = async (req: Request, res: Response) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const {
      name,
      email,
      password,
      profileimg,
      FavouriteCourses,
      Courses,
      bio,
      role,
    } = parsed.data;

    // global uniqueness across both collections
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let user: any;

    user = await User.create({
      name,
      email,
      passwordHash,
      profileimg: profileimg || "https://via.placeholder.com/150",
      FavouriteCourses: [],
      role,
      Courses: [],
      bio: "",
    });

    // just sign JWT with this user
    const token = signAccessToken({ sub: user._id.toString(), role });
    setAuthCookie(res, token);

    return res.status(201).json({ user: sanitize(user) }); // do NOT send token in body
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten());

    const { email, password } = parsed.data;

    let user: any = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signAccessToken({ sub: user._id.toString(), role: user.role });
    setAuthCookie(res, token);

    return res.json({ user: sanitize(user) });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// controllers/authController.ts (add)

export const fetchCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = readToken(req);
    if (!token) return res.status(401).json({ error: "Unauthenticated" });

    const payload = jwt.verify(token, JWT_SECRET) as {
      sub: string;
      role: "student" | "teacher";
    };

    let user: any;
    user = await User.findById(payload.sub).lean();

    if (!user) return res.status(401).json({ error: "User not found" });

    return res.json({ user: sanitize(user) });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  return res.json({ ok: true });
};
