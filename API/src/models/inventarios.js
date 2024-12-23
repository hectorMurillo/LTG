const connection = require("./db");
const sql = require("./db");
const path = require('path');

require("dotenv").config()

const Inventarios = function (inventarios) {
    this.IDLOTE = inventarios.IDLOTE;
    this.FECHAINICIO = inventarios.FECHAINICIO;
    this.FECHAFIN = inventarios.FECHAFIN;
    this.OBSERVACION = inventarios.OBSERVACION;
    this.ELABORADOS = inventarios.ELABORADOS;
    this.PORELABORAR = inventarios.PORELABORAR;
    this.ULTFECHAACTUALIZACION = inventarios.ULTFECHAACTUALIZACION;
    this.proveedor = inventarios.proveedor;
    this.usuario = inventarios.usuario;
    this.porcentaje_elaborados = inventarios.porcentaje_elaborados;
}

Inventarios.getUltimosLotes = result => {
    sql.query(`CALL ProcConsultarUltimosLotesRecibidos()`, (err, res) => {
        if (err) {
            result(null,
                {
                    "codigoerror": err.code,
                    "data": []
                });
            return;
        }
        result(null, res[0]);
    });
}


// Recepciones.create = (newRecepcion, result) => {
//     let sp = 'CALL ProcAgregaActualizaRecepcion02(?,?,?,?,?,?,?,?,?,?,?,?,@pResultado,@pMsg);';
//     let params = [
//         newRecepcion.idRecepcion,
//         newRecepcion.folio_carta,
//         newRecepcion.fechaRecepcion,
//         newRecepcion.FECHAFIN,
        
// OBSERVACION         newRecepcion.subtotal,
//         ELABORADOS.costoMadera,
//         PORELABORAR.costoFlete,
//         ULTFECHAACTUALIZACION.costoDescarga,

//         newRecepcion.cantCabezales,
//         newRecepcion.cantidadTabletas,
//         newRecepcion.numCajas,
//         1
//     ];
//     sql.query(sp, params, (err, res) => {
//         let info = null;
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             info = err;
//             return;
//         } else {
//             info = { "resultado": res };
//             //Si es inscripción correcta se manda correo
//             // res[0][0].pResultado ? sendMail() : 0;
//         }
//         result(null, info);
//     });
// }


module.exports = Inventarios;

