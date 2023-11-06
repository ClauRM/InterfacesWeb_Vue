<script>
export default {
    data() {
        return {
            nombre: '',
            apellido: ''
        }
    },
    methods: {
        comprobar: function () {
            if (this.nombre == '' || this.apellido == '') {
                alert("Ningún campo puede estar vacío")
            } else {
                this.$router.push({name:'listado', params:{_nombre:this.nombre,_apellido:this.apellido}})
            }
        }
    }
}

</script>
<template>
    <v-text-field v-model="nombre" type="text" placeholder="Introduce tu nombre"></v-text-field>
    <v-text-field v-model="apellido" type="text" placeholder="Introduce tu apellido"></v-text-field>
    <v-btn @click="comprobar" color="secondary">¿Hay errores?</v-btn>
</template>