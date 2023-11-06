<!--parte logica-->
<script setup>
import { ref } from 'vue'; //import ref (valor cambiante) en minuscula
//variables reactivas
const nombre = ref(''); //elemento reactivo ref
const nombres = ref([]); //matriz reactiva ref
const listado = ref(false);//booleano reactivo ref

//metodo guardar
const guardar = () => {
    if (nombre.value == '') { //para coger el valor en ese momento siempre .value
        window.alert('Nombre no puede ser vacío');
    } else {
        nombres.value.push(nombre.value);//aniade el valor de nombre a la matriz nombres
        nombre.value = ''; //despues de aniadir limpiar
    }
}

//metodo listar
const listar = () => {
    listado.value = true; //cuando se presione el boton listado, debe listar
    if (listado.value) {

    }
}

//metodo nolistar - no ver el listado
const nolistar = () => {
    listado.value = false; //cuando se presione el boton nolistar, borrar listado
}

//metodo vaciar listado
const borrar = () => {
    nombres.value = [];//cuando se pinche, borra datos de la matriz
}

</script>

<!--parte vista-->
<template>
    <input class="form-control" placeholder="Introduce tu nombre" v-model="nombre" type="text">
    <button @click="guardar" class="btn btn-secondary mt-2">Guardar</button>
    <button @click="listar" class="btn btn-warning mt-2 mx-2">Listar</button>
    <button @click="nolistar" class="btn btn-primary mt-2">Borrar listado</button>
    <button @click="borrar" class="btn btn-danger mt-2 mx-2">Vaciar listado</button>
    <!--v-directivas-->
    <div v-if="listado"> <!--si listado es true, pinta la lista de nombres-->
        <ul v-for="item in nombres"> <!--recorre con un for la matriz nombres-->
            <li> {{ item }}</li> <!--dentro de la lista pinta cada item-->
        </ul>
    </div>
</template>

<!--parte estilos-->
<style>
@import url(../assets/bootstrap.css);
</style>