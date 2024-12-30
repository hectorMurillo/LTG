const connection = require("./db");
const sql = require("./db");
const path = require('path');

require("dotenv").config()

//Table
// const tableCandidatosEnc = 'candidatosacolaboradoresenc';
// SELECT `IdCandidatosAColaboradoresEnc`,`folio_carta`,`CorreoElectronico`,`Celular`,`Instagram`,`Facebook`,`DescripcionProducto`,`FechaRegistro`,`NombreProyecto`,`IdCategoria`,`IdSubCategoria` FROM candidatosacolaboradoresenc;


const Proveedores = function (proveedor) {
    this.idproveedor = proveedor.idProveedor;
    this.folio_carta = proveedor.folio_carta;
    this.fecha = proveedor.fecha;
    this.aliasProveedor = proveedor.aliasProveedor;
    this.cantCabezales = proveedor.cantCabezales;
    this.cantCajas = proveedor.cantCajas;
    this.costoXCaja = proveedor.costoXCaja;
}

Proveedores.getAll = result => {
    sql.query(`CALL ProcConsultarProveedores(0)`, (err, res) => {
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

 

module.exports = Proveedores;