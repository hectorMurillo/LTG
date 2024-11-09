module.exports = app => {
    const inventario = require('../controllers/inventario.controller');
    const path="/inventario";

    app.get(`${path}/listado`, inventario.listar);
    app.post(`${path}/agregar`,inventario.agregar);

};

