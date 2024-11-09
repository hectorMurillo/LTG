module.exports = app => {
    const categorias = require('../../controllers/public/categorias.controller');
    const path="/public/categorias";
    const path2="/public/subCategorias";

    app.get(`${path}/listar`, categorias.listar);

    // app.get(`${path}/listar/:categoriaId`, categorias.listarById);

    // app.get(`${path2}/listar`, categorias.listarSubCategorias);

    // app.get(`${path2}/listar-subCategorias/:categoriaId`, categorias.listarSubCategoriasByIdCat);

    // app.get(`${path2}/listar/:subCategoriaId`, categorias.listarSubCategoriasByIdCat);

};