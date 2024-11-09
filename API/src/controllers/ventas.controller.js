const DetalleVentas = require("../models/detalleVentas");
const Ventas = require("../models/ventas");

exports.agregar = (req, res) => {
    if (!req.body) {
        res.status(400).send(
            {message: "Los datos no pueden venir vacíos"}
        );
    }

    const venta = new Ventas({
        idCliente:req.body.idCliente,
        totalPagar: req.body.totalPagar,
        totalProductos:req.body.totalProductos,
        totalPagando:req.body.totalPagando,
        cambio:req.body.cambio,
        idUsuario: req.body.idUsuario
    });

    Ventas.create(venta, req.body.detalles,(err, data)=>{
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Ventas."
            });
        else res.send(data);
    });
}
exports.actualizar = (req,res)=>{
    if (!req.body) {
        res.status(400).send(
            {message: "Los datos no pueden venir vacíos"}
        );
    }

    var id = req.params.ventasId;
    const venta = new Ventas({
        idCliente:req.body.idCliente,
        totalPagar: req.body.totalPagar,
        totalProductos:req.body.totalProductos,
        totalPagando:req.body.totalPagando,
        cambio:req.body.cambio,
        idUsuario: req.body.idUsuario
    });
    
    Ventas.update(id, venta, req.body.detalles,(err,data)=>{
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while updatig ventas the Ventas."
            });
        else res.send(data);
    });
}

exports.listado = (req,res)=>{
    Ventas.getAll((err,data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Clientes."
            });
        else res.send(data);
    });
}

exports.listadoDevolucion = (req,res) => {
    Ventas.getAllDevolucion((err,data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Clientes."
            });
        else res.send(data);
    });
}

exports.baja = (req,res)=>{
    var id = req.params.ventasId;
    Ventas.cancel(id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found venta with id ${req.params.customerId}.`
              });
            } else {
              res.status(500).send({
                message: "Could not venta with id " + req.params.customerId
              });
            }
          } else res.send({ message: `Venta was low successfully!` });
    });
}

exports.listadoVenta = (req,res) => {
    var id = req.params.ventaId;
    Ventas.findById(id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Venta with id ${id}.`
              });
            } else {
              res.status(500).send({
                message: `Error retrieving Venta with id ${id}`
              });
            }
          } else res.send(data);
    });
}

exports.detallesVenta = (req,res) => {
    var id = req.params.ventaId;
    DetalleVentas.findById(id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Detalles Venta with id ${id}.`
              });
            } else {
              res.status(500).send({
                message: `Error retrieving Detalles Venta with id ${id}`
              });
            }
          } else res.send(data);
    });
}
