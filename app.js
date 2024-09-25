require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user_API = require("./src/api/router.js");
const {connectToDB} = require("./src/core/mongodb.js");
const webSocket = require("./src/websocket/websocket.js");
const API_PORT = process.env.API_PORT;

connectToDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api",user_API);

app.listen(API_PORT,()=>{
    console.log(`app running on http://localhost:${API_PORT}`);
});

webSocket;