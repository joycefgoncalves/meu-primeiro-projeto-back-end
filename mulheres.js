const express = require("express") //aqui estou iniciando o express

const router = express.Router() //aqui estou configurando a primeira parte da rota
const cors = require('cors') //aqui estou trazendo o pacote cors que permite consumir essa api no front-end

const conectaBancoDeDados = require('./bancoDeDados') //aqui eu estou ligando ao arquivo banco de dados
conectaBancoDeDados() //aqui chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')
const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333 //aqui estou criando a porta


//GET
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasdoBancoDeDados = await Mulher.find()

    response.json(mulheresVindasdoBancoDeDados)
  }catch (erro) {
    console.log(erro)
  }

}
//POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })

try {
  const mulherCriada = await novaMulher.save()
  response.status(201).json(mulherCriada)
} catch (erro){
  console.log()
}

} 
//PATCH
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)
    
    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome
    } 

    if (request.minibio) {
      mulherEncontrada.minibio = request.body.minibio
    }

    if (request.body.imagem) {
      mulherEncontrada= request.body.imagem
    }


    if (request.body.citacao) {
      mulherEncontrada = request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    response.json(mulherAtualizadaNoBancoDeDados)
    
  } catch (erro) {
    console.log(erro)
  }

}

//DELETE

function deletaMulher(request, response) {

  function todasMenosEla(mulher) {
 
    if (mulher.id !== request.params.id) {
 
      return mulher
 
    }
 
  }

  const mulheresQueFicaram = mulheres.filter(todasMenosEla)



  response.json(mulheresQueFicaram)
 
 }



//PORTA
function mostraPorta() {

    console.log("Servidor criado e rodando na porta ", porta)

}

app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei a rota PATCH/mulheres/:id

app.use(router.get('/mulheres', mostraMulheres)) //configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configurei rota post /mulheres
app.listen(porta, mostraPorta) //servidor ouvindo a porta
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei rota DELETE/mulheres