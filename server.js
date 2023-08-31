// Express application
const express = require('express');
const app = express();

// Using mongoose to connect with MongoDB
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Import routes
const register = require('./routes/register')

// Connect to MongoDB atlas cluster using mongoose
mongoose.connect(db)
    .then(()=>{console.log("connected")})
    .catch((error)=>{console.error(error.message)});

// Init middleware (to parse body in JSON format)
app.use(express.json());

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