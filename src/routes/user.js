const express = require("express");

const AuthRouter = express.Router();

const userAuth = require("../middleWares/userAuth")
AuthRouter.get("/feed", userAuth ,async()=>{

})