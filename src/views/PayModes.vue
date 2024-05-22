<template>
    <div class="container">
       <h1>Lstado de PayMode</h1>
       <table clss="table">
           <thead>
               <tr>
                   <th scope="col">#</th>
                   <th scope="col">Nombre</th>
                   <th scope="col">Observacion</th>
                   <th scope="col">Action</th>
               </tr>
           </thead>
           <tbody>
               <tr v-for="(paymode,index) in paymodes" :key="index">
                   <th scope="row">{{ index+1 }}</th    >
                   <td>{{ paymode.name }}</td>
                   <td>{{ paymode.observation }}</td>
               </tr>
           </tbody>
       </table>
    </div>
   </template>
   <script>
   import axios from 'axios'
   
   export default {
       name: 'PayMode',
       data(){
           return {
               paymodes: []
           }
       },
       mounted (){
           axios
               .get('http://127.0.0.1:8000/api/paymodes')
               .then(response => (this.paymodes = response.data.paymodes))
       },
   }
   </script>