let ErrorType = {
    GENERAL_ERROR: { id: 1, httpCode: 600, message: "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'", isShowStackTrace: true },
    UNAUTHORIZED: { id: 2, httpCode: 401, message: "Login failed, invalid user name or password", isShowStackTrace: true },
    USER_NAME_ALREADY_EXIST: { id: 3, httpCode: 601, message: "User name already exist", isShowStackTrace: true },
    EMAIL_NOT_VALID: { id: 4, httpCode: 602, message: "Incorrect Email Format ", isShowStackTrace: true }
}

module.exports = ErrorType;