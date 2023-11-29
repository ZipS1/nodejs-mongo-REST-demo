const mongo = require("./mongo")

module.exports = {
    isValidObjectId: mongo.isValidObjectId,
    insertUser: mongo.insertUser,
    findAll: mongo.findAll,
    findUser: mongo.findUser,
    updateUser: mongo.updateUser,
    deleteUser: mongo.deleteUser,
    deleteAll: mongo.deleteAll,
}