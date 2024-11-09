const sql = require('./db');

//Table
const table = 'usuarios';

//Usuario 
const Login = function(usuario) {
    this.email = usuario.email;
    this.password = usuario.password;
};

Login.findByUserAndPassword = (email, password, result) => {
    sql.query(`SELECT * FROM ${table} WHERE email = '${email}' and password = md5('${password}') and status = true`,
        (err, res) => {
            if (err) {
                console.log(`Error en la consulta: ${err}`);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found customer: ", res[0]);
                result(null, res[0]);
                return;
            }

            // result({ kind: "not_found" }, null);
            result({ kind: "not_found" }, null);

        });
};

module.exports = Login;

