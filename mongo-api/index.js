const mongo = require("./mongo")

module.exports = {
    insertUser: mongo.insertUser,
    findAll: mongo.findAll,
    findUser: mongo.findUser,
    updateUser: mongo.updateUser,
    deleteUser: mongo.deleteUser,
    deleteAll: mongo.deleteAll,
}