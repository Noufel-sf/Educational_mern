
import { Link, BrowserRouter } from "react-router-dom";
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useCart } from "./CartContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const newErrors={};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Send request to the correct API endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Login successful', response.data);
      
      // Store token in localStorage
      login(response.data.user);

      // Redirect to dashboard or home page
      window.location.href = '/';
    } catch (error) {
      console.error('Login errorrr:', error);
      setErrors((prev) => ({
        ...prev,
        general: 'Login failed. Please check your credentials.',
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md ">
        <h1 className="text-6xl font-extrabold text-center mb-8 text-[var(--primary)]">Login</h1>

        {errors.general && (
          <p className="mb-4 text-red-600 text-sm text-center">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xl font-extrabold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent cursor-pointer rounded-md shadow-sm text-sm font-extrabold text-white bg-[var(--primary)] hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xl font-bold">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium text-red-600 hover:text-red-500 cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
