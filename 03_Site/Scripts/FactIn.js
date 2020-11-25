Globales = function Globales() {
    var thisJs = this,
        strColor = "#0B3C54",
        strFontColor = "#eceff4";

    this.CtrlTextbox = function (control, atributos) {
        //atributos{fnEnter, fnCambiaValor, blnObligatorio, strNombre, intLongitud, strAyuda, strTipo, intLongitudExacta, blnCambiaValor,type}
        control.attr('Maxlength', atributos.intLongitud);
        control.attr('class', 'form-control');
        if (atributos.EstiloAlto == true) {
            control.addClass('controlDerecha');
        };
        if (atributos.type !== undefined) {
            control.attr('type', atributos.type);
        } else {
            if (control.attr('type') === undefined) {
                control.attr('type', 'text');
            };
        }
        if (atributos.strAyuda !== undefined) {
            control.attr('Placeholder', atributos.strAyuda);
        }
        control.obligatorio = function () {
            thisJs.EstiloError({
                control: control,
                blnAdiciona: false,
            });
            var strValor = ((control.val() === undefined || control.val() === '' || control.val().length <= 0) ? null : control.val());

            if (atributos.ExpresionRegular !== undefined) {
                if (strValor !== null) {
                    for (i = 0; i < strValor.length; i++) {
                        if (!atributos.ExpresionRegular.test(strValor.substr(i, 1))) {
                            thisJs.MuestraError({
                                titulo: 'Campo ' + atributos.strNombre,
                                texto: 'El campo ' + atributos.strNombre + ' contiene caracteres no válidos.',
                                tipo: 'warning',
                                control: control,
                                blnAdiciona: true,
                            });
                            return false;
                        };
                    };
                };
            };

            if (!control.ValidaLongitud(strValor)) {
                return false;
            };

            if (atributos.blnObligatorio === true) {
                control.value();
                if (strValor === null) {
                    thisJs.MuestraError({
                        titulo: 'Campo ' + atributos.strNombre,
                        texto: 'El campo ' + atributos.strNombre + ' no debe estar vacío.',
                        tipo: 'warning',
                        control: control,
                        blnAdiciona: true,
                    });
                    return false;
                } else if (strValor.length > atributos.intLongitud) {
                    control.removeAttr('Maxlength');
                    control.attr('Maxlength', atributos.intLongitud);
                    thisJs.MuestraError({
                        titulo: 'Campo ' + atributos.strNombre,
                        texto: 'El campo ' + atributos.strNombre + ' supera los ' + atributos.intLongitud + ' caracteres.',
                        tipo: 'warning',
                        control: control,
                        blnAdiciona: true,
                    });
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        };
        control.ValidaLongitud = function (strValor) {
            if ($.isNumeric(atributos.intLongitudExacta)) {
                if (strValor !== null && (strValor.length !== parseInt(atributos.intLongitudExacta))) {
                    thisJs.Timer({
                        tiempo: 20,
                        funcion: function () {
                            thisJs.MuestraError({
                                titulo: 'Campo ' + atributos.strNombre,
                                texto: 'El campo ' + atributos.strNombre + ' debe contener exactamente ' + atributos.intLongitudExacta + ' caracteres.',
                                tipo: 'warning',
                                control: control,
                                blnAdiciona: true,
                            });
                        },
                        blnEterno: false
                    });
                    return false;
                };
            } else if ($.isNumeric(atributos.intLongitudMinima)) {
                if (strValor !== null && (strValor.length < parseInt(atributos.intLongitudMinima))) {
                    thisJs.Timer({
                        tiempo: 20,
                        funcion: function () {
                            thisJs.MuestraError({
                                titulo: 'Campo ' + atributos.strNombre,
                                texto: 'El campo ' + atributos.strNombre + ' debe contener mínim ' + atributos.intLongitudMinima + ' caracteres.',
                                tipo: 'warning',
                                control: control,
                                blnAdiciona: true,
                            });
                        },
                        blnEterno: false
                    });
                    return false;
                };
            };
            return true;
        };
        control.limpiar = function () {
            thisJs.EstiloError({
                control: control,
                blnAdiciona: false
            });
            control.val('');
        }
        control.value = function (vlrActual) {
            var textoActual = '';
            if (vlrActual === undefined || vlrActual === null) {
                textoActual = $.trim(control.val());
            } else {
                textoActual = vlrActual;
            }
            if (textoActual != undefined || textoActual != null) {
                textoActual = textoActual.toString().replace(/'/g, "");
            }
            control.val(textoActual);
            if (vlrActual === undefined) {
                return textoActual;
            };
        }
        control.bind('keypress', function (e) {
            if (e.keyCode === 39) {
                e.preventDefault();
            } else if (e.keyCode === 13 || e.which === 13) {
                if ($.isArray(atributos.fnEnter)) {
                    atributos.fnEnter();
                } else {
                    control.focusout();
                };
            } else if (atributos.ExpresionRegular !== undefined) {
                if (!atributos.ExpresionRegular.test(String.fromCharCode(e.keyCode))) {
                    e.preventDefault();
                };
            };
        })
        control.bind('change', function () {
            thisJs.EstiloError({
                control: control,
                blnAdiciona: false,
            });
            control.ValidaTipo();
            if (atributos.fnCambiaValor !== undefined) {
                atributos.fnCambiaValor();
            }
        })
        control.bind('blur', function () {
            if (atributos.strTipo === undefined) {
                thisJs.EstiloError({
                    control: control,
                    blnAdiciona: false,
                });
            };
            if (control.val() !== undefined && control.val() !== '' && control.val().length > 0) {
                //if (atributos.blnObligatorio === true) {
                //    control.obligatorio();
                //} else {
                control.value();
                if (control.val().length > atributos.intLongitud) {
                    control.removeAttr('Maxlength');
                    control.attr('Maxlength', atributos.intLongitud);
                    control.focus();
                    thisJs.MuestraError({
                        titulo: 'Campo ' + atributos.strNombre,
                        texto: 'El campo ' + atributos.strNombre + ' supera los ' + atributos.intLongitud + ' caracteres.',
                        tipo: 'warning',
                        control: control,
                        blnAdiciona: true,
                    });
                };
                if (atributos.blnCambiaValor) {
                    if ($.isFunction(atributos.fnCambiaValor)) {
                        atributos.fnCambiaValor();
                    };
                };
                //}
            }
        })
        control.ValidaTipo = function () {
            if (control.val() !== undefined && control.val() !== null && control.val() !== '') {
                if (atributos.strTipo === 'correo') {
                    control.val(control.val().replace(/ /g, ''))
                    var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
                    if (filter.test(control.val())) {
                        return true;
                    } else {
                        thisJs.MuestraError({
                            titulo: 'Campo ' + atributos.strNombre,
                            texto: 'El campo ' + atributos.strNombre + ' no tiene el formato valido de correo.',
                            tipo: 'warning',
                            control: control,
                            blnAdiciona: true,
                        });
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
        control.Habilitar = function (blnActivo) {
            if (!blnActivo) {
                control.attr('readonly', 'readonly');
                //control.attr('disabled', 'disabled');
            } else {
                control.removeAttr('readonly');
                //control.removeAttr('disabled');
            };
        }
        control.Visible = function (blnVisible) {
            if (blnVisible) {
                control.fadeIn();
            } else {
                control.fadeOut();
            };
        }
        control.PlaceHolder = function (strPlaceholder) {
            control.attr('Placeholder', strPlaceholder);
        }
    };

    this.EstiloError = function (atributos) {
        /*
        atributos = {
        control: control,
        blnAdiciona: true, //Indica si se muestra el estilo de error
        }
        */
        var dvPadre = atributos.control.closest(".dvFormulario");
        if (dvPadre.length === 0) {
            dvPadre = atributos.control.closest(".col-xs-12");
        };
        dvPadre.removeClass("has-error");
        dvPadre.removeAttr("data-toggle");
        dvPadre.removeAttr("title");
        dvPadre.removeAttr("data-original-title");
        dvPadre.tooltip('destroy');
        $(".tooltip.fade.top").remove();
        if (atributos.blnAdiciona) {
            dvPadre.addClass("has-error");
            if (!thisJs.StringNullOrEmpty(atributos.texto)) {
                dvPadre.attr("data-toggle", "tooltip");
                dvPadre.attr("title", atributos.texto);
                dvPadre.tooltip();
            };
            dvPadre.focus();
        };
    };

    this.ExpresionesRegulares = {
        SoloLetra: /[a-zA-Z]/,
        SoloNumero: /[0-9]{1,9}(\.[0-9]{0,2})?$/,
        AlfaNumerico: /[a-zA-Z0-9áéíóúÁÉÍÓÚ ]/,
        CaracterEspecial: /\s+|@|&|'|\(|\)|<|>|#|°|!|\$|%|=|¡|¨|]|\[|;|,|{|}|\+|´|¿|¬|~|\^|`/,
        SoloMayuscula: /[A-ZÁÉÍÓÚÑ]/,
        Pasaporte: /\D+/g
        //CaracterEspecialTodo: /\s+|@|&|'|\(|\)|<|>|#|°|!|\$|%|=|¡|¨|]|\[|;|,|{|}|\+|´|¿|¬|~|\^|`|»|¦|¯|¸|'|?|¢|£|¤|¥|?|?|±|«|÷|?|?|?|v|?|˜|=|=|=|§|©|®|µ|¶|·|8|ª|À|à|Â|â|Ä|ä|Ã|ã|Å|å|Æ|æ|Ç|ç|È|è|Ê|ê|Ë|ë|Ì|ì|Î|î|Ï|ï|º|Ò|ò|Ô|ô|Ö|ö|Õ|õ|Ø|ø|ß|Ù|ù|Û|û|Ü|ü|ÿ|a|ß|G|?|?|p|?|S|s|?|O|²|³|¼|½|¾|Ð|ð|Þ|þ|×|‘|“|”|‚|•|€|™|†|‡|?|‰|?|?|?|?|?|?|?|?|‹|›|"|:|„/gi,
    };

    this.ParametroUrl = function (sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    this.IsNullOrUndefined = function (valor) {
        return (valor === undefined || valor === null);
    };

    this.ModalVacia = function (atributos) {
        /*
        atributos = {
        headerClose: true,
        titulo: "Eliminar registro",
        contenido: $("<div></div>"), //Controles que se adicionarán a la modal
        botones: [$("<a>Guardar</a>"), $("<a>Cancelar</a>"), $("<a>Informar</a>")], // Colección de botones que se adicionarán a la modal
        BotonCerrar: {
        texto: 'Cancelar', //Texto que se escribirá en el botón cerrar
        click: function () { evento }
        }, // Función que se ejecutara al dar click en el botón cerrar
        ancho: 350, //ancho de la modal,
        fnCerrarModal: function () { evento } // Se ejecuta está función al dar click en el botón guardar
        }
        */

        $('.modal').remove();
        if (atributos.ancho !== undefined) {
            atributos.ancho = 'style = "width:' + atributos.ancho + ($.isNumeric(atributos.ancho) ? 'px' : '') + ';"';
        } else {
            atributos.ancho = "";
        }
        var dvModalVacia = $(
            '<div class="modal fade">' +
            '<div class="vertical-alignment-helper">' +
            '<div class="modal-dialog vertical-align-center">' +
            '<div class="modal-content" ' + atributos.ancho + '>' +
            '<div class="modal-header btn-primary">' +
            (atributos.headerClose === false ? '' : '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>') +
            '<h4 class="modal-title">' + atributos.titulo + '</h4>' +
            '</div>' +
            '<div class="modal-body"' + (atributos.NoBorde === true ? 'style="padding: 0px;"' : '') + ' >' +
            '</div>' +
            '<div class="modal-footer">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        )
        dvModalVacia.find('.modal-body').append(atributos.contenido);
        dvModalVacia.find('.modal-body').append(atributos.botones);
        if (atributos.botones !== undefined && atributos.botones.length > 0) {
            $.each(atributos.botones, function (i, btn) {
                dvModalVacia.find('.modal-footer').append(btn)
            })
        };

        if (atributos.BotonCerrar !== undefined) {
            var btnNo = $('<a class="btn btn-primary btnAccionModal"><strong class="' + (thisJs.StringNullOrEmpty(atributos.BotonCerrar.icono) ? '' : atributos.BotonCerrar.icono) + '"></strong> ' + atributos.BotonCerrar.texto + '</a>');
            if ($.isFunction(atributos.BotonCerrar.click)) {
                btnNo.click(atributos.BotonCerrar.click);
            } else if ($.isFunction(atributos.fnCerrarModal)) {
                btnNo.click(function () {
                    atributos.fnCerrarModal();
                    thisJs.CierraModales();
                });
            } else {
                btnNo.click(thisJs.CierraModales);
            };
            dvModalVacia.find('.modal-footer').append(btnNo);
        }

        if ($.isFunction(atributos.fnCerrarModal)) {
            dvModalVacia.on('hidden.bs.modal', function () {
                atributos.fnCerrarModal();
                thisJs.CierraModales();
            })
        } else {
            dvModalVacia.on('hidden.bs.modal', function () {
                thisJs.CierraModales();
            })
        };
        dvModalVacia.modal({
            backdrop: 'static', keyboard: false
        })
    };

    this.StringNullOrEmpty = function (texto) {
        texto = texto ? texto.toString() : "";
        return (texto === undefined || texto === null || texto.replace(/'/g, "").length <= 0);
    };

    this.ControlVisible = function (control, blnVisible) {
        if (blnVisible === false) {
            control.attr('style', 'display:none;')
        } else {
            control.removeAttr('style', 'display:none;')
        }
    };

    this.CierraModales = function () {
        $(".modal").modal('hide');
        $(".modal-backdrop").remove();
        $(".modal").remove();
        $("body").removeAttr('class');
        $("body").removeAttr('style');
        $(".MensajeAlerta").remove();
    };
};