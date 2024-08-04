const {Router} = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersFilePath = path.join(__dirname, 'user/users.json');

// Function to read users from file
const readUsersFromFile = () => {
  let dataStr = fs.readFileSync(usersFilePath);
  return JSON.parse(dataStr);
};

//Function to write users to file
const writeInFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users,null, 2));
}

//Register a new user
router.post("/registerUser", async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password){
        return res.status(400).send("Username and password are required.");
    }

    const users = readUsersFromFile();
    const userExists = users.some(user => user.username === username);


    if (userExists){
        return res.status(400).send('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password,10);
    users.push({username, password:hashedPassword});
    writeInFile(users);
    
    
    res.status(200).send("Uer registered successfully.")
})

module.export = router;