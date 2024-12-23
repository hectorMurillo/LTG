module.exports = app => {
    const invetarios = require('../controllers/inventarios.controller');
    const path = "/inventarios";

    app.get(`${path}/listarUltimoLotesRecibidos`, invetarios.listarUltimosLotes);

    // app.post(`${path}/agregar/:idRecepcion`, invetarios.agregar);

    // app.get(`${path}/imagen/:nombreImagen`, recepciones.obtenerImagen)

    // app.post(`${path}/agregar`, upload.single('ImgFlyer'), recepciones.agregar);

    // app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, recepciones.actualizaARevisado);
};


