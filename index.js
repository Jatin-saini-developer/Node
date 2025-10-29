const express = require("express");
const User = require("./src/modal/user");
const connectDB = require("./src/database/mongoDb");
const bcrypt = require("bcrypt");
const {validateSignUpData} = require("./src/utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./src/middleWares/userAuth")
const requestRouter = require("./src/routes/Requests")
const authRouter = require("./src/routes/AuthRouter");
const UserRouter = require("./src/routes/user")
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",  
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/",UserRouter)






// app.post("/login", async(req, res) =>{
//   try{
//     const {email, password} = req.body;

//     const user = await User.findOne({email : email});
//     if(!user){
//       throw new Error("User is not Signed Up, Please Sign Up ");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if(isPasswordValid){

//       const token = jwt.sign({_id : user._id}, "DEV@TINDER69",{expiresIn : "1d"})



//       res.cookie("token", token)
//       res.send("Login Sucessfully");

//     }else{
//       throw new Error("Login Error, Please try again or signUp first");
//     }
    
//   }catch(err){
//     res.status(404).send(err.message)

//   }
// })

// app.get("/profile", userAuth ,async (req, res) => {
//   try {
//     // const { token } = req.cookies;

//     // if (!token) {
//     //   return res.status(401).json({ error: "No token provided" });
//     // }

//     // // Verify token
//     // const decodedMessage = jwt.verify(token, "DEV@TINDER69");
//     // const { _id } = decodedMessage;

//     // Await the DB call
//     // const user = await User.findById(_id);

//     // if (!user) {
//     //   return res.status(404).json({ error: "User not found" });
//     // }

//     const user = req.user;

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ error: "Invalid or expired token" });
//   }
// });


//  app.post("/user", async (req, res) => {
//   const user = new User({
//     firstName: "Jatin",
//     lastName: "Saini",
//     email: "jatinrsaini@gmail.com",
//     password: "jatin123",
//   })

//   await user.save()

//  });





connectDB()
  .then(() => {
    app.listen(7777);
  })
  .catch(() => {
    console.error("DataBase is not connected");
  });
