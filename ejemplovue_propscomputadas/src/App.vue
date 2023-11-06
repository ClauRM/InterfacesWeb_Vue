<script>
//cuando se escriban palabras que aparezcan en mayusculas
export default {
  data() {
    return {
      palabra: '',
      mensaje: '' //declaramos la variable mensaje para mostrarla cuando se cumpla una condicion
    }
  }
  ,
  //definimos la propiedad computada que crea contenido de forma dinamica
  computed: {
    mayusculas: function () {
      return this.palabra.toUpperCase(); // la escribe en mayuscula
    },
    inverso: function () {
      return this.palabra.split('').reverse().join(''); //alreves
    }
  },
  //cuando el input cumpla alguna condicion haga algo
  watch: {
    //recogemos el valor de la variable palabra
    palabra: function (valor, anterior) {
      if (valor == 'Claudia') {
        this.mensaje = '¡! Hola Claudia ¡!'
      }
      else {
        this.mensaje = 'Escribe una palabra'
      }
      //con anterior, podemos mostrar el valor que habia antes
      console.log(anterior)
    }
  }
}

</script>

<template>
  <!--con v-model para atrapar la variable "palabra" que se introduzca en el input-->
  <input v-model="palabra" type="text" />
  <!--para mostrar lo que se ha escrito en mayusculas-->
  <p>Mayúsculas: {{ mayusculas }}</p>
  <p>Alrevés: {{ inverso }}</p>
  <p>{{ mensaje }}</p>
</template>

<style>

</style>
