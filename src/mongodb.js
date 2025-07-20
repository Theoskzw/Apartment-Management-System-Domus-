const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`🔥 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

// to enter the documents into the databse we need a schema
const userSchema = new mongoose.Schema({
    name1: String,
    name2: String,
    username: String,
    password: String,
    email: String,
    flatno: String
});

// Create the User model
const User = mongoose.model("User", userSchema);
//the collection name is "user"

module.exports = { connectDb, User };
