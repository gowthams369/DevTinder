

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)

    }
}

module.exports ={getProfile}