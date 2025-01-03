const DetalleVentas = require("../models/detalleVentas");
const Ventas = require("../models/cotizacion");
const Clientes = require("../models/clientes");
const Cuentas = require("../models/cuentasBancarias");
const fs = require('fs');

const pdf = require('html-pdf');
let ejs = require("ejs");
let path = require("path");

exports.agregar = (req, res) => {
  if (!req.body) {
    res.status(400).send(
      { message: "Los datos no pueden venir vacíos" }
    );
  }

  const venta = new Ventas({
    idCliente: req.body.idCliente,
    idUsuario: req.body.idUsuario,
    totalPagar: req.body.totalPagar,
    totalProductos: req.body.totalProductos,
    totalPagando: req.body.totalPagando,
    cambio: req.body.cambio,
    status: 'COTIZACION'
  });

  Ventas.create(venta, req.body.detalles, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ventas."
      });
    else res.send(data);
  });
}

exports.actualizar = (req, res) => {
  if (!req.body) {
    res.status(400).send(
      { message: "Los datos no pueden venir vacíos" }
    );
  }

  var id = req.params.ventasId;
  const venta = new Ventas({
    idCliente: req.body.idCliente,
    idUsuario: req.body.idUsuario,
    totalPagar: req.body.totalPagar,
    totalProductos: req.body.totalProductos,
    totalPagando: req.body.totalPagando,
    cambio: req.body.cambio,
    status: 'COTIZACION'
  });

  Ventas.update(id, venta, req.body.detalles, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updatig ventas the Ventas."
      });
    else res.send(data);
  });
}

exports.listado = (req, res) => {
  Ventas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrivieving Clientes."
      });
    else res.send(data);
  });
}

exports.baja = (req, res) => {
  var id = req.params.ventasId;
  Ventas.cancel(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found venta with id ${req.params.ventasId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not venta with id " + req.params.ventasId
        });
      }
    } else res.send({ message: `Venta was low successfully!` });
  });
}

exports.vender = (req, res) => {
  var id = req.params.ventasId;
  Ventas.venta(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found venta with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: `Could not venta with id ${id}`
        });
      }
    } else res.send({ message: `Venta was ready successfully!` });
  });
}

exports.listadoCotizacion = (req, res) => {
  var id = req.params.ventaId;
  Ventas.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Venta with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Venta with id ${id}`
        });
      }
    } else res.send(data);
  });
}

exports.detallesCotizacion = (req, res) => {
  var id = req.params.ventaId;
  DetalleVentas.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Detalles Venta with id ${id}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Detalles Venta with id ${id}`
        });
      }
    } else res.send(data);
  });
}

exports.busquedaCliente = (req, res) => {
  var nombre = req.params.nombre;
  Ventas.getCotizacionCliente(nombre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Venta with nombre ${nombre}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Venta with nombre ${nombre}`
        });
      }
    } else res.send(data);
  });
}

exports.reportPdf = (req, res) => {
  var id = req.params.convenioId;
  Ventas.getPdf(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err
      });
    } else {
      let datos_recepcion = [];
      datos_recepcion = data[0][0];
      console.log("datos ",datos_recepcion);

      return ejs.renderFile(path.join(__dirname, '../../template/', "report-template.ejs"), { datos: datos_recepcion }, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          let options = {
            "height": "11in",
            "width": "8.5in",
            "header": {
              "height": "20mm"
            },
            "footer": {
              "height": "20mm",
            },
          };
          pdf.create(result, options).toFile("../cotizaciones/cotizacion.pdf", function (err, data, callback) {
              let resp = "";
              if (err) return callback(err);
        
              fs.readFile("../cotizaciones/cotizacion.pdf", (err, content) => {
                if (err) return callback(err);
        
                const base64Pdf = content.toString('base64');
                resp = base64Pdf;
                res.send(resp);
              });
            });
        }
      });
    }
  });

}

exports.cuentasBancarias = (req, res) => {
  Cuentas.select((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrivieving Cuentas bancarias."
      });
    else res.send(data);
  });
}

exports.agregarCuentas = (req, res) => {
  if (!req.body) {
    res.status(400).send(
      { message: "Los datos no pueden venir vacíos" }
    );
  }

  const cuenta = new Cuentas({
    numCuenta: req.body.numCuenta,
    clabe: req.body.clabe,
    beneficiario: req.body.beneficiario,
    banco: req.body.banco
  });

  Cuentas.create(cuenta, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cuenta Bancaria."
      });
    else res.send(data);
  });
}