<script setup>
import ExampleMenu from "../components/Tabs/ExampleMenu.vue";
</script>

<template>
  <div class="about">
    <ExampleMenu/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    width: 100%;
  }
}
</style>
