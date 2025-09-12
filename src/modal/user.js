const mongoose = require("mongoose");
const validator = require("validator"); 


const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email")
        }
      }
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    about: {
      type: String,
      default: "i am in Tech",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
