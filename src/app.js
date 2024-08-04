const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const env = require("dotenv");
const employeeRoutes = require("./routes/employee-routes");
const passportConfig = require("./passport-config")

env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave : false,
  saveUninitialized:false
}));

//passport middleware
passport.use(passport.initialize());
passport.use(passport.session());

const port = process.env.PORT || 3000;

//Set route to the router for endpoints
app.use("/api", employeeRoutes);

//Funxtino for starting application
const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Application is running on ${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

//Starting application
start();
