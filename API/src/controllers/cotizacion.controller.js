const DetalleVentas = require("../models/detalleVentas");
const Ventas = require("../models/cotizacion");
const Clientes = require("../models/clientes");
const Cuentas = require("../models/cuentasBancarias");
const fs = require('fs');

const pdf = require('puppeteer');
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

exports.reportPdf = async (req, res) => {
  var id = req.params.ventaId;
  Ventas.getPdf(id, async (err, data) => {
    if (err) {
      res.status(500).send({
        message: err
      });
    } else {
      let datos_recepcion = [];
      datos_recepcion = data[0][0];
      console.log("datos ",id,' ', datos_recepcion);
      let pdfBase64 = "";
      ejs.renderFile(path.join(__dirname, '../../template/', "report-costoPrimerCarga-template.ejs"), { datos: datos_recepcion }, async (err, result) => {
        if (err) {
          console.error('Error renderizando la plantilla:', err);
          return;
        }

        // Iniciar Puppeteer y generar el PDF
        try {
          const browser = await pdf.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necesario en entornos sin interfaz gráfica
          });
          const page = await browser.newPage();
          await page.setContent(result, { waitUntil: 'networkidle0' });

          // Generar el PDF
          const pdfBuffer = await page.pdf({
            path: 'reporte.pdf', // Nombre del archivo PDF
            format: 'A4', // Formato de la página
            printBackground: true // Incluir fondos
          });

          await browser.close();
          pdfBase64 = pdfBuffer.toString('base64');
          console.log('PDF generado correctamente: reporte.pdf');
          return res.send(pdfBase64);
        } catch (error) {
          console.error('Error generando el PDF:', error);
        }
      });
    }
  })
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