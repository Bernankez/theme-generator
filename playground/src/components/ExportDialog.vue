<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useThemeStore } from "../store/theme";
import Dialog from "./ui/Dialog.vue";
import FloatingIndicator from "./ui/FloatingIndicator.vue";
import Button from "./ui/Button.vue";
import Select from "./ui/Select.vue";

const show = defineModel({
  default: false,
});

const { preset, presetKeys } = storeToRefs(useThemeStore());

const titles = [
  {
    label: "NODE",
    key: "node",
  },
  {
    label: "JSON",
    key: "json",
  },
  {
    label: "CSS",
    key: "css",
  },
  {
    label: "UnoCSS",
    key: "unocss",
  },
  {
    label: "Tailwind",
    key: "tailwind",
  },
];

const options = ref(presetKeys.value.map(key => ({
  label: key,
  value: key,
})));
</script>

<template>
  <Dialog v-model="show">
    <template #title>
      <div class="flex items-center gap-2">
        <span>Export</span>
        <Select v-model="preset" :options="options" />
      </div>
    </template>
    <FloatingIndicator :data="titles" class="font-mono" />
  </Dialog>
</template>
