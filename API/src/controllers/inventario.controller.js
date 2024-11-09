const Inventario = require("../models/inventario");

exports.listar = (req,res)=>{
    Inventario.getAll((err,data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Inventario."
            });
        else res.send(data);
    });
}

exports.agregar = (req,res)=>{
    if (!req.body) {
        res.status(400).send(
            {message: "Los datos no pueden venir vacíos"}
        );
    }
    
    const inventario = new Inventario({
      idSucursal : req.body.idSucursal,
      nombre : req.body.nombre,
      descripcion : req.body.descripcion,
      status:"ACTIVO"
    });

    Inventario.create(inventario, ( err, data )=>{
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Cliente."
            });
        else res.send(data);
    });
};