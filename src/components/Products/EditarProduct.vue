<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Editar Producto
            </div>
            <div class="card-body">
                <form @submit.prevent="updateProduct">
                    <div class="row mb-3">
                        <label for="codigo" class="form-label">Codigo</label>
                        <div class="input-group">
                            <div class="input-group">
                                <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
                                <input type="text" class="form-control" id="codigo" placeholder="Codigo Product" disabled 
                                    v-model='product.id'>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre del Producto"
                                v-model='product.name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="price" class="form-label">Precio:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="bank" /></div>
                            <input type="text" class="form-control" id="price" placeholder="Precio"
                                v-model='product.price'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="existencia" class="form-label">Existencia:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="boxes" /></div>
                            <input type="number" class="form-control" id="stock" placeholder="Existencia Producto"
                                v-model='product.stock'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="categoria" class="form-label">Categoría:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="list" /></div>
                            <select class="form-select" v-model="product.id_categoria">
                                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Actualizar</button>
                    <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'EditarProducto',
    data(){
        return{
            producto:{
                id: 0,
                name: '',
                price: 0,
                stock: 0,
                id_categoria: 0,
            },
            categorias: []
        }
    },
    methods: {
        cancelar(){
            this.$router.push({name: 'Products'})
        },

        async updateProducto(){
            const res = await axios.put(`http://127.0.0.1:8000/api/products/${this.product.id}`, this.product)
            if (res.status == 200){
                this.$router.push({name:'Products'})
                Swal.fire({
                    position: 'top-end',
                    icon:'success',
                    title: 'Producto ha sido actualizado',
                    showConfirmButton: false,
                    timer:2000
                })
            }
        }
    },

    mounted(){
        this.product.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/products/${this.product.id}`)
        .then(response => {
            this.product = response.data.product;
        })
        axios.get('http://127.0.0.1:8000/api/categorias')
        .then(response => {
            this.categorias = response.data.categorias;
        })
    },
}
</script>