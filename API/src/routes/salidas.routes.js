module.exports = app => {
    const salidas = require('../controllers/salidas.controller');
    const path = "/salidas";

    app.get(`${path}/listar`, salidas.listar);

    app.post(`${path}/agregarSalidaACentro/`, salidas.agregarSalidaACentro);

    app.post(`${path}/agregarSalidaCaja/`, salidas.agregarSalidaCaja)
};


