const Proveedores= require("../models/proveedores");

exports.listar = (req, res) => {
    Proveedores.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Proveedores."
            });
        else {
            res.send(data);
        }
    });
}



