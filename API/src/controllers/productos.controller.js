const Productos = require("../models/productos");


exports.agregar = (req,res)=>{
    if (!req.body) {
        res.status(400).send(
            {message: "Los datos no pueden venir vacíos"}
        );
    }
    const productos = new Productos({
        idInventario : req.body.idInventario,
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        stock : req.body.stock,
        stockMinimo : 0,
        stockMaximo : 0,
        costoUnitario : 0,
        precioUnitario : 0,
        marca: req.body.marca,
        modelo: req.body.modelo,
        descripcion: req.body.descripcion,
        idEtiqueta: req.body.idEtiqueta
    });
    Productos.create(productos, ( err, data )=>{
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Cliente."
            });
        else res.send(data);
    });
};

exports.listar = (req,res)=>{
    Productos.getAll((err,data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving productos."
            });
        else res.send(data);
    });
}

exports.listarNombreMarcaModelo = (req,res) => {
  var nombre = req.params.nombre;
  Productos.findByFiltersNombreMarcaModelo(nombre,(err,data)=>{
    if(err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found producto with ${nombre}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving producto with ${nombre}`
        });
      }
    }else{
      res.send(data);
    }
  });
}

exports.listarById = (req,res)=> {
    var id = req.params.productoId;
    Productos.findById(id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found producto with id ${id}.`
              });
            } else {
              res.status(500).send({
                message: `Error retrieving producto with id ${id}`
              });
            }
          } else res.send(data);

    });
};

exports.actualizar = (req,res)=>{
    if (!req.body) {
        res.status(400).send(
            {message: "Los datos no pueden venir vacíos"}
        );
    }

    var id = req.params.productoId;
    const productos = new Productos({
        idInventario : req.body.idInventario,
        codigo : req.body.codigo,
        nombre : req.body.nombre,
        stock : req.body.stock,
        stockMinimo : req.body.stockMinimo,
        stockMaximo : req.body.stockMaximo,
        costoUnitario : req.body.costoUnitario,
        precioUnitario : req.body.precioUnitario,
        marca: req.body.marca,
        modelo: req.body.modelo,
        descripcion: req.body.descripcion,
        idEtiqueta: req.body.idEtiqueta
    });
    Productos.updateById(id,productos,(err,data)=>{
        if (err) { 
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Cliente with id ${id}.`
              });
            } else {
              res.status(500).send({
                message: `Not found Cliente with id ${id}.`
              });
            }
          } else res.send(data);
    });
};

exports.baja = (req,res)=>{
    var id = req.params.productoId;
    Productos.remove(id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found cliente with id ${req.params.customerId}.`
              });
            } else {
              res.status(500).send({
                message: "Could not producto with id " + req.params.customerId
              });
            }
          } else res.send({ message: `Customer was productos successfully!` });
    });
};

exports.listarByInventario = (req,res) =>{
  var id = req.params.inventarioId;
  Productos.findByIdInventario(id,(err,data) => {
      if(err)
          res.status(500).send({
              message:
                  err.message || "Some error ocurred while retrivieving productos."
          });
      else res.send(data);
  });
}

exports.listarByCodigo = (req,res) => {
  var codigo = req.params.codigo;
  Productos.findByCodigo(codigo,(err,data) => {
      if(err)
          res.status(500).send({
              message:
                  err.message || "Some error ocurred while retrivieving productos."
          });
      else res.send(data);
  });
}