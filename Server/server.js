const express = require('express');
const app = express();


// getting the routes of the app 
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes')  ;


const cors = require('cors');
const mongoose = require("mongoose");

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies (required for POST requests)
app.use(express.json());


// env variables to use in the connection to the db 
const username = process.env.USERNAME;
const password = process.env.PASSWORD; 
const DBname = process.env.DBNAME;

// MongoDB connection with proper error handling
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.pex7we7.mongodb.net/${DBname}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log(`Connected to the database ${DBname} successfully!`);
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });


  // using the routes 

app.use("/api/auth", require("./routes/auth"));
app.use('/api/cart', cartRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/order', orderRoutes);

// starting the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});



