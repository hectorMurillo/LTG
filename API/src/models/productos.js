const sql = require("./db");
//table
const table = 'productos';
//Inventario
const Producto = function(producto){
    this.idInventario = producto.idInventario;
    this.codigo = producto.codigo;
    this.nombre = producto.nombre;
    this.stock = producto.stock;
    this.stockMinimo = producto.stockMinimo;
    this.stockMaximo = producto.stockMaximo;
    this.costoUnitario = producto.costoUnitario;
    this.precioUnitario = producto.precioUnitario;
    this.marca = producto.marca;
    this.modelo = producto.modelo;
    this.descripcion = producto.descripcion;
    this.idEtiqueta = producto.idEtiqueta
}

Producto.create = (producto, result) => {
    sql.query(`INSERT INTO ${table} SET ?`, producto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...producto });
    });
};

Producto.findById = (productoId, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${productoId}`, (err, res) => {
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

Producto.findByIdInventario = (idInventario, result) => {
    sql.query(`SELECT * FROM ${table} WHERE idInventario = ${idInventario}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found ${table}: `, res[0]);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Producto.findByCodigo = (codigo,result) => {
    sql.query(`SELECT * FROM ${table} WHERE codigo = ${codigo}`, (err, res) => {
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
}

Producto.findByFiltersNombreMarcaModelo = (nombre,result)=>{
   
    let querySql=`select *
    from productos
    where productos.status='ACTIVO' and CONCAT(productos.nombre,' ',productos.marca ,' ',productos.modelo) like '%${nombre}%'`;
    
    sql.query(querySql, (err, res) => {
        if (err) {
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
}
Producto.findNombre = (nombre,result) => {
    let querySql='';

    querySql=`SELECT * FROM ${table}  where nombre like '%${nombre}%' and status = 'ACTIVO'`;
    
    sql.query(querySql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found ${table}: `, res[0]);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
}

Producto.getAll = result => {
    sql.query(`SELECT ${table}.*, etiquetas.nombre as etiqueta FROM ${table} inner join etiquetas on etiquetas.id = ${table}.idEtiqueta where ${table}.status='ACTIVO'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`${table}: `, res);
        result(null, res);
    });
};

Producto.updateById = (id, producto, result) => {
    sql.query(
        `UPDATE ${table} SET ? WHERE id = ${id}`, [producto],
        (err, res) => {
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

            result(null, { id: id, ...producto });
        }
    );
};

Producto.remove = (id, result) => {
    sql.query(`UPDATE ${table} SET status='INACTIVO' WHERE id = ${id}?`, (err, res) => {
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
};

module.exports = Producto;