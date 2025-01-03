// server setup
require("dotenv").config();
const cors=require("cors")
const express=require("express");

const app=express();
const port=7777;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());


//db connection
const dbConnection=require("./db/dbconfig")

//user routes middleware file
const userRoutes=require("./routes/userRoute")
//user routes middleware 
app.use("/api/users",userRoutes);

//authentication middleware file
const authMiddleware=require("./middleware/authMiddleware")
// Questions routes middleware
const questionRoutes = require("./routes/questionRoute");
// app.use("/api", authMiddleware, questionRoutes);
// questions routes middleware
app.use("/api/questions", authMiddleware, questionRoutes);
 // Answers routes middleware
const answerRoutes = require("./routes/answerRoute");
app.use("/api/answers",authMiddleware, answerRoutes);
// Answers routes middleware
// const answerRoutes = require("./routes/answerRoute");
// app.use("/api/answers",authMiddleware, answerRoutes);
// Handle the root URL 
app.get("/", (req, res) => {
   res.send("Welcome to Evangadi Forum API!"); 
  });
async function start(params) {
    try {
    console.log("Connecting to the database...");
    const result = await dbConnection
      .execute("select 'test'")
      

    console.log("Database connection result:", result);
    console.log("Starting server...");
    app.listen(port);
    console.log("Database connection established");
    console.log(`Listening to http://localhost:${port}`);
} catch (error) {
    console.error("Error occurred:", error); // Use error instead of error.message
}


    
}


start();