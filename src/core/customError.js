class CustomError extends Error{
    constructor(msg,code){
        super(msg);
        this.code = code;
    };
};

class UserExists extends CustomError{
    constructor(){
        super("user already exists",409);
    };
};

class UserNotFound extends CustomError{
    constructor(){
        super("user not found",404);
    };
};

class InvalidPassword extends CustomError {
    constructor() {
        super("invalid password", 400);
    };
};

class InvalidToken extends CustomError{
    constructor(message){
        super(message, 401);
    };
};

class UsersFetchError extends CustomError{
    constructor(){
        super("could not fetch users",404);
    };
};

module.exports = {
    UserExists,
    UserNotFound,
    InvalidPassword,
    InvalidToken,
    UsersFetchError
}