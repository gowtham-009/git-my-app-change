<template>
    <ThemeSwitcher />
    <div class="card flex justify-center gap-2 p-4">
        <button @click="setDate" class="px-4 py-2 bg-blue-500 text-white rounded">Set</button>
        <input v-model="date" type="date" 
            class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-60" />
        <button @click="logDate" class="px-4 py-2 bg-green-500 text-white rounded">Pick</button>
    </div>
</template>

<script setup>
import { ref } from "vue";

const date = ref("");

// Set date properly in YYYY-MM-DD format
const setDate = () => {
    date.value = "2025-02-02";
};

// Log the selected date
const logDate = () => {
    console.log("Selected Date:", date.value);
};
</script>