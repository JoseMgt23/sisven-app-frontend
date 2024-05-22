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
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product,index) in products" :key="index">
                <th scope="row">{{ index+1 }}</th>
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.id_categorias }}</td>
                <td>
                    <button @click="deleteProduct(product.id)"
                        class="btn btn-danger mx-2">
                        <font-awesome-icon icon="trash" />
                    </button>
                    <button @click="editProduct(product.id)"
                        class="btn btn-warning mx-2">
                        <font-awesome-icon icon="pencil" />

                    </button>
                </td>
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
    methodos: {
        deleteProduct(codigo){
            Swal.fire({
                title:'Do you want to delete the Product with id ${codigo}?',
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then((result)=> {
                if(result.isConfirmed){
                    axios.delete('http://127.0.0.1:8000/api/products/${codigo}')
                    .then(response => {
                        if(response.data.success){
                            Swal.fire('Deleted!!','','success')
                            this.products = response.data.products
                        }
                    })
                }
            })
        },  
        editProduct(id){
            this.$router.push({name:'EditarProduct', params: {id:'${id}'}})
        },
        newProduct(){
            this.$route.push({name:'NewProduct'});
        }
    },
    mounted (){
        axios
            .get('http://127.0.0.1:8000/api/products')
            .then(response => (this.products = response.data.products))
    },
}
</script>