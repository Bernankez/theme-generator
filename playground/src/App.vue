<script setup lang="ts">
import { colors } from "@bernankez/theme-generator";
</script>

<template>
  <div>
    <div v-for="(color, key) in colors" :key="key">
      {{ key }}
    </div>
  </div>
</template>
