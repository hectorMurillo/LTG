const { colaboradores, ControlNomina } = require("../models/colaboradores");
const fs = require('fs');

const pdf = require('puppeteer');

// const pdf = require('html-pdf');
let ejs = require("ejs");
let path = require("path");



exports.listarColaboradoresCombo = (req, res) => {
    colaboradores.getColaboradores((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Colaboradores."
            });
        else {
            res.send(data);
        }
    });
}


exports.listarCajerosExternosCombo = (req, res) => {
    colaboradores.getCajerosExternos((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Colaboradores."
            });
        else {
            res.send(data);
        }
    });
}

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

exports.registraNomina = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Los datos no pueden venir vacíos."
        });
    }
    const controlNomina = new ControlNomina({
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        codColaborador: req.body.codColaborador,
        cantCajasAPagar: req.body.cantCajasAPagar,
        pagoPorCaja: req.body.pagoPorCaja,
        totalAPagar: req.body.totalAPagar,
        idUsuarioRegistra: req.body.idUsuarioRegistra,
        pagada: req.body.pagada,
        monto_descuento: req.body.monto_descuento,
        descripcionDescuento: req.body.descripcionDescuento
    })
    ControlNomina.guardarControlNomina(controlNomina, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Algo ocurrió en guardarControlNomina"
            });
        else {
            res.send(data);
        }
    })
}

exports.cantidadTotalesXColaborador = (req, res) => {
    let fechaInicio = req.params.fechaInicio;
    let fechaFin = req.params.fechaFin;
    let codColaborador = req.params.codColaborador

    colaboradores.getCantidadTotalesXColaborador(fechaInicio, fechaFin, codColaborador, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving getCantidadTotalesXColaborador."
            })
        } else {
            res.send(data);
        }
    })

}

// exports.reportNominaPdf = (req, res) => {
//     var fechaInicio = req.params.fechaInicio;
//     var fechaFin = req.params.fechaFin;
//     var codColaborador = req.params.codColaborador;
//     colaboradores.getNominaPdf(fechaInicio, fechaFin, codColaborador, (err, data) => {
//         if (err) {
//             res.status(500).send({
//                 message: err
//             });
//         } else {
//             let datosNomina = [];
//             datosNomina = data[0][0];
//             console.log("datos ", datosNomina);
//             const fechaActual = new Date();
//             return ejs.renderFile(path.join(__dirname, '../../template/', "report-nomina-template.ejs"), { datos: datosNomina, fecha: fechaActual, fechaInicio: fechaInicio, fechaFin: fechaFin }, (err, result) => {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     let options = {
//                         "height": "11in",
//                         "width": "8.5in",
//                         "header": {
//                             "height": "20mm"
//                         },
//                         "footer": {
//                             "height": "20mm",
//                         },
//                     };
//                     pdf.create(result, options).toFile("../cotizaciones/nomina.pdf", function (err, data, callback) {
//                         let resp = "";
//                         if (err) return callback(err);

//                         fs.readFile("../cotizaciones/nomina.pdf", (err, content) => {
//                             if (err) return callback(err);

//                             const base64Pdf = content.toString('base64');
//                             resp = base64Pdf;
//                             res.send(resp);
//                         });
//                     });
//                 }
//             });
//         }
//     });

// }


exports.reportNominaPdf = async (req, res) => {
    var fechaInicio = req.params.fechaInicio;
    var fechaFin = req.params.fechaFin;
    var codColaborador = req.params.codColaborador;
    colaboradores.getNominaPdf(fechaInicio, fechaFin, codColaborador, async (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
        } else {
            let datos_Nomina = [];
            datos_Nomina = data[0][0];
            console.log("datos ", datos_Nomina);
            let pdfBase64 = "";
            const fechaActual = new Date();
            ejs.renderFile(path.join(__dirname, '../../template/', "report-nomina-template.ejs"), { datos: datos_Nomina, fecha: fechaActual, fechaInicio: fechaInicio, fechaFin: fechaFin  }, async (err, result) => {
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
                        path: 'reporteNomina.pdf', // Nombre del archivo PDF
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
