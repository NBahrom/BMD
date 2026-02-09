<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex justify-center items-center">
        <h2>Oops! This page doesn’t exist</h2>
        <p>You may have mistyped the address or followed a broken link. Please double-check the URL or go back to the homepage.</p>
        <RouterLink to="/">Home</RouterLink>
    </div>
</template>