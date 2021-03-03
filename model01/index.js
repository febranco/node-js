const express = require('express')

const server = express()

server.use(express.json())


//localhost:3000/teste
// query params = ?teste=1
//route params = /users/1
//resquest body = {"name": "felipe", "email:felipe.branco9@gmail.com"}

//CRUD = Creat, read, update, Delete

//middlewares = manipula os dados da requiseção e respota 

server.use((req, res, next) => {
    console.time('Request')
    console.log(`Metodo: ${req.merthod}; URL: ${req.url}`)

    next();
    console.timeEnd('Request')
})


//function para  middlewares

function checkUserExists(req, res, next){
    if(!res.body.name) {
        return res.status(400).json({ error: 'User not found on request body '})
    }

    return next();
}


//function para verificar o nome no array

function checkUserInarry(req, res, next) {
    const user = user[req.params.index]

    if( !user ){
        return res.status(400).json({ error: 'User does not exist '})
    }

    req.user = user;
    return next();

    
}


//array para teste do CRUD
const users = ['Felipe', 'Damiana', 'Junior']

//get requisição de usuarios 

server.get('/users', (req, res) => {
    return res.json(users)
})


//posição de usuarios 

server.get ('/users/:index ',checkUserInarry, (req, res) => {

    const { index } = req.params;

    return res.json(users[index])
})

//criação de usuarios 

server.post('/users', checkUserExists,(req, res) => {
    const { name } = req.body
    
    users.push(name);

    return res.json(users)
})
// modificação de usuarios
server.put('/users/:index', checkUserExists, checkUserInarry,(req, res) => {
    const { index } = req.params;
    const { name }  = req.body;

    users [index]  = name;
     
    return res.json(users)
})

// deletar usuarios 

server.delete('/users/:index', checkUserInarry,( res, req) => {
     const { index } = req.params;
     users.splice(index,1)

     return res.send();


})

server.listen(3000)