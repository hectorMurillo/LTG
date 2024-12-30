module.exports = app => {
    const colaboradores = require('../controllers/colaboradores.controller');
    const path = "/colaboradores";

    app.get(`${path}/listaCombo`, colaboradores.listarColaboradoresCombo);

    // app.post(`${path}/agregar/:idRecepcion`, invetarios.agregar);

    // app.get(`${path}/imagen/:nombreImagen`, recepciones.obtenerImagen)

    // app.post(`${path}/agregar`, upload.single('ImgFlyer'), recepciones.agregar);

    // app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, recepciones.actualizaARevisado);
};


