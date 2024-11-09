const sql = require('./db');

const table = 'etiquetas';

const Etiquetas = function(etiquetas){
    this.nombre = etiquetas.nombre;
    this.status = etiquetas.status;
}

Etiquetas.create = (newCliente, result) => {
    sql.query(`INSERT INTO ${table} SET ?`, newCliente, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newCliente });
    });
};

Etiquetas.findById = (clienteId, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${clienteId}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Etiquetas.getAll = result => {
    sql.query(`SELECT * FROM ${table}`, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Etiquetas.updateById = (id, cliente, result) => {
    sql.query(
        `UPDATE ${table} SET ? WHERE id = ${id}`, [cliente],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...cliente });
        }
    );
};

Etiquetas.remove = (id, result) => {
    sql.query(`UPDATE ${table} SET status='INACTIVO' WHERE id = ?`, id, (err, res) => {
        if (err) {
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

module.exports = Etiquetas;