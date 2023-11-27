const http = require("http")
const fs = require("fs")

http.createServer(async (request, response) => {
    if (request.url === "/user") {
        let body = ""
        for await (const chunk of request) {
            body += chunk
        }
        
        let userName
        let userAge
        const fields = body.split("&")
        for (const field of fields){
            const params = field.split("=")
            if (params[0] === "username") userName = params[1]
            if (params[0] === "userage") userAge = params[1]
        }

        console.log(`User name: ${userName}\nUser age: ${userAge}`)
        response.end(`Your name: ${userName}\nYour age: ${userAge}`)
    } 
    else {
        fs.readFile("index.html", (error, data) => response.end(data))
    }
}).listen(3000)