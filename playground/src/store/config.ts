import { defineStore } from "pinia";
import { ref } from "vue";
import type { InternalThemeConfig } from "../composables/useConfig";

export const useConfigStore = defineStore("config", () => {
  const configs = ref<InternalThemeConfig[]>([]);

  const builtInConfigs = ref<InternalThemeConfig[]>([]);

  return {
    configs,
    builtInConfigs,
  };
}, {
  persist: {
    paths: ["configs"],
  },
});
