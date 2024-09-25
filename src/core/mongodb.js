const { mongoose, Schema } = require("mongoose");
const mongoDB_URI = process.env.mongoDB_URI;

const connectToDB = async () => {
    await mongoose.connect(mongoDB_URI);
    console.log("connected to DB");
};

const usersSchema = new Schema({
    username: String,
    password: String,
    bio: String,
});

const UsersModel = mongoose.model("users", usersSchema);

module.exports = {
    connectToDB,
    UsersModel,
};


