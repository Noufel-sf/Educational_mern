import React from 'react'
import './App.css'
import Pages from '@/App/Pages'
import { useEffect } from 'react';
import { api } from "@/App/Api/api";
import { useAuthStore } from "@/App/ZustandState/GlobaleState";
import { ThemeProvider } from '@/App/Contexts/ThemeContext';



function App() {
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/auth/currentuser");
        useAuthStore.getState().setUser(data.user);
      } catch {
        useAuthStore.getState().setUser(null);
      }
    })();
  }, []);
  
  
  return (
    <ThemeProvider>
      <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
        <Pages />
      </div>
    </ThemeProvider>
  )
}

export default App         


