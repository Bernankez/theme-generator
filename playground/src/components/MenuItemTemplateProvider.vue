<script setup lang="ts">
import { provide, ref } from "vue";
import { editIdKey } from "./injection-keys";

const editId = ref<string>();

provide(editIdKey, editId);
</script>

<template>
  <slot></slot>
</template>
