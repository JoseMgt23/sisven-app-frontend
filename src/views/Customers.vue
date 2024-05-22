<template>
    <div class="container">
       <h1>Lstado de Customers</h1>
       <table clss="table">
           <thead>
               <tr>
                   <th scope="col">#</th>
                   <th scope="col">Numero de documento</th>
                   <th scope="col">Nombre</th>
                   <th scope="col">Apellido</th>
                   <th scope="col">Direccion</th>
                   <th scope="col">Fecha de nacimiento</th>
                   <th scope="col">Telefono</th>
                   <th scope="col">Correo</th>
                   <th scope="col">Action</th>
               </tr>
           </thead>
           <tbody>
               <tr v-for="(customer,index) in customers" :key="index">
                   <th scope="row">{{ index+1 }}</th>
                   <td>{{ customer.document_number }}</td>
                   <td>{{ customer.first_name }}</td>
                   <td>{{ customer.last_name }}</td>
                   <td>{{ customer.address }}</td>
                   <td>{{ customer.birthday }}</td>
                   <td>{{ customer.phone_number }}</td>
                   <td>{{ customer.email }}</td> 
               </tr>
           </tbody>
       </table>
    </div>
   </template>
   <script>
   import axios from 'axios'
   
   export default {
       name: 'Customer',
       data(){
           return {
               customers: []
           }
       },
       mounted (){
           axios
               .get('http://127.0.0.1:8000/api/customers')
               .then(response => (this.customers = response.data.customers))
       },
   }
   </script>