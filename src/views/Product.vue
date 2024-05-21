<template>
 <div class="container">
    <h1>Lstado de Productos</h1>
    <table clss="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Existencia</th>
                <th scope="col">Categorias</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(producto,index) in productos" :key="index">
                <th scope="row">{{ index }}</th>
                <td>{{ producto.name }}</td>
                <td>{{ producto.price }}</td>
                <td>{{ producto.stock }}</td>
                <td>{{ producto.id_categorias }}</td>
            </tr>
        </tbody>
    </table>
 </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Product',
    data(){
        return {
            products: []
        }
    },
    mounted (){
        axios
            .get('http://127.0.0.1:8000/api/products')
            .then(response => (this.products = response.data.products))
    },
}
</script>