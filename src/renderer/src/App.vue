<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  setRem()
  window.addEventListener('resize', setRem)

})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setRem);
})
const setRem = () => {
  const width = window.innerWidth;
  const rem = width / 120;
  document.documentElement.style.fontSize = `${rem}px`;
}


</script>
<style></style>