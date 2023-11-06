<script>
    //importamos los componentes
    import Card from './components/Card.vue';
    //exportamos unas componentes: nuestra Card
    export default {
     //introducimos la funcion data con return para poder ver el objeto en web
      data(){
        return{
          //para definir las propiedades de varios componentes iguales, lo declaramos como objeto
          propiedades:[
            {mensaje: "Carta1", enlace: "src/assets/logo.svg", cuerpo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
            {mensaje: "Carta2", enlace: "src/assets/logo.svg", cuerpo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
            {mensaje: "Carta3", enlace: "src/assets/logo.svg", cuerpo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
          ]
        }
      }, 
      components: {
       Card
      }
    }
</script>

<template>
  <!--para meter todo el objeto "propiedades" declaramos el v-for e una card por cada item del array-->
  <div class="col col-lg-4" v-for="propiedad in propiedades">
    <!--Ponemos las propiedades de la Card con los dos puntos delante (:)-->
    <Card :titulo="propiedad.mensaje" :ruta="propiedad.enlace" :texto="propiedad.cuerpo"/>
  </div>
</template>

<!--importamos el fichero de bootstrap para aplicar estilos a todo el proyecto-->
<style>
/*borrar los estilos del main.js */
@import url("./assets/bootstrap.css");
</style>
