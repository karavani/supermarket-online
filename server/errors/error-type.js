const ErrorType = {
    GENERAL_ERROR: { id: 1, httpCode: 600, message: "A general error ..", isShowStackTrace: false },
    UNAUTHORIZED: { id: 2, httpCode: 401, message: "Login failed, invalid user name or password", isShowStackTrace: false },
    USER_NAME_ALREADY_EXIST: { id: 3, httpCode: 601, message: "User name already exist", isShowStackTrace: false },
    EMAIL_NOT_VALID: { id: 4, httpCode: 602, message: "Incorrect Email Format ", isShowStackTrace: false },
    USER_NOT_AUTHORIZED: { id: 5, httpCode: 603, message: "User not authorized", isShowStackTrace: false },
    DELIVERY_DATE_IS_FULL: { id: 6, httpCode: 604, message: "Delivery date is full", isShowStackTrace: false }
}

module.exports = ErrorType;