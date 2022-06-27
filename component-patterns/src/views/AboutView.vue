<script setup>
import TabProvider from "../components/Tabs/TabProvider.vue";
</script>

<template>
  <div class="about">
    <TabProvider/>
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
