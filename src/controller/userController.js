const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"


const getConnectionPending = async (req, res) => {
    try {

        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "intrested"
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        res.json({
            message: "Data fetched Sucessfully",
            data: connectionRequest,
        })

    } catch (error) {
        res.status(400).send("ERROR: " + error.message)

    }
}

const getAllConnection = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId;
        });

        res.json({ data })


    } catch (error) {
        res.status(400).json(error.message)

    }
}

const getFeed = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        if (!loggedInUser || !loggedInUser._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        const hiddenUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hiddenUsersFromFeed.add(req.fromUserId.toString());
            hiddenUsersFromFeed.add(req.toUserId.toString());
        });

        hiddenUsersFromFeed.add(loggedInUser._id.toString());

        const users = await User.find({
            _id: { $nin: Array.from(hiddenUsersFromFeed) }
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit)

        return res.status(200).json({data:users});

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};



module.exports = { getConnectionPending, getAllConnection, getFeed }