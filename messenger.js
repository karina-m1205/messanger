const express = require("express");
const webSocket = require("ws");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = require("url");

const users = [
    {
        username: "blade",
        password: "tur-kecaki",
        authKey: "bbb-555",
    },
    {
        username: "vampir",
        password: "arundxmem",
        authKey: "vvv-666",
    },
]

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/auth", (req, res) => {
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (currentUser.username == username && currentUser.password == password) {
            return res.send({ authKey: currentUser.authKey });
        };
    };
    res.status(401).send("no such user");
});

app.listen(3000);


const server = new webSocket.Server({ port: 4000 });

server.on("connection", (client, req) => {
    const { query } = url.parse(req.url, true);
    const { authKey } = query;
    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].authKey == authKey) {
            users[i].client = client;
            user = users[i];
        };
    };

    if (!user) {
        client.send("unauthorized");
        client.close();
    } else {
        client.send("welcome to the chat2 " + user.username + " jan");
    };

    client.on("message", (msg) => {
        users.forEach((nextUser)=>{
            nextUser.client.send("from: " + user.username + ".> "+ msg.toString());
        });        
    });
});