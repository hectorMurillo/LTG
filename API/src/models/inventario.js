const sql = require("./db");
//table
const table = 'inventario';
//Inventario
const Inventario = function(inventario){
    this.idSucursal = inventario.idSucursal;
    this.nombre = inventario.nombre;
    this.descripcion = inventario.descripcion;
    this.status = inventario.status;
}
 
Inventario.create = (inventario, result) => {
    sql.query(`INSERT INTO ${table} SET ? `, inventario, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...inventario });
    });
};

Inventario.findById = (inventarioId, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${inventarioId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found ${table}: `, res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Inventario.getAll = result => {
    sql.query(`SELECT * FROM ${table} where status='ACTIVO'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`${table}: `, res);
        result(null, res);
    });
};

Inventario.updateById = (id, inventario, result) => {
    sql.query(
        `UPDATE ${table} SET ? WHERE id = ${id}`, [inventario],
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

            result(null, { id: id, ...inventario });
        }
    );
};

Inventario.remove = (id, result) => {
    sql.query(`UPDATE ${table} SET status='INACTIVO' WHERE id = ${id}?`, (err, res) => {
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

        result(null, res);
    });
};

module.exports = Inventario;