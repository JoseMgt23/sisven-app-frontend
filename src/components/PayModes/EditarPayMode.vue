<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Método de Pago</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Método de Pago
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePaymode">
                    <div class="row mb-3">
                        <label for="id" class="form-label">Código</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                            <input type="text" class="form-control" id="id" placeholder="Código Método de Pago" disabled
                                v-model='paymode.id'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="credit-card" /></div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre Método de Pago"
                                v-model='paymode.name'>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="observation" class="form-label">Observación:</label>
                        <div class="input-group">
                            <div class="input-group-text"><font-awesome-icon icon="file-alt" /></div>
                            <textarea class="form-control" id="observation" placeholder="Observación"
                                v-model='paymode.observation'></textarea>
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
    name: 'EditarPaymode',
    data() {
        return {
            paymode: {
                id: 0,
                name: '',
                observation: ''
            }
        }
    },
    methods: {
        cancelar() {
            this.$router.push({ name: 'Paymodes' });
        },
        async updatePaymode() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/paymodes/${this.paymode.id}`, this.paymode);
                if (res.status === 200) {
                    this.$router.push({ name: 'Paymodes' });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Método de Pago ha sido actualizado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                console.error('Error al actualizar el método de pago:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al actualizar el método de pago',
                    text: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                });
            }
        }
    },
    mounted() {
        this.paymode.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/paymodes/${this.paymode.id}`)
        .then(response => {
            this.paymode = response.data.paymode;
        })
        .catch(error => {
            console.error('Error al cargar el método de pago:', error);
        });
    },
}
</script>
