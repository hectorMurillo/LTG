const multer = require('multer');
const path = require('path');
let nombreArchivoActual = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/img/flyers/');   
    // Directorio donde se guardarán los archivos
    },
    limits: { fileSize: 2000000 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos JPEG y PNG'));
        }
    },
    filename: (req, file, cb) => {
        // Generamos un nombre único con la extensión original
        let datos = req.body;
        let nombreArchivo = "";
        const uniqueSuffix = datos?.IdCategoria + "-" + datos?.IdSubCategoria + "-" + (datos?.NombreProyecto.includes(" ") ? datos?.NombreProyecto.split(" ")[0] : datos?.NombreProyecto) + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        nombreArchivo = `ImgFlyer-${uniqueSuffix}${ext}`;
        cb(null, nombreArchivo);
        nombreArchivoActual = nombreArchivo;
        req.body.PathImgFlyer = nombreArchivoActual
    }
});

const upload = multer({ storage });  


module.exports = app => {
    const candidatos = require('../../controllers/public/candidatos.controller');
    const path = "/public/candidatos";

    app.get(`${path}/listar`, candidatos.listar);

    app.get(`${path}/imagen/:nombreImagen`, candidatos.obtenerImagen)

    app.post(`${path}/agregar`, upload.single('ImgFlyer'), candidatos.agregar);

    app.post(`${path}/actualizarARevisado/:idCandidato/:idUsuario`, candidatos.actualizaARevisado);
};


