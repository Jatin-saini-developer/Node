const express = require("express");
const User = require("./src/modal/user");
const connectDB = require("./src/database/mongoDb");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./src/utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req, res) => {
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



app.post("/login", async(req, res) =>{
  try{
    const {email, password} = req.body;

    const user = await User.findOne({email : email});
    if(!user){
      throw new Error("User is not Signed Up, Please Sign Up ");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){

      const token = jwt.sign({_id : user._id}, "DEV@TINDER69")



      res.cookie("token", token)
      res.send("Login Sucessfully");

    }else{
      throw new Error("Login Error, Please try again or signUp first");
    }
    
  }catch(err){
    res.status(404).send(err.message)

  }
})

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token
    const decodedMessage = jwt.verify(token, "DEV@TINDER69");
    const { _id } = decodedMessage;

    // Await the DB call
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});


 app.post("/user", async (req, res) => {
  const user = new User({
    firstName: "Jatin",
    lastName: "Saini",
    email: "jatinrsaini@gmail.com",
    password: "jatin123",
  })

  await user.save()

 });



connectDB()
  .then(() => {
    app.listen(7777);
  })
  .catch(() => {
    console.error("DataBase is not connected");
  });
