<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Categoría</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Editar Categoría
            </div>
            <div class="card-body">
                <form @submit.prevent="updateCategoria">
                    <div class="row mb-3">
                        <label for="codigo" class="form-label">Código</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="codigo" placeholder="Código Categoría" disabled 
                                v-model='categoria.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="building" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre de la Categoría"
                                v-model='categoria.nombre'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="descripcion" class="form-label">Descripción:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="file-alt" /></div>
                            <textarea class="form-control" id="descripcion" placeholder="Descripción de la Categoría"
                                v-model='categoria.descripcion'></textarea>
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
    name: 'EditarCategoria',
    data() {
        return {
            categoria: {
                id: 0,
                nombre: '',
                descripcion: '',
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Categorias' });
        },
        async updateCategoria() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/categorias/${this.categoria.id}`, this.categoria);
                if (res.status === 200) {
                    this.$router.push({ name: 'Categorias' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Categoría ha sido actualizada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error al actualizar la categoría:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al actualizar la categoría',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                });
            }
        }
    },
    mounted() {
        this.categoria.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/categorias/${this.categoria.id}`)
            .then(response => {
                this.categoria = response.data.categoria;
            })
            .catch(error => {
                console.error('Error al cargar la categoría:', error);
            });
    },
}
</script>
