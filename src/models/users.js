const { mongoose, Schema } = require("mongoose");

const usersSchema = new Schema({
    username: String,
    password: String,
    bio: String,
});

const UsersModel = mongoose.model("users", usersSchema);

module.exports = {
    UsersModel,
};

