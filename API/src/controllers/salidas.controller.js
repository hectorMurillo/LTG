const Salidas = require("../models/salidas");

exports.listar = (req, res) => {
    Salidas.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving salidas."
            });
        else {
            res.send(data);
        }
    });
}

exports.agregarSalidaACentro = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Los datos no pueden venir vacíos"
        });
    }
    const salida = new Salidas({
        idLote: req.body.idLote == "NULL" ? null : req.body.idLote,
        idLoteRef: req.body.idLoteRef,
        nombreCentro: req.body.nombreCentro,
        nombreRecibe: req.body.nombreRecibe,
        cantCajas: req.body.cantCajas,
        codUsuario: req.body.codUsuario
    });
    Salidas.createSalidaACentro(salida, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cliente."
            });
        else {
            res.send(data);
        }
    })
}


// exports.agregar = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({
//             message: "Los datos no pueden venir vacíos"
//         });
//     }
//     const recepcion = new Recepciones({
//         idRecepcion: req.body.idRecepcion == "NULL" ? null : req.body.idRecepcion,
//         fechaRecepcion: req.body.fechaRecepcion,
//         idProveedor: req.body.idProveedor,
//         subtotal: req.body.subtotal,
//         costoMadera: req.body.costoMadera,
//         costoFlete: req.body.costoFlete,
//         costoDescarga: req.body.costoDescarga,
//         cantCabezales: req.body.cantCabezales,
//         cantidadTabletas: req.body.cantidadTabletas,
//         numCajas: req.body.numCajas,
//         codUsuario: req.body.codUsuario,
//         folio_carta: req.body.folio_carta,
//         costoXCaja: req.body.costoXCaja,
//         tipoLote: req.body.tipoLote,
//         costoXCaja: req.body.costoXCaja,
//         idCajeroExterno: req.body.idCajeroExterno,
//         idClienteExterno: req.body.idClienteExterno
//     });

//     Recepciones.create(recepcion, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Cliente."
//             });
//         else {
//             res.send(data);
//             //Enviar correo
//             // enviarCorreo("hola@todochilo.com","c21.hector@gmail.com",req.body);

//         }
//     })
// }



