const express = require('express');
const connectDB = require("./config/db");

// Import routes
const register = require('./routes/register')

// Connect to MongoDB atlas cluster
connectDB()

// Create express
const app = express();

// Setup main route
app.get('/', (req,res)=>{
    console.log('Here')
    res.json({'msg':"de"})
})

// Setup routes
app.use("/register",register)

// Setup port
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => console.log(`running server on PORT: ${PORT}`) );