const { UsersModel } = require("../core/mongodb.js");
const { UserExists, UserNotFound, InvalidPassword, UsersFetchError } = require("../core/customError.js");
const { generateToken } = require("../core/auth.js");

class Users {
    static async newUserRegistration(userName, pass, BIO) {
        try {
            const username = userName;
            const password = pass;
            const bio = BIO;

            const foundUser = await UsersModel.findOne({ username: username });
            if (foundUser) {
                throw new UserExists;
            };

            const newUser = new UsersModel({
                username: username,
                password: password,
                bio: bio,
            });
            const createdUser = await newUser.save();
            return createdUser;
        } catch (err) {
            throw err;
        };
    };

    static async userAuthorization(userName, pass) {
        try {
            const username = userName;
            const password = pass;

            const foundUser = await UsersModel.findOne({ username: username });
            if (!foundUser) {
                throw new UserNotFound;
            };
            if (foundUser.password !== password) {
                throw new InvalidPassword;
            };

            const authKey = generateToken(foundUser._id);
            return authKey;
        } catch (err) {
            throw err;
        };
    };

    static async userBioUpdate(_userId, _bio) {
        try {
            const userId = _userId;
            const bio = _bio;

            let updatedUser = await UsersModel.findByIdAndUpdate(
                userId,
                { bio: bio },
                { new: true }
            );
            if (!updatedUser) {
                throw new UserNotFound;
            };
            return updatedUser.bio;
        } catch (err) {
            throw err;
        };
    };

    static async getAllUsers() {
        try {
            const allUsers = await UsersModel.find();
            if (!allUsers) {
                throw new UsersFetchError();
            };
            return allUsers;
        } catch (err) {
            throw err;
        };
    };
};

module.exports = Users;