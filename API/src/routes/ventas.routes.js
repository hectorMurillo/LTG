module.exports = app => {
    const ventas = require('../controllers/ventas.controller');
    const path="/ventas";

    app.post(`${path}/agregar`,ventas.agregar);

    app.get(`${path}/listado`,ventas.listado);

    app.get(`${path}/listado/:ventaId`,ventas.listadoVenta);

    app.get(`${path}/detalles/:ventaId`,ventas.detallesVenta);

    app.get(`${path}/listadodevolucion`,ventas.listadoDevolucion);

    app.put(`${path}/actulizar/:ventasId`, ventas.actualizar);

    app.delete(`${path}/cancelar/:ventasId`, ventas.baja);
};