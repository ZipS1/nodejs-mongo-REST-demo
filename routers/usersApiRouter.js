const express = require("express")
const mongo = require("../mongo-api")
const usersApiRouter = express.Router()

usersApiRouter.get("/", async (req, res) => {
    const result = await mongo.findAll()
    if (result.error === undefined)
        res.send(result)
    else
        res.sendStatus(500)
})

usersApiRouter.post("/", async (req, res) => {
    if (req.body === undefined) {
        res.sendStatus(400)
        return
    }

    if (validateUserJson(req.body) == false) {
        res.status(400).send({invalidJson: true})
        return
    }

    const result = await mongo.insertUser(req.body)
    if (result.error === undefined)
        res.send(result)
    else
        res.sendStatus(500)
})

usersApiRouter.put("/:id", async (req, res) => {
    console.log("PUT request handled")
    res.send({mock: true, id: req.params.id})          
})

usersApiRouter.delete("/:id", async (req, res) => {
    console.log("DELETE request handled")
    res.send({mock: true, id: req.params.id})
})

function validateUserJson(userJson) {
    return Object.hasOwn(userJson, 'name')
            && Object.hasOwn(userJson, 'age')
            && Object.keys(userJson).length == 2
            && userJson.name !== ""
            && userJson.age > 0
}

module.exports.usersApiRouter = usersApiRouter