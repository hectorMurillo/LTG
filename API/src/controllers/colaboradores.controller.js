const colaboradores = require("../models/colaboradores");

exports.listarColaboradoresCombo = (req, res) => {
    colaboradores.getColaboradores((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Colaboradores."
            });
        else {
            res.send(data);
        }
    });
}