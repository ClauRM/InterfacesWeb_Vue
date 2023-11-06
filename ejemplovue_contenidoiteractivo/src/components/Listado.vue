<script>
export default {
    props: {
        _nombre: {
            type: String
        },
        _apellido: {
            type: String
        }
    },
    data() {
        return {
            nota: '',
            notas: []
        }
    },
    methods: {
        guardar: function () {
            //cuando se pulse el boton, guarda el valor nota en el array
            this.notas.push(this.nota)
            this.nota = '' //despues de guardarlo, vaciar el campo
            console.log(this.notas)
        }
    }
}
</script>

<template>
    <h1>Buenos días, {{ _nombre }} {{ _apellido }}</h1>
    <v-text-field v-model="nota" type="number" placeholder="Introduzca la nota"></v-text-field>
    <v-btn color="secondary" @click="guardar">Guardar</v-btn>
    <div>
        <!--con un v-for recorremos la lista array para poner un elemento li por cada valor-->
        <ul v-for="item in notas">
            <li>{{ item }}</li>
        </ul>
    </div>
</template>

<style>
li {
    margin-left: 30px;
    list-style: none; /*eliminar la vinieta*/
}
</style>