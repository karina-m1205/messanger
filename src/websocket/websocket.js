const webSocket = require("ws");
const url = require("url");
const { UsersModel } = require("../core/mongodb.js");
const { verifyToken } = require("../core/auth.js");
const webSocket_PORT = process.env.webSocket_PORT;

const server = new webSocket.Server({ port: webSocket_PORT });
let allClientsOnLine = new Map();

server.on("connection", async (client, req) => {
    let id;
    let foundUser;
    try {
        const { query } = url.parse(req.url, true);
        let { authKey } = query;
        if (!authKey) {
            throw new Error("Authentication key is missing");
        };
        authKey = `Bearer ${authKey}`;
        id = verifyToken(authKey);

        foundUser = (await UsersModel.findById(id));
        if (!foundUser) {
            throw new Error("User not found");
        };

        allClientsOnLine.set(id, {
            client: client,
            username: foundUser.username,
        });
        client.send(JSON.stringify({ message: "Hi " + foundUser.username }));
    } catch (err) {
        client.send(JSON.stringify({ message: err.message }));
        client.close();
        return;
    };

    client.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg.toString());
        const { userId, message } = parsedMsg;
        const targetClient = allClientsOnLine.get(userId);
        
        if (!targetClient) {
            console.log(`User ${userId} is not online`);
            return;
        };
        targetClient.client.send(`from: ${foundUser.username} ---> ${message}`);
    });

    client.on("close", () => {
        if (id) {
            allClientsOnLine.delete(id);
        };
        console.log(`${foundUser.username} disconnected`);
    });
});

module.exports = server;