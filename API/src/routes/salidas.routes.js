module.exports = app => {
    const salidas = require('../controllers/salidas.controller');
    const path = "/salidas";

    app.get(`${path}/listar`, salidas.listar);

    app.post(`${path}/agregarSalidaACentro/`, salidas.agregarSalidaACentro);

    // app.get(`${path}/imagen/:nombreImagen`, recepciones.obtenerImagen)

    // app.post(`${path}/agregar`, upload.single('ImgFlyer'), recepciones.agregar);

    // app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, recepciones.actualizaARevisado);
};


