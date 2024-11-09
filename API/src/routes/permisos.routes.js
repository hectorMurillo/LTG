module.exports = app => {
    const menu = require('../controllers/permisos.controller');
    const path="/menu";

    app.get(`${path}/listar/:idUsuario`, menu.listarMenu);

};