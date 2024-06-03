//importação dos pacotes
const express = require('express');
const mongoose = require('mongoose');
const Produto = require('./models/produto.model.js');
const produtoRota = require('./rotas/produto.rota.js');
const Usuario = require('./models/usuario.model.js');
const usuarioRota = require('./rotas/usuario.rota.js');
const fileUpload = require("express-fileupload");
const basicAuth = require('express-basic-auth');
const cors = require('cors'); 
const path = require('path');
const app = express();

//intermediários
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cors()); // Configuração do CORS para permitir qualquer origem (estava dando erro na chamada do serviço)

//autenticação
app.use(basicAuth({
    users: { 'user': 'user' },
    unauthorizedResponse: 'Unauthorized'
}));

//rotas
app.use("/api/produtos", produtoRota);
app.use("/api/usuario", usuarioRota);

//teste do servidor
app.get('/', (req, res) => {
    res.send("API Node")
});

//conexão com o mongoDB
mongoose.connect("mongodb+srv://depaulapessoab:xqUgIUaPfKG6GTTq@cluster0.1tnjens.mongodb.net/AFN708?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Conectado!');
        app.listen(3000, () => {
            console.log("O servidor está sendo executado na porta 3000")
        });
    })
    .catch(() => {
        console.log('Conexão falhou.');
    });
