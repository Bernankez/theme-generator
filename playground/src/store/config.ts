import { defineStore } from "pinia";
import { ref } from "vue";
import type { ThemeConfig } from "../composables/useConfig";

export const useConfigStore = defineStore("config", () => {
  const configs = ref<ThemeConfig[]>([]);

  return {
    configs,
  };
}, {
  persist: true,
});
