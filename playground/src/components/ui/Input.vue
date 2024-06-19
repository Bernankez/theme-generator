<script setup lang="ts">
const modelValue = defineModel<string>();
</script>

<template>
  <input v-model="modelValue" class="rounded-md px-1.5 py-1 outline-1 outline-solid transition focus-within:outline-2" v-bind="$attrs" />
</template>
