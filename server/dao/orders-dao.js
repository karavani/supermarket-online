const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function getOrdersNumber() {
    let sql = `SELECT COUNT(*) as ordersNumber from orders;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}



module.exports = {
    getOrdersNumber
};