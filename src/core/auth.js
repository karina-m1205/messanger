//authentication function
const jwt = require("jsonwebtoken");
const secret_key = process.env.secret_key;
const { InvalidToken, } = require("./customError.js");

function generateToken(_id) {
    const id = _id;
    const token = jwt.sign({ id: id }, secret_key);
    return token;
};

function verifyToken(_token) {
    let token = _token;
    token = token.split(" ")[1];
    let userId;
    jwt.verify(token, secret_key, (err, data) => {
        if (err) {
            throw new InvalidToken(err.message);
        };
        userId = data.id;
        return data.id;
    });
    return userId;
};

module.exports = {
    generateToken,
    verifyToken,
};
