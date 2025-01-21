module.exports = app => {
    const colaboradores = require('../controllers/colaboradores.controller');
    const path = "/colaboradores";

    app.get(`${path}/listaCombo`, colaboradores.listarColaboradoresCombo);

    app.get(`${path}/cajaExternos/listaCombo`, colaboradores.listarCajerosExternosCombo);

    app.get(`${path}/cantidadxcolaborador/:fechaInicio/:fechaFin/:codColaborador`,colaboradores.cantidadTotalesXColaborador)

    app.get(`${path}/historialConteo/pdf/:fechaInicio/:fechaFin/:codColaborador`,colaboradores.reportNominaPdf);

    app.post(`${path}/registraNomina`, colaboradores.registraNomina);
    // app.post(`${path}/agregar/:idRecepcion`, invetarios.agregar);

    // app.get(`${path}/imagen/:nombreImagen`, recepciones.obtenerImagen)

    // app.post(`${path}/agregar`, upload.single('ImgFlyer'), recepciones.agregar);

    // app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, recepciones.actualizaARevisado);
};


