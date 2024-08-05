const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");


const usersFilePath = path.join(__dirname,"../user/users.json"); //path to user data file

//Function to read user data from file

const readUserData = () => {
    const dataStr = fs.readFileSync(usersFilePath);
    return JSON.parse(dataStr);
}

//Passport local strategy
passport.use(new LocalStrategy(
    function(username, password, done){
        const users = readUserData();
        const user = users.find(u=>u.username === username);

        
        if (!user){
            return done(null,false , {message:"Incorrect userame."});
        }


        bcrypt.compare(password , user.password, (err,res) => {
            if (err) return done(err);
            if (res){
                return done(null, user)
            }else{
                return done(null, false, {message:"Incorrect password."});
            }
        });
    }
))


//Serialize user
passport.serializeUser(function(user,done){
    done(null,user.username);
});


//Deserialize user
passport.deserializeUser(function(username,done){
    const users = readUserData();
    const user = users.find(u => u.username === username);
    done(null,user);
});
