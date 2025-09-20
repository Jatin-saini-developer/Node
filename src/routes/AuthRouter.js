const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");


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


module.exports = AuthRouter;