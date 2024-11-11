const sql = require('./db');
const DetalleVentas = require("../models/detalleVentas");

//Table
const table = 'venta';
const join = 'detalleVenta';
// Clase Ventas
const Cotizacion = function(venta){
    this.idCliente=venta.idCliente;
    this.idUsuario=venta.idUsuario;
    this.totalPagar=venta.totalPagar;
    this.totalProductos=venta.totalProductos;
    this.totalPagando=venta.totalPagando;
    this.cambio=venta.cambio;
    this.status=venta.status;
}

Cotizacion.create = (newVentas,detalles, result) => {
    sql.query(`INSERT INTO ${table} SET ?`, newVentas, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else{
            var idVenta = res.insertId;
            detalles.forEach(function(valor, clave) {
                
                const detalleVenta = new DetalleVentas({
                    idVenta : idVenta,
                    idProducto : valor.idProducto,
                    productoNombre : valor.productoNombre,
                    cantidad : valor.cantidad,
                    precio : valor.precio,
                });

                DetalleVentas.create(detalleVenta,(err) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while creating the Ventas."
                    });
                });
            });
        }
    
        result(null, { id: res.insertId, ...newVentas });
    });
    
};

Cotizacion.cancel = (id,result)=>{
    sql.query(`UPDATE ${table} SET status='CANCELADO' WHERE id =${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
}

Cotizacion.venta = (id,result)=>{
    sql.query(`UPDATE ${table} SET status='ACTIVO' WHERE id =${id}`, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
}

Cotizacion.update = (id,venta,detalles, result) => {
    sql.query(`UPDATE ${table} SET status='CANCELADO' WHERE id =${id}`, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        Ventas.create(venta,detalles,(err)=>{
            if (err){
                result({ kind: "not_found" }, null);
                return;
            }
        });

        result(null, res);
    });
}

Cotizacion.findById = (ventaId, result) => {
    var sqlQuery = `SELECT * FROM ${table} WHERE id = ${ventaId} and status ='COTIZACION' `;
    sql.query(sqlQuery, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Cotizacion.getAll = result => {
    sql.query(`SELECT ${table}.*,
                concat(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS)as nombre
                FROM ${table} 
                INNER JOIN clientes on clientes.id = ${table}.idCliente
                where ${table}.status = 'COTIZACION'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`${table}: `, res);
        result(null, res);
    });
};

Cotizacion.getPdf =  (ventaId,result) => {

    // var sqlQuery = `SELECT ${table}.*, 
    // concat(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS)as nombre,
    // concat(clientes.colonia,', ',clientes.calle,', ', clientes.numExterior,', ',clientes.ciudad,', ',clientes.estado,'.')as direccion,
    // clientes.email,
    // usuarios.nombre as vendedor,
    // usuarios.email as emailVendedor,
    // detalleVenta.*,
    // CONCAT('$ ', FORMAT((detalleVenta.precio*detalleVenta.cantidad), 2))as totalProductos,
    // CONCAT('$ ', FORMAT((venta.totalPagar), 2))as subTotal,
    // CONCAT('$ ', FORMAT(venta.totalPagar-(venta.totalPagar/1.16),2))as iva,
    // CONCAT('$ ', FORMAT(venta.totalPagar+(venta.totalPagar-(venta.totalPagar/1.16)),2)) as total
    // FROM ${table} 
    // INNER JOIN detalleVenta on detalleVenta.idVenta = ${table}.id
    // INNER JOIN clientes on clientes.id = ${table}.idCliente
    // INNER JOIN usuarios on usuarios.id = ${table}.idUsuario
    // WHERE ${table}.id = ${ventaId} and ${table}.status ='COTIZACION'`;
    
    //     sql.query(sqlQuery, (err, res, fields) => {
    //         if (err) {
    //             console.log(err);
    //             result(err, null);
    //             return;
    //         }

    //         if (res.length) {
    //             result(null, res);
    //             return;
    //         }

    //         // not found Customer with the id
    //         result({ kind: "not_found" }, null);
    //     });
        result(null,'aaaaaaa')
};

Cotizacion.getCotizacionCliente = (cliente, result) => {
    var sqlQuery = `select CONCAT(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS)as nombre, venta.*
    from clientes 
    inner join venta on venta.idCliente = clientes.id 
    where venta.status='COTIZACION' and CONCAT(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS) like '%${cliente}%'`;
    
    sql.query(sqlQuery, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Cotizacion;