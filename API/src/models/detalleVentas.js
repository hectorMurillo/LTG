const sql = require('./db');
//Table
const table = 'detalleVenta'
// Clase Ventas
const DetalleVentas = function(detalleVenta){
    this.idVenta = detalleVenta.idVenta;
    this.idProducto=detalleVenta.idProducto;
    this.productoNombre=detalleVenta.productoNombre;
    this.cantidad=detalleVenta.cantidad;
    this.precio=detalleVenta.precio;
}

DetalleVentas.create = (newDetallesVenta, result) => {
    sql.query(`INSERT INTO ${table} SET ?`, newDetallesVenta, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newDetallesVenta });
    });
};

DetalleVentas.update = (id,detalleVenta, result) => {
    sql.query(
        `UPDATE ${table} SET ? WHERE idVenta = ${id}`, [detalleVenta],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...detalleVenta });
        }
    );
}

DetalleVentas.findById = (ventaId, result) => {
    sql.query(`SELECT * FROM ${table} WHERE idVenta = ${ventaId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found ${table}: `, res[0]);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = DetalleVentas;