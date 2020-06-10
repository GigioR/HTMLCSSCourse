const express = require('express')

const server = express()

//pasta publica
server.use(express.static("public"))

//utilizando template engine

const nunJucks = require('nunjucks')
nunJucks.configure("src/views", {
    express: server,
    noCache: true
})



//caminhos do app
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//ligando o servidor
server.listen(3000)