const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraOla(request, response) { 
    response.send("Hello, world!")
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

mostraPorta() 

app.use(router.get("/hello", mostraOla))
app.listen(porta, mostraPorta)