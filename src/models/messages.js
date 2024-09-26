const { mongoose, Schema } = require("mongoose");

const messagesSchema = new Schema({
    text: String,
    date: Date.now(),
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: "UsersModel",        
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref:"UsersModel",
    },
});

const messagesModel = mongoose.model("messages", messagesSchema);

module.exports = {
    messagesModel,
};