const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

//definindo o objeto usuário e os seus atributos
const UsuarioSchema = mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "Nome do usário é obrigatório"]
        },
        cpf: {
            type: String,
            required: [true, "O CPF do usuários é obrigatório"]

        },
        senha: {
            type: String,
            required: [true, "A senha do usuário é obrigatória"]

        }
    },
    {
        timestamps: true
    }
);

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario; 
