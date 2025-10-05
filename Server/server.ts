import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/AuthRoutes';
import teacherRoutes from './routes/TeacherRoutes';
import cookieParser from "cookie-parser";
import courseRoutes from './routes/CourseRoutes';
import usersRoutes from './routes/UsersRoutes';
import studentRoutes from './routes/StudentRoutes';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:5173",   // your Vite URL
  credentials: true,                 // allow cookies
}));
app.use(express.json());
app.use(cookieParser());
// Debug middleware to log all requests


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Body:`, req.body);
  next();
});

// Handle connection errors
app.use((err: any, req: any, res: any, next: any) => {
  if (err.code === 'ECONNRESET') {
    console.log('Client disconnected');
    return;
  }
  console.error('Unhandled error:', err);
  next(err);
});

// Handle client disconnect
app.use((req, res, next) => {
  req.on('close', () => {
    console.log('Client disconnected during request');
  });
  next();
});

// env variables to use in the connection to the db 
const username = process.env.USERNAME;
const password = process.env.PASSWORD; 
const DBname = process.env.DBNAME;

// MongoDB connection with proper error handling
mongoose.connect(`mongodb+srv://${username}:${password}@educationalmern.am24fdy.mongodb.net/${DBname}?retryWrites=true&w=majority&appName=Educationalmern`)
  .then(() => {
    console.log(`Connected to the database ${DBname} successfully!`);
  })
  .catch((error: any) => {
    console.error('Database connection error:', error);
  });

// using the routes 
app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", usersRoutes);

// starting the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});