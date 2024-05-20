<script setup lang="ts">
const props = defineProps<{
  options?: { label: string;value: string }[];
}>();

const modelValue = defineModel<string>();
</script>

<template>
  <div class="flex items-center">
    <select v-model="modelValue" class="outline-none">
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
