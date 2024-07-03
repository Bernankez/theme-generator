<script setup lang="ts">
import MenuItem from "./MenuItem.vue";
</script>

<template>
  <MenuItem :auto-collapse="false" disabled class="text-sm cursor-default!">
    <slot></slot>
  </MenuItem>
</template>
