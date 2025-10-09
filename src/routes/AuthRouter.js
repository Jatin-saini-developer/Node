const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../modal/user");
const jwt = require("jsonwebtoken");





const AuthRouter = express.Router();

AuthRouter.post("/signUp", async (req, res) => {
  try {
     validateSignUpData(req);


    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const obj = new User({
      firstName,
      lastName,
      password: passwordHash,
      email,
    });

    await obj.save();
    res.send("User signed up successfully");
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).send("Signup error: " + err.message);
  }
});

AuthRouter.post("/logout", async(req, res)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now())
    });

    res.send("Logged Out Sucessfully");
});

AuthRouter.post("/login", async(req, res) =>{
  try{
    const {email, password} = req.body;

    const user = await User.findOne({email : email});
    if(!user){
      throw new Error("User is not Signed Up, Please Sign Up ");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){

      const token = jwt.sign({_id : user._id}, "DEV@TINDER69",{expiresIn : "1d"})



      res.cookie("token", token)
      res.send(user);

    }else{
      throw new Error("Login Error, Please try again or signUp first");
    }
    
  }catch(err){
    res.status(404).send(err.message)

  }
})

module.exports = AuthRouter;