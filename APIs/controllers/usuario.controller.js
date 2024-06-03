const Usuario = require ("../models/usuario.model.js");

//criar usuario
const createUsuario = async (req, res) =>{
    try{
        const usuario = await Usuario.create(req.body);
        res.status(200).json(usuario);
   }catch(error){
        res.status(500).json({message: error.message})
   }
}

//recuperar todos os usuario
const getUsuarios = async (req, res) =>{
        try{   
            const usuario = await Usuario.find({});
            res.status(200).json(usuario);
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }

//recuperar Usuario por id     
const getUsuario = async (req, res) =>{
    try{
       const { id } = req.params;
       const usuario = await Usuario.findById(id); 
       res.status(200).json(usuario)
   }catch(error){
        res.status(500).json({message: error.message})
   }
};

//alterar Usuario 
const updateUsuario = async (req, res) => {
    try{
        const { id } = req.params;
        const UsuarioAtt = await Usuario.findByIdAndUpdate(id, req.body); 

        if(!Usuario){
            return res.status(404).json({message: "Usuario não encontrado."});
        }

        const UsuarioAtualizado = await Usuario.findById(id);
        res.status(200).json(UsuarioAtualizado)

    }catch(error){
         res.status(500).json({mensagem: error.message})
    }
};

//excluir Usuario
const deleteUsuario = async(req, res) =>{
    try{
        const { id } = req.params;
        const usuarioExcluido = await Usuario.findByIdAndDelete(id); 

        if(!usuarioExcluido){
            return res.status(404).json({message: "Usuario não encontrado."});
        }

        res.status(200).json(usuarioExcluido);
    }catch(error){
         res.status(500).json({message: error.message});
    }
}


module.exports = {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}

