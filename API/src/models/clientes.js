const sql = require("./db");
//Table
const table = 'clientes';
//Cliente 
const Cliente = function(cliente) {
    this.uidSucursal = cliente.idSucursal;
    this.idUsuario = cliente.idUsuario;
    this.email = cliente.email;
    this.nombre = cliente.nombre;
    this.apellidoP = cliente.apellidoP;
    this.apellidoS = cliente.apellidoS;
    this.rfc = cliente.rfc;
    this.estado = cliente.estado;
    this.ciudad = cliente.ciudad;
    this.colonia = cliente.colonia;
    this.calle = cliente.calle;
    this.numExterior = cliente.numExterior;
    this.numInterior = cliente.numInterior;
    this.codigoPostal = cliente.codigoPostal;
    this.celular = cliente.celular;
    this.fechaNacimiento = cliente.fechaNacimiento;
};

Cliente.create = (newCliente, result) => {
    sql.query(`INSERT INTO ${table} SET ?`, newCliente, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newCliente });
    });
};

Cliente.findById = (clienteId, result) => {
    sql.query(`SELECT * FROM ${table} WHERE id = ${clienteId}`, (err, res) => {
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

Cliente.getAll = result => {
    sql.query(`SELECT * FROM ${table}`, (err, res) => {
        if (err) {
            result  (null, 
                        { 
                            "codigoerror" : err.code,
                            "data" : []
                    });
            return;
        }
        
        result(null, res);
    });
};

Cliente.findNombre = (nombre, apellidoP, apellidoS,result) => {
    let querySql='';
    if(nombre != '' && apellidoP == ''){
        querySql=`SELECT * FROM ${table}  where nombre like '%${nombre}%'`;
    }
    if(nombre != '' && apellidoP != ''){
        querySql=`SELECT * FROM ${table}  where nombre like '%${nombre}%' and apellidoP like '%${apellidoP}%'`;
    }
    if(nombre != '' && apellidoP != '' && apellidoS != ''){
        querySql=`SELECT * FROM ${table}  where nombre like '%${nombre}%' and apellidoP like '%${apellidoP}%' and apellidoS like '%${apellidoS}%'`;
    }
    
    sql.query(querySql, (err, res) => {
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
}
Cliente.findCliente = (cliente, result) => {
    let querySql=`select * 
    from clientes 
    where status='ACTIVO' and CONCAT(clientes.nombre,' ',clientes.apellidoP,' ',clientes.apellidoS) like '%${cliente}%'`;
    
    sql.query(querySql, (err, res) => {
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
}

Cliente.updateById = (id, cliente, result) => {
    sql.query(
        `UPDATE ${table} SET ? WHERE id = ${id}`, [cliente],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...cliente });
        }
    );
};

Cliente.remove = (id, result) => {
    sql.query(`UPDATE ${table} SET status='INACTIVO' WHERE id = ?`, id, (err, res) => {
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
};





module.exports = Cliente;