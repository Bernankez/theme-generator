import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import { type AcceptableTheme, defaultColors, defineTheme, inferThemeFromColor, transformTailwind, transformUnoCSS } from "@bernankez/theme-generator";

export const useThemeStore = defineStore("theme", () => {
  const cssPrefix = ref("");
  const themeColor = ref("rgb(193, 67, 68)");

  const defaults = computed(() => {
    if (themeColor.value) {
      return inferThemeFromColor(themeColor.value);
    }
    return defaultColors;
  });

  const overrides = ref<Partial<AcceptableTheme>>({});

  const themeValues = computed(() => defineTheme({
    cssPrefix: cssPrefix.value,
    defaults: defaults.value,
    overrides: overrides.value,
    transformers: [transformTailwind(), transformUnoCSS()],
  }));

  watch([defaults, cssPrefix], () => {
    overrides.value = {};
  });

  const theme = ref(themeValues.value.theme);

  watchEffect(() => {
    theme.value = themeValues.value.theme;
  });

  return {
    cssPrefix,
    themeColor,
    defaults,
    overrides,
    themeValues,
    theme,
  };
});
