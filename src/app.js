const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const env = require("dotenv");
const employeeRoutes = require("./routes/employee-routes");
const passportConfig = require("./passport/passport-config")
const userRoutes = require("./user/user-routes")

const AWS = require("aws-sdk");


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
app.use(passport.initialize());
app.use(passport.session());


// initialize AWS lambda function
const lmabda = new AWS.Lambda({
  region:process.env.AWS_REGION, // AWS region
})

// Route to invoke lambda function
app.post("api/upload-employee",async(req,res)=>{
  try {
    const payload = {
      employeeData: req.body.employeeData,
      imageBuffer: req.body.imageBuffer
    };

    const lambdaParamas = {
      FunctionName: '', //Lambda function name
            InvocationType: 'RequestResponse', // or 'Event' for async invocation
            Payload: JSON.stringify(payload),
            }
    
    const lambdaResponse = await lmabda.invoke(lambdaParamas).promise();

    const response = JSON.parse(lambdaResponse.Payload);

    res.status(lambdaResponse.StatusCode).json(response);
  }catch(e){
    console.error("Error invoking lambda",e);
    res.status(500).json({error:"Internal server error"});
  }
})


//Set route to the router for endpoints
app.use("/api", employeeRoutes);

app.use("/api",userRoutes);


const port = process.env.PORT || 3000;

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
