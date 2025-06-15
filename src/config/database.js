const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://namaste:RNvJEMb73dBCFXPs@cluster0.471mwqs.mongodb.net/devTinder";
    await mongoose.connect(uri, {
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = connectDB;
