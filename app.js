const express = require("express")
const app = express()

app.use(express.static("public"))
app.use(express.json())

const mongo = require("./mongo")

app.listen(3000)