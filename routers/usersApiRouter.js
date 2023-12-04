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

usersApiRouter.get("/user", async (req, res) => {
    
    if (validateUserQuery(req.query) == false) {
        res.status(400).send({InvalidGetQuery: true})
        return
    }

    if (mongo.isValidObjectId(req.query.id) == false) {
        res.status(400).send({invalidObjectId: true})
        return
    }

    const result = await mongo.findUser(req.query)
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
    if (req.body === undefined) {
        res.sendStatus(400)
        return
    }

    if (validateUserJson(req.body) == false) {
        res.status(400).send({invalidJson: true})
        return
    }

    const id = req.params.id
    if (mongo.isValidObjectId(id) == false) {
        res.status(400).send({invalidObjectId: true})
        return
    }

    const result = await mongo.updateUser(id, req.body)
    result === null ? res.sendStatus(404) :
    result.error !== undefined ? res.sendStatus(500) :
                                    res.send(result)
})

usersApiRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    if (mongo.isValidObjectId(id) == false) {
        res.status(400).send({invalidObjectId: true})
        return
    }

    const result = await mongo.deleteUser(req.params.id)
    result === null ? res.sendStatus(404) :
    result.error !== undefined ? res.sendStatus(500) :
                                    res.send(result)
})

function validateUserJson(userJson) {
    return Object.hasOwn(userJson, 'name')
            && Object.hasOwn(userJson, 'age')
            && Object.keys(userJson).length == 2
            && userJson.name !== ""
            && userJson.age > 0
}

function validateUserQuery(query) {
    const queryLength = Object.keys(query).length
    return (queryLength == 0 || queryLength > 3)
            && Object.hasOwn(query, 'id')
            && Object.hasOwn(query, 'name')
            && Object.hasOwn(query, 'age')
}

module.exports.usersApiRouter = usersApiRouter