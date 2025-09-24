const express = require("express");
const { ConnectionRequestModel } = require("../modal/ConnectionRequest");
const {User} = require("../modal/user")

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  const allowedStatus = ["interested", "ignored"];
  if(!allowedStatus.includes(status)){
    throw new Error("Invalid Staus Type")
  }

  const toUser = User.findById(toUserId);
  if(!toUser){
    throw new Error("User Does Not Exist");
  }


  const connectionRequest = new ConnectionRequestModel({
    fromUserId,
    toUserId,
    status,
  });

    const existingConnectionRequest = await connectionRequest.findOne({
        $or:[
            {fromUserId, toUserId},
            {fromUserId : toUserId , toUserId : fromUserId}
        ]
    });
    if(existingConnectionRequest){
        return res.send("Invalid Request")
    }


  const data = await connectionRequest.save();
});
