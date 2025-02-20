<template>
    <div>
        <button type="button" @click="one">done</button>
      <input type="date" v-model="start">
      <input type="date" v-model="end">
      <button type="button" @click="filter">Apply</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const start = ref(''); // Corrected format to YYYY-MM-DD
  const end = ref('');
  
  const one=()=>{
    start.value='2025-02-03'
    end.value='2025-02-03'
  }
  const filter = () => {
    console.log(start.value, end.value); // Access the values properly
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  