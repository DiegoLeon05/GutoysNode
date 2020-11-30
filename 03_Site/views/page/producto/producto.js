const request = require('request')

const CategoriaGet = (callback) => {
    const url = '/categoria'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

const SubCategoriaGet = (callback) => {
    const url = '/subcategoria'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.filter(x => x.subCategoriaActivo == true))
        }
    })
}

const ProductoGet = (callback) => {
    const url = '/producto'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.filter(x => x.productoMostrarWeb == true))
        }
    })
}

const ProductoFiltroGet = (productoNombre, callback) => {
    const url = '/producto/?productoNombre=' + productoNombre
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.filter(x => x.productoMostrarWeb == true))
        }
    })
}

const LstInitial = (callback) => {
    CategoriaGet((error, lstCategoria) => {
        SubCategoriaGet((error, lstSubCategoria) => {
            ProductoGet((error, lstProducto) => {
                lstCategoria.forEach(categoria => {
                    categoria.lstSubCategoria = lstSubCategoria.filter(x => x.categoriaId == categoria.categoriaId && x.subCategoriaActivo == true);
                    categoria.lstSubCategoria.forEach(subcategoria => {
                        subcategoria.categoriaNombre = categoria.categoriaNombre;
                        subcategoria.lstProducto = lstProducto.filter(x => x.subCategoriaId == subcategoria.subCategoriaId);
                    });
                    categoria.lstSubCategoria = categoria.lstSubCategoria.filter(x => x.lstProducto.length > 0)
                });
                lstCategoria = lstCategoria.filter(x => x.lstSubCategoria.length > 0)
                callback(undefined, lstCategoria);
            })
        })
    })
}

const LstDetalle = (productoNombre, callback) => {
    ProductoFiltroGet(productoNombre, (error, lstProducto) => {
        CategoriaGet((error, lstCategoria) => {
            SubCategoriaGet((error, lstSubCategoria) => {
                lstCategoria.forEach(categoria => {
                    categoria.lstSubCategoria = lstSubCategoria.filter(x => x.categoriaId == categoria.categoriaId && x.subCategoriaActivo == true);
                    categoria.lstSubCategoria.forEach(subcategoria => {
                        subcategoria.categoriaNombre = categoria.categoriaNombre;
                        subcategoria.lstProducto = lstProducto.filter(x => x.subCategoriaId == subcategoria.subCategoriaId);
                    });
                    categoria.lstSubCategoria = categoria.lstSubCategoria.filter(x => x.lstProducto.length > 0)
                });
                lstCategoria = lstCategoria.filter(x => x.lstSubCategoria.length > 0)
                callback(undefined, lstCategoria);
            })
        })
    })
}

const ProductosLst = (productoNombre, callback) => {
    if (productoNombre == undefined) {
        LstInitial(callback);
    } else {
        LstDetalle(productoNombre, callback)
    }
}

module.exports = {
    Productos: ProductosLst,
}