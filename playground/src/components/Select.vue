<script setup lang="ts">
const props = defineProps<{
  options?: { label: string;value: string }[];
}>();

const modelValue = defineModel<string>();
</script>

<template>
  <div>
    <select v-model="modelValue" :style="{ all: 'unset' }">
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
