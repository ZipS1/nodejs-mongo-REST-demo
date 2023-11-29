const express = require("express")
const bodyParser = require("body-parser")
const routers = require("./routers")

const app = express()
app.use(express.static("public", {extensions: ["html"]}))
app.use(bodyParser.json())

const usersApiRouter = routers.usersApiRouter
app.use("/api/users", usersApiRouter)

app.listen(3000)
