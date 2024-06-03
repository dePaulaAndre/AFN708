const express = require("express");
const Usuario = require ("../models/usuario.model.js");
const rota = express.Router();
const {getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario} = require ("../controllers/usuario.controller.js");


rota.get('/', getUsuarios);
rota.get("/:id", getUsuario);
rota.post("/", createUsuario);
rota.put("/:id", updateUsuario);
rota.delete("/:id", deleteUsuario);


module.exports = rota; 