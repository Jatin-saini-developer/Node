const mongoose = require("mongoose");

const connectDB = async () => 
    {
      await mongoose.connect("mongodb+srv://jatinrsaini:jzNEbw1PhPPkD895@clustersecondary.ndvixgv.mongodb.net/")
    }

module.exports = connectDB;