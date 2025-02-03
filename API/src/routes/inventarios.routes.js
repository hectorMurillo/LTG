module.exports = app => {
    const invetarios = require('../controllers/inventarios.controller');
    const path = "/inventarios";

    app.get(`${path}/listarUltimoLotesRecibidosMP`, invetarios.listarUltimosLotes);

    app.get(`${path}/listarUltimoLotesRecibidosCajas`, invetarios.listarUltimosLotesCajas);

    app.get(`${path}/listarConteosXFechas/:fechaInicio/:fechaFin`,invetarios.listarCoteosXFechas)

    app.get(`${path}/listarLotesFueraLocal/`,invetarios.listarLotesFueraLocal)

    app.post(`${path}/agregarConteo`, invetarios.guardarConteos);
    
    app.get(`${path}/obtenerMPConMargen/:cantidad`, invetarios.obtenerMPConMargen);

    // app.get(`${path}/imagen/:nombreImagen`, recepciones.obtenerImagen)

    // app.post(`${path}/agregar`, upload.single('ImgFlyer'), recepciones.agregar);

    // app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, recepciones.actualizaARevisado);
};


