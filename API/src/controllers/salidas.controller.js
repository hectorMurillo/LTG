const Recepciones = require("../models/salidas");

exports.listar = (req, res) => {
    Recepciones.getAll((err, data) => {
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



