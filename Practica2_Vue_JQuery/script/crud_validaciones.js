//VARIABLES GLOBALES
const MIN_CARACTERES = 4; //longitud minima de caracteres en campo String
const MAX_CARACTERES = 20; //longitud maxima de caracteres en campo String
const MIN_NUMERO = 0.01; //valor minimo del campo number
const MAX_NUMERO = 10; //valor maximo del campo number

var modelo, serie, precio, cantidad;

//Listener sobre cada input al perder el foco
$('#modelo').focusout(function () {
    modelo = $('#modelo').val().trim(); //obtener el valor del campo (value)
    validarTexto(modelo, $('#modelo'));
});

$('#serie').change(function () {
    serie = $('#serie option:selected').val(); //obtener el valor seleccionado del campo (value)
    validarSelect(serie, $('#serie'));
});

$('#precio').focusout(function () {
    precio = $('#precio').val().trim(); //obtener el valor del campo (value)
    validarNumero(precio, $('#precio'));
});

$('#cantidad').focusout(function () {
    cantidad = $('#cantidad').val().trim(); //obtener el valor del campo (value)
    validarNumero(cantidad, $('#cantidad'));
});

//Listener sobre boton de registro
$('#registrar').click(function () {
    //variables boolean para controlar que los campos estan debidamente cumplimentados
    let modeloOk, serieOk, precioOk, cantidadOk = false;

    //almacenar el valor de los inputs
    modelo = $('#modelo').val().trim();
    serie = $('#serie option:selected').val();
    precio = $('#precio').val().trim();
    cantidad = $('#cantidad').val().trim();

    //inicializo variables boolean
    modeloOk = validarTexto(modelo, $('#modelo'));
    serieOk = validarSelect(serie, $('#serie'));
    precioOk = validarNumero(precio, $('#precio'));
    cantidadOk = validarNumero(cantidad, $('#cantidad'));

    if (modeloOk && serieOk && precioOk && cantidadOk) {
        insertar(modelo, serie, precio, cantidad);
        limpiarFormulario();
    } else {
        mostrarError($('#modelo'), "Revise  el contenido de todos los campos antes de Registrar");
    }
});

function validarTexto(texto, posicion) {
    let textoOk = true; //variable booleana para controlar que el campo es Ok

    if (!((texto.length >= MIN_CARACTERES) && (texto.length <= MAX_CARACTERES))) {
        mostrarError(posicion, "El campo debe tener una longitud entre " + MIN_CARACTERES + " y " + MAX_CARACTERES + " caracteres");
        textoOk = false;
    }

    if (textoOk) {
        borraErrorAnterior(posicion);
    }
    return textoOk;
}

function validarSelect(select, posicion) {
    let selectOk = true;//variable booleana para controlar que el campo es Ok

    if (select == "sinseleccion") {
        mostrarError(posicion, "Debe seleccionar una serie del listado");
        selectOk = false;
    }

    if (selectOk) {
        borraErrorAnterior(posicion);
    }
    return selectOk;

}
function validarNumero(numero, posicion) {
    let numeroOk = true; //variable booleana para controlar que el campo es Ok

    if (!((numero >= MIN_NUMERO) && (numero <= MAX_NUMERO))) {
        mostrarError(posicion, "El valor numérico debe estar entre " + MIN_NUMERO + " y " + MAX_NUMERO);
        numeroOk = false;
    }

    if (numeroOk) {
        borraErrorAnterior(posicion);
    }
    return numeroOk;
}

//Función que señala que existe un error
function mostrarError(posicion, mensaje) {
    borraErrorAnterior(posicion); //limpia los errores anteriores
    error(posicion, mensaje); //muestra mensaje de error
}

//posición = objeto que se esta evaluando
function error(posicion, mensaje) {
    posicion.css('background-color', '#EEC4C9'); // cambio el color de fondo del campo con error;
    $("#oculto").removeClass("d-none"); //mostrar campo oculto
    $("#mensajes").append(mensaje); //aniadir el mensaje
}

//Limpia cualquier error que se haya mostrado anteriormente
function borraErrorAnterior(posicion) {
    posicion.css('background-color', ""); // quito el color de fondo del campo;
    $("#oculto").addClass("d-none"); //oculta campo div mensajes
    $("#mensajes").empty(); //borra el mensaje anterior
}

function limpiarFormulario() {
    $("#modelo").val("");
    $("#serie").find("option:contains('Serie del coche')").prop("selected",true);
    $("#cantidad").val("");
    $("#precio").val("");
}