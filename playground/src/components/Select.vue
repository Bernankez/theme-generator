<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  options?: { label: string;value: string }[];
}>();

const modelValue = defineModel<string>();

const selectRef = ref<HTMLSelectElement>();

function select() {
  selectRef.value?.showPicker();
}
</script>

<template>
  <div class="flex items-center">
    <select ref="selectRef" v-model="modelValue" :style="{ all: 'unset' }">
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <div class="i-solar:alt-arrow-down-linear" @click="select"></div>
  </div>
</template>
