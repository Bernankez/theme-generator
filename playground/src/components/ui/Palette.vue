<script setup lang="ts">
import chroma from "chroma-js";
import { computed } from "vue";

const color = defineModel<string>();

const standardColor = computed({
  get: () => {
    try {
      return color.value && chroma(color.value).hex();
    } catch (e) {
      console.error(e);
      return "";
    }
  },
  set: c => color.value = c,
});
</script>

<template>
  <input v-model="standardColor" type="color" class="h-8 w-7 b-none bg-transparent p-0 outline-none" />
</template>
