import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import api from "../Api/api";
import { useAuthStore } from "../ZustandState/GlobaleState";
import AskedQuestions from "../ui/AskedQeustions";
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";


// Zod schema for signup
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  role: z.enum(["student", "teacher"]),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profileimg: z.string().optional(),
});

type SignupInput = z.infer<typeof signupSchema>;

function Signup() {

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      console.log("Sending signup data:", data);
      const res = await api.post("/auth/signup", data);
      console.log("Signup success:", res.data);
      useAuthStore.getState().setUser(res.data.user); // token lives in cookie
      window.location.href = "/";

      // Save token or redirect user here
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      console.error("Full error:", err);
    }
  };

  return (
    <motion.div 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
      className="flex items-center justify-center  gap-12"
    >
       <motion.div 
         variants={fadeIn("up", 0.2)}
         className="flex flex-col items-center justify-center gap-12 my-25 w-full"
       >

      <motion.form
        variants={fadeIn("up", 0.4)}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-100"
      >
        <motion.h1 
          variants={textVariant(0.6)}
          className="text-4xl md:text-6xl fonts capitalize font-bold text-center"
        >
          sign up
        </motion.h1>

        <motion.input
          variants={fadeIn("up", 0.8)}
          {...register("name")}
          placeholder="Name"
          className=" shadow-[4px_4px_0_0_#000] border border-black p-3 rounded-lg bg-white outline-none w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <motion.input
          variants={fadeIn("up", 1.0)}
          {...register("email")}
          placeholder="Email"
          className="shadow-[4px_4px_0_0_#000] border border-black p-3 rounded-lg bg-white outline-none w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <motion.select
          variants={fadeIn("up", 1.2)}
          {...register("role")}
          className="shadow-[4px_4px_0_0_#000] border border-black p-3 rounded-lg bg-white outline-none w-full"
        >
          <option value="">Select role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </motion.select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
      

        <motion.input
          variants={fadeIn("up", 1.4)}
          type="password"
          {...register("password")}
          placeholder="Password"
          className="shadow-[4px_4px_0_0_#000] border border-black p-3 rounded-lg bg-white outline-none w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <motion.button
          variants={fadeIn("up", 1.6)}
          type="submit"
          className="bg-[var(--secondary-color)] cursor-pointer fonts text-white p-2 rounded hover:bg-[var(--primary-color)] transition duration-300"
        >
          Sign Up
        </motion.button>
      </motion.form>
      <AskedQuestions />
       </motion.div>
    </motion.div>
  );
}

export default Signup;
