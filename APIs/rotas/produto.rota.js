const express = require("express");
const Produto = require ("../models/produto.model.js");
const rota = express.Router();
const {getProdutos, getProduto, createProduto, updateProduto, deleteProduto} = require ("../controllers/produto.controller.js");


rota.get('/', getProdutos);
rota.get("/:id", getProduto);
rota.post("/", createProduto);
rota.put("/:id", updateProduto);
rota.delete("/:id", deleteProduto);


module.exports = rota; 