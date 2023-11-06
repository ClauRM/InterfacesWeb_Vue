<script>
    export default{
        //definimos las propiedades de la tarjeta
        props:{
            titulo:{
                type:String
            },
            ruta:{
                type:String
            },
            texto:{
                type:String
            }
        }
    }
</script>


<template> <!--con v-blind podemos pasar atributos a la componente con los dos puntos (:)-->
    <!--escribimos el codigo html de la tarjeta implementando bootstrap-->
        <div class="card">
            <img :src="ruta" class ="card-img-top" height="100"/><!--img se le pasa la ruta como parametro con (:) dos puntos delante-->
            <div class="card-body">
                <h5 class="card-title">{{ titulo }}</h5> <!--doble llave para pasar parametros-->
                <p class="card-body">{{ texto }}</p>
            </div>
        </div>
</template> 
<!--no hace falta importar bootstrap porque ya va aplicado a todo el proyecto en el
fichero App.vue
-->