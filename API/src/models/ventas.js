const sql = require('./db');
const DetalleVentas = require("../models/detalleVentas");

//Table
const table = 'venta';
const join = 'detalleVenta';

const queryVentasTotal=`SELECT concat(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS),
concat(clientes.colonia,' ',clientes.calle,' ', clientes.numExterior,' ',clientes.ciudad,' ',clientes.estado),
clientes.email,
SUM(venta.totalPagar) as valorCliente
FROM venta
INNER JOIN detalleVenta on detalleVenta.idVenta = venta.id 
INNER JOIN clientes on clientes.id = venta.idCliente
WHERE venta.status ='ACTIVO'
GROUP by venta.idCliente`


const queryCotizacionesTotal= `SELECT concat(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS),
concat(clientes.colonia,' ',clientes.calle,' ', clientes.numExterior,' ',clientes.ciudad,' ',clientes.estado),
clientes.email,
SUM(venta.totalPagar) as valorCliente
FROM venta
INNER JOIN detalleVenta on detalleVenta.idVenta = venta.id 
INNER JOIN clientes on clientes.id = venta.idCliente
WHERE venta.status ='COTIZACION'
GROUP by venta.idCliente`

const queryDevolucionTotal=`SELECT concat(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS),
concat(clientes.colonia,' ',clientes.calle,' ', clientes.numExterior,' ',clientes.ciudad,' ',clientes.estado),
clientes.email,
SUM(venta.totalPagar) as valorCliente
FROM venta
INNER JOIN detalleVenta on detalleVenta.idVenta = venta.id 
INNER JOIN clientes on clientes.id = venta.idCliente
WHERE venta.status ='DEVOLUCION'
GROUP by venta.idCliente`

const queryCanceladasTotal=`SELECT concat(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS),
concat(clientes.colonia,' ',clientes.calle,' ', clientes.numExterior,' ',clientes.ciudad,' ',clientes.estado),
clientes.email,
SUM(venta.totalPagar) as valorCliente
FROM venta
INNER JOIN detalleVenta on detalleVenta.idVenta = venta.id 
INNER JOIN clientes on clientes.id = venta.idCliente
WHERE venta.status ='CANCELADO'
GROUP by venta.idCliente`;
// Clase Ventas
const Ventas = function(venta){
    this.idCliente=venta.idCliente;
    this.totalPagar=venta.totalPagar;
    this.totalProductos=venta.totalProductos;
    this.totalPagando=venta.totalPagando;
    this.cambio=venta.cambio;
    this.idUsuario=venta.idUsuario;
}

Ventas.create = (newVentas,detalles, result) => {
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

Ventas.cancel = (id,result)=>{
    sql.query(`UPDATE ${table} SET status='INACTIVO' WHERE id =${id}`, (err, res) => {
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

Ventas.update = (id,venta,detalles, result) => {
    sql.query(`UPDATE ${table} SET status='DEVOLUCION' WHERE id =${id}`, (err, res) => {
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

        Ventas.create(venta,detalles,(err)=>{
            if (err){
                result({ kind: "not_found" }, null);
                return;
            }
        });

        result(null, res);
    });
}

Ventas.findById = (ventaId, result) => {
    var sqlQuery = `SELECT * FROM ${table} WHERE id = ${ventaId} and status ='ACTIVO' `;
    sql.query(sqlQuery, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found ${table}: `, res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Ventas.getAll = result => {
    sql.query(`SELECT ${table}.*, concat(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS)as cliente 
        FROM ${table} 
        inner join clientes on clientes.id = venta.IdCliente        
        where ${table}.status = 'ACTIVO'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`${table}: `, res);
        result(null, res);
    });
};

Ventas.getAllDevolucion = result => {
    sql.query(`SELECT * FROM ${table} 
                where ${table}.status = 'DEVOLUCION'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`${table}: `, res);
        result(null, res);
    });
};

module.exports = Ventas;