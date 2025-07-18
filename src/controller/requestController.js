const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

const sendConnection = async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "intrested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type:" + status })
        }

        const toUser = await User.findById({ _id: toUserId });
        if (!toUser) {
            return res.status(400).json({ message: "User not found" })
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        })
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection alredy send" })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.json({
            message:
                req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        })

    } catch (error) {
        res.status(400).send(error.message)

    }
}

const reviewRequest = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Status is not allowed" })
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "intrested"
        });
        if (!connectionRequest) {
            return res
                .status(400)
                .json({ message: "Connectionm request not found" })
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request " + status,
            data,
        })


    } catch (error) {

        res.status(400).send(error.message)
    }

}


module.exports = { sendConnection, reviewRequest }