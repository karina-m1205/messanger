const { mongoose, Schema } = require("mongoose");

const messagesSchema = new Schema({
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
});

const MessagesModel = mongoose.model("messages", messagesSchema);

module.exports = {
    MessagesModel,
};