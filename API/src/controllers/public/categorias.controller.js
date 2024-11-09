const jsonCategoria = require("../../models/public/categorias");

exports.listar = (req,res)=>{
    jsonCategoria.getAllCategorias((err,data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Clientes."
            });
        else res.send(data);
    });
}