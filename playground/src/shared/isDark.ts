import { computed, ref } from "vue";
import type { Scheme } from "@bernankez/theme-generator";

export const isDark = ref(false);

export const scheme = computed<Scheme>({
  get: () => {
    if (isDark.value) {
      return "dark";
    }
    return "light";
  },
  set: (dark) => {
    isDark.value = dark === "dark";
  },
});
