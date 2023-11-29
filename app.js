const express = require("express")
const app = express()
const routers = require("./routers")

const usersApiRouter = routers.usersApiRouter
app.use("/api/users", usersApiRouter)

app.use(express.static("public", {extensions: ["html"]}))
app.use(express.json())

app.listen(3000)