const connection = require("./db");
const sql = require("./db");
const path = require('path');

require("dotenv").config()

const Salida = function (salida) {
    this.idRecepcion = salida.idRecepcion;
    this.folio_carta = salida.folio_carta;
    this.idProveedor = salida.idProveedor;
    this.fechaRecepcion = salida.fechaRecepcion;
    this.aliasProveedor = salida.aliasProveedor;
    this.cantCabezales = salida.cantCabezales;
    this.cantidadTabletas = salida.cantidadTabletas;
    this.numCajas = salida.numCajas;
    this.costoXCaja = salida.costoXCaja;
    this.codUsuario = salida.codUsuario;
    this.subtotal = salida.subtotal;
    this.costoMadera = salida.costoMadera;
    this.costoFlete = salida.costoFlete;
    this.costoDescarga = salida.costoDescarga;
    this.estatusPago = salida.estatusPago;
    this.tipoLote = salida.tipoLote;
    this.idCajeroExterno = salida.idCajeroExterno;
    this.idClienteExterno = salida.idClienteExterno;
}

Recepciones.getAll = result => {
    sql.query(`CALL ProcConsultarRecepciones02(0)`, (err, res) => {
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
    let sp = 'CALL ProcAgregaActualizaRecepcion03(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@pResultado,@pMsg);';
    let params = [
        newsalida.idRecepcion,
        newsalida.folio_carta,
        newsalida.fechaRecepcion,
        newsalida.idProveedor,
        
        newsalida.subtotal,
        newsalida.costoMadera,
        newsalida.costoFlete,
        newsalida.costoDescarga,

        newsalida.cantCabezales,
        newsalida.cantidadTabletas,
        newsalida.numCajas,
        1,
        newsalida.tipoLote,
        newsalida.costoXCaja,
        newsalida.idCajeroExterno,
        newsalida.idClienteExterno
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




