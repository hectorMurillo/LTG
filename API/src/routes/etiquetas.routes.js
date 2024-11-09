module.exports = app => {
    const etiquetas = require('../controllers/etiquetas.controller');
    const path="/etiquetas";

    app.post(`${path}/agregar`,etiquetas.agregar);

    app.get(`${path}/listar`, etiquetas.listar);

    app.get(`${path}/listar/:etiquetaId`, etiquetas.listarById);

    app.put(`${path}/baja/:etiquetaId`, etiquetas.baja);
};