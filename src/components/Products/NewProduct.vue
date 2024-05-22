<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nuevo Producto</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Producto
            </div>
            <div class="card-body">
                <form @submit.prevent="saveProducto">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Código</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Código Producto" disabled
                                v-model='producto.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="box" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre Producto"
                                v-model='producto.name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="price" class="form-label">Precio:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="dollar-sign" /></div>
                            <input type="number" class="form-control" id="price" placeholder="Precio Producto"
                                v-model='producto.price'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="stock" class="form-label">Existencia:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="boxes" /></div>
                            <input type="number" class="form-control" id="stock" placeholder="Existencia Producto"
                                v-model='producto.stock'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="categoria" class="form-label">Categoría:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="list" /></div>
                            <select class="form-select" v-model="producto.id_categoria">
                                <option selected value="0">Seleccione la categoría</option>
                                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Guardar</button>
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
    name: 'NuevoProducto',
    data() {
        return {
            producto: {
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
        cancelar() {
            this.$router.push({ name: 'Products' });
        },
        async saveProducto() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/products', this.product);
                console.log(res);
                if (res.status === 200 || res.status === 201) {
                    this.$router.push({ name: 'Products' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Producto ha sido guardado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error al guardar el producto:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al guardar el producto',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                });
            }
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/categorias')
        .then(response => {
            this.categorias = response.data.categorias;
        })
        .catch(error => {
            console.error('Error al cargar las categorías:', error);
        });
    },
}
</script>
