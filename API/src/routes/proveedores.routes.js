
module.exports = app => {
    const proveedores = require('../controllers/proveedores.controller');
    const path = "/proveedores";

    app.get(`${path}/listar`, proveedores.listar);

    // app.post(`${path}/agregar`, proveedores.agregar);
    
    // app.get(`${path}/imagen/:nombreImagen`, recepciones.obtenerImagen)

    // app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, recepciones.actualizaARevisado);
};


