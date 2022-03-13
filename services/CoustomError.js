class CoustomError extends Error {

    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;

    }

    static alreadyExist(message) {
        return new CoustomError(409, message);
    }

    static UserNotExist(message) {
        return new CoustomError(401, message);
    }

    static PasswordNotMatch(message) {
        return new CoustomError(401, message);
    }
}

export default CoustomError; 