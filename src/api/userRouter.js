const express = require("express");
const Users = require("../services/users.js");
const router = express.Router();
const { verifyToken } = require("../core/auth.js");

router.use("/users/:id", async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).send(JSON.stringify({ message: "Unauthorized access" }));
        };
        verifyToken(token);
        return next();
    } catch (err) {
        return res.status(err.code).send(JSON.stringify({ error: err.message }));
    };
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, bio } = req.body;
        if (typeof username !== "string") {
            return res.status(400).json({ message: "username must be a string" });
        };
        if (username.trim() === "") {
            return res.status(400).json({ message: "username required" });
        };
        if (typeof password !== "string") {
            return res.status(400).json({ message: "password must be a string" });
        };
        if (password.trim() === "") {
            return res.status(400).json({ message: "password required" });
        };
        if (typeof bio !== "string") {
            return res.status(400).json({ message: "bio must be a string" });
        };
        if (bio.trim() === "") {
            return res.status(400).json({ message: "bio required" });
        };

        const newUser = await Users.newUserRegistration(username, password, bio);
        return res.status(201).send(JSON.stringify({ message: "you have successfully registered" }));
    } catch (err) {
        return res.status(err.code).send(JSON.stringify({ error: err.message }));
    };
});

router.post("/auth", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (typeof username !== "string") {
            return res.status(400).json({ message: "username must be a string" });
        };
        if (username.trim() === "") {
            return res.status(400).json({ message: "username required" });
        };
        if (typeof password !== "string") {
            return res.status(400).json({ message: "password must be a string" });
        };
        if (password.trim() === "") {
            return res.status(400).json({ message: "password required" });
        };

        const { authKey, id } = await Users.userAuthorization(username, password);
        return res.status(200).send(JSON.stringify({ authKey: authKey, id: id }));
    } catch (err) {
        return res.status(err.code).send(JSON.stringify({ error: err.message }));
    };
});

router.patch("/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const { bio } = req.body;
        if (typeof userId !== "string") {
            return res.status(400).json({ message: "user id must be a string" });
        };
        if (userId.trim() === "") {
            return res.status(400).json({ message: "user id required" });
        };
        if (typeof bio !== "string") {
            return res.status(400).json({ message: "bio must be a string" });
        };
        if (bio.trim() === "") {
            return res.status(400).json({ message: "bio required" });
        };

        const updatedUserBio = await Users.userBioUpdate(userId, bio);
        return res.status(200).send(JSON.stringify({ message: `bio: ${updatedUserBio}` }));
    } catch (err) {
        return res.status(err.code).send(JSON.stringify({ error: err.message }));
    };
});

router.get("/users", async (req, res) => {
    try {
        const users = await Users.getAllUsers();
        if (!users) {
            return res.status(404).json({ message: "users not found" });
        };
        return res.json(users);
    } catch (err) {
        return res.status(err.code).send(JSON.stringify({ error: err.message }));
    };
});

module.exports = router;