const express = require("express");
const { MessagesModel } = require("../models/messages.js");

const router = express.Router();

router.get("/messages", async (req, res) => {
    try {
        const { userId, targetId } = req.query;

        if (typeof userId !== "string") {
            return res.status(400).json({ message: "user id must be a string" });
        };
        if (userId.trim() === "") {
            return res.status(400).json({ message: "user id required" });
        };
        if (typeof targetId !== "string") {
            return res.status(400).json({ message: "target id must be a string" });
        };
        if (targetId.trim() === "") {
            return res.status(400).json({ message: "target id required" });
        };

        const allMessages = await MessagesModel
            .find({
                $or: [
                    { from: userId, to: targetId },
                    { from: targetId, to: userId }
                ]
            })
            .sort({ createdAt: 1 })
            .populate("from");

        return res.status(200).send(JSON.stringify(allMessages));
    } catch (err) {
        return res.status(err.code).send(JSON.stringify({ error: err.message }));
    };
});

module.exports = router;