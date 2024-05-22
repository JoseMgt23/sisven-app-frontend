<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Nueva Categoría</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Categoría
            </div>
            <div class="card-body">
                <form @submit.prevent="saveCategoria">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Código</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Código Categoría" disabled
                                v-model='categoria.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="nombre" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="box" /></div>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre Categoría"
                                v-model='categoria.nombre'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="descripcion" class="form-label">Descripción:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="file-alt" /></div>
                            <textarea class="form-control" id="descripcion" placeholder="Descripción Categoría"
                                v-model='categoria.descripcion'></textarea>
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
    name: 'NuevaCategoria',
    data() {
        return {
            categoria: {
                id: 0,
                nombre: '',
                descripcion: ''
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Categorias' });
        },
        async saveCategoria() {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/categorias', this.categoria);
                if (res.status === 200 || res.status === 201) {
                    this.$router.push({ name: 'Categorias' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Categoría ha sido guardada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error al guardar la categoría:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al guardar la categoría',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                });
            }
        }
    }
}
</script>
