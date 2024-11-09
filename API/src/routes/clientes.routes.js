module.exports = app => {
    const clientes = require('../controllers/clientes.controller');
    const path="/clientes";

    app.post(`${path}/agregar`,clientes.agregar);

    app.post(`${path}/agregarprospecto`,clientes.agregarProspecto);

    app.post(`${path}/buscarnombre`,clientes.listarByNombre);

    app.get(`${path}/buscarnombre/:nombre`,clientes.listarCliente)

    app.get(`${path}/listar`, clientes.listar);

    // app.get(`${path}/obtenerImg/:IdCandidatosAColaboradoresEnc`, cliente.obtenerImagen);

    app.get(`${path}/listar/:clienteId`, clientes.listarById);

    app.put(`${path}/actulizar/:clienteId`, clientes.actualizar);

    app.put(`${path}/baja/:clienteId`, clientes.baja);
};