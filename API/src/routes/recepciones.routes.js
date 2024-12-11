module.exports = app => {
    const recepciones = require('../controllers/recepciones.controller');
    const path = "/recepciones";

    app.get(`${path}/listar`, recepciones.listar);

    app.post(`${path}/agregar/:idRecepcion`, recepciones.agregar);

    // app.get(`${path}/imagen/:nombreImagen`, recepciones.obtenerImagen)

    // app.post(`${path}/agregar`, upload.single('ImgFlyer'), recepciones.agregar);

    // app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, recepciones.actualizaARevisado);
};


