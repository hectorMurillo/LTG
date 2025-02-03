const connection = require("./db");
const sql = require("./db");
const path = require('path');

require("dotenv").config()

const Salidas = function (salida) {
    this.idLote = salida.idLote;
    this.idLoteRef = salida.idLoteRef;
    this.nombreCentro = salida.nombreCentro;
    this.nombreRecibe = salida.nombreRecibe;
    this.cantCajas = salida.cantCajas;
    this.codUsuario = salida.codUsuario;
}

Salidas.getAll = result => {
    sql.query(`CALL ProcConsultarInformacionSalidas()`, (err, res) => {
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


Salidas.createSalidaACentro = (newSalida, result) => {
    let sp = 'CALL ProcAgregarMovimientoSalidaACentro(?,?,?,?,?,?,@pResultado,@pMsg);';
    let params = [
        newSalida.idLote,
        newSalida.idLoteRef,
        newSalida.nombreCentro,
        newSalida.nombreRecibe,
        newSalida.cantCajas,
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
        }
        result(null, info);
    });
}


module.exports = Salidas;




