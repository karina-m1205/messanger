const { mongoose, Schema } = require("mongoose");

const messagesSchema = new Schema({
    text: String,
    date:Date,
    from: {
        type: Schema.Types.ObjectId,
        ref: "UsersModel",        
    },
    to: {
        type: Schema.Types.ObjectId,
        ref:"UsersModel",
    },
});

const MessagesModel = mongoose.model("messages", messagesSchema);

module.exports = {
    MessagesModel,
};