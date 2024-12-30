const connection = require("../db");
const sql = require("../db");
const path = require('path');

require("dotenv").config()
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

//Table
const tableCandidatosEnc = 'candidatosacolaboradoresenc';
// SELECT `IdCandidatosAColaboradoresEnc`,`NombreCandidato`,`CorreoElectronico`,`Celular`,`Instagram`,`Facebook`,`DescripcionProducto`,`FechaRegistro`,`NombreProyecto`,`IdCategoria`,`IdSubCategoria` FROM candidatosacolaboradoresenc;


const Candidato = function (candidatosEnc) {
    this.IdCandidatosAColaboradoresEnc = candidatosEnc.IdCandidatosAColaboradoresEnc;
    this.NombreCandidato = candidatosEnc.NombreCandidato;
    this.CorreoElectronico = candidatosEnc.CorreoElectronico;
    this.Celular = candidatosEnc.Celular;
    this.Instagram = candidatosEnc.Instagram;
    this.Facebook = candidatosEnc.Facebook;
    this.DescripcionProducto = candidatosEnc.DescripcionProducto;
    this.FechaRegistro = candidatosEnc.FechaRegistro;
    this.NombreProyecto = candidatosEnc.NombreProyecto;
    this.IdCategoria = candidatosEnc.IdCategoria;
    this.IdSubCategoria = candidatosEnc.IdSubCategoria;
    this.PathImgFlyer = candidatosEnc.PathImgFlyer;
}

Candidato.create = (newCandidatos, result) => {
    let sp = 'CALL ProcCandidatoASocioGuardar(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @pResultado, @pMsg);';
    let params = [newCandidatos.IdCandidatosAColaboradoresEnc,
        newCandidatos.IdCategoria,
        newCandidatos.IdSubCategoria,
        newCandidatos.NombreCandidato,
        newCandidatos.NombreProyecto,
        newCandidatos.CorreoElectronico,
        newCandidatos.Celular,
        newCandidatos.Instagram,
        newCandidatos.Facebook,
        newCandidatos.DescripcionProducto,
        newCandidatos.PathImgFlyer
    ];
    sql.query(sp, params, (err, res) => {
        let info = null;
        if (err) {
            console.log("error: ", err);
            result(err, null);
            info = err;
            return;
        } else {
            info = { "resultado": res };
            //Si es inscripción correcta se manda correo
            res[0][0].pResultado ? sendMail() : 0;
        }
        result(null, info);
    });
}

Candidato.getAll = result => {
    sql.query(`CALL ProcConsultarConvenios(0)`, (err, res) => {
        if (err) {
            result(null,
                {
                    "codigoerror": err.code,
                    "data": []
                });
            return;
        }
        result(null, res[0]);
    });
}

Candidato.updateEstatusRevisado = (idCandidato, idUsuario, result) => {
    let sp = 'CALL ProcActualizaCandidatoARevisado(?, ?, @pResultado, @pMsg);';
    let params = [idCandidato, idUsuario];
    let resp = null;
    sql.query(sp, params, (err, res) => {
        if (err) {
            result(err,null)
            return;
        } else {
            resp = { "resultado": res }
            sendMail();
        }
        result(null,resp);
    })
}


const createTransporter = async () => {
    try {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            access_token: process.env.ACCESS_TOKEN,
            refresh_token: process.env.REFRESH_TOKEN
        });

        oauth2Client.refreshAccessToken(function (err, tokens) {
            if (err) {
                console.error('Error al refrescar el access token', err);
            } else {
                console.log('Nuevo access token:', tokens.access_token);
            }
        });


        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    console.log("*ERR: ", err)
                    reject();
                }
                resolve(token);
            });
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.USER_EMAIL,
                accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
            },
        });

        return transporter;
    } catch (err) {
        return err
    }
};

const sendMail = async () => {
    try {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: "c21.hector@gmail.com",
            subject: "Gracias, por ser parte de todo chilo!",
            html: `Bienvenid@ 🎉🎉 hemos recibido tu información, nuestro staff está trabajando para darte el seguimiento que te mereces, gracias! <br/><br/>Nos pondremos en contacto lo más pronto posible. `,
        }

        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(mailOptions);
    } catch (err) {
        console.log("ERROR: ", err)
    }
};
 

module.exports = Candidato;