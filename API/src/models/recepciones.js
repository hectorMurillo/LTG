const connection = require("./db");
const sql = require("./db");
const path = require('path');

require("dotenv").config()

const Recepciones = function (recepcion) {
    this.idRecepcion = recepcion.idRecepcion;
    this.folio_carta = recepcion.folio_carta;
    this.idProveedor = recepcion.idProveedor;
    this.fechaRecepcion = recepcion.fechaRecepcion;
    this.aliasProveedor = recepcion.aliasProveedor;
    this.cantCabezales = recepcion.cantCabezales;
    this.cantidadTabletas = recepcion.cantidadTabletas;
    this.numCajas = recepcion.numCajas;
    this.costoXCaja = recepcion.costoXCaja;
    this.codUsuario = recepcion.codUsuario;
    this.subtotal = recepcion.subtotal;
    this.costoMadera = recepcion.costoMadera;
    this.costoFlete = recepcion.costoFlete;
    this.costoDescarga = recepcion.costoDescarga;
}

Recepciones.getAll = result => {
    sql.query(`CALL ProcConsultarRecepciones(0)`, (err, res) => {
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


Recepciones.create = (newRecepcion, result) => {
    let sp = 'CALL ProcAgregaActualizaRecepcion(?,?,?,?,?,?,?,?,?,?,?,?,@pResultado,@pMsg);';
    let params = [
        newRecepcion.idRecepcion,
        newRecepcion.folio_carta,
        newRecepcion.fechaRecepcion,
        newRecepcion.idProveedor,
        
        newRecepcion.subtotal,
        newRecepcion.costoMadera,
        newRecepcion.costoFlete,
        newRecepcion.costoDescarga,

        newRecepcion.cantCabezales,
        newRecepcion.cantidadTabletas,
        newRecepcion.numCajas,
        1
    ];
    sql.query(sp, params, (err, res) => {
        let info = null;
        if (err) {
            console.log("error: ", err);
            result(err, null);
            info = err;
            return;
        } else {
            info = { "resultado": res };
            //Si es inscripción correcta se manda correo
            // res[0][0].pResultado ? sendMail() : 0;
        }
        result(null, info);
    });
}


module.exports = Recepciones;

