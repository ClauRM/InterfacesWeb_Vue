<script>
//en el scrpit definimos el tipo de dato y su return para que se vea en web
export default {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  //para definir un metodo que va a mover la posicion del puntero
  methods: {
    ubicacion: function (event) {
      this.x = event.clientX;
      this.y = event.clientY
    }
  },
  //si queremos que se ejecute en toda la ventana, cuando esta se abra llamamos a la funcion
  created(){
    window.addEventListener('mousemove',this.ubicacion)
  }
}

</script>

<template>
  <!--cuando el raton este dentro del div le sigue una ruedecilla-->
  <!--ponemos el listener para llamar al metodo ubicacion-->
  <div @mousemove="ubicacion" style="border: 1px solid black;width: 300px;height: 300px;"></div>
  <!--para que el spinner siga al raton le decimos en que posicion debe estar pasando los paratetros left y rigth-->
  <div :style="{'left': x + 'px', 'top': y + 'px', 'position':'absolute'}" class="spinner-border"></div>
  <p>Posición en x: {{ x }}</p>
  <p>Posición en y: {{ y }}</p>
</template>


<style>
@import url("./assets/bootstrap.css");
</style>
