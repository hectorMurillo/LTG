const inventarios = require("../models/inventarios");

exports.listarUltimosLotes = (req, res) => {
    inventarios.getUltimosLotesMP((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Inventarios."
            });
        else {
            res.send(data);
        }
    });
}

exports.listarUltimosLotesCajas = (req, res) => {
    inventarios.getUltimosLotesCajas((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Inventarios."
            });
        else {
            res.send(data);
        }
    });
}

exports.listarCoteosXFechas = (req, res) => {
    var fechaIncio_ = req.params.fechaInicio;
    var fechaFin_ = req.params.fechaFin;

    // const fechaInicio = new Date(fechaIncio_);
    // const fechaFin =new Date(fechaFin_); 
    // const fechaISOI = fechaInicio.toISOString().slice(0, 10);
    // const fechaISOF = fechaFin.toISOString().slice(0, 10);
    inventarios.findConteosByFecha(fechaIncio_,fechaFin_,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving findConteosByFecha."
            });
        else {
            res.send(data);
        }
    });
}


exports.guardarConteos = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message:"Los datos no pueden venir vacíos"
        });
    }

    const conteo = new Object({
        identificadorDiario: req.body.identificadorDiario,
        idUsuarioRegistra: req.body.idUsuarioRegistra,
        cantidad: req.body.cantidad
    })

    inventarios.guardarConteoXColaborador(conteo,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while guardar conteo x colaborador"
            });
        else{
            res.send(data);
        }
    })
}

