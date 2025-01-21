module.exports = app => {
    const recepciones = require('../controllers/salidas.controller');
    const path = "/salidas";

    app.get(`${path}/listar`, recepciones.listar);

    // app.post(`${path}/agregar/:idRecepcion`, recepciones.agregar);

    // app.get(`${path}/imagen/:nombreImagen`, recepciones.obtenerImagen)

    // app.post(`${path}/agregar`, upload.single('ImgFlyer'), recepciones.agregar);

    // app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, recepciones.actualizaARevisado);
};


