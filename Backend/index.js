const express = require('express');
const path = require('path');
const mdb = require('mongoose');
const dotenv = require('dotenv');
const Signup = require('./models/signupSchema');
const bcrypt = require('bcrypt');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const Login = require('./models/loginSchema');

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());

mdb.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => {
    console.log("MongoDB Connection Unsuccessful", err);
  });

 
app.get("/", (req, res) => {
  res.send("Welcome to the Budget Manager API!");
});
app.post('/signup', async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    var hashedpassword= await bcrypt.hash(password, 10);
    try {
        const newSignup = new Signup({
            firstName:firstName,
            lastName:lastName,
            userName:userName,
           email: email,
           password: hashedpassword
        });

        await newSignup.save();
        res.status(201).send("SignUp Successful");
    } catch (err) {
        res.status(400).send({ message: "SignUp Unsuccessful", error: err.message });
    }
});

app.get('/getsignupdet', async (req, res) => {
    try {
        const signUpdet = await Signup.find();
        res.status(200).json(signUpdet);
    } catch (err) {
        res.status(500).send({ message: "Error Fetching Data", error: err.message });
    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Signup.findOne({ email });
        if (user) {
            const payload={
email:user.email,
userName:user.userName
}
            var isPasswordCorrect= await bcrypt.compare(password, user.password)
            console.log(password,user.password);
            if (isPasswordCorrect) {
            res.status(200).json({message:"Login Successful",IsLoggedIn:true,});
        }
        else{
            res.status(200).json({message:"Login Unsuccessful",IsLoggedIn:false});
          }
        }
         else {
            res.status(401).json({message:"User not found please signup!",IsLoggedIn:false});
        }
    } catch (err) {
        res.status(500).json({message:"Error during login"});
    }
});
const Budget = require('./models/Budget'); 
app.use(express.json());
app.post('/addbudget', async (req, res) => {
    try {
        const { budget } = req.body;
        if (!budget) {
            return res.status(400).json({ message: "Budget is required" });
        }

        const newBudget = new Budget({ budget });
        await newBudget.save();
        
        res.status(201).json({ message: "Budget added successfully", budget: newBudget });
    } catch (err) {
        res.status(500).json({ message: "Error adding budget", error: err.message });
    }
});



app.listen(3003, () => {
  console.log("Server Started ");
});

