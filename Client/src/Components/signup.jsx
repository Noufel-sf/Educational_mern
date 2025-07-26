
import { Link, BrowserRouter } from "react-router-dom";
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useCart } from "./CartContext";

export default function SignupPage() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const {login} = useCart();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear old errors
    setErrors({});

    const newErrors= {};

    // Basic frontend validation
    if (!username.trim()) newErrors.username = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Send request to the correct API endpoint
      console.log({username , email ,password});
      
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      console.log("signup successful", response.data);
      login(response.data.user);
      
      // Redirect to login page after successful signup
      window.location.href = '/';
    } catch (err) {
      console.error("Signup error:", err);
      setErrors((prev) => ({ ...prev, general: 'Failed to sign up. Please try again.' }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md ">
        <h1 className="text-6xl font-extrabold text-center  text-[var(--primary)] mb-8">Sign Up</h1>

        {errors.general && (
          <p className="mb-4 text-red-600 text-sm text-center">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xl font-extrabold text-black">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xl font-extrabold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-xl font-extrabold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition font-extrabold cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xl">
            Already have an account?{' '}
            <Link to="/login" className=" text-red-600 hover:text-red-600 font-extrabold cursor-pointer">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
