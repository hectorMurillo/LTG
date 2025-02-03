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

Inventarios.getUltimosLotesMP = result => {
    sql.query(`CALL ProcConsultarUltimosLotesRecibidosMP()`, (err, res) => {
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


Inventarios.getLotesFuera =  result =>{
    sql.query(`CALL ProcLotesFueraDeLocal()`, (err, res) => {
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

Inventarios.getUltimosLotesCajas = result => {
    sql.query(`CALL ProcConsultarUltimosLotesRecibidosCajas()`, (err, res) => {
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

Inventarios.findConteosByFecha = (fechaIncio,fechaFin,result) => {
    sql.query(`CALL ProcConsultarConteosXFechas('${fechaIncio}','${fechaFin}')`, (err, res) => {
        if (err) {
            result(null,
                {
                    "codigoerror": err.code,
                    "data": []
                });
            return;
        }
        result(null, res);
    });
}

Inventarios.findLoteMPConMargen = (cantidad, result) => {
    sql.query(`CALL ProcConsultarLoteMPConMargen('${cantidad}')`, (err, res) => {
        if (err) {
            result(null,
                {
                    "codigoerror": err.code,
                    "data": []
                });
            return;
        }
        result(null, res);
    });
}


Inventarios.guardarConteoXColaborador = (newConteo, result) => {
    let sp = 'CALL ProcAgregaActualizaConteos04(?,?,?,?,?,?,@pResultado,@pMsg);';
    let params = [
        newConteo.idConteoDiarioEnc == undefined ? null : newConteo.idConteoDiarioEnc,
        newConteo.idConteoDiarioDet == undefined ? null : newConteo.idConteoDiarioDet,
        newConteo.fechaCreate == undefined ? '1900-01-01' : newConteo.fechaCreate,
        newConteo.identificadorDiario,
        newConteo.idUsuarioRegistra,
        newConteo.cantidad
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
            console.log(info);
        }
        result(null, info);
    });
}


module.exports = Inventarios;

