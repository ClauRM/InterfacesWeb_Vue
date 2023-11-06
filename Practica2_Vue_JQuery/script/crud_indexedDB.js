const DB_NAME = "diwhotwheels"; //nombre de la db
const DB_VERSION = 1; //version de la db

var db;
//1.Abrir la base de datos (nombre,version instalada) 
var solicitud = indexedDB.open(DB_NAME, DB_VERSION); //se realiza la solicitud de abrir la db
console.log("Abriendo bd...");

//2.Listener. Se dispara si el cliente no tiene la base de datos. Crea el esquema de la base de datos
solicitud.onupgradeneeded = function (e) {
    console.log("ejecutando solicitud.onupgradeneeded...");
    //trabajar con la base de datos usando el objeto almacen
    let almacen;

    db = solicitud.result;

    //Se evalua la version de db. Si es 0: no hay base de datos instalada
    if (e.oldVersion < 1) {//Si es menor de 1, se creara la db
        if (!db.objectStoreNames.contains("diw_coches")) { //si no hay un almacen de coches 

            almacen = db.createObjectStore("diw_coches", { keyPath: "id", autoIncrement: true }); //createObjectStore crea el almacen con id

            //createIndex crear un indice: true no permite valores duplicados
            //definir los elementos de datos que contendra el almacen
            almacen.createIndex("modelo", "modelo", { unique: false });
            almacen.createIndex("serie", "serie", { unique: false });
            almacen.createIndex("precio", "precio", { unique: false });
            almacen.createIndex("cantidad", "cantidad", { unique: false });
            almacen.createIndex("total", "total", { unique: false });

            console.info("Creado almace de datos");
        } else {
            console.info("Ya existe almacen")
        }
    } else {
        console.log("Intenta acceder a una versión superior");
    }
};

//proceso asincrono si se ha ejecutado correctamente
solicitud.onsuccess = function () {
    db = solicitud.result; // trabaja con la base de datos usando el objeto db, resultado de abrir la db
    console.info("Existe bd: indexedDB.open ok");
    listarTabla(); //revisa si hay datos en la tabla y los lista
};

//proceso asincrono si se ha producido algun error
solicitud.onerror = function () {
    console.error("Error indexedDB.open: ", solicitud.error);
};

//4.Hacer una transacción
//insertar datos
function insertar(datoModelo, datoSerie, datoPrecio, datoCantidad) {
    let transaction, solicitud, coches, coche; //variables locales

    transaction = db.transaction("diw_coches", "readwrite"); //Transaccion para escribir en el almamcen de coches
    console.log("Conectado transaction");

    coches = transaction.objectStore("diw_coches"); // Abrir transaccion del almacen
    console.log("Lista coches creada");

    coche = { modelo: datoModelo, serie: datoSerie, precio: datoPrecio, cantidad: datoCantidad, total: (datoPrecio * datoCantidad) };//objeto coche con datos formato json
    console.log("Coche creado");

    solicitud = coches.add(coche); //metodo add: aniadir el objeto coche al almacen
    console.log("Coche añadido al listado!");

    //Promisses
    solicitud.onsuccess = function () {
        console.log("Coche agregado id: ", solicitud.result); //el resultado request.result de add es la clave del nuevo objeto
        aniadeListado(solicitud.result, coche);//muestra el coche aniadido en el listado        
    };

    solicitud.onerror = function () {
        console.log("Error al intentar agregar coche: ", solicitud.error); //si ya existe el id
    };
}

// listar datos
function consultar() {
    console.log("entra en function consultar");
    //cuando se consulta puede pasar que devuelva un conjunto de datos o no, establecer cursor 
    let objectStore = db.transaction("diw_coches").objectStore("diw_coches"); //coleccion
    let coche;
    let cursor;

    objectStore.openCursor().onsuccess = function (e) {
        cursor = e.target.result; //cursor = resulset, del conjunto de datos es el primer registro
        //el cursor debe estar dentro de un bucle cuando hay mas registros

        console.log("cursor = " + cursor);

        if (cursor) {
            coche = { modelo: cursor.value.modelo, serie: cursor.value.serie, precio: cursor.value.precio, cantidad: cursor.value.cantidad, total: cursor.value.total }; //objeto json
            aniadeListado(cursor.value.id, coche);
            cursor.continue(); //para recorrerlo hay que mover el puntero con continue
        } else {
            console.log("Actualizada vista de tabla");
        }
    };
}

// Eliminar datos
function eliminar(idBorrar) {
    //para mostrar una alerta de confirmación antes de eliminar
    let texto = "Se va a eliminar un coche del listado. ¿Está seguro?\nPulse Aceptar o Cancelar";
    let request;
    //si pulsa en Aceptar se ejecuta el borrado
    if (confirm(texto) == true) {
        request = db.transaction("diw_coches", "readwrite").objectStore("diw_coches").delete(idBorrar); //metodo delete: elimina el registro con el id del parentesis
        //si la eliminacion es correcta
        request.onsuccess = function (e) {
            console.log("Registro eliminado correctamente");
            listarTabla(); //presenta el listado actual
        };
        alert("Registro eliminado");
    } else {
        alert("Acción cancelada");
    }
}

// Funcion modificar
function modificar(idModificar) {
    alert("Modifique los datos del coche y pulse Actualizar");
    let objeto;
    let objectStore = db.transaction("diw_coches", "readwrite").objectStore("diw_coches");
    let request = objectStore.get(idModificar);//acceder exactamente al registro que queremos modificar 
    //promisses
    request.onerror = function () {
        console.info("Se ha producido un error!");
    };
    request.onsuccess = function () {
        objeto = request.result; // Obtener el objeto antiguo para actualizar
        //visualizar los datos antiguos en el formulario
        $("#modelo").val(objeto.modelo);
        $("#serie").find("option:contains('" + objeto.serie + "')").prop("selected", true);
        $("#cantidad").val(objeto.cantidad);
        $("#precio").val(objeto.precio);

        $("#actualizar").attr("disabled", false);//habilitar el boton actualizar
        $("#registrar").attr("disabled", true);//deshabilitar nuevamente el boton actualizar
    }
    //Listener sobre boton de actualizar
    $("#actualizar").click(function () {
        actualizar(idModificar,objeto); //la funcion recibe el id y el objeto completo
    });
}

function actualizar(idModificar,objeto) {
    console.log("entra en funcion actualizar");
    //variables boolean para controlar que los campos estan debidamente cumplimentados
    let modeloOk, serieOk, precioOk, cantidadOk;
    let requestUpdate; //respuesta modificacion
    let objectStore; //objeto del almacen

    //almacenar el valor de los inputs
    modelo = $('#modelo').val().trim();
    serie = $('#serie option:selected').val();
    precio = $('#precio').val().trim();
    cantidad = $('#cantidad').val().trim();

    //inicializo variables boolean y valido los datos 
    modeloOk = validarTexto(modelo, $('#modelo'));
    serieOk = validarSelect(serie, $('#serie'));
    precioOk = validarNumero(precio, $('#precio'));
    cantidadOk = validarNumero(cantidad, $('#cantidad'));

    if (modeloOk && serieOk && precioOk && cantidadOk) {
        //actualizar los valores del objeto
        objeto.modelo = modelo;
        objeto.serie = serie;
        objeto.precio = precio;
        objeto.cantidad = cantidad;
        objeto.total = precio * cantidad;
       
        objectStore = db.transaction("diw_coches", "readwrite").objectStore("diw_coches"); //iniciar nueva transaccion
        requestUpdate = objectStore.put(objeto); // Volver a colocar el objeto actualizado en la base de datos //metodo put: hace la modificacion

        //promisses
        requestUpdate.onerror = function () {
            console.info("No se puede modificar");
        };
        requestUpdate.onsuccess = function () {
            console.info("Registro modificado");
            limpiarFormulario();
            $("#actualizar").attr("disabled", true);//deshabilitar nuevamente el boton actualizar
            $("#registrar").attr("disabled", false);//habilitar nuevamente el boton actualizar
        };

    } else {
        mostrarError($('#modelo'), "Revise  el contenido de todos los campos antes de Actualizar");
    }
    listarTabla();//lista la nueva tabla
}

function aniadeListado(id, coche) {
    //se asocia el id = solicitud.result al boton eliminar para construir su id
    //lee los propiedades del coche en formato json para crear la tabla
    $("#tabla").append("<tr><td>" + coche.modelo + "</td><td>" + coche.serie + "</td><td>" + coche.precio + "</td><td>" + coche.cantidad + "</td><td>" + coche.total + "</td><td><button id='modificar" + id + "' class='btn btn-outline-primary' type='button'>Modificar</button></td><td><button id='eliminar" + id + "' class='btn btn-outline-primary' type='button'>Eliminar</button></td></tr></table>");

    //crea funcion asociada al boton eliminar creado de forma dinamica
    $("#eliminar" + id).click(function () {
        eliminar(id);
    });

    //crea funcion asociada al boton modificar creado de forma dinamica
    $("#modificar" + id).click(function () {
        modificar(id);
    });
}

function tituloTabla() {
    $("#listado").append("<table id='tabla' class='table table-striped table-hover'><tr id='titulo'><td><strong>Modelo</strong></td><td><strong>Serie</strong></td><td><strong>Precio(EUR)</strong></td><td><strong>Cantidad</strong></td><td><strong>Total(EUR)</strong></td><td><strong>Modificar</strong></td><td><strong>Eliminar</strong></td></tr>");
}

function listarTabla() {
    $("#tabla").remove(); //borrar el listado antiguo
    tituloTabla(); //crear la etiqueta html para la tabla
    consultar(); //si existe la bd, actualiza el listado
    $("#listado").append("<table>"); // finaliza la etiqueta html de la tabla
}