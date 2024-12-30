const connection = require("./db");
const sql = require("./db");
const path = require('path');

require("dotenv").config()

const Colaboradores = function (colaboradores) {
    this.idColaboradores = colaboradores.idColaboradores;
    this.alias = colaboradores.alias;
    this.estatus = colaboradores.estatus;
}

Colaboradores.getColaboradores = result => {
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


module.exports = Colaboradores;