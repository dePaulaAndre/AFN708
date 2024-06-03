const Produto = require("../models/produto.model.js");
const path = require("path");

// Criar produto
const createProduto = async (req, res) => {
    try {
        const { nome, categoria } = req.body;
        const imagem = req.files.imagem;

        // Verificar se o arquivo de imagem foi enviado
        if (!imagem) {
            return res.status(400).json({ message: "Imagem do produto não fornecida" });
        }

        // Salvar a imagem na pasta de uploads
        const imagePath = path.join(__dirname, "../Imagens/", imagem.name);
        await imagem.mv(imagePath);

        // Criar o produto no banco de dados
        const produto = await Produto.create({
            nome,
            categoria,
            imagem: `../APIs/Imagens/${imagem.name}`
        });

        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Recuperar todos os produtos
const getProdutos = async (req, res) => {
    try {   
        const produtos = await Produto.find({});
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Recuperar produto por id     
const getProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findById(id); 
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar produto 
const updateProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, categoria } = req.body;
        let imagem;

        // Verificar se o arquivo de imagem foi enviado
        if (req.files && req.files.imagem) {
            imagem = req.files.imagem;

            // Salvar a imagem na pasta de uploads
            const imagePath = path.join(__dirname, "../Imagens/", imagem.name);
            await imagem.mv(imagePath);
        }

        const updateFields = {};
        if (nome) {
            updateFields.nome = nome;
        }
        if (categoria) {
            updateFields.categoria = categoria;
        }
        if (imagem) {
            updateFields.imagem = `../APIs/Imagens/${imagem.name}`;
        }

        const produto = await Produto.findByIdAndUpdate(id, updateFields, { new: true });

        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        res.status(200).json(produto);
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};


// Excluir produto
const deleteProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByIdAndDelete(id); 

        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        res.status(200).json(produto);
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
};

//exportação das funções
module.exports = {
    getProdutos,
    getProduto,
    createProduto,
    updateProduto,
    deleteProduto
};
