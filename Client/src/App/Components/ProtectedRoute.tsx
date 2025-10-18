import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../Api/api";
import { JSX } from "react";



export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
//   const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('ProtectedRoute: Checking authentication...');
        const response = await api.get(`/admin/check`, { 
          withCredentials: true 
        });
        console.log('ProtectedRoute: Auth response:', response.data);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.log('ProtectedRoute: Auth check failed:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    console.log('ProtectedRoute: Not admin, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute: Admin authenticated, rendering children');
  return children;
}
