const connection = require("./db");
const sql = require("./db");
const path = require('path');

require("dotenv").config()

const colaboradores = function (colaboradores) {
    this.idColaboradores = colaboradores.idColaboradores;
    this.alias = colaboradores.alias;
    this.estatus = colaboradores.estatus;
}

const ControlNomina = function (controlNomina) {
    this.fechaInicio = controlNomina.fechaInicio,
        this.fechaFin = controlNomina.fechaFin,
        this.codColaborador = controlNomina.codColaborador,
        this.cantCajasAPagar = controlNomina.cantCajasAPagar,
        this.pagoPorCaja = controlNomina.pagoPorCaja,
        this.totalAPagar = controlNomina.totalAPagar,
        this.idUsuarioRegistra = controlNomina.idUsuarioRegistra,
        this.pagada = controlNomina.pagada,
        this.monto_descuento = controlNomina.monto_descuento,
        this.descripcionDescuento = controlNomina.descripcionDescuento
}


colaboradores.getColaboradores = result => {
    sql.query(`SELECT * FROM combo_colaboradores`, (err, res) => {
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


colaboradores.getCajerosExternos = result => {
    sql.query(`SELECT * FROM combo_cajerosExternos`, (err, res) => {
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


colaboradores.getCantidadTotalesXColaborador = (fechaIncio, fechaFin, codColaborador, result) => {
    sql.query(`CALL obtener_cantidad_por_colaborador('${fechaIncio}','${fechaFin}',${codColaborador})`, (err, res) => {
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


ControlNomina.guardarControlNomina = (datosNomina, result) => {
    let sp = 'CALL Proc_guardar_control_nomina(?,?,?,?,?,?,?,?,?,?,@pMsg,@pResult);'
    let params = [
        datosNomina.fechaInicio,
        datosNomina.fechaFin,
        datosNomina.codColaborador,
        datosNomina.cantCajasAPagar,
        datosNomina.pagoPorCaja,
        datosNomina.totalAPagar,
        datosNomina.idUsuarioRegistra,
        datosNomina.pagada,
        datosNomina.monto_descuento,
        datosNomina.descripcionDescuento
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
    })
}


colaboradores.getNominaPdf = (fechaIncio,fechaFin,codColaborador,result) => {
    // sql.query(`CALL obtener_cantidad_por_colaborador('${fechaIncio}','${fechaFin}',${codColaborador})`, (err, res) => {
    //     if (err) {
    //         result(null,
    //             {
    //                 "codigoerror": err.code,
    //                 "data": []
    //             });
    //         return;
    //     }
    //     result(null, res);
    // });
    var sqlQuery = `CALL obtener_cantidad_por_colaborador('${fechaIncio}','${fechaFin}',${codColaborador})`
    sql.query(sqlQuery,(err,res,fields)=>{
        if(err){
            console.err(err);
            result(err,null);
            return;
        }else{
            result(null, res);
            return;
        }
    });
}


module.exports = { colaboradores, ControlNomina };