const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const couponLisitng=require('../CouponHub_/models/couponListing.js');

const MONGOURL="mongodb://127.0.0.1:27017/CouponHub"

const app = express();
const PORT = 8008;

main().then(()=>{
  console.log("Database Connected");
}).catch((err)=>{
  console.log(err);
  console.log("Error in Database Connection");
})

async function main() {
  await mongoose.connect(MONGOURL);
}

app.get("/testcouponListing",async(req,res)=>{
  let sampleListing=new couponLisitng({
    code:"12we",
    OrganizationName:"zomato",
    Title:"50% off",
    price:4,
    date:"4/5/25",
    image:"https://akm-img-a-in.tosshub.com/businesstoday/images/story/201711/zomato-fact-sheet_660_052417055850_111517063712.jpg",
    TandC:"anyone can access",
    
  }) ;
  await sampleListing.save();
  console.log("Sample was saved");
});

// Middleware for session
app.use(session({
    secret: "yourSecretKey", 
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('CouponHub/public'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public"))); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("index"); 
});
// Route: Sign In Page
app.get("/signin", (req, res) => {
  res.render("signin", { user: req.session.user });
});

// Route: Sign Up Page
app.get("/signup", (req, res) => {
  res.render("signup", { user: req.session.user });
});

// Route: Logout (Destroy Session)
app.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Route: Validate User (Login Handling)
app.post("/validateUser", (req, res) => {
  const { Email, Password } = req.body;

  // Hardcoded Example - Replace with Database Logic
  if (Email === "user@example.com" && Password === "password123") {
      req.session.user = Email; // Store user session
      res.redirect("/"); // Redirect to homepage after login
  } else {
      res.render("signin", { user: null, error: "Invalid email or password!" });
  }
});
// Route: Sign Up Page
app.get("/signup", (req, res) => {
  res.render("signup");
});
// Route: Register User (Signup Handling)
app.post("/addUser", (req, res) => {
  const { Name, Email, Phone, Password, ConfirmPassword } = req.body;

  if (Password !== ConfirmPassword) {
      return res.send("Passwords do not match! <a href='/signup'>Try Again</a>");
  }

  // Save user to database (Replace with actual DB logic)
  console.log(`New User Registered: ${Name}, ${Email}, ${Phone}`);
  req.session.user = Name; // Store user session
  res.redirect("/"); // Redirect to homepage after signup
});
//get all couponss
app.get("/allCoupons", async (req, res) => {
  // Mock Data (Replace with Database Query)
  const coupons = [
      { cid: 1, title: "Domino's Discount", tc: "Get 20% off", photo: "dominos.png" },
      { cid: 2, title: "Offer", tc: "Rs. 100 Cashback", photo: "images.png" },
      { cid: 3, title: "Zomato Offer", tc: "Flat 30% off", photo: "noise.png" }
  ];

  res.render("allCoupons", { coupons });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
