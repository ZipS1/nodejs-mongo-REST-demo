const express = require("express")
const usersApiRouter = express.Router()

usersApiRouter.get("/", (req, res) => {
    console.log("GET request handled")
    res.send({mock: true})
})

usersApiRouter.post("/", (req, res) => {
    console.log("POST request handled")
    res.send({mock: true})
})

usersApiRouter.put("/:id", (req, res) => {
    console.log("PUT request handled")
    res.send({mock: true, id: req.params.id})          
})

usersApiRouter.delete("/:id", (req, res) => {
    console.log("DELETE request handled")
    res.send({mock: true, id: req.params.id})
})

module.exports.usersApiRouter = usersApiRouter