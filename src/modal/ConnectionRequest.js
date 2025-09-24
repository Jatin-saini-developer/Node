const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    statusbar: {
      type: String,
      enum: {
        values: ["ignored", "intersted", "rejected", "accepted"],
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("you cannot send the connection request to yourself");
    }

    next()

})

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel", connectionRequestSchema);

module.exports = {
    ConnectionRequestModel
};