

const sendConnection = async (req, res) => {
    console.log("send connection request")
    res.send("Request is sending")
}

module.exports ={sendConnection};
