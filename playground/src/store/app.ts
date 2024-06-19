import { defineStore } from "pinia";
import { ref } from "vue";
import packageJson from "~/package.json";

export const useAppStore = defineStore("app", () => {
  const splitSize = ref(0.4);
  const configVersion = ref(packageJson["@bernankez/theme-generator"].configVersion);

  return {
    splitSize,
    configVersion,
  };
}, {
  persist: {
    paths: ["splitSize"],
  },
});
