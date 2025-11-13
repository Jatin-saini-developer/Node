const express = require("express");
const { ConnectionRequestModel } = require("../modal/ConnectionRequest");
const UserRouter = express.Router();
const User = require("../modal/user");

const { userAuth } = require("../middleWares/userAuth");

UserRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .skip(skip)
      .limit(limit);
    res.json({ data: users });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized" });
  }
});

UserRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId")
      .populate("toUserId");

    console.log(connectionRequests);

    const data = connectionRequests.map((row)=>{
      if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    })

    res.json(data);
  } catch (error) {
       res.status(400).send({ message: err.message });
  }
});

module.exports = UserRouter;
