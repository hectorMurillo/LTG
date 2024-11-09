module.exports = app => {
    const productos = require('../controllers/productos.controller');
    const path="/productos";

    app.post(`${path}/agregar`, productos.agregar);

    app.get(`${path}/listar`, productos.listar);

    app.get(`${path}/listar/:productoId`, productos.listarById);

    app.get(`${path}/listainventario/:inventarioId`, productos.listarByInventario);

    app.get(`${path}/buscarcodigo/:codigo`, productos.listarByCodigo);

    app.get(`${path}/buscarproducto/:nombre`,productos.listarNombreMarcaModelo)

    app.put(`${path}/actualizar/:productoId`, productos.actualizar);

    app.put(`${path}/baja/:productoId`, productos.baja);


};