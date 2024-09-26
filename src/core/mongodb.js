const { mongoose } = require("mongoose");
const mongoDB_URI = process.env.mongoDB_URI;

const connectToDB = async () => {
    await mongoose.connect(mongoDB_URI);
    console.log("connected to DB");
};

module.exports = {
    connectToDB,
};


