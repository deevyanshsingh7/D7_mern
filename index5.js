// understanding syntax of app.get 

// there can be more than 1 call back functions in app.get

/*
const express=require("express")

const app = express();
app.get("/health-checkup",function(req,res,next){
    console.log("hi from req1")  // first this gets log on hitting health checkup route in our browsers
    next(); // this built connection with next function so control can reach there and req2 can be logged
},fuunction(req,res){
    console.log("hii from req2")
})

app.listen(3000) 
// multiple req and res can be their with app.get
*/


// USING MIDDLEWARES TO OPTIMIZE CODE AND MAKE SOME PRECHECKS  
const express = require("express");

const app = express();

// Common validation function for username and password
function validateCredentials(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (username !== "Deevyansh" || password !== "pass") {
    res.status(403).json({ msg: "Incorrect username or password" });
     // Early return to prevent further middleware execution
  }

  next();
}

// Route-specific middleware for kidney check
function validateKidneyId(req, res, next) {
  const kidneyId = req.body.kidneyid;

  if (kidneyId !== "1" && kidneyId !== "2") {
    res.status(402).json({ msg: "Invalid kidney ID" });
    
  }

  next();
}

// Routes with appropriate middleware usage
app.get("/health-checkup", validateCredentials, validateKidneyId, (req, res) => {
  // Perform health checkup logic using kidney ID
  res.send("Your health checkup is complete.");
});

app.get("/kidney-check", validateCredentials, validateKidneyId, (req, res) => {
  res.send("Your kidney is healthy.");
});

app.get("/heart-check", validateCredentials, (req, res) => {
  res.send("Your heart is healthy.");
});

app.listen(3008, () => console.log("Server listening on port 3005"));