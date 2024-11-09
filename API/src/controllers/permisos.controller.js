const Menu = require("../models/permisos");

exports.listarMenu = (req,res) => {
    var idUsuario = req.params.idUsuario;
    Menu.findByUser(idUsuario,(err,data)=>{
      if(err){
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found menu with id Usuario ${idUsuario}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving menu with id Usuario ${idUsuario}`
          });
        }
      }else{
        res.send(data);
      }
    });
  }