import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAuthStore } from "../ZustandState/GlobaleState";
import api from "../Api/api";
import AskedQuestions from "../ui/AskedQeustions";
import { motion } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

// Zod schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInput = z.infer<typeof loginSchema>;

function Login() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await api.post("/auth/login", data);
      console.log("Login success:", res.data);
      useAuthStore.getState().setUser(res.data.user); //
      window.location.href = "/";
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <motion.div 
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      animate="show"
      className="flex items-center flex-col justify-center  gap-12"
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
            Login
          </motion.h1>

          <motion.input
            variants={fadeIn("up", 0.8)}
            {...register("email")}
            placeholder="Email"
            className=" p-3 rounded-lg bg-white outline-none w-full  shadow-[4px_4px_0_0_#000] border border-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <motion.input
            variants={fadeIn("up", 1.0)}
            type="password"
            {...register("password")}
            placeholder="Password"
            className=" p-3 outline-none rounded-lg bg-white shadow-[4px_4px_0_0_#000] border border-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <motion.button
            variants={fadeIn("up", 1.2)}
            type="submit"
            className="bg-[var(--secondary-color)] cursor-pointer fonts text-white p-2 rounded hover:bg-[var(--primary-color)] transition duration-300"
          >
            Log In
          </motion.button>
        </motion.form>
   
      <AskedQuestions />
    </motion.div>
      </motion.div>
  );
}

export default Login;
