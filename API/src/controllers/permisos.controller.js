const Menu = require("../models/permisos");

exports.listarMenu = (req, res) => {
    var idUsuario = req.params.idUsuario;
    Menu.findByUser(idUsuario, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found menu with id Usuario ${idUsuario}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving menu with id Usuario ${idUsuario}`
                });
            }
        } else {
            res.send(data);
        }
    });
}

exports.verificaProductivo = (req, res) => {
    Menu.esProductivo((err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message:`No se encuentra registro en configuración general.`
                })
            }else{
                res.status(500).send({
                    message: `Error sobre la configuración general.`
                });
            }
        }else{
            res.send(data);
        }
    })
}