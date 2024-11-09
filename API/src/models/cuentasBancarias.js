const sql = require("./db");

const table = "cuentasBancarias";
const CuentasBancarias = function(cuentas){
    this.numCuenta = cuentas.numCuenta;
    this.clabe = cuentas.clabe;
    this.beneficiario = cuentas.beneficiario;
    this.banco = cuentas.banco;
}

CuentasBancarias.create = (cuentas, result) => {
    sql.query(`INSERT INTO ${table} SET ?`, cuentas, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    
        result(null, { id: res.insertId, ...cuentas });
    });
    
};

CuentasBancarias.select = result => {
        var sqlQuery = `SELECT * FROM ${table} `;
        sql.query(sqlQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
    
            console.log(`${table}: `, res);
            result(null, res);
        });
    };

module.exports = CuentasBancarias;