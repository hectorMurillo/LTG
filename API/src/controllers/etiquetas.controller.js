const Etiquetas = require('../models/etiquetas');

exports.agregar = (req,res)=>{
    if (!req.body) {
        res.status(400).send(
            {message: "Los datos no pueden venir vacíos"}
        );
    }
    const etiquetas = new Etiquetas({
      nombre: req.body.nombre,
      status:'ACTIVO'
    });
    Etiquetas.create(etiquetas, ( err, data )=>{
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Cliente."
            });
        else res.send(data);
    });
};

exports.listar = (req,res)=>{
    Etiquetas.getAll((err,data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Clientes."
            });
        else res.send(data);
    });
}

exports.listarById = (req,res)=> {
    var id = req.params.etiquetaId;
    Etiquetas.findById(id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Cliente with id ${id}.`
              });
            } else {
              res.status(500).send({
                message: `Error retrieving Cliente with id ${id}`
              });
            }
          } else res.send(data);

    });
};

exports.baja = (req,res)=>{
    var id = req.params.etiquetaId;
    Etiquetas.remove(id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found cliente with id ${req.params.customerId}.`
              });
            } else {
              res.status(500).send({
                message: "Could not cliente Customer with id " + req.params.customerId
              });
            }
          } else res.send({ message: `Customer was cliente successfully!` });
    });
};