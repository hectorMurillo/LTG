const sql = require("../db");
//Table
const tableCategorias = 'catcategoriasocio';
const tableSubCategorias = 'subcatcategoriasocio';

const Categoria = function(categoria){
    this.candidatosacolaboradoresenc = categoria.candidatosacolaboradoresenc;
    this.IdCandidatosAColaboradoresEnc = categoria.IdCandidatosAColaboradoresEnc;
    this.NombreCandidato = categoria.NombreCandidato;
    this.CorreoElectronico = categoria.CorreoElectronico;
    this.Celular = categoria.Celular;
    this.Instagram = categoria.Instagram;
    this.Facebook = categoria.Facebook;
    this.DescripcionProducto = categoria.DescripcionProducto;
    this.FechaRegistro = categoria.FechaRegistro;
    this.NombreProyecto = categoria.NombreProyecto;
    this.IdCategoria = categoria.IdCategoria;
    this.IdSubCategoria = categoria.IdSubCategoria;
}

const jsonCategoria = function(categoria){
    this.json = categoria.json;
}


jsonCategoria.getAllCategorias = result =>{
    let msg = '';
    let value = false;
    sql.query(`SELECT JSON_OBJECT(
            'categoria', JSON_OBJECT(
                'id', catcategoriasocio.IdCatCategoriaSocio,
                'nombre', UPPER(catcategoriasocio.NombreCategoria)
            ),
            'subcategorias', JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', COALESCE(catsubcategoriasocio.IdCatSubCategoriaSocio,0),
                    'nombre', UPPER(COALESCE(catsubcategoriasocio.NombreSubCategoria,"- NO ASIGNADA -"))
                )
            )
        ) as informacion
        FROM catcategoriasocio
        LEFT JOIN catsubcategoriasocio ON catcategoriasocio.IdCatCategoriaSocio  = catsubcategoriasocio.IdCatCategoriaSocio
        GROUP BY catcategoriasocio.IdCatCategoriaSocio;`, 
        (err,res)=>{
        value = true;
        msg = 'OK'
        if (err) {
            value = 0;
            msg = err.message;
            result  (null, 
                        { 
                            "codigoerror" : err.code,
                            "data" : []
                    });
            return;
        }
        
        result(null, {value: value, message:msg, data: res});
    })
}

module.exports = Categoria;
module.exports = jsonCategoria;