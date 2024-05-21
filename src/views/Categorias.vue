<template>
    <div class="container">
      <h1>Listado de Categorías</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categoria, index) in categorias" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ categoria.nombre }}</td>
            <td>{{ categoria.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
<script>
import axios from 'axios'

export default {
  name: 'Categoria',
  data() {
    return {
      categorias: []
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/categorias')
      .then(response => {
        this.categorias = response.data.categorias;
      })
      .catch(error => {
        console.error("There was an error fetching the categorias!", error);
      });
  },
}
</script>
  