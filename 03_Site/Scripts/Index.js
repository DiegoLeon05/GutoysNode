//#region Variables
var Generico = new Globales(),
    txtSearch = $("#txtSearch"),
    dvResultado = $("#dvResultado"),
    txtbusqueda = Generico.ParametroUrl("search"),
    Globales = null;
//#endregion
var fnProductoBuscar = function () {
    location.replace(location.origin + "?search=" + txtSearch.value());
}

Generico.CtrlTextbox(txtSearch, {
    blnObligatorio: true,
    strNombre: "código o nombre producto",
    intLongitud: 20,
    strAyuda: "¿Que estás buscando?",
    ExpresionRegular: Generico.ExpresionesRegulares.AlfaNumerico,
    fnCambiaValor: fnProductoBuscar
});

if (!Generico.IsNullOrUndefined(txtbusqueda)) {
    txtSearch.value(txtbusqueda);
}

$.each($(".btn-outline-primary"), function (btn, boton) {
    $(boton).click(function () {
        Generico.ModalVacia({
            titulo: "Como comprar",
            contenido: dvResultado,
            ancho: "350px",
            alto: "150px",
            headerClose: false,
            BotonCerrar: {
                texto: "Cerrar",
                click: function () {
                    dvResultado.appendTo("body");
                    Generico.ControlVisible(dvResultado, false);
                    Generico.CierraModales();
                }
            },
        });
        Generico.ControlVisible(dvResultado, true);
    });
});