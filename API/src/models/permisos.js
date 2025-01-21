const sql = require("./db");

const table = "menu";

const Menu = function (menu) {
    this.icon = menu.icon;
    this.nombre = menu.nombre;
    this.ruta = menu.ruta;
}

Menu.findByUser = (idUsuario, result) => {
    sql.query(`select menu.* from menu 
    inner join privilegios on menu.id = privilegios.idMenu 
    inner join usuarios on usuarios.tipo = privilegios.idPerfil 
    where usuarios.id = ${idUsuario}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
}

Menu.esProductivo = (result) => {
    sql.query(` SELECT configuracionGeneral.estatus 
                FROM configuracionGeneral
                LIMIT 1 `, (err, res) => {
        if (err) {
            console.log("error ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    })
}

module.exports = Menu;