const Candidato = require("../../models/public/candidatos");
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');


exports.agregar = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Los datos no pueden venir vacíos"
        });
    }

    const candidato = new Candidato({
        IdCandidatosAColaboradoresEnc: req.body.IdCandidatosAColaboradoresEnc,
        IdCategoria: req.body.IdCategoria,
        IdSubCategoria: req.body.IdSubCategoria,
        NombreCandidato: req.body.NombreCandidato,
        NombreProyecto: req.body.NombreProyecto,
        CorreoElectronico: req.body.CorreoElectronico,
        Celular: req.body.Celular,
        Instagram: req.body.Instagram,
        Facebook: req.body.Facebook,
        DescripcionProducto: req.body.DescripcionProducto,
        Origen: req.body.Origen,
        PathImgFlyer: req.body.PathImgFlyer
    });

    Candidato.create(candidato, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Cliente."
            });
        else {
            res.send(data);
            //Enviar correo
            enviarCorreo("hola@todochilo.com","c21.hector@gmail.com",req.body);

        }
    })
}

enviarCorreo = (mailFrom, mailTo, datos) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true, // true for 465, false for other ports   

        auth: {
            user: 'hola@todochilo.com',
            pass: '7$m@4vV|#TtX'
        }
    });

    let pathcomplete = path.join(__dirname, `../../../src/img/flyers/ImgFlyer-1-1-Pamela-148076667.jpg`);

    let htmlTemplate = `<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title></title>
<!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]-->
<!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
<!--[if gte mso 9]>
<noscript>
 <xml>
   <o:OfficeDocumentSettings>
   <o:AllowPNG></o:AllowPNG>
   <o:PixelsPerInch>96</o:PixelsPerInch>
   </o:OfficeDocumentSettings>
 </xml>
</noscript>
<![endif]-->
<!--[if !mso]><!---->
<link href="https://fonts.googleapis.com/css2?family=Spartan:wght@300&display=swap" rel="stylesheet">
<!--<![endif]-->
<!--[if mso]>
<style type="text/css">
ul {
margin: 0 !important;
}
ol {
margin: 0 !important;
}
li {
margin-left: 47px !important;
}

</style><![endif]
-->
</head>
<body class="body">
<div dir="ltr" class="es-wrapper-color">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile"  color="#99bdba" origin="0.5, 0" position="0.5, 0"></v:fill>
</v:background>
<![endif]-->
<table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
<tbody>
  <tr>
    <td valign="top" class="esd-email-paddings">
      <table cellspacing="0" cellpadding="0" align="center" class="esd-header-popover es-header">
        <tbody>
          <tr>
            <td align="center" class="esd-stripe">
              <table width="600" cellspacing="0" cellpadding="0" align="center" class="es-header-body" style="background-color: transparent">
                <tbody>
                  <tr>
                    <td align="left" background esd-img-prev-position="center top" bgcolor="#EE6B61" class="esd-structure es-p5t es-p5b es-p20r es-p20l" style="background-color: #EE6B61">
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                        <tbody>
                          <tr>
                            <td width="560" align="center" valign="top" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" esd-links-underline="none" class="esd-block-text">
                                      <p>
                                        <a target="_blank" href="https://viewstripo.email" style="text-decoration:none">
                                          ​
                                        </a>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" bgcolor="#EE6B61" class="esd-structure es-p30t es-p30b es-p20r es-p20l" style="background-color: #EE6B61">
                      <table cellspacing="0" cellpadding="0" width="100%">
                        <tbody>
                          <tr>
                            <td width="560" valign="top" align="center" class="es-m-p0r esd-container-frame">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td align="center" class="esd-block-image es-p25b" style="font-size:0px">
                                      <a target="_blank" href="https://viewstripo.email">
                                        <img src="https://todochilo.com/assets/img/logo-tc.png" alt="Logo" width="100" title="Logo" class="adapt-img" style="display: block; border-radius: 0">
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" class="esd-block-spacer es-p5" style="font-size:0">
                                      <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td style="border-bottom:1px solid #7f9d9d;background:unset;height:1px;width:100%;margin:0px"></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td esd-tmp-menu-font-size="14px" class="esd-block-menu">
                                      <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                        <tbody>
                                          <tr>
                                            <td align="center" valign="top" width="33%" id="esd-menu-id-0" class="es-p10t es-p10b es-p5r es-p5l">
                                              <a target="_blank" href="https://todochilo.com/" style="font-size: 14px; font-weight: bold; color: #ffffff">
                                                Inicio
                                              </a>
                                            </td>
                                            <td align="center" valign="top" width="33%" id="esd-menu-id-1" class="es-p10t es-p10b es-p5r es-p5l">
                                              <a target="_blank" href="https://todochilo.com/blog" style="font-size: 14px; font-weight: bold; color: #ffffff">
                                                Blog
                                              </a>
                                            </td>
                                            <td align="center" valign="top" width="33%" id="esd-menu-id-2" class="es-p10t es-p10b es-p5r es-p5l">
                                              <a target="_blank" href="https://todochilo.com/precios" style="font-size: 14px; font-weight: bold; color: #ffffff">
                                                Precios
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" class="esd-block-spacer es-p5" style="font-size:0">
                                      <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td style="border-bottom:1px solid #7f9d9d;background:unset;height:1px;width:100%;margin:0px"></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table cellspacing="0" cellpadding="0" align="center" class="es-content">
        <tbody>
          <tr>
            <td align="center" class="esd-stripe">
              <table width="600" cellspacing="0" cellpadding="0" bgcolor="#EFF2DD" align="center" class="es-content-body">
                <tbody>
                  <tr>
                    <td align="left" class="esd-structure">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                          <tr>
                            <td width="600" align="center" valign="top" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" class="esd-block-image" style="font-size:0px">
                                      <a target="_blank" href="https://viewstripo.email">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/group_14_sYp.png" alt="" width="600" class="adapt-img" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" bgcolor="#333333" class="esd-structure es-p30t es-p40b es-p20r es-p20l" style="background-color: #333333">
                      <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                          <tr>
                            <td width="560" valign="top" align="center" class="es-m-p0r es-m-p20b esd-container-frame">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p20b">
                                      <h1 style="color: #abc3c5">
                                        ¡ Estamos más cerca de hacer equipo !✌️
                                      </h1>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="esd-block-image es-p5t es-p25b" style="font-size:0px">
                                      <a target="_blank">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/rectangle_5385.png" alt="" width="50" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p30b">
                                      <h3 style="color: #abc3c5">
                                        Amig@ del proyecto ${datos.NombreProyecto},
                                      </h3>
                                      <p style="color: #abc3c5">
                                        <br>
                                      </p>
                                      <p style="color: #abc3c5">
                                        Para nosotros tu tiempo es valioso y es por ello que nuestro Staff está trabajando en revisar tu proyecto, para darte respuesta lo más pronto posible
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="esd-block-button">
                                      <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
        style="height:46px; v-text-anchor:middle; width:231px" arcsize="26%" stroke="f"  fillcolor="#ee6b61">
<w:anchorlock></w:anchorlock>
<center style='color:#ffffff; font-family:Spartan, sans-serif; font-size:16px; font-weight:700; line-height:16px;  mso-text-raise:1px'>GET STARTED ></center>
</v:roundrect></a>
<![endif]-->
                                      <!--[if !mso]><!---->
                                      <span class="es-button-border">
                                        <a href="https://viewstripo.email" target="_blank" class="es-button">
                                          GET STARTED &gt;
                                        </a>
                                      </span>
                                      <!--<![endif]-->
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0" align="center" class="es-content">
        <tbody>
          <tr>
            <td align="center" class="esd-stripe">
              <table bgcolor="#7F9D9D" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body" style="background-color: #7f9d9d">
                <tbody>
                  <tr>
                    <td align="left" class="esd-structure">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                          <tr>
                            <td width="600" align="center" valign="top" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" class="esd-block-image" style="font-size:0px">
                                      <a target="_blank">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/subtract.png" alt="" width="600" class="adapt-img" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" class="esd-structure es-p20r es-p20l">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                          <tr>
                            <td width="560" align="center" valign="top" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p20t es-p20b">
                                      <h1 style="color:#eff2dd">
                                        Few resources
                                      </h1>
                                      <h1 style="color:#eff2dd">
                                        that you might find handy:
                                      </h1>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" class="esd-structure es-p30t es-p30b es-p20r es-p20l">
                      <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="260" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                        <tbody>
                          <tr>
                            <td width="260" align="center" valign="top" class="esd-container-frame es-m-p20b">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-image" style="font-size:0px">
                                      <a target="_blank" href="https://viewstripo.email">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/architectureandciy.png" alt="" width="50" class="b_image" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" esd-links-color="#EFF2DD" esd-links-underline="none" class="esd-block-text es-p20t es-p10b">
                                      <h3 style="color:#eff2dd">
                                        <a target="_blank" href="https://viewstripo.email" class="b_title" style="color:#eff2dd;text-decoration:none">
                                          Started Guide &gt;
                                        </a>
                                      </h3>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p10t es-p10b">
                                      <p class="b_description" style="color:#ffffff;font-size:16px">
                                        This guide walks you through the basics of using our software.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if mso]></td><td width="40"></td><td width="260" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                        <tbody>
                          <tr>
                            <td width="260" align="center" valign="top" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-image" style="font-size:0px">
                                      <a target="_blank" href="https://viewstripo.email">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/united.png" alt="" width="50" class="b_image" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" esd-links-color="#EFF2DD" esd-links-underline="none" class="esd-block-text es-p20t es-p10b">
                                      <h3 style="color:#eff2dd">
                                        <a target="_blank" href="https://viewstripo.email" class="b_title" style="color:#eff2dd;text-decoration:none">
                                          Community Forums &gt;
                                        </a>
                                      </h3>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p10t es-p10b">
                                      <p class="b_description" style="color:#ffffff;font-size:16px">
                                        Connect with other users, share ideas, and learn from their experiences.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if mso]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                  <tr>
                    <td align="left" class="esd-structure es-p20t es-p40b es-p20r es-p20l">
                      <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="260" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                        <tbody>
                          <tr>
                            <td width="260" align="center" valign="top" class="esd-container-frame es-m-p20b">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-image" style="font-size:0px">
                                      <a target="_blank" href="https://viewstripo.email">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/chat.png" alt="" width="50" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" esd-links-color="#EFF2DD" esd-links-underline="none" class="esd-block-text es-p20t es-p10b">
                                      <h3 style="color:#eff2dd">
                                        <a target="_blank" href="https://viewstripo.email" style="color:#eff2dd;text-decoration:none">
                                          Support Centre&nbsp;&gt;
                                        </a>
                                      </h3>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p10t es-p10b">
                                      <p style="color:#ffffff;font-size:16px">
                                        Find the answers to commonly asked questions here.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if mso]></td><td width="40"></td><td width="260" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                        <tbody>
                          <tr>
                            <td width="260" align="center" valign="top" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-image" style="font-size:0px">
                                      <a target="_blank" href="https://viewstripo.email">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/play_1.png" alt="" width="50" class="b_image" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" esd-links-color="#EFF2DD" esd-links-underline="none" class="esd-block-text es-p20t es-p10b">
                                      <h3 style="color:#eff2dd">
                                        <a target="_blank" href="https://viewstripo.email" class="b_title" style="color:#eff2dd;text-decoration:none">
                                          Tutorial Videos &gt;
                                        </a>
                                      </h3>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p10t es-p10b">
                                      <p class="b_description" style="color:#ffffff;font-size:16px">
                                        These videos provide a visual guide to using our services.
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if mso]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                  <tr>
                    <td align="left" class="esd-structure">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                          <tr>
                            <td width="600" align="center" valign="top" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" class="esd-block-image" style="font-size:0px">
                                      <a target="_blank">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/subtract_xHj.png" alt="" width="600" class="adapt-img" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0" align="center" class="es-content">
        <tbody>
          <tr>
            <td align="center" class="esd-stripe">
              <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                <tbody>
                  <tr>
                    <td align="left" class="esd-structure es-p30t es-p20b es-p20r es-p20l">
                      <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                          <tr>
                            <td width="560" valign="top" align="center" class="es-m-p0r es-m-p20b esd-container-frame">
                              <table width="100%" cellspacing="0" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p20b es-m-txt-c">
                                      <h1>
                                        Let's start this journey together!
                                      </h1>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" class="esd-block-image es-p5t es-p25b" style="font-size:0px">
                                      <a target="_blank">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/rectangle_5385.png" alt="" width="50" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" class="esd-block-text">
                                      <p>
                                        Best Wishes,
                                      </p>
                                      <p>
                                        <strong>
                                          BrightPeak!
                                        </strong>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" class="esd-structure es-p20t es-p30b es-p20r es-p20l">
                      <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                        <tbody>
                          <tr>
                            <td width="270" align="left" class="es-m-p20b esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="right" class="esd-block-button es-m-txt-c">
                                      <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
        style="height:46px; v-text-anchor:middle; width:247px" arcsize="26%" strokecolor="#ee6b61" strokeweight="2px" fillcolor="#eff2dd">
<w:anchorlock></w:anchorlock>
<center style='color:#ee6b61; font-family:Spartan, sans-serif; font-size:16px; font-weight:700; line-height:16px;  mso-text-raise:1px'>WATCH DEMO ></center>
</v:roundrect></a>
<![endif]-->
                                      <!--[if !mso]><!---->
                                      <span class="es-button-border" style="border-width:2px;border-color:#ee6b61;background:#eff2dd">
                                        <a href="https://viewstripo.email" target="_blank" class="es-button" style="color: #ee6b61; background: #eff2dd; mso-border-alt: 10px solid #EFF2DD">
                                          WATCH DEMO &gt;
                                        </a>
                                      </span>
                                      <!--<![endif]-->
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                        <tbody>
                          <tr>
                            <td width="270" align="left" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-button es-m-txt-c">
                                      <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
        style="height:46px; v-text-anchor:middle; width:238px" arcsize="26%" strokecolor="#ee6b61" strokeweight="2px" fillcolor="#ee6b61">
<w:anchorlock></w:anchorlock>
<center style='color:#ffffff; font-family:Spartan, sans-serif; font-size:16px; font-weight:700; line-height:16px;  mso-text-raise:1px'>SIGN IN ></center>
</v:roundrect></a>
<![endif]-->
                                      <!--[if !mso]><!---->
                                      <span class="es-button-border" style="border-width:2px;border-color:#ee6b61;background:#ee6b61">
                                        <a href="https://viewstripo.email" target="_blank" class="es-button es-button-1684935065829" style="padding: 15px 60px 10px">
                                          SIGN IN &gt;
                                        </a>
                                      </span>
                                      <!--<![endif]-->
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if mso]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                  <tr>
                    <td align="left" bgcolor="#516365" class="esd-structure es-p40t es-p20r es-p20l" style="background-color:#516365">
                      <!--[if mso]><table dir="ltr" cellpadding="0" cellspacing="0"><tr><td><table dir="rtl" width="560" cellpadding="0" cellspacing="0"><tr><td dir="ltr" width="339" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                        <tbody>
                          <tr>
                            <td width="339" align="left" class="esd-container-frame es-m-p20b">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" class="esd-block-text es-m-txt-c">
                                      <h1 style="color:#eff2dd">
                                        The next step
                                      </h1>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" class="esd-block-text es-p20t es-m-txt-l">
                                      <p style="color:#ffffff">
                                        ...in your journey with us is to download our top-rated app. It's packed full of features that will make using our software a breeze.
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td esd-tmp-menu-size="height|37" class="esd-block-menu">
                                      <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                        <tbody>
                                          <tr>
                                            <td align="LEFT" valign="top" width="50%" id="esd-menu-id-0" class="es-p10t es-p10b">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/group_dS2.png" alt="App store" title="App store" height="37">
                                              </a>
                                            </td>
                                            <td align="LEFT" valign="top" width="50%" id="esd-menu-id-1" class="es-p10t es-p10b">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/group1.png" alt="Google play" title="Google play" height="37">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if mso]></td><td dir="ltr" width="20"></td><td dir="ltr" width="201" valign="top"><![endif]-->
                      <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                        <tbody>
                          <tr>
                            <td width="201" align="center" valign="top" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" class="esd-block-image" style="font-size:0px">
                                      <a target="_blank" href="https://viewstripo.email">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_55133f7da1d530766fabffa3c07ab1852570caf3acae85e9fef2735054562cd4/images/group_2iz.png" alt="" width="201" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!--[if mso]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
        <tbody>
          <tr>
            <td align="center" class="esd-stripe">
              <table bgcolor="#3c2c4c" align="center" cellpadding="0" cellspacing="0" width="600" class="es-footer-body">
                <tbody>
                  <tr>
                    <td align="left" class="esd-structure es-p40t es-p20b es-p20r es-p20l">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                          <tr>
                            <td width="560" align="left" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td esd-tmp-menu-padding="10|10" esd-tmp-menu-color="#ffffff" esd-tmp-divider="0|solid|#ffffff" class="esd-block-menu">
                                      <table cellpadding="0" cellspacing="0" width="100%" class="es-menu">
                                        <tbody>
                                          <tr>
                                            <td align="center" valign="top" width="25%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom:10px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                About us
                                              </a>
                                            </td>
                                            <td align="center" valign="top" width="25%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom:10px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                News
                                              </a>
                                            </td>
                                            <td align="center" valign="top" width="25%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom:10px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                Career
                                              </a>
                                            </td>
                                            <td align="center" valign="top" width="25%" class="es-p10t es-p10b es-p5r es-p5l" style="padding-bottom:10px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                The shops
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" class="esd-block-social es-p20t es-p20b" style="font-size:0">
                                      <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                        <tbody>
                                          <tr>
                                            <td align="center" valign="top" class="es-p20r">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img title="Facebook" src="https://fnzetow.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/facebook-logo-colored-bordered.png" alt="Fb" width="24" height="24">
                                              </a>
                                            </td>
                                            <td align="center" valign="top" class="es-p20r">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img title="X" src="https://fnzetow.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/x-logo-colored-bordered.png" alt="X" width="24" height="24">
                                              </a>
                                            </td>
                                            <td align="center" valign="top" class="es-p20r">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img title="Instagram" src="https://fnzetow.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/instagram-logo-colored-bordered.png" alt="Inst" width="24" height="24">
                                              </a>
                                            </td>
                                            <td align="center" valign="top">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img title="Youtube" src="https://fnzetow.stripocdn.email/content/assets/img/social-icons/logo-colored-bordered/youtube-logo-colored-bordered.png" alt="Yt" width="24" height="24">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" esd-links-color="#ffffff" esd-links-underline="none" class="esd-block-text es-p10t">
                                      <p>
                                        You are receiving this email because you have visited our site or asked us about the regular newsletter. Make sure our messages get to your Inbox (and not your bulk or junk folders).
                                        <br>
                                        <strong>
                                          <a target="_blank" href="https://viewstripo.email" style="text-decoration:none">
                                            Privacy police
                                          </a>
                                          |
                                          <a target="_blank" style="text-decoration:none">
                                            Unsubscribe
                                          </a>
                                        </strong>
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0" align="center" class="es-content esd-footer-popover">
        <tbody>
          <tr>
            <td align="center" class="esd-stripe">
              <table align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body" style="background-color: transparent">
                <tbody>
                  <tr>
                    <td align="left" bgcolor="#EFF2DD" class="esd-structure es-p20" style="background-color:#eff2dd;border-radius:0px 0px 20px 20px">
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tbody>
                          <tr>
                            <td width="560" align="left" class="esd-container-frame">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" class="esd-block-image es-infoblock made_with" style="font-size:0">
                                      <a target="_blank" href="https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=saas_11&utm_content=lets_get_you_started">
                                        <img src="https://fnzetow.stripocdn.email/content/guids/CABINET_09023af45624943febfa123c229a060b/images/7911561025989373.png" alt="" width="125" style="display:block">
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table>
</div>
</body>
</html>`

    let mailOptions = {
        from: mailFrom,
        to: mailTo,
        subject: 'Correo enviado desde Node.js',
        html: htmlTemplate,
        attachments: [
            {
                filename: 'imagen1.jpg',
                path: pathcomplete,
                cid: 'unique_image_id' // El mismo CID que en tu HTML
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("ERROR DEL MAIL ", error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}


exports.listar = (req, res) => {
    Candidato.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrivieving Candidato."
            });
        else {
            res.send(data);
        }
    });
}

exports.obtenerImagen = (req, res) => {
    if (!req.params) {
        res.status(400).send({
            message: "Los datos No pueden venir vacíos"
        })
    }
    let nombreImagen = req.params.nombreImagen;

    let pathcomplete = path.join(__dirname, `../../../src/img/flyers/${nombreImagen}`);

    fs.readFile(pathcomplete, (err, data) => {
        if (err) {
            res.status(404).send('Imagen no encontrada');
        } else {
            res.contentType('image/jpeg'); // Ajusta el tipo de contenido según la imagen
            res.send(data);
        }
    });
}

exports.actualizaARevisado = (req, res) => {
    if (!req.params) {
        res.status(400).send({
            message: "Los datos no pueden venir vacíos"
        });
    }
    let idCandidato = req.params.idCandidato;
    let idUsuario = req.params.idUsuario;

    Candidato.updateEstatusRevisado(idCandidato, idUsuario, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Error 404"
                });
            } else {
                res.status(500).send({
                    message: `Error 500, contacte a sistemas`
                });
            }
        } else res.send(data);
    })
};
