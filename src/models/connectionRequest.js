const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "intrested", "accepted", "rejected"],
            message: `{VALUE} is incorrect`
        }
    }
})

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself")
    }
    next();
})


connectionRequestSchema.index({fromUserId:1,toUserId:1});

const connectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = connectionRequestModel;