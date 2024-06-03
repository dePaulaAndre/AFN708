const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

//definindo o objeto produto e seus atributos
const ProdutoSchema = mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "Nome do produto é obrigatório"]
        },
        categoria: {
            type: String,
            required: [true, "A categoria do produto é obrigatória"]
        },
        imagem: {
            type: String,
            required: [true, "A URL da imagem do produto é obrigatória"]
        }
    }
);
    {
        timestamps: true
    }


const Produto = mongoose.model("Produto", ProdutoSchema);

module.exports = Produto; 
