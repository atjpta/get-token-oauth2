<template>
  <div class="my-10 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 w-fit mx-auto">
    <vFbOauth2 />
    <vGgOauth2 />
    <div>1</div>
    <div>1</div>
  </div>
</template>

<script setup>
import vFbOauth2 from "./components/v-fb-oauth2.vue";
import vGgOauth2 from "./components/v-gg-oauth2.vue";
</script>

<style></style>
