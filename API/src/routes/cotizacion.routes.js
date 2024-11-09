module.exports = app => {
    const cotizacion = require('../controllers/cotizacion.controller');
    const path="/cotizacion";

    app.post(`${path}/agregar`,cotizacion.agregar);

    app.put(`${path}/actulizar/:ventasId`, cotizacion.actualizar);

    app.put(`${path}/venta/:ventasId`, cotizacion.vender);

    app.get(`${path}/listado`,cotizacion.listado);

    app.get(`${path}/listado/:ventaId`,cotizacion.listadoCotizacion);

    app.get(`${path}/detalles/:ventaId`,cotizacion.detallesCotizacion);

    app.get(`${path}/pdf/:ventaId`,cotizacion.reportPdf);

    app.get(`${path}/busqueda/:nombre`, cotizacion.busquedaCliente);

    app.delete(`${path}/cancelar/:ventasId`, cotizacion.baja);

    app.get(`${path}/cuentas`,cotizacion.cuentasBancarias);

    app.post(`${path}/cuentas`,cotizacion.agregarCuentas);
};